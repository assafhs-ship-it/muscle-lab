"""Build the site's exercise images on the "glossy white" backdrop (option B).

Each source picture must be a figure on a plain, roughly uniform blue background.
For every exercise the script:
  1. cuts the figure out (keying against the picture's own border colour),
  2. lines all frames up on the bench / lower legs, so only the moving parts move,
  3. renders every frame onto the same backdrop: white wall, pale glossy floor,
     soft contact shadow and a faded floor reflection,
  4. writes assets/exercises/<id>/<n>.webp (or the still images in assets/guy/).

Run from the project root:   python3 tools/make_frames.py            (everything)
                             python3 tools/make_frames.py curl-id ...  (only these)
Needs Pillow and numpy (both preinstalled on this Mac's python3).
"""
import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

# Frames in play order. Edit this when pictures are added, removed or swapped.
EXERCISES = {
    'seated-biceps-curl': ['Images/Sitting lifting to the chest/SLC1.png',
                           'Images/Sitting lifting to the chest/SLC3.png'],
    'seated-shoulder-press': ['Images/Sitting Pushing up/SPU1.jpg',
                              'Images/Sitting Pushing up/SPU3.jpg'],
    'seated-lateral-raise': ['Images/Sitting sides/SS1.png',
                             'Images/Sitting sides/SS2.png',
                             'Images/Sitting sides/SS3.png'],
    'flat-dumbbell-bench-press': ['Images/Lying pushing up/LPU1.png',
                                  'Images/Lying pushing up/LPU2.png'],
    'lying-dumbbell-triceps-extension': ['Images/Back muscle lying/BML1.png',
                                         'Images/Back muscle lying/BML2.png'],
    'elbow-plank': ['Images/Elbow Plank/EP1.png'],          # single still (shown with "type": "image")
    'bicycle-ab-crunches': ['Images/Bicycle Ab Crunches/BAC1.png'],   # single still
    'mountain-climbers': ['Images/Mountain Climbers/MC1.png'],        # single still
    'bench-crunch': ['Images/crunch while the legs are on the bench/cwlob1.png'],   # single still
    'bench-triceps-dips': ['Images/Bench Triceps Dips/BTD1.png'],    # single still, white background
    'bird-dog': ['Images/Bird Dog/BD1.png'],                          # single still
    'lying-leg-raises': ['Images/Lying Leg Raises/LLR1.png',
                         'Images/Lying Leg Raises/LLR2.png'],
    'dumbbell-fly': ['Images/Dumbbell Pullover/DP1.png',          # folder is named "Dumbbell Pullover",
                     'Images/Dumbbell Pullover/DP2.png'],         # but the art shows a fly
    'close-grip-incline-chest-press': ['Images/close grip incline chest press/CGICP1.png',
                                       'Images/close grip incline chest press/CGICP2.png'],
    'dumbbell-row': ['Images/Dumbo Row/DR1.png',
                     'Images/Dumbo Row/DR2.png'],
    'chest-supported-rear-delt-fly': ['Images/incline pronated chest down rear belt fly/IP1.png',
                                      'Images/incline pronated chest down rear belt fly/IP2.png'],
    'arnold-press': ['Images/Arnold Presses/AP1.png',
                     'Images/Arnold Presses/AP2.png'],
    'seated-overhead-triceps-extension': ['Images/Sitting overhead extension/she1.png',
                                          'Images/Sitting overhead extension/she2.png'],
    # pullover: LDP1 deep stretch, LDP2 arms back, LDP3 over the chest; played 1-2-3-2 so the loop is smooth
    'lying-dumbbell-pullover': ['Images/Lying Dumbbell Pullover/LDP1.png',
                                'Images/Lying Dumbbell Pullover/LDP2.png',
                                'Images/Lying Dumbbell Pullover/LDP3.png',
                                'Images/Lying Dumbbell Pullover/LDP2.png'],
}
# Exercises whose legs move: align on the right part of the figure (torso, head, arms)
# instead of the bottom band. The artist may also draw the man at a different size, so the
# scale search is wide and anchored on the head (the figure's rightmost point).
ALIGN_RIGHT = {'lying-leg-raises'}
RIGHT = 0.55             # with ALIGN_RIGHT, use the part of the figure right of 55% of its width
# Exercises aligned on the bench's grey metal frame only (when dumbbells hang near the bench feet).
ALIGN_METAL = {'chest-supported-rear-delt-fly'}
# Where the wall meets the floor, as a fraction of the figure's height above its lowest point.
# Raise it for perspective drawings where the man lies "behind" the bench feet.
FLOOR_FOR = {'bench-crunch': 0.30}
FLOOR = 0.10
BAND_FOR = {'dumbbell-fly': 0.6}   # per-exercise override of BAND (the fly's legs are drawn at an angle)
# Single still images (output path -> source). Empty since the placeholder exercises were deleted.
STILLS = {}

MAX_SIDE = 1100          # longest side of the exported webp
BAND = 0.72              # alignment uses the figure's lowest 28% (bench legs, shins, shoes)
MIN_ASPECT = 0.8         # height/width: wide poses get extra wall above so they don't fill the whole stage


# ---------- 1. cut-out ----------

def blueness(a):
    return a[..., 2] - np.maximum(a[..., 0], a[..., 1] * 0.9)


def metal_mask(path):
    """Neutral mid-grey pixels (the bench frame), away from the picture edges."""
    a = np.asarray(Image.open(path).convert('RGB'), float)
    mx, mn = a.max(axis=2), a.min(axis=2)
    m = ((mx - mn) < 28) & (mx > 95) & (mx < 235)
    h, w = m.shape; e = int(.08 * min(h, w))
    m[:e] = m[-e:] = False; m[:, :e] = m[:, -e:] = False
    return m.astype(float)


def drop_border_frames(a, alpha):
    """Remove a drawn picture frame: a thin light line (white or pale blue, with rounded corners)
    running parallel to the image edges. Pictures without such a line are returned unchanged.
    When a line is found on a side, light pixels between that edge and the line (+3px) are cleared,
    which also removes the rounded corners; the figure always sits inside the frame."""
    h, w = alpha.shape
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    light = (np.minimum(np.minimum(r, g), b) > 150) | ((b > 200) & (b - r > 50) & (g > 170))
    m = max(int(0.06 * min(h, w)), 8)
    left = [c for c in range(m) if light[:, c].mean() > 0.4]
    right = [c for c in range(w - m, w) if light[:, c].mean() > 0.4]
    top = [y for y in range(m) if light[y].mean() > 0.4]
    bottom = [y for y in range(h - m, h) if light[y].mean() > 0.4]
    if not (left or right or top or bottom):
        return alpha
    zone = np.zeros((h, w), bool)
    if left: zone[:, :max(left) + 4] = True
    if right: zone[:, max(min(right) - 3, 0):] = True
    if top: zone[:max(top) + 4] = True
    if bottom: zone[max(min(bottom) - 3, 0):] = True
    kill = np.asarray(Image.fromarray(((light & zone) * 255).astype('uint8')).filter(ImageFilter.MaxFilter(5))) > 0
    return np.where(kill & zone, 0, alpha)


def drop_specks(alpha, max_px=600):
    """Remove tiny isolated bits left from decorations in the art (they show as specks on white)."""
    from scipy import ndimage
    labels, n = ndimage.label(alpha > 0.1)
    if n < 2:
        return alpha
    sizes = ndimage.sum(np.ones_like(alpha), labels, range(1, n + 1))
    small = np.isin(labels, np.nonzero(sizes < max_px)[0] + 1)
    small = ndimage.binary_dilation(small, iterations=2)
    return np.where(small, 0, alpha)


def white_cutout(a):
    """Cut-out for art on a white background: near-white pixels connected to the picture edge are
    background (white shoe soles etc. are enclosed by outlines, so they stay). The drawn grey floor
    shadow is dropped too; the backdrop adds its own."""
    from scipy import ndimage
    mn, mx = a.min(axis=2), a.max(axis=2)
    whiteish = (mn > 200) & (mx - mn < 30)                          # white and pale-grey shadow
    labels, _ = ndimage.label(whiteish)
    edge_ids = np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]]))
    bg = np.isin(labels, edge_ids[edge_ids > 0])
    # enclosed patches of pure background white (e.g. the gap between bench legs) are background too;
    # white shoe soles are shaded slightly darker (~244), so they stay
    for i, sl in enumerate(ndimage.find_objects(labels), 1):
        m = labels[sl] == i
        if i not in edge_ids and m.sum() >= 300 and mn[sl][m].mean() >= 248.5:
            bg[sl] |= m
    alpha = (~bg).astype(float)
    # soften the edge: 1px feather where the figure meets the background
    alpha = np.asarray(Image.fromarray((alpha * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.8)), float) / 255
    alpha = np.where(bg & (alpha < 0.5), 0, alpha)
    return alpha            # no drop_specks: it would erase small drawn labels such as "90°"


def cutout(path):
    """Return a premultiplied ('RGBa') cut-out of the figure."""
    a = np.asarray(Image.open(path).convert('RGB'), float)
    border = np.concatenate([a[:8].reshape(-1, 3), a[-8:].reshape(-1, 3),
                             a[:, :8].reshape(-1, 3), a[:, -8:].reshape(-1, 3)])
    if np.median(border.min(axis=1)) > 225:                        # white background instead of blue
        alpha = white_cutout(a)
        rgba = np.dstack([a, alpha * 255]).clip(0, 255).astype('uint8')
        return Image.fromarray(rgba).convert('RGBa')
    bg = float(np.median(blueness(border[None])))                 # this picture's background blueness
    lo, hi = bg * 0.25, bg * 0.75                                  # fully opaque below lo, clear above hi
    alpha = np.clip((hi - blueness(a)) / (hi - lo), 0, 1)
    alpha = np.asarray(Image.fromarray((alpha * 255).astype('uint8')).filter(ImageFilter.MedianFilter(3)), float) / 255
    alpha = drop_border_frames(a, alpha)
    alpha = drop_specks(alpha)
    edge = (alpha > 0) & (alpha < 1)                               # remove the blue cast from soft edges
    a[..., 2] = np.where(edge, np.minimum(a[..., 2], np.maximum(a[..., 0], a[..., 1]) + 10), a[..., 2])
    rgba = np.dstack([a, alpha * 255]).clip(0, 255).astype('uint8')
    return Image.fromarray(rgba).convert('RGBa')


def alpha_of(img):
    return np.asarray(img.split()[3], float) / 255


# ---------- 2. alignment ----------

def bbox(mask):
    ys, xs = np.nonzero(mask)
    return xs.min(), ys.min(), xs.max(), ys.max()


def fit(ref, mov, right=False):
    """Find (s, tx, ty) so that ref point p matches mov point s*p + t, using the bottom band
    (or, with right=True, the right part of the figure)."""
    def at(m, f):
        h, w = m.shape
        return np.asarray(Image.fromarray((m * 255).astype('uint8')).resize((w // f, h // f), Image.BILINEAR)) > 127

    def search(f, s0, tx0, ty0, ss, ts, tstep):
        r, m = at(ref, f), at(mov, f)
        x0, y0, x1, y1 = bbox(r)
        if right:
            ys, xs = np.mgrid[max(y0 - 4, 0):min(y1 + 4, r.shape[0]), int(x0 + RIGHT * (x1 - x0)):min(x1 + 4, r.shape[1])]
        else:
            band_top = int(y0 + BAND * (y1 - y0))
            ys, xs = np.mgrid[band_top:min(y1 + 4, r.shape[0]), 0:r.shape[1]]
        rb = r[ys, xs]
        best = None
        for s in ss(s0):
            for tx in np.arange(tx0 / f - ts, tx0 / f + ts + 1e-9, tstep):
                for ty in np.arange(ty0 / f - ts, ty0 / f + ts + 1e-9, tstep):
                    sx = (s * xs + tx).round().astype(int); sy = (s * ys + ty).round().astype(int)
                    ok = (sx >= 0) & (sx < m.shape[1]) & (sy >= 0) & (sy < m.shape[0])
                    mb = np.zeros_like(rb); mb[ok] = m[sy[ok], sx[ok]]
                    iou = (mb & rb).sum() / max((mb | rb).sum(), 1)
                    if best is None or iou > best[0]:
                        best = (iou, s, tx * f, ty * f)
        return best

    if right:
        # anchor on the head: for each scale, map ref's rightmost point onto mov's, then search locally
        def tip(m):
            ys, xs = np.nonzero(m > .5); x = xs.max(); return x, ys[xs >= x - 6].mean()
        (rx, ry), (mx, my) = tip(ref), tip(mov)
        best = None
        for s0 in np.arange(.6, 1.81, .03):
            cand = search(8, s0, mx - s0 * rx, my - s0 * ry, lambda s: [s], 8, 2)
            if best is None or cand[0] > best[0]:
                best = cand
        mid = search(8, best[1], best[2], best[3], lambda s: np.arange(s - .03, s + .031, .01), 4, 1)
        return search(4, mid[1], mid[2], mid[3], lambda s: np.arange(s - .01, s + .011, .0025), 3, 1)

    # initial guess: match the width and bottom-centre of the bottom band
    rx0, ry0, rx1, ry1 = bbox(ref > .5); mx0, my0, mx1, my1 = bbox(mov > .5)
    def band_box(m, y0, y1):
        top = int(y0 + BAND * (y1 - y0)); return bbox(m[top:] > .5), top
    (bx0, _, bx1, by1), rt = band_box(ref, ry0, ry1)
    (cx0, _, cx1, cy1), mt = band_box(mov, my0, my1)
    s0 = (cx1 - cx0) / max(bx1 - bx0, 1)
    tx0 = (cx0 + cx1) / 2 - s0 * (bx0 + bx1) / 2
    ty0 = (cy1 + mt) - s0 * (by1 + rt)
    coarse = search(8, s0, tx0, ty0, lambda s: np.arange(s - .08, s + .081, .01), 12, 2)
    fine = search(4, coarse[1], coarse[2], coarse[3], lambda s: np.arange(s - .01, s + .011, .0025), 3, 1)
    return fine


# ---------- 3. backdrop ----------

def vgrad(h, w, top, bottom):
    t = np.linspace(0, 1, h)[:, None, None]
    return np.repeat(np.array(top)[None, None] * (1 - t) + np.array(bottom)[None, None] * t, w, axis=1)


def backdrop(w, h, foot, fig_h, shadow_cx, shadow_w, floor=0.10):
    horizon = int(foot - floor * fig_h)
    arr = vgrad(h, w, (252, 252, 253), (240, 241, 244))
    arr[horizon:] = vgrad(h - horizon, w, (233, 235, 239), (246, 247, 249))
    img = Image.fromarray(arr.astype('uint8'))
    sh_h = max(18, 0.025 * fig_h)
    sh = Image.new('L', (w, h), 0)
    ImageDraw.Draw(sh).ellipse((shadow_cx - shadow_w / 2, foot - sh_h * .55, shadow_cx + shadow_w / 2, foot + sh_h * .45), fill=56)
    sh = sh.filter(ImageFilter.GaussianBlur(max(10, 0.02 * fig_h)))
    img = Image.composite(Image.new('RGB', (w, h), (60, 62, 70)), img, sh)
    ImageDraw.Draw(img).line((0, horizon, w, horizon), fill=(255, 255, 255), width=3)
    return img


def reflection(fig, foot):
    """Faded mirror image of the figure on the floor below `foot`."""
    w, h = fig.size
    flipped = fig.convert('RGBA').transpose(Image.FLIP_TOP_BOTTOM)
    layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    layer.paste(flipped, (0, 2 * foot - h))
    a = np.asarray(layer.getchannel('A'), float)
    rows = np.arange(h)[:, None]
    fade = np.where(rows >= foot, np.clip(1 - (rows - foot) / (h * .22), 0, 1) * .28, 0)
    layer.putalpha(Image.fromarray((a * fade).astype('uint8')))
    return layer.filter(ImageFilter.GaussianBlur(1.5))


# ---------- 3b. still parts come from frame 1 ----------

COMPOSITE = False        # off: the user found the composited frames broke some images (2026-10-22)
DILATE = 0.02            # how far the moving region extends around the moving limb (fraction of image size)
NUDGE = False            # set per exercise by main() from NUDGE_FOR
NUDGE_FOR = {'seated-shoulder-press'}   # re-align the moving part on the still upper body (fixes a doubled head)
FEATHER = 0.005          # softness of its edge; wider blends show two bodies at once (ghosting)


def motion_mask(a0, a1, size, c0=None, c1=None):
    """Mask of the parts that really move between two aligned cut-outs (see composite).
    Shape changes come from the alpha channels; with colours given, a strong colour change where
    both are opaque counts too (e.g. a dumbbell drawn over the bench leg in one picture only)."""
    from scipy import ndimage
    raw = np.abs(a0 - a1) > 0.3
    if c0 is not None:
        both = (a0 > .7) & (a1 > .7)
        raw |= both & (np.abs(c0 - c1).max(axis=2) > 140)   # only big changes (dark dumbbell over grey metal), not shading
    seeds = ndimage.binary_opening(raw, iterations=max(2, int(0.012 * size)))   # only big blobs survive
    diff = ndimage.binary_propagation(seeds, mask=raw)                          # ...regrown to their full shape
    diff = ndimage.binary_dilation(diff, iterations=max(3, int(DILATE * size)))
    diff = ndimage.binary_fill_holes(diff)
    return diff


def upper_body_fit(base, other, moving, band_top):
    """Small extra scale/shift that lines `other` up with `base` on the still upper body
    (everything above the leg band that is not moving), returned as an affine for Image.transform."""
    f = 4
    a0 = alpha_of(base)[::f, ::f] > .5; a1 = alpha_of(other)[::f, ::f] > .5
    still = a0 & ~moving[::f, ::f]; still[band_top // f:] = False
    if still.sum() < 200:
        return None
    ys, xs = np.nonzero(still)
    cy, cx = ys.mean(), xs.mean()
    h, w = a1.shape
    best = None
    for s in np.arange(0.86, 1.141, 0.01):
        for dx in range(-14, 15, 2):
            for dy in range(-14, 15, 2):
                # point p in base maps to (p - c) * s + c + d in other
                sx = ((xs - cx) * s + cx + dx).round().astype(int); sy = ((ys - cy) * s + cy + dy).round().astype(int)
                ok = (sx >= 0) & (sx < w) & (sy >= 0) & (sy < h)
                score = a1[sy[ok], sx[ok]].sum() / len(xs)
                if best is None or score > best[0]:
                    best = (score, s, dx, dy)
    _, s, dx, dy = best
    tx = (cx * (1 - s) + dx) * f; ty = (cy * (1 - s) + dy) * f
    return (s, 0, tx, 0, s, ty)


def composite(base, other, band_top):
    """Return `other` with everything except its moving parts replaced by `base`.

    The artist redraws the bench and body slightly differently in every picture, so even
    well-aligned frames make still parts jitter. Real motion (an arm, a leg, a dumbbell) shows
    up as large blobs where the two cut-outs differ; redraw differences are thin slivers along
    edges. Opening removes the slivers, the blobs are regrown and widened a little, and only
    inside that soft mask is `other` used. Before that, `other` is nudged to match `base` on the
    still upper body, so moving limbs attach at the right place."""
    size = max(base.size)
    cb = lambda im: np.asarray(im.convert('RGBA'), float)[..., :3]
    moving = motion_mask(alpha_of(base), alpha_of(other), size, cb(base), cb(other))
    nudge = upper_body_fit(base, other, moving, band_top) if NUDGE else None
    if nudge is not None:
        # move only the content of the moving region; the mask itself stays where the motion was found
        other = other.transform(other.size, Image.AFFINE, nudge, Image.BICUBIC)
    m = np.asarray(Image.fromarray((moving * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(FEATHER * size)), float) / 255
    b = np.asarray(base, float); o = np.asarray(other, float)            # premultiplied RGBa
    out = b * (1 - m[..., None]) + o * m[..., None]
    return Image.fromarray(out.clip(0, 255).astype('uint8'), 'RGBa')


# ---------- 4. render ----------

def render(paths, right=False, metal=False):
    global BAND
    cuts = [cutout(p) for p in paths]
    ref = cuts[0]; W, H = ref.size
    fits = [(1.0, 0.0, 0.0)]
    for p, c in zip(paths[1:], cuts[1:]):
        if metal:
            saved, BAND = BAND, 0.0
            iou, s, tx, ty = fit(metal_mask(paths[0]), metal_mask(p))
            BAND = saved
        else:
            iou, s, tx, ty = fit(alpha_of(ref), alpha_of(c), right)
        print(f'    {os.path.basename(p)}: band overlap {iou:.2f}, scale {s:.3f}, shift {tx:.0f},{ty:.0f}px')
        fits.append((s, tx, ty))

    # warp every frame into a padded copy of frame 1's space
    P = int(0.35 * max(W, H)); CW, CH = W + 2 * P, H + 2 * P
    warped = [c.transform((CW, CH), Image.AFFINE, (s, 0, tx - s * P, 0, s, ty - s * P), Image.BICUBIC)
              for c, (s, tx, ty) in zip(cuts, fits)]
    if COMPOSITE and len(warped) > 1:
        ra0 = alpha_of(warped[0]) > .5
        _, ty0, _, ty1 = bbox(ra0)
        band_top = int(ty0 + BAND * (ty1 - ty0))
        warped = [warped[0]] + [composite(warped[0], w_, band_top) for w_ in warped[1:]]
    union = np.zeros((CH, CW), bool)
    for w_ in warped:
        union |= alpha_of(w_) > .03
    x0, y0, x1, y1 = bbox(union)
    fw, fh = x1 - x0, y1 - y0
    # a figure cut off by the bottom of its picture (e.g. a half-body pose) gets no floor
    cropped = alpha_of(ref)[-4:].mean() > .05
    box = (int(x0 - .08 * fw), int(y0 - .08 * fh), int(x1 + .08 * fw), int(y1 + (0 if cropped else .14 * fh)))
    bw, bh = box[2] - box[0], box[3] - box[1]
    if bh < MIN_ASPECT * bw:                                       # add wall space above wide poses
        box = (box[0], box[1] - int(MIN_ASPECT * bw - bh), box[2], box[3])
    box = (max(box[0], 0), max(box[1], 0), min(box[2], CW), min(box[3], CH))
    warped = [w_.crop(box) for w_ in warped]
    w, h = warped[0].size
    foot = int(y1 - box[1])

    if cropped:
        bg = Image.fromarray(vgrad(h, w, (252, 252, 253), (238, 239, 242)).astype('uint8'))
    else:
        ra = alpha_of(warped[0]) > .5                              # shadow sits under the bench and feet
        rx0, ry0, rx1, ry1 = bbox(ra); bt = int(ry0 + BAND * (ry1 - ry0))
        bx0, _, bx1, _ = bbox(ra[bt:])
        bg = backdrop(w, h, foot, fh, (bx0 + bx1) / 2, 0.62 * (bx1 - bx0), FLOOR)

    frames = []
    for w_ in warped:
        img = bg.copy()
        if not cropped:
            refl = reflection(w_, foot); img.paste(refl, (0, 0), refl)
        fig = w_.convert('RGBA'); img.paste(fig, (0, 0), fig)
        img.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
        frames.append(img)
    return frames


def main(only):
    for ex_id, paths in EXERCISES.items():
        if only and ex_id not in only:
            continue
        print(ex_id)
        global BAND, FLOOR, NUDGE
        NUDGE = ex_id in NUDGE_FOR
        BAND = BAND_FOR.get(ex_id, 0.72)
        FLOOR = FLOOR_FOR.get(ex_id, 0.10)
        out = f'assets/exercises/{ex_id}'
        os.makedirs(out, exist_ok=True)
        for old in os.listdir(out):
            if old.endswith('.webp'):
                os.remove(os.path.join(out, old))
        for n, img in enumerate(render(paths, ex_id in ALIGN_RIGHT, ex_id in ALIGN_METAL), 1):
            img.save(f'{out}/{n}.webp', quality=86)
        print(f'    -> {len(paths)} frames, {img.size[0]}x{img.size[1]}')
    if not only or 'stills' in only:
        for out, src in STILLS.items():
            render([src])[0].save(out, quality=86)
            print(f'{out} <- {src}')


if __name__ == '__main__':
    main(set(sys.argv[1:]))
