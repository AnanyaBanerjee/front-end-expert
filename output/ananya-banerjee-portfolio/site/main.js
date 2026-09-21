(() => {
  'use strict';
// ─── EDIT ME: the "Currently" board on the homepage ─────────────────
const NOW = {
  updated: 'Updated September 2026',
  items: [
    ['Building',       'New consumer products and experiments'],
    ['Thinking about', 'AI agents, harness engineering and human-agent interaction'],
    ['Writing about',  'What actually happens between idea → shipped product'],
    ['Watching',       'Something from my current Asian-drama list'],
    ['Learning',       'Whatever I\'m actively exploring this month'],
  ],
};
// ────────────────────────────────────────────────────────────────────

  document.documentElement.classList.add('js');
  document.querySelectorAll('[data-year]').forEach(node => {
    node.textContent = String(new Date().getFullYear());
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');


  // render the Currently board from the NOW data above
  const board = document.getElementById('now-board');
  if (board) {
    board.innerHTML = NOW.items.map(([dt, dd]) =>
      `<div><dt>${dt}</dt><dd>${dd}</dd></div>`).join('');
    const upd = document.getElementById('now-updated');
    if (upd) upd.textContent = NOW.updated;
  }

  // mobile menu
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  function closeMenu() {
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', 'Open navigation');
    nav?.classList.remove('is-open');
  }
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', open);
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
  });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeMenu(); });

  // video preview: play on hover/focus of its spread, pause otherwise
  document.querySelectorAll('.spread').forEach(spread => {
    const video = spread.querySelector('video');
    if (!video) return;
    const play = () => { if (!reducedMotion.matches && !document.hidden) video.play().catch(() => {}); };
    const stop = () => video.pause();
    spread.addEventListener('pointerenter', play);
    spread.addEventListener('pointerleave', stop);
    spread.addEventListener('focusin', play);
    spread.addEventListener('focusout', e => { if (!spread.contains(e.relatedTarget)) stop(); });
  });
  const pauseVideos = () => document.querySelectorAll('video').forEach(v => v.pause());
  document.addEventListener('visibilitychange', pauseVideos);
  reducedMotion.addEventListener('change', pauseVideos);

  // touch devices have no hover: play video + show drama bubbles while the spread is in view
  const noHover = window.matchMedia('(hover: none)');
  if (noHover.matches && 'IntersectionObserver' in window && !reducedMotion.matches) {
    const vio = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const spread = entry.target;
        spread.classList.toggle('in-view-touch', entry.isIntersecting);
        const video = spread.querySelector('video');
        if (!video) return;
        if (entry.isIntersecting && !document.hidden) video.play().catch(() => {});
        else video.pause();
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.spread').forEach(s => {
      if (s.querySelector('video') || s.querySelector('.bubble')) vio.observe(s);
    });
  }

  // scroll reveal
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('in-view'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
  }
})();
