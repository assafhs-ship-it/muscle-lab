# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Muscle Lab** is an exercise library web app in the "Night Session" design (dark, editorial, gold accent). The landing page lists every exercise in three category sections: Home Basics, Core Muscles and Extra Home Strength. Each exercise opens a detail page with an animated form guide, overview and tips, execution steps and the muscles it works. It works on laptop, iPad and phone, and can be added to an iPhone Home Screen.

It is a static site: no build step, no framework and no dependencies (Google Fonts only). It is deployed with GitHub Pages from the `main` branch root of https://github.com/assafhs-ship-it/muscle-lab, and the live site is https://assafhs-ship-it.github.io/muscle-lab/. To publish changes, commit and run `git push origin main`. To preview locally, run `python3 -m http.server 8000` and open http://localhost:8000. Opening `index.html` directly also works.

`muscle-lab-claude-code-prompt.md` is the original design brief. It asked for React/Vite, but the app was built static because Node isn't installed and the other projects deploy to GitHub Pages without a build. The tokens, layout and behaviour follow the brief.

**When you change `css/*.css`, `js/app.js` or `data/exercises.js`, bump that file's `?v=` number in `index.html`.** GitHub Pages caches files for 10 minutes, and Safari can pair a new `index.html` with an old script.

## Files

- `index.html` contains the shell: the sticky header (brand and Home pill), an empty `<main>`, the floating Home button and an inline SVG icon sprite (`#i-house`, `#i-play`, `#i-pause`, `#i-left`, `#i-right`).
- `css/tokens.css` holds the design tokens (colours, fonts, fluid `clamp()` sizes, radii).
- `css/styles.css` holds the components, followed by breakpoints: tablet ≤1024px, phone ≤639px and ≤380px. It ends with a reduced-motion block.
- `data/exercises.js` is `window.EXERCISES = [...]`, the only content source. The array is plain JSON. It is a `.js` file rather than `.json` so the page also works when opened from the file system.
- `js/app.js` contains the hash router, landing and detail renderers, the `createAnimation` component and the wake lock.
- `assets/exercises/seated-shoulder-press/1..2.webp` are frames made from `Images/Sitting Pushing up/SPU1.jpg` and `SPU3.jpg` only (the user chose just these two). The source pictures are framed inconsistently (frame 3 is zoomed out), so they were aligned on the lower body and bench, re-based on frame 3 so its overhead dumbbells aren't cropped, then shrunk to 90% and centred for headroom, with the exposed edges filled with a backdrop built from blue background pixels only. Frames are shown with `object-fit: contain` and are never cropped. Append `?v=N` to an animation `src` whenever its images are regenerated under the same names. Do the same for future multi-image animations so the figure doesn't jump between frames. `seated-biceps-curl` (SLC1, SLC3, SLC2: down, mid, chest) needed no alignment. Since 2026-10-21 its frames are on a gym background instead of plain blue; they are already pixel-aligned, so they are used as-is (the blue-background alignment script would not work on them). `seated-lateral-raise` (SS1–SS3) and `flat-dumbbell-bench-press` (LPU1–LPU2) were aligned the same way with a 0.9 zoom for margin. `lying-dumbbell-pullover` (BML1–BML2, which the user asked to call a triceps extension but which show a pullover) was aligned on the bench only (BML2 scaled ×1.09) because the artist drew the bench at different lengths. Its backdrop extends the frame's own edge pixels outward and blurs them, which hides the seam better than the averaged-blue backdrop when a frame shrinks a lot. Keep the feather where a shrunk frame meets its backdrop narrow (about 5px plus a 3px blur); a wide one fades dumbbells near the edges.
- `assets/guy/guy1..7.webp` are web-sized copies (max 1100px) of `Images/Guy/Guy1..7.png`. For now every exercise uses one of them as a still image (`"type": "image"`). When a real animation is added, use `"type": "frames"` or `"video"`.
- `icons/` and `manifest.json` provide the Home Screen icon and name.
- `Images/Guy/` holds the full-size source art. Regenerate `assets/guy/` from it when an image changes.

## Architecture notes

- **Routing** is hash-based: `#/` for the landing page and `#/exercise/<id>` for a detail page. Hash routing keeps deep links working on GitHub Pages. `route()` destroys running animations and calls the previous page's detach function before rendering.
- **Animations**: `createAnimation(container, exercise, { playing, speed, onFrame })` picks a renderer from `renderers` based on `exercise.animation.type`. The types are `frames`, `image`, `video` and `placeholder` (used when `animation` is null). Each renderer returns `{ play, pause, setSpeed, goTo, frameCount, destroy }`. To support Lottie or another format, add a renderer. `frames` stacks all images and cross-fades them with a `setTimeout` loop. `fps * speed` sets the pace, unless the animation has `durations` (ms per frame at 1×, used to hold the top and bottom of a rep). The fade is about 55% of the frame time, capped at 380ms.
- **Categories**: each exercise has a `category`. `CATEGORIES` in `app.js` sets the section order. The three main categories always show, with a dashed "No exercises yet" placeholder when empty. A category not in that list (e.g. the temporary "To be deleted") gets its own section after them, only while it has exercises. Each exercise keeps its body-area `group` for the card label and pills. The current split is a placeholder the user will revise.
- **Emblem**: `assets/guy/guy-general.webp` (from `Images/Guy/GuyGeneral.png`, a transparent cutout) is the landing page's mascot, not tied to any exercise. It sits in the hero's right column in front of a glowing gold disc with a slow-turning dashed orbit and a faint outlined "LAB". His legs fade out with a mask, and he floats gently. The hero grid areas are `copy emblem / credit emblem` on desktop and `copy / emblem / credit` at ≤1024px. When regenerating the webp, zero out alpha below ~16 *after* resizing; otherwise faint stray pixels show as a rectangle against the glow.
- **Creator credit**: under the hero copy, the page shows "Created by" and `CREATOR` from `app.js`, one word per line in the display font. Each word rises in on load (`word-rise`, staggered by `--i`), then a gold highlight sweeps across it on a loop (`shine`, done with `background-clip: text`). Reduced motion shows it static.
- **Still images**: for `image` and `placeholder` animations, the stage gets `stage--still`, which hides the play, phase and speed controls.
- **Persisted preferences**: playback speed (`muscle-lab:speed`) is saved in localStorage. The landing scroll position (`muscle-lab:landing-scroll`) is saved in sessionStorage. Browser Back from a detail page restores the list position, while the Home buttons go to the top. All storage access goes through `store`, which swallows errors.
- **Reduced motion**: animations start paused and CSS transitions and animations are effectively disabled.
- **Wake lock**: while a detail animation plays, the screen stays awake, which helps between sets.
- **Keyboard**: on a detail page, ←/→ go to the previous/next exercise, and Space or K toggles play when focus isn't on a control.
- The difficulty dots map Beginner to 1, Intermediate to 2 and Advanced to 3. In the muscle bars, Primary fills 100% and Secondary fills 55%.
- `APP_VERSION` at the top of `js/app.js`. Bump it with each release.
