# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Muscle Lab** is an exercise library web app in the "Night Session" design (dark, editorial, gold accent). The landing page lists exercises with a body-area filter. Each exercise opens a detail page with an animated form guide, overview and tips, execution steps and the muscles it works. It works on laptop, iPad and phone, and can be added to an iPhone Home Screen.

It is a static site: no build step, no framework and no dependencies (Google Fonts only). It is intended for GitHub Pages from the `main` branch root, like the other projects here. To preview locally, run `python3 -m http.server 8000` and open http://localhost:8000. Opening `index.html` directly also works.

`muscle-lab-claude-code-prompt.md` is the original design brief. It asked for React/Vite, but the app was built static because Node isn't installed and the other projects deploy to GitHub Pages without a build. The tokens, layout and behaviour follow the brief.

**When you change `css/*.css`, `js/app.js` or `data/exercises.js`, bump that file's `?v=` number in `index.html`.** GitHub Pages caches files for 10 minutes, and Safari can pair a new `index.html` with an old script.

## Files

- `index.html` contains the shell: the sticky header (brand and Home pill), an empty `<main>`, the floating Home button and an inline SVG icon sprite (`#i-house`, `#i-play`, `#i-pause`, `#i-left`, `#i-right`).
- `css/tokens.css` holds the design tokens (colours, fonts, fluid `clamp()` sizes, radii).
- `css/styles.css` holds the components, followed by breakpoints: tablet ≤1024px, phone ≤639px and ≤380px. It ends with a reduced-motion block.
- `data/exercises.js` is `window.EXERCISES = [...]`, the only content source. The array is plain JSON. It is a `.js` file rather than `.json` so the page also works when opened from the file system.
- `js/app.js` contains the hash router, landing and detail renderers, the `createAnimation` component and the wake lock.
- `assets/exercises/<id>/1..5.webp` are the animation frames, cleaned from `Images/Guy/workout_50_individual_frames.zip`: number badges, title bars and neighbouring-card slivers removed, then upscaled 3×.
- `icons/` and `manifest.json` provide the Home Screen icon and name.
- `Images/` holds the source art and isn't used by the app.

## Architecture notes

- **Routing** is hash-based: `#/` for the landing page and `#/exercise/<id>` for a detail page. Hash routing keeps deep links working on GitHub Pages. `route()` destroys running animations and calls the previous page's detach function before rendering.
- **Animations**: `createAnimation(container, exercise, { playing, speed, onFrame })` picks a renderer from `renderers` based on `exercise.animation.type`. The types are `frames`, `image`, `video` and `placeholder` (used when `animation` is null). Each renderer returns `{ play, pause, setSpeed, goTo, frameCount, destroy }`. To support Lottie or another format, add a renderer. `frames` stacks all images and cross-fades them with a `setTimeout` loop. `fps * speed` sets the pace, and the fade is about 45% of the frame time.
- **Persisted preferences**: the body-area filter (`muscle-lab:filter`) and playback speed (`muscle-lab:speed`) are saved in localStorage. The landing scroll position (`muscle-lab:landing-scroll`) is saved in sessionStorage. Browser Back from a detail page restores the list position, while the Home buttons go to the top. All storage access goes through `store`, which swallows errors.
- **Reduced motion**: animations start paused and CSS transitions and animations are effectively disabled.
- **Wake lock**: while a detail animation plays, the screen stays awake, which helps between sets.
- **Keyboard**: on a detail page, ←/→ go to the previous/next exercise, and Space or K toggles play when focus isn't on a control.
- The difficulty dots map Beginner to 1, Intermediate to 2 and Advanced to 3. In the muscle bars, Primary fills 100% and Secondary fills 55%.
- `APP_VERSION` at the top of `js/app.js`. Bump it with each release.
