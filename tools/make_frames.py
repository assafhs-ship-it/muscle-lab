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
    'bird-dog': ['Images/Bird Dog/BD1.png'],                          # single still
    'lying-leg-raises': ['Images/Lying Leg Raises/LLR1.png',
                         'Images/Lying Leg Raises/LLR2.png'],
    'dumbbell-fly': ['Images/Dumbbell Pullover/DP1.png',          # folder is named "Dumbbell Pullover",
                     'Images/Dumbbell Pullover/DP2.png'],         # but the art shows a fly
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
BAND_FOR = {'dumbbell-fly': 0.6}   # per-exercise override of BAND (the fly's legs are drawn at an angle)
# Single still images (output path -> source).
STILLS = {
    'assets/guy/guy1.webp': 'Images/Guy/Guy1.png',
    'assets/guy/guy2.webp': 'Images/Sitting lifting to the chest/Guy2.png',
    'assets/guy/guy3.webp': 'Images/Sitting lifting to the chest/Guy3.png',
    'assets/guy/guy4.webp': 'Images/Sitting lifting to the chest/Guy4.png',
    'assets/guy/guy5.webp': 'Images/Sitting lifting to the chest/Guy5.png',
    'assets/guy/guy6.webp': 'Images/Sitting lifting to the chest/Guy6.png',
    'assets/guy/guy7.webp': 'Images/Guy/Guy7.png',
}

MAX_SIDE = 1100          # longest side of the exported webp
BAND = 0.72              # alignment uses the figure's lowest 28% (bench legs, shins, shoes)
MIN_ASPECT = 0.8         # height/width: wide poses get extra wall above so they don't fill the whole stage


# ---------- 1. cut-out ----------

def blueness(a):
    return a[..., 2] - np.maximum(a[..., 0], a[..., 1] * 0.9)


def cutout(path):
    """Return a premultiplied ('RGBa') cut-out of the figure."""
    a = np.asarray(Image.open(path).convert('RGB'), float)
    border = np.concatenate([a[:8].reshape(-1, 3), a[-8:].reshape(-1, 3),
                             a[:, :8].reshape(-1, 3), a[:, -8:].reshape(-1, 3)])
    bg = float(np.median(blueness(border[None])))                 # this picture's background blueness
    lo, hi = bg * 0.25, bg * 0.75                                  # fully opaque below lo, clear above hi
    alpha = np.clip((hi - blueness(a)) / (hi - lo), 0, 1)
    alpha = np.asarray(Image.fromarray((alpha * 255).astype('uint8')).filter(ImageFilter.MedianFilter(3)), float) / 255
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


def backdrop(w, h, foot, fig_h, shadow_cx, shadow_w):
    horizon = int(foot - 0.10 * fig_h)
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


# ---------- 4. render ----------

def render(paths, right=False):
    cuts = [cutout(p) for p in paths]
    ref = cuts[0]; W, H = ref.size
    fits = [(1.0, 0.0, 0.0)]
    for p, c in zip(paths[1:], cuts[1:]):
        iou, s, tx, ty = fit(alpha_of(ref), alpha_of(c), right)
        print(f'    {os.path.basename(p)}: band overlap {iou:.2f}, scale {s:.3f}, shift {tx:.0f},{ty:.0f}px')
        fits.append((s, tx, ty))

    # warp every frame into a padded copy of frame 1's space
    P = int(0.35 * max(W, H)); CW, CH = W + 2 * P, H + 2 * P
    warped = [c.transform((CW, CH), Image.AFFINE, (s, 0, tx - s * P, 0, s, ty - s * P), Image.BICUBIC)
              for c, (s, tx, ty) in zip(cuts, fits)]
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
        bg = backdrop(w, h, foot, fh, (bx0 + bx1) / 2, 0.62 * (bx1 - bx0))

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
        global BAND
        BAND = BAND_FOR.get(ex_id, 0.72)
        out = f'assets/exercises/{ex_id}'
        os.makedirs(out, exist_ok=True)
        for old in os.listdir(out):
            if old.endswith('.webp'):
                os.remove(os.path.join(out, old))
        for n, img in enumerate(render(paths, ex_id in ALIGN_RIGHT), 1):
            img.save(f'{out}/{n}.webp', quality=86)
        print(f'    -> {len(paths)} frames, {img.size[0]}x{img.size[1]}')
    if not only or 'stills' in only:
        for out, src in STILLS.items():
            render([src])[0].save(out, quality=86)
            print(f'{out} <- {src}')


if __name__ == '__main__':
    main(set(sys.argv[1:]))
