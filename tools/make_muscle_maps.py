"""Build the labelled "muscles worked" pictures (style C: tint + callouts).

Each picture is one existing animation frame with the working muscles tinted
(primary red, secondary orange) and labelled with a callout line. Muscle regions
are hand-drawn polygons in the frame's pixel coordinates, clipped to the skin, so
redraw them if a frame's art changes. Output: assets/exercises/<id>/muscles.webp

Run from the project root:  python3 tools/make_muscle_maps.py [exercise-id ...]
"""
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

PRIMARY = (210, 45, 40)
SECONDARY = (40, 120, 220)     # blue, chosen by the user over orange
FONT = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'


def mirror(poly, cx):
    """Reflect a polygon around the vertical line x = cx (for the other side of the body)."""
    return [(2 * cx - x, y) for x, y in poly]


# frame: which animation frame to use. muscles: (label, role, [polygons], callout point, label position, anchor)
MAPS = {
    'seated-biceps-curl': {
        'frame': 2,
        'muscles': [
            ('BICEPS', 'PRIMARY',
             [[(168, 395), (215, 380), (250, 420), (262, 505), (215, 512), (172, 470)],
              [(615, 395), (568, 380), (533, 420), (521, 505), (568, 512), (611, 470)]],
             (200, 455), (40, 150), 'l'),
            ('FOREARMS', 'SECONDARY',
             [[(190, 330), (250, 330), (262, 420), (250, 500), (212, 505), (196, 430)],
              [(593, 330), (533, 330), (521, 420), (533, 500), (571, 505), (587, 430)]],
             (570, 360), (-40, 150), 'r'),
        ],
    },
    'seated-shoulder-press': {
        'frame': 2,
        'muscles': [
            ('DELTOIDS', 'PRIMARY',
             [[(236, 285), (288, 312), (304, 372), (262, 384), (232, 342)],
              mirror([(236, 285), (288, 312), (304, 372), (262, 384), (232, 342)], 360)],
             (262, 335), (20, 470), 'l'),
            ('TRICEPS', 'SECONDARY',
             [[(198, 210), (246, 210), (262, 292), (234, 322), (204, 288)],
              mirror([(198, 210), (246, 210), (262, 292), (234, 322), (204, 288)], 360)],
             (478, 250), (-20, 230), 'r'),
            ('UPPER CHEST', 'SECONDARY',
             [[(300, 352), (356, 340), (358, 398), (306, 410)],
              mirror([(300, 352), (356, 340), (358, 398), (306, 410)], 360)],
             (420, 378), (-20, 560), 'r'),
        ],
    },
    'seated-lateral-raise': {
        'frame': 3,
        'muscles': [
            ('SIDE DELTOIDS', 'PRIMARY',
             [[(250, 262), (300, 248), (338, 288), (322, 334), (282, 322)],
              mirror([(250, 262), (300, 248), (338, 288), (322, 334), (282, 322)], 415)],
             (296, 290), (30, 140), 'l'),
            ('UPPER TRAPS', 'SECONDARY',
             [[(328, 238), (374, 216), (382, 252), (342, 268)],
              mirror([(328, 238), (374, 216), (382, 252), (342, 268)], 415)],
             (466, 238), (-30, 140), 'r'),
        ],
    },
    'flat-dumbbell-bench-press': {
        'frame': 2,
        'muscles': [
            ('CHEST', 'PRIMARY',
             [[(335, 415), (420, 400), (500, 418), (496, 466), (410, 482), (338, 470)]],
             (430, 440), (-40, 150), 'r'),
            ('FRONT DELTOIDS', 'SECONDARY',
             [[(250, 418), (300, 404), (336, 430), (322, 482), (262, 472)]],
             (292, 445), (-40, 280), 'r'),
            ('TRICEPS', 'SECONDARY',
             [[(238, 268), (276, 268), (288, 392), (256, 402), (240, 332)]],
             (258, 330), (20, 250), 'l'),
        ],
    },
    'lying-dumbbell-triceps-extension': {
        'frame': 1,
        'muscles': [
            ('TRICEPS', 'PRIMARY',
             [[(396, 318), (470, 318), (488, 398), (452, 442), (412, 400)]],
             (448, 370), (60, 170), 'l'),
            ('FOREARMS', 'SECONDARY',
             [[(298, 318), (396, 318), (410, 372), (318, 372)]],
             (350, 340), (-60, 170), 'r'),
        ],
    },
    # ---- Core Muscles ----
    'elbow-plank': {
        'frame': 1,
        'muscles': [
            ('ABDOMINALS', 'PRIMARY', [[(615, 612), (770, 600), (780, 690), (625, 705)]], (690, 655), (360, 300), 'l'),
            ('SHOULDERS', 'SECONDARY', [[(770, 560), (840, 560), (870, 640), (840, 690), (780, 670)]], (820, 615), (-40, 300), 'r'),
        ],
    },
    'bench-triceps-dips': {
        'frame': 1,
        'muscles': [
            ('TRICEPS', 'PRIMARY', [[(205, 290), (300, 265), (370, 275), (370, 330), (300, 335), (215, 325)]], (290, 300), (40, 110), 'l'),
            ('FRONT DELTOIDS', 'SECONDARY', [[(370, 260), (420, 262), (440, 320), (395, 330)]], (405, 295), (-40, 100), 'r'),
            ('CHEST', 'SECONDARY', [[(430, 320), (490, 320), (495, 385), (440, 395)]], (465, 355), (-40, 220), 'r'),
            ('CORE', 'SECONDARY', [[(410, 400), (470, 400), (470, 520), (410, 520)]], (440, 470), (-40, 340), 'r'),
        ],
    },
    'bicycle-ab-crunches': {
        'frame': 1,
        'muscles': [
            ('OBLIQUES', 'PRIMARY', [[(645, 700), (690, 690), (700, 780), (655, 805)]], (670, 750), (40, 110), 'l'),
            ('ABDOMINALS', 'PRIMARY', [[(690, 690), (790, 670), (810, 740), (700, 780)]], (750, 725), (-40, 110), 'r'),
            ('HIP FLEXORS', 'SECONDARY', [[(560, 650), (640, 640), (650, 690), (580, 700)]], (600, 670), (40, 290), 'l'),
        ],
    },
    'mountain-climbers': {
        'frame': 1,
        'muscles': [
            ('ABDOMINALS', 'PRIMARY', [[(640, 470), (760, 470), (770, 540), (660, 530)]], (705, 500), (40, 90), 'l'),
            ('HIP FLEXORS', 'PRIMARY', [[(640, 525), (690, 530), (700, 575), (650, 575)]], (668, 552), (40, 220), 'l'),
            ('QUADRICEPS', 'SECONDARY', [[(600, 570), (700, 600), (780, 620), (760, 650), (640, 620)]], (705, 618), (40, 350), 'l'),
            ('SHOULDERS', 'SECONDARY', [[(770, 390), (850, 400), (870, 470), (820, 500), (780, 460)]], (820, 440), (-40, 110), 'r'),
        ],
    },
    'lying-leg-raises': {
        'frame': 2,
        'muscles': [
            ('ABDOMINALS', 'PRIMARY', [[(590, 640), (720, 630), (730, 700), (600, 715)]], (660, 670), (-40, 220), 'r'),
            ('HIP FLEXORS', 'PRIMARY', [[(455, 520), (575, 520), (585, 615), (455, 620)]], (515, 570), (40, 300), 'l'),
        ],
    },
    'bird-dog': {
        'frame': 1,
        'muscles': [
            ('LOWER BACK', 'PRIMARY', [[(460, 515), (575, 545), (570, 575), (470, 560)]], (520, 545), (-40, 140), 'r'),
            ('DEEP CORE', 'PRIMARY', [[(455, 580), (560, 570), (560, 630), (470, 635)]], (510, 605), (-40, 290), 'r'),
            ('SHOULDERS', 'SECONDARY', [[(380, 520), (450, 515), (455, 580), (400, 600)]], (420, 555), (40, 160), 'l'),
        ],
    },
    # ---- Extra Home Strength ----
    'lying-dumbbell-pullover': {
        'frame': 2,
        'muscles': [
            ('CHEST', 'PRIMARY', [[(430, 390), (550, 385), (560, 440), (470, 445)]], (500, 415), (-40, 50), 'r'),
            ('LATS', 'PRIMARY', [[(390, 440), (470, 430), (530, 470), (500, 525), (420, 515)]], (465, 480), (-40, 165), 'r'),
            ('CORE', 'SECONDARY', [[(560, 410), (660, 410), (660, 500), (570, 500)]], (615, 455), (-40, 280), 'r'),
            ('TRICEPS', 'SECONDARY', [[(300, 330), (400, 360), (420, 410), (340, 400)]], (360, 370), (230, 100), 'l'),
        ],
    },
    'dumbbell-fly': {
        'frame': 1,
        'muscles': [
            ('CHEST', 'PRIMARY', [[(450, 380), (560, 370), (600, 420), (520, 445), (455, 430)]], (515, 410), (40, 90), 'l'),
            ('BICEPS', 'SECONDARY', [[(600, 240), (660, 215), (670, 260), (620, 320)]], (635, 265), (-40, 230), 'r'),
            ('FRONT DELTOIDS', 'SECONDARY', [[(560, 330), (620, 320), (640, 370), (590, 385)]], (600, 352), (-40, 360), 'r'),
        ],
    },
    'close-grip-incline-chest-press': {
        'frame': 2,
        'scale': 0.85,
        'muscles': [
            ('TRICEPS', 'PRIMARY', [[(310, 330), (380, 300), (410, 360), (330, 420)],
                                    [(460, 290), (530, 290), (540, 340), (480, 390)]], (505, 330), (-40, 250), 'r'),
            ('UPPER CHEST', 'PRIMARY', [[(330, 385), (420, 385), (470, 420), (400, 440), (320, 420)]], (410, 412), (-40, 420), 'r'),
            ('FRONT DELTOIDS', 'SECONDARY', [[(240, 400), (300, 390), (320, 450), (250, 470)]], (275, 430), (40, 60), 'l'),
        ],
    },
    'dumbbell-row': {
        'frame': 2,
        'scale': 0.75,
        'muscles': [
            ('UPPER BACK', 'PRIMARY', [[(450, 150), (600, 150), (620, 210), (470, 215)]], (530, 180), (40, 30), 'l'),
            ('LATS', 'PRIMARY', [[(470, 230), (580, 220), (600, 300), (540, 340), (480, 300)]], (530, 280), (-30, 420), 'r'),
            ('REAR DELTOIDS', 'SECONDARY', [[(340, 150), (430, 140), (440, 200), (360, 210)]], (390, 175), (40, 150), 'l'),
            ('BICEPS', 'SECONDARY', [[(360, 180), (440, 190), (430, 240), (370, 230)]], (400, 215), (40, 280), 'l'),
        ],
    },
    'chest-supported-rear-delt-fly': {
        'frame': 2,
        'muscles': [
            ('REAR DELTOIDS', 'PRIMARY', [[(450, 150), (540, 140), (560, 200), (480, 210)],
                                          [(800, 170), (850, 165), (860, 210), (810, 215)]], (505, 175), (40, 30), 'l'),
            ('UPPER BACK', 'PRIMARY', [[(560, 160), (690, 155), (700, 230), (580, 240)]], (630, 195), (-40, 320), 'r'),
        ],
    },
    'arnold-press': {
        'frame': 2,
        'muscles': [
            ('TRICEPS', 'SECONDARY', [[(185, 260), (230, 260), (240, 370), (200, 385)],
                                      mirror([(185, 260), (230, 260), (240, 370), (200, 385)], 337)], (459, 310), (-20, 330), 'r'),
            ('SIDE DELTOIDS', 'PRIMARY', [[(175, 385), (215, 385), (212, 450), (185, 445)],
                                          mirror([(175, 385), (215, 385), (212, 450), (185, 445)], 337)], (480, 415), (-20, 450), 'r'),
            ('FRONT DELTOIDS', 'PRIMARY', [[(212, 400), (255, 400), (270, 455), (228, 470)],
                                           mirror([(212, 400), (255, 400), (270, 455), (228, 470)], 337)], (440, 430), (-20, 570), 'r'),
        ],
    },
    'seated-overhead-triceps-extension': {
        'frame': 1,
        'muscles': [
            ('FOREARMS', 'SECONDARY', [[(280, 165), (450, 170), (455, 195), (300, 200)]], (400, 182), (-20, 50), 'r'),
            ('TRICEPS', 'PRIMARY', [[(228, 220), (285, 215), (300, 330), (245, 345)],
                                    [(400, 190), (462, 185), (470, 300), (420, 330)]], (440, 260), (-20, 320), 'r'),
            ('CORE', 'SECONDARY', [[(310, 430), (420, 430), (420, 540), (310, 540)]], (365, 485), (-20, 460), 'r'),
        ],
    },
    'bench-crunch': {
        'frame': 1,
        'muscles': [
            ('ABDOMINALS', 'PRIMARY', [[(290, 560), (430, 550), (460, 640), (330, 670)]], (370, 600), (40, 150), 'l'),
            ('OBLIQUES', 'SECONDARY', [[(430, 560), (470, 560), (470, 660), (440, 665)]], (452, 615), (-40, 150), 'r'),
        ],
    },
}


def skin_mask(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    return (r > 150) & (r - b > 45) & (r > g)


def tint(img, mask, color, strength):
    m = Image.fromarray((mask * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(6))
    m = np.asarray(m, float)[..., None] / 255 * strength
    arr = np.asarray(img, float)
    lum = arr.mean(axis=2, keepdims=True) / 255
    out = arr * (1 - m) + (np.array(color, float) * (0.35 + 0.85 * lum)) * m   # keeps the drawing's shading
    return Image.fromarray(out.clip(0, 255).astype('uint8'))


def build(ex_id, spec):
    base = Image.open(f'assets/exercises/{ex_id}/{spec["frame"]}.webp').convert('RGB')
    W, H = base.size
    skin = skin_mask(np.asarray(base, float))
    img = base
    for label, role, polys, *_ in spec['muscles']:
        m = Image.new('L', (W, H), 0); d = ImageDraw.Draw(m)
        for p in polys:
            d.polygon(p, fill=255)
        mask = (np.asarray(m) > 0) & skin
        color, strength = (PRIMARY, 0.6) if role == 'PRIMARY' else (SECONDARY, 0.45)
        img = tint(img, mask, color, strength)

    d = ImageDraw.Draw(img)
    k = spec.get('scale', 1.0)                             # shrink labels where space is tight
    big, small = ImageFont.truetype(FONT, int(max(22, W // 26) * k)), ImageFont.truetype(FONT, int(max(15, W // 42) * k))
    ink = (26, 20, 8)
    for label, role, polys, (px, py), (lx, ly), side in spec['muscles']:
        color = PRIMARY if role == 'PRIMARY' else SECONDARY
        lx = lx if lx >= 0 else W + lx                         # negative x counts from the right edge
        anchor = 'l' if side == 'l' else 'r'
        d.text((lx, ly), label, font=big, fill=ink, anchor=anchor + 'a')
        d.text((lx, ly + big.size + 2), role, font=small, fill=color, anchor=anchor + 'a')
        # underline the label, then run the pointer from the underline's inner end to the muscle
        tw = max(d.textlength(label, font=big), d.textlength(role, font=small))
        uy = ly + big.size + small.size + 10
        x0, x1 = (lx, lx + tw) if side == 'l' else (lx - tw, lx)
        inner = x1 if side == 'l' else x0
        d.line((x0, uy, x1, uy), fill=ink, width=3)
        d.line((inner, uy, px, py), fill=ink, width=3)
        d.ellipse((px - 8, py - 8, px + 8, py + 8), fill=color, outline=(255, 255, 255), width=3)
    img.save(f'assets/exercises/{ex_id}/muscles.webp', quality=88)
    print(ex_id, img.size)


if __name__ == '__main__':
    only = set(sys.argv[1:])
    for ex_id, spec in MAPS.items():
        if not only or ex_id in only:
            build(ex_id, spec)
