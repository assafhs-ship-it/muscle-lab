# Muscle Lab — build prompt for Claude Code ("Night Session" design)

Paste everything below the line into Claude Code (start in plan mode with `/plan`).

---

Build a responsive web app called **Muscle Lab**: an exercise library. Users see a landing page listing exercises, tap one to drill into a detail page with an animation and details, and can return Home from anywhere. It must work well on laptop, iPad and phone.

## Tech stack
- React + TypeScript + Vite, React Router.
- Plain CSS with CSS variables (one `tokens.css`) — no UI framework.
- Routes: `/` (landing) and `/exercise/:id` (detail). Browser back must work; deep links must work.
- All exercise content lives in `src/data/exercises.json` so I can edit it later without touching components.

## Design direction: "Night Session" — dark, premium, editorial (think Whoop / Equinox)

### Tokens
| Token | Value | Use |
|---|---|---|
| `--bg` | `#12110F` | page background |
| `--surface` | `#1C1A17` | cards, animation stage |
| `--surface-2` | `#2A2723` | small inset circles |
| `--line` | `#2E2B27` | borders, bar tracks |
| `--line-strong` | `#4A4640` | outline buttons, dashed placeholders |
| `--text` | `#F1EDE6` | primary text |
| `--text-2` | `#C9C3B9` | body copy on detail page |
| `--muted` | `#A8A196` | meta text, labels |
| `--gold` | `#E8B04A` | the single accent: CTAs, active states, numbers |
| `--dot-off` | `#3A3732` | inactive difficulty dot |

### Typography (Google Fonts)
- **Big Shoulders Display** (600/800/900) for ALL headers, exercise names, big numbers — always uppercase, line-height ~0.86–0.92.
- **Manrope** (400/500/700) for body, labels, buttons.
- Small labels: Manrope 13px, 700, letter-spacing 0.14–0.24em, uppercase, `--muted` or `--gold`.
- Use fluid sizes with `clamp()`: hero H1 `clamp(64px, 9vw, 116px)`, detail H1 `clamp(56px, 8vw, 104px)`, body-area menu `clamp(36px, 5vw, 52px)`, card titles `clamp(32px, 3.5vw, 42px)`.

### Shape and spacing
- Content max-width 1320px, 20px side padding (16px on phones).
- Radii: cards 24px, hero/stage 32px, pills/buttons 999px.
- Minimum touch target 44px. Buttons: primary = gold fill with dark text; secondary = transparent with `--line-strong` border.

## Global header (both pages)
Sticky top, background `--bg` at ~95% opacity, 1px bottom border `--line`.
- Left: a 4×30px gold vertical bar + "MUSCLE LAB" (Big Shoulders 800, 26px, letter-spacing 0.22em). Clicking it goes Home.
- Right: "Home" pill button (gold outline + gold text, house icon). Always visible.

## Landing page (`/`)
1. **Hero** (two columns on desktop, stacked on tablet/phone):
   - Left: label "THE MOVEMENT LIBRARY" (gold), H1 "STRENGTH, / EXPLAINED." with the second line gold, a short muted paragraph, then two buttons: "Browse exercises" (gold, scrolls to the library) and "Start with the squat" (outline, opens the first exercise).
   - Right: a "Now playing" card (`--surface`, 32px radius, min-height 460px): top row "NOW PLAYING" + gold "● LIVE"; centered animation placeholder; bottom row exercise name in Big Shoulders 48px + meta + a 56px gold circular play button. Clicking the card opens that exercise.
2. **Body-area filter** — label "CHOOSE A BODY AREA", then a wrapping row of giant text buttons: ALL, LEGS, CHEST, BACK, SHOULDERS, ARMS, CORE (Big Shoulders 900). Each shows its exercise count as a small superscript. Active = gold text with a 3px gold underline (offset 8px). Use `aria-pressed`.
3. **Exercise grid** — cards in a 2-column grid on desktop, 1 column on tablet portrait and phone. Each card is a single button: left side shows `01 · LEGS` (gold label), the name (Big Shoulders 900 ~42px), and a meta row "Barbell · ●●○ · Intermediate" (3 difficulty dots: gold = filled, `--dot-off` = empty). Right side: a 104px dashed-border thumbnail square with a small play circle (future animation thumbnail).

## Exercise detail page (`/exercise/:id`)
1. **Animation stage** — full content width, 540px tall (420px on phones), `--surface`, 32px radius.
   - Top row: breadcrumb "LIBRARY / LEGS" (LIBRARY is a gold link Home) and "01 / 08" on the right.
   - Center: an `<ExerciseAnimation exerciseId playing speed />` component. For now it renders a dashed placeholder labeled "[YOUR CHARACTER ANIMATION]". Design it so I can later drop in Lottie, SVG, sprite or video per exercise via an `animation` field in the JSON.
   - Bottom row: a 56px gold circular Play/Pause toggle (swap icon, update `aria-label`), and a speed segmented control 0.5× / 1× / 2× (active = light fill, dark text).
2. **Title row** — H1 exercise name; pills: level (gold fill), equipment and body area (outline). On the right, round Previous / Next buttons (52px, outline) that cycle through exercises.
3. **Three info columns** (3 across on desktop, stacked on phone), each with a 2px gold top border:
   - **Overview** — description text.
   - **Execution** — numbered steps using gold Roman numerals (I, II, III …).
   - **Muscles worked** — each muscle with its role (Primary / Secondary) and a thin 4px gold bar (Primary 100%, Secondary 55%).
4. **Floating Home button** — 60px gold circle with house icon, fixed bottom-right with a soft shadow, `aria-label="Back to home"`. Always reachable while scrolling, on every device.

## Data model (`exercises.json`)
```json
{
  "id": "back-squat",
  "name": "Back Squat",
  "group": "Legs",
  "equipment": "Barbell",
  "level": "Intermediate",
  "description": "",
  "steps": ["", "", ""],
  "muscles": [{ "name": "Quadriceps", "role": "Primary" }, { "name": "Glutes", "role": "Secondary" }],
  "tips": [],
  "animation": null
}
```
Seed it with these 8 (leave description, steps and tips as clearly marked placeholders — I'll write them):
Back Squat (Legs, Barbell, Intermediate) · Bench Press (Chest, Barbell, Intermediate) · Deadlift (Back, Barbell, Advanced) · Pull-Up (Back, Bodyweight, Intermediate) · Overhead Press (Shoulders, Barbell, Intermediate) · Walking Lunge (Legs, Dumbbells, Beginner) · Hammer Curl (Arms, Dumbbells, Beginner) · Front Plank (Core, Bodyweight, Beginner).

## Responsive rules
- Phone (<640px): single column everywhere, hero card below the text, 16px padding, stage 420px, the body-area menu wraps.
- Tablet (640–1024px): hero stacks, exercise grid 1–2 columns, info columns 2 + 1.
- Laptop (>1024px): layout as described.
- No horizontal scrolling at 360px width. Test at 390×844, 820×1180 and 1440×900.

## Quality bar
- Semantic HTML, real `<button>`/`<a>`, visible focus rings (gold outline), keyboard-navigable, text contrast ≥ 4.5:1.
- Scroll to the top when opening an exercise. Remember the selected body-area filter when returning Home.
- Respect `prefers-reduced-motion` (pause the animation by default).
- No emoji; use inline SVG stroke icons (house, play, pause, chevrons).

When done, run the dev server and tell me the URL. Then show me how to add a new exercise to the JSON.
