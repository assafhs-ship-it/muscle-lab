/* Muscle Lab — app logic. Exercise data lives in data/exercises.js. */
(function () {
  'use strict';

  const APP_VERSION = 'V1.2';
  const CREATOR = 'Assaf Hovevei Sion';
  const EXERCISES = Array.isArray(window.EXERCISES) ? window.EXERCISES : [];
  const CATEGORIES = ['Home Basics', 'Core Muscles', 'Extra Home Strength'];
  const LEVELS = { Beginner: 1, Intermediate: 2, Advanced: 3 };
  const SPEEDS = [0.5, 1, 2];
  const SPEED_KEY = 'muscle-lab:speed';
  const SCROLL_KEY = 'muscle-lab:landing-scroll';

  const main = document.getElementById('main');
  const fab = document.querySelector('.fab-home');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let activeAnimations = [];
  let detachPage = null;
  let lastRoute = null;
  let goingHome = false;

  /* ---------- Small helpers ---------- */

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = (n) => String(n).padStart(2, '0');
  const icon = (id, cls = '') => `<svg class="icon ${cls}" aria-hidden="true" viewBox="0 0 24 24"><use href="#i-${id}"/></svg>`;

  function roman(n) {
    const map = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
    let out = '';
    for (const [v, s] of map) while (n >= v) { out += s; n -= v; }
    return out;
  }

  // Storage can be unavailable (private mode, blocked site data) — never let that break the app.
  const store = {
    get(area, key) { try { return window[area].getItem(key); } catch { return null; } },
    set(area, key, val) { try { window[area].setItem(key, val); } catch { /* ignore */ } },
  };

  function dots(level) {
    const filled = LEVELS[level] || 1;
    return `<span class="dots" aria-hidden="true">${[1, 2, 3].map((i) => `<i class="${i <= filled ? 'on' : ''}"></i>`).join('')}</span>`;
  }

  function metaRow(ex) {
    return `<span class="meta">${esc(ex.equipment)}<span class="meta__sep" aria-hidden="true">·</span>${dots(ex.level)}<span class="meta__sep" aria-hidden="true">·</span>${esc(ex.level)}</span>`;
  }

  function frameSrc(anim, n) { return anim.src.replace('{n}', n); }

  function thumbSrc(ex) {
    const a = ex.animation;
    if (!a) return null;
    if (a.type === 'frames') return frameSrc(a, 1);
    if (a.type === 'image') return a.src;
    return a.poster || null;
  }

  /* ---------- ExerciseAnimation ----------
   * createAnimation(container, exercise, { playing, speed, onFrame })
   * returns { play(), pause(), setSpeed(x), goTo(i), frameCount, destroy() }.
   * Add a new renderer below to support another animation.type (e.g. Lottie).
   */
  const renderers = {
    frames(root, ex, anim, opts) {
      const count = anim.frames || 1;
      const fps = anim.fps || 1.6;
      const box = document.createElement('div');
      box.className = 'anim-frames';
      box.setAttribute('role', 'img');
      box.setAttribute('aria-label', `${ex.name} demonstration`);
      const imgs = [];
      for (let i = 1; i <= count; i++) {
        const img = new Image();
        img.alt = '';
        img.decoding = 'async';
        img.src = frameSrc(anim, i);
        if (i === 1) img.addEventListener('load', () => box.style.setProperty('--ar', img.naturalWidth / img.naturalHeight), { once: true });
        box.appendChild(img);
        imgs.push(img);
      }
      root.appendChild(box);

      let index = 0, timer = null, playing = false, speed = opts.speed || 1;

      function show(i) {
        index = (i + count) % count;
        imgs.forEach((img, k) => img.classList.toggle('is-on', k === index));
        opts.onFrame && opts.onFrame(index, count);
      }
      // Optional per-frame timing at 1× (ms), e.g. to hold the top and bottom of a rep.
      const durations = Array.isArray(anim.durations) && anim.durations.length === count ? anim.durations : null;
      function interval() { return (durations ? durations[index] : 1000 / fps) / speed; }
      function schedule() {
        clearTimeout(timer);
        if (!playing) return;
        const ms = interval();
        box.style.setProperty('--fade', `${Math.round(Math.min(ms * 0.55, 380))}ms`);
        timer = setTimeout(() => { show(index + 1); schedule(); }, ms);
      }
      show(0);
      return {
        frameCount: count,
        play() { playing = true; schedule(); },
        pause() { playing = false; clearTimeout(timer); },
        setSpeed(x) { speed = x; schedule(); },
        goTo(i) { show(i); schedule(); },
        destroy() { playing = false; clearTimeout(timer); },
      };
    },

    image(root, ex, anim) {
      const box = document.createElement('div');
      box.className = 'anim-frames anim-frames--still';
      const img = new Image();
      img.className = 'is-on';
      img.alt = `${ex.name} demonstration`;
      img.decoding = 'async';
      img.addEventListener('load', () => box.style.setProperty('--ar', img.naturalWidth / img.naturalHeight), { once: true });
      img.src = anim.src;
      box.appendChild(img);
      root.appendChild(box);
      return { frameCount: 1, play() {}, pause() {}, setSpeed() {}, goTo() {}, destroy() {} };
    },

    video(root, ex, anim, opts) {
      const v = document.createElement('video');
      v.className = 'anim-media';
      v.src = anim.src;
      if (anim.poster) v.poster = anim.poster;
      v.muted = true; v.loop = true; v.playsInline = true;
      v.setAttribute('aria-label', `${ex.name} demonstration`);
      v.playbackRate = opts.speed || 1;
      root.appendChild(v);
      return {
        frameCount: 1,
        play() { v.play().catch(() => {}); },
        pause() { v.pause(); },
        setSpeed(x) { v.playbackRate = x; },
        goTo() {},
        destroy() { v.pause(); v.removeAttribute('src'); v.load(); },
      };
    },

    placeholder(root) {
      root.insertAdjacentHTML('beforeend', '<div class="anim-placeholder">[Your character animation]</div>');
      return { frameCount: 1, play() {}, pause() {}, setSpeed() {}, goTo() {}, destroy() {} };
    },
  };

  function createAnimation(container, ex, opts = {}) {
    const root = document.createElement('div');
    root.className = 'anim';
    container.appendChild(root);
    const anim = ex.animation;
    const type = anim && renderers[anim.type] ? anim.type : 'placeholder';
    const ctl = renderers[type](root, ex, anim, opts);
    ctl.type = type;
    if (opts.playing) ctl.play();
    activeAnimations.push(ctl);
    return ctl;
  }

  /* ---------- Screen wake lock (keeps the phone awake mid-set) ---------- */
  let wakeLock = null;
  async function keepAwake(on) {
    try {
      if (on && !wakeLock && 'wakeLock' in navigator && document.visibilityState === 'visible') {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => { wakeLock = null; });
      } else if (!on && wakeLock) {
        await wakeLock.release();
        wakeLock = null;
      }
    } catch { wakeLock = null; }
  }

  /* ---------- Landing ---------- */

  // The main categories always show, in this order (even when empty); any other category in the data is added after them.
  function categories() {
    const extra = EXERCISES.map((e) => e.category).filter((c) => c && !CATEGORIES.includes(c));
    return [...CATEGORIES, ...new Set(extra)];
  }

  function card(ex) {
    const n = EXERCISES.indexOf(ex) + 1;
    const t = thumbSrc(ex);
    return `
      <li>
        <a class="ex-card" href="#/exercise/${esc(ex.id)}">
          <div class="ex-card__text">
            <span class="label label--gold">${pad(n)} · ${esc(ex.group)}</span>
            <h3 class="ex-card__name">${esc(ex.name)}</h3>
            ${metaRow(ex)}
          </div>
          <div class="thumb${t ? '' : ' thumb--empty'}">
            ${t ? `<img src="${esc(t)}" alt="" loading="lazy" decoding="async">` : ''}
            <span class="mini-play" aria-hidden="true">${icon('play', 'icon--fill')}</span>
          </div>
        </a>
      </li>`;
  }

  function renderLanding() {
    main.innerHTML = `
      <section class="wrap hero page-enter">
        <div class="hero__copy">
          <p class="label label--gold">The movement library</p>
          <h1 class="hero__title display">Strength,<br><span class="gold">maximized.</span></h1>
          <p class="hero__lead">Clear, animated form guides for the lifts that matter. Open an exercise and follow along between sets.</p>
          <div class="hero__actions">
            <button class="btn btn--gold" type="button" data-browse>Browse exercises</button>
          </div>
        </div>
        <figure class="emblem" aria-hidden="true">
          <span class="emblem__word">Lab</span>
          <span class="emblem__ring"></span>
          <img class="emblem__guy" src="assets/guy/guy-general.webp" alt="" width="785" height="1000" decoding="async">
        </figure>
        <p class="credit">
          <span class="credit__label label label--gold">Created by</span>
          ${CREATOR.split(' ').map((word, k) =>
            `<span class="credit__line"><span class="credit__word" style="--i:${k}">${esc(word)}</span></span>`).join(' ')}
        </p>
      </section>

      <div class="library" id="library">
        ${categories().map((cat, c) => {
          const list = EXERCISES.filter((e) => e.category === cat);
          const headId = `cat-${c + 1}`;
          return `
          <section class="wrap category" aria-labelledby="${headId}">
            <div class="category__head">
              <span class="label label--gold">${pad(c + 1)}</span>
              <h2 class="category__title display" id="${headId}">${esc(cat)}<sup>${list.length}</sup></h2>
            </div>
            <ul class="grid">${list.length ? list.map(card).join('') : '<li class="empty-note">No exercises yet</li>'}</ul>
          </section>`;
        }).join('')}
      </div>`;

    main.querySelector('[data-browse]').addEventListener('click', () => {
      document.getElementById('library').scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
    });

    // Remember where we were in the list so Back lands in the same place.
    const saveScroll = () => store.set('sessionStorage', SCROLL_KEY, String(window.scrollY));
    window.addEventListener('scroll', saveScroll, { passive: true });
    return () => window.removeEventListener('scroll', saveScroll);
  }

  /* ---------- Exercise detail ---------- */

  function renderDetail(ex) {
    const i = EXERCISES.indexOf(ex);
    const total = EXERCISES.length;
    const prev = EXERCISES[(i - 1 + total) % total];
    const next = EXERCISES[(i + 1) % total];
    const savedSpeed = parseFloat(store.get('localStorage', SPEED_KEY));
    let speed = SPEEDS.includes(savedSpeed) ? savedSpeed : 1;
    let playing = !reducedMotion.matches;

    main.innerHTML = `
      <div class="wrap detail page-enter">
        <section class="stage" aria-label="Exercise animation">
          <div class="stage__top">
            <nav class="crumbs label" aria-label="Breadcrumb">
              <a href="#/">Library</a><span class="sep" aria-hidden="true">/</span><span>${esc(ex.category || ex.group)}</span>
            </nav>
            <span class="label" aria-label="Exercise ${i + 1} of ${total}">${pad(i + 1)} / ${pad(total)}</span>
          </div>
          <div class="stage__anim" data-anim></div>
          <div class="stage__bottom">
            <div class="stage__controls">
              <button class="play-circle" type="button" data-play></button>
              <div class="pips" data-pips></div>
            </div>
            <div class="speed" role="group" aria-label="Playback speed">
              ${SPEEDS.map((s) => `<button type="button" data-speed="${s}" aria-pressed="${s === speed}">${s}×</button>`).join('')}
            </div>
          </div>
        </section>

        <div class="title-row">
          <div class="title-row__main">
            <h1 class="detail__title display">${esc(ex.name)}</h1>
            <ul class="pills" aria-label="Details">
              <li class="pill pill--gold">${esc(ex.level)}</li>
              <li class="pill">${esc(ex.equipment)}</li>
              <li class="pill">${esc(ex.group)}</li>
            </ul>
          </div>
          <nav class="pager" aria-label="More exercises">
            <a class="round-btn" href="#/exercise/${esc(prev.id)}" aria-label="Previous: ${esc(prev.name)}">${icon('left')}</a>
            <a class="round-btn" href="#/exercise/${esc(next.id)}" aria-label="Next: ${esc(next.name)}">${icon('right')}</a>
          </nav>
        </div>

        <div class="info">
          <section class="info__col" aria-labelledby="h-overview">
            <h2 class="display" id="h-overview">Overview</h2>
            <p>${esc(ex.description)}</p>
            ${ex.tips && ex.tips.length ? `<ul class="tips">${ex.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
          </section>
          <section class="info__col" aria-labelledby="h-exec">
            <h2 class="display" id="h-exec">Execution</h2>
            <ol class="steps">
              ${(ex.steps || []).map((s, k) => `<li><span class="num" aria-hidden="true">${roman(k + 1)}</span><span>${esc(s)}</span></li>`).join('')}
            </ol>
          </section>
          <section class="info__col info__col--muscles" aria-labelledby="h-muscles">
            <h2 class="display" id="h-muscles">Muscles worked</h2>
            <ul class="muscles">
              ${(ex.muscles || []).map((m) => `
                <li>
                  <div class="muscle__row"><span class="muscle__name">${esc(m.name)}</span><span class="label">${esc(m.role)}</span></div>
                  <div class="bar" aria-hidden="true"><span style="width:${m.role === 'Primary' ? 100 : 55}%"></span></div>
                </li>`).join('')}
            </ul>
          </section>
        </div>
      </div>`;

    const playBtn = main.querySelector('[data-play]');
    const pipsEl = main.querySelector('[data-pips]');

    const ctl = createAnimation(main.querySelector('[data-anim]'), ex, {
      playing,
      speed,
      onFrame(index) {
        pipsEl.querySelectorAll('.pip').forEach((p, k) => p.setAttribute('aria-current', String(k === index)));
      },
    });

    if (ctl.frameCount > 1) {
      pipsEl.innerHTML = Array.from({ length: ctl.frameCount }, (_, k) =>
        `<button class="pip" type="button" data-pip="${k}" aria-label="Show phase ${k + 1} of ${ctl.frameCount}" aria-current="${k === 0}"></button>`).join('');
      pipsEl.addEventListener('click', (e) => {
        const p = e.target.closest('[data-pip]');
        if (!p) return;
        setPlaying(false);
        ctl.goTo(Number(p.dataset.pip));
      });
    }

    // Still images and placeholders have nothing to play, so the controls are hidden.
    const animated = ctl.type === 'frames' || ctl.type === 'video';
    if (!animated) main.querySelector('.stage').classList.add('stage--still');

    function setPlaying(on) {
      playing = on && animated;
      playing ? ctl.play() : ctl.pause();
      playBtn.innerHTML = playing ? icon('pause') : icon('play', 'icon--fill');
      playBtn.setAttribute('aria-label', playing ? 'Pause animation' : 'Play animation');
      keepAwake(playing);
    }
    setPlaying(playing);

    playBtn.addEventListener('click', () => setPlaying(!playing));
    main.querySelector('.speed').addEventListener('click', (e) => {
      const b = e.target.closest('[data-speed]');
      if (!b) return;
      speed = Number(b.dataset.speed);
      store.set('localStorage', SPEED_KEY, String(speed));
      main.querySelectorAll('[data-speed]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      ctl.setSpeed(speed);
    });

    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const onControl = e.target.closest && e.target.closest('button, a, input, textarea, select');
      if (e.key === 'ArrowLeft') location.hash = `#/exercise/${prev.id}`;
      else if (e.key === 'ArrowRight') location.hash = `#/exercise/${next.id}`;
      else if ((e.key === ' ' || e.key === 'k') && !onControl) { e.preventDefault(); setPlaying(!playing); }
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible' && playing) keepAwake(true);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('visibilitychange', onVisible);
      keepAwake(false);
    };
  }

  function renderNotFound() {
    main.innerHTML = `
      <div class="wrap notfound page-enter">
        <p class="label label--gold">Not found</p>
        <h1 class="display">No such exercise.</h1>
        <a class="btn btn--gold" href="#/">Back to the library</a>
      </div>`;
  }

  /* ---------- Router ---------- */

  function route() {
    activeAnimations.forEach((a) => a.destroy());
    activeAnimations = [];
    if (detachPage) { detachPage(); detachPage = null; }

    const hash = location.hash.replace(/^#/, '');
    const m = hash.match(/^\/exercise\/([\w-]+)\/?$/);
    const from = lastRoute;

    if (m) {
      const ex = EXERCISES.find((e) => e.id === m[1]);
      if (ex) {
        detachPage = renderDetail(ex);
        document.title = `${ex.name} · Muscle Lab`;
      } else {
        renderNotFound();
        document.title = 'Not found · Muscle Lab';
      }
      fab.hidden = false;
      window.scrollTo(0, 0);
      if (from !== null) main.focus({ preventScroll: true });
      lastRoute = 'detail';
    } else {
      const savedY = Number(store.get('sessionStorage', SCROLL_KEY)) || 0;
      detachPage = renderLanding();
      document.title = 'Muscle Lab';
      fab.hidden = true;
      // Home buttons go to the top; browser Back returns to where you were in the list.
      const y = from === 'detail' && !goingHome ? savedY : 0;
      window.scrollTo(0, y);
      store.set('sessionStorage', SCROLL_KEY, String(y));
      lastRoute = 'landing';
    }
    goingHome = false;
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href="#/"]');
    if (!a) return;
    goingHome = true;
    if (location.hash === '#/' || location.hash === '') {
      // Already home — just go back to the top.
      e.preventDefault();
      goingHome = false;
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }
  });

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.addEventListener('hashchange', route);
  document.documentElement.dataset.version = APP_VERSION;
  route();
})();
