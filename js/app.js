/* Muscle Lab — app logic. Exercise data lives in data/exercises.js. */
(function () {
  'use strict';

  const APP_VERSION = '1.2';   // shown in the footer; bump with each release (1.1, 1.2, ...)
  const CREATOR = 'Assaf Hovevei Sion';
  const EXERCISES = Array.isArray(window.EXERCISES) ? window.EXERCISES : [];
  const CATEGORIES = ['Home Basics', 'Core Muscles', 'Extra Home Strength'];
  // Optional line under a category title. Text after the first ". " is shown in gold.
  // icon: 'pulse' (beating heart-rate line) or 'counter' (counts 1–10 three times, lighting a set marker each time).
  const CATEGORY_TAGLINES = {
    'Home Basics': { text: '3 × 10. Simple, steady, strong.', icon: 'counter' },
    'Core Muscles': { text: 'No counting. Just go until you drop.', icon: 'pulse' },
  };
  // Optional source video shown as a card under a category's tagline (opens YouTube in a new tab).
  const CATEGORY_SOURCES = {
    'Core Muscles': {
      url: 'https://www.youtube.com/watch?v=3p8EBPVZ2Iw&list=PLvHNgehwYnWKeOIq03SLrHG-rtSEvMJ-g&index=32',
      title: '6 Pack Abs For Beginners You Can Do Anywhere',
      channel: 'THENX',
      thumb: 'https://i.ytimg.com/vi/3p8EBPVZ2Iw/hqdefault.jpg',
    },
    'Extra Home Strength': {
      url: 'https://www.youtube.com/watch?v=WauhJpdZh5A&list=PLvHNgehwYnWKeOIq03SLrHG-rtSEvMJ-g&index=33',
      title: 'Ten Great Bench & Dumbbell Exercises',
      channel: 'Rob Riches',
      thumb: 'https://i.ytimg.com/vi/WauhJpdZh5A/hqdefault.jpg',
    },
  };
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

  // The difficulty level is kept in the data but no longer shown (the user removed it).
  function metaRow(ex) {
    return `<span class="meta">${esc(ex.equipment)}</span>`;
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

  function sourceCard(cat) {
    const src = CATEGORY_SOURCES[cat];
    if (!src) return '';
    return `
      <a class="source" href="${esc(src.url)}" target="_blank" rel="noopener noreferrer"
         aria-label="Watch the source video on YouTube: ${esc(src.title)} by ${esc(src.channel)} (opens in a new tab)">
        <span class="source__thumb">
          <img src="${esc(src.thumb)}" alt="" loading="lazy" decoding="async" onerror="this.remove()">
          <span class="source__play" aria-hidden="true">${icon('play', 'icon--fill')}</span>
        </span>
        <span class="source__body">
          <span class="label label--gold">Source · Video</span>
          <span class="source__title">${esc(src.title)}</span>
          <span class="source__meta">${esc(src.channel)} · YouTube</span>
        </span>
        <span class="source__go" aria-hidden="true">${icon('right')}</span>
      </a>`;
  }

  function tagline(cat) {
    const cfg = CATEGORY_TAGLINES[cat];
    if (!cfg) return '';
    const { text, icon } = cfg;
    const cut = text.indexOf('. ');
    const lead = cut < 0 ? text : text.slice(0, cut + 1);
    const rest = cut < 0 ? '' : text.slice(cut + 2);
    const art = icon === 'counter'
      ? `<span class="tagline__counter" aria-hidden="true"><b class="tagline__rep">10</b><span class="tagline__sets"><i></i><i></i><i></i></span></span>`
      : `<svg class="tagline__pulse" viewBox="0 0 64 24" aria-hidden="true"><path d="M0 12h18l4-7 6 14 5-11 3 4h28"/></svg>`;
    return `
      <p class="tagline tagline--${icon}">
        ${art}
        <span class="tagline__text">${esc(lead)}${rest ? ` <span class="gold">${esc(rest)}</span>` : ''}</span>
      </p>`;
  }

  // Rep counter: 1→10, light a set marker, three sets, short rest, repeat. Returns a stop function.
  function runCounter(el) {
    const rep = el.querySelector('.tagline__rep');
    const sets = [...el.querySelectorAll('.tagline__sets i')];
    if (reducedMotion.matches) { rep.textContent = '10'; sets.forEach((d) => d.classList.add('on')); return () => {}; }
    let n = 0, set = 0, timer = null;
    const tick = () => {
      if (set === 3) {                          // all three sets done: rest, then start over
        set = 0; n = 0; sets.forEach((d) => d.classList.remove('on'));
        rep.textContent = '0'; timer = setTimeout(tick, 900); return;
      }
      n += 1;
      rep.textContent = String(n);
      rep.classList.remove('bump'); void rep.offsetWidth; rep.classList.add('bump');
      if (n === 10) {                           // set complete
        sets[set].classList.add('on'); set += 1; n = 0;
        timer = setTimeout(tick, set === 3 ? 1800 : 900); return;
      }
      timer = setTimeout(tick, 170);
    };
    rep.textContent = '0';
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }

  // Exercises are numbered within their own category (01, 02, ... per section).
  function positionInCategory(ex) {
    const list = EXERCISES.filter((e) => e.category === ex.category);
    return { index: list.indexOf(ex) + 1, count: list.length };
  }

  function card(ex) {
    const n = positionInCategory(ex).index;
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
          <span class="emblem__word">Assaf</span>
          <span class="emblem__ring"></span>
          <img class="emblem__guy" src="assets/guy/guy-general.webp?v=3" alt="" width="785" height="1000" decoding="async">
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
              <span class="category__num" aria-hidden="true">${pad(c + 1)}</span>
              <div>
                <p class="category__meta">Section ${pad(c + 1)} · ${list.length} ${list.length === 1 ? 'exercise' : 'exercises'}</p>
                <h2 class="category__title display" id="${headId}">${esc(cat)}</h2>
              </div>
            </div>
            ${tagline(cat)}
            ${sourceCard(cat)}
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
    // Taglines play their entrance when they scroll into view.
    let seen = null;
    const stops = [];
    const reveal = (t) => {
      t.classList.add('is-in');
      if (t.classList.contains('tagline--counter')) stops.push(runCounter(t));
    };
    if ('IntersectionObserver' in window) {
      seen = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { reveal(en.target); seen.unobserve(en.target); }
      }), { threshold: 0.6 });
      main.querySelectorAll('.tagline').forEach((t) => seen.observe(t));
    } else {
      main.querySelectorAll('.tagline').forEach(reveal);
    }
    return () => {
      window.removeEventListener('scroll', saveScroll);
      if (seen) seen.disconnect();
      stops.forEach((stop) => stop());
    };
  }

  /* ---------- Exercise detail ---------- */

  function renderDetail(ex) {
    const pos = positionInCategory(ex);
    // Previous/next stay inside the exercise's own category and wrap around at the ends.
    const catList = EXERCISES.filter((e) => e.category === ex.category);
    const ci = catList.indexOf(ex);
    const prev = catList[(ci - 1 + catList.length) % catList.length];
    const next = catList[(ci + 1) % catList.length];
    const hasSiblings = catList.length > 1;
    let speed = 1;   // speed controls were removed; animations always play at normal speed
    let playing = !reducedMotion.matches;

    main.innerHTML = `
      <div class="wrap detail page-enter">
        <section class="stage" aria-label="Exercise animation">
          <div class="stage__top">
            <nav class="crumbs label" aria-label="Breadcrumb">
              <a href="#/">Library</a><span class="sep" aria-hidden="true">/</span><span>${esc(ex.category || ex.group)}</span>
            </nav>
            <span class="label" aria-label="Exercise ${pos.index} of ${pos.count} in ${esc(ex.category || ex.group)}">${pad(pos.index)} / ${pad(pos.count)}</span>
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
              <li class="pill">${esc(ex.equipment)}</li>
              <li class="pill">${esc(ex.group)}</li>
            </ul>
          </div>
          ${hasSiblings ? `<nav class="pager" aria-label="More exercises in ${esc(ex.category)}">
            <a class="round-btn" href="#/exercise/${esc(prev.id)}" aria-label="Previous in ${esc(ex.category)}: ${esc(prev.name)}">${icon('left')}</a>
            <a class="round-btn" href="#/exercise/${esc(next.id)}" aria-label="Next in ${esc(ex.category)}: ${esc(next.name)}">${icon('right')}</a>
          </nav>` : ''}
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
        ${ex.muscleMap ? `
        <section class="muscle-map" aria-labelledby="h-map">
          <h2 class="display" id="h-map">Muscle map</h2>
          <figure class="muscle-map__figure">
            <img src="${esc(ex.muscleMap)}" alt="${esc(ex.name)} with the working muscles highlighted: ${esc((ex.muscles || []).map((m) => `${m.name} (${m.role.toLowerCase()})`).join(', '))}" loading="lazy" decoding="async">
            <figcaption><span class="muscle-map__key muscle-map__key--primary">Primary</span><span class="muscle-map__key muscle-map__key--secondary">Secondary</span></figcaption>
          </figure>
        </section>` : ''}
        ${hasSiblings ? `
        <nav class="step-nav" aria-label="Move between ${esc(ex.category)} exercises">
          <a class="step-nav__link step-nav__link--prev" href="#/exercise/${esc(prev.id)}">
            <span class="step-nav__icon" aria-hidden="true">${icon('left')}</span>
            <span class="step-nav__text"><span class="label">Previous</span><span class="step-nav__name">${esc(prev.name)}</span></span>
          </a>
          <a class="step-nav__link step-nav__link--next" href="#/exercise/${esc(next.id)}">
            <span class="step-nav__text"><span class="label">Next</span><span class="step-nav__name">${esc(next.name)}</span></span>
            <span class="step-nav__icon" aria-hidden="true">${icon('right')}</span>
          </a>
        </nav>` : ''}
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
      if (hasSiblings && e.key === 'ArrowLeft') location.hash = `#/exercise/${prev.id}`;
      else if (hasSiblings && e.key === 'ArrowRight') location.hash = `#/exercise/${next.id}`;
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
  document.querySelectorAll('.site-footer__version').forEach((el) => { el.textContent = `Version ${APP_VERSION}`; });
  route();
})();
