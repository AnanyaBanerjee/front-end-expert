(function () {
  'use strict';

  // ─── Theme persistence (applies on every page) ───
  var THEME_KEY = 'te.theme';
  var VALID_THEMES = ['forest', 'ocean', 'mountain', 'snow'];
  function applyTheme(t) {
    if (VALID_THEMES.indexOf(t) === -1) t = 'forest';
    document.body.setAttribute('data-theme', t);
    return t;
  }
  function loadTheme() {
    try {
      var t = localStorage.getItem(THEME_KEY);
      if (t && VALID_THEMES.indexOf(t) !== -1) return t;
    } catch (e) {}
    return 'forest';
  }
  function persistTheme(t) {
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
  }
  var currentTheme = applyTheme(loadTheme());

  // Year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth-scroll
  document.querySelectorAll('[data-scroll]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var target = document.querySelector(btn.getAttribute('data-scroll'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Mobile drawer
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  var scrim = document.getElementById('drawerScrim');
  var drawerClose = document.getElementById('drawerClose');
  function openDrawer() {
    drawer.classList.add('open');
    scrim.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    scrim.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (burger && drawer && scrim && drawerClose) {
    burger.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);
    scrim.addEventListener('click', closeDrawer);
    document.querySelectorAll('[data-drawer-close]').forEach(function (el) {
      el.addEventListener('click', closeDrawer);
    });
  }

  // World tabs in Worlds section — delegate to setTheme so wheel + board stay in sync
  var tabs = document.querySelectorAll('.world-tab');
  var panels = document.querySelectorAll('.world-panel');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      setTheme(tab.getAttribute('data-world'));
    });
  });

  function switchWorldPanel(world) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-world') === world;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panels.forEach(function (p) {
      var match = p.getAttribute('data-world') === world;
      p.classList.toggle('active', match);
      if (match) p.removeAttribute('hidden'); else p.setAttribute('hidden', '');
    });
  }

  // Scroll reveals
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
  }

  // Web3Forms
  function bindForm(formId, successId) {
    var form = document.getElementById(formId);
    var ok = document.getElementById(successId);
    if (!form || !ok) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var accessKey = form.querySelector('input[name="access_key"]').value;
      if (!accessKey || accessKey.indexOf('REPLACE') === 0) {
        ok.textContent = '✦ Thanks. (Set up Web3Forms to receive emails.)';
        ok.classList.add('show');
        form.reset();
        return;
      }
      var formData = new FormData(form);
      fetch(form.action, { method: 'POST', body: formData })
        .then(function (res) {
          if (res.ok) { form.style.display = 'none'; ok.classList.add('show'); }
          else { ok.textContent = '✦ Something went wrong. Please try again.'; ok.classList.add('show'); }
        })
        .catch(function () {
          ok.textContent = '✦ Something went wrong. Please try again.';
          ok.classList.add('show');
        });
    });
  }
  bindForm('notify-hero', 'hero-success');
  bindForm('notify-final', 'final-success');

  // Enhanced animations
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var scrollProgress = document.getElementById('scrollProgress');
  function updateProgress() {
    if (!scrollProgress) return;
    var scrolled = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = max > 0 ? (scrolled / max * 100) + '%' : '0%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  if (!reducedMotion) {
    var glyphField = document.getElementById('glyphField');
    if (glyphField) {
      var glyphs = ['✦', '✧', '◆', '◇', '✷', '☆', '◈', '✶'];
      var spawnGlyph = function () {
        if (document.hidden) return;
        var g = document.createElement('span');
        g.className = 'glyph';
        g.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
        g.style.left = (Math.random() * 100) + '%';
        g.style.fontSize = (16 + Math.random() * 28) + 'px';
        var dur = 14 + Math.random() * 14;
        g.style.animationDuration = dur + 's';
        g.style.animationDelay = (Math.random() * -dur) + 's';
        g.style.opacity = (0.4 + Math.random() * 0.6).toFixed(2);
        glyphField.appendChild(g);
        setTimeout(function () { g.remove(); }, dur * 1000 + 400);
      };
      for (var i = 0; i < 8; i++) setTimeout(spawnGlyph, i * 600);
      setInterval(spawnGlyph, 1800);
    }
  }

  if (!reducedMotion) {
    document.querySelectorAll('.nav__cta, .hero__form button, .drawer__cta, .play__cta').forEach(function (btn) {
      btn.classList.add('magnet');
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + (x * 0.18) + 'px, ' + (y * 0.18) + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });
  }

  function animateCounter(el, target) {
    if (reducedMotion) { el.textContent = target; return; }
    if (target.indexOf('/') !== -1) { el.textContent = target; return; }
    var num = parseInt(target, 10);
    if (isNaN(num)) { el.textContent = target; return; }
    var duration = 1100;
    var start = performance.now();
    function tick(now) {
      var t = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(num * eased).toString();
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = el.dataset.target || el.textContent;
          if (!el.dataset.target) el.dataset.target = target;
          animateCounter(el, target);
          cio.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.stat-card__num').forEach(function (el) { cio.observe(el); });
  }

  // ─── World background (all pages) ───
  var worldBgEl = document.getElementById('worldBg');
  function _updateWorldBg(themeKey) {
    if (!worldBgEl) return;
    var newSrc = 'game-assets/world-bgs/' + themeKey + '.png';
    if (worldBgEl.dataset.current === themeKey) return;
    worldBgEl.classList.remove('loaded');
    var img = new Image();
    img.onload = function () {
      worldBgEl.style.backgroundImage = "url('" + newSrc + "')";
      worldBgEl.dataset.current = themeKey;
      requestAnimationFrame(function () { worldBgEl.classList.add('loaded'); });
    };
    img.src = newSrc;
  }
  _updateWorldBg(currentTheme);

  // ─────────────── PLAYABLE MINI-LEVEL ───────────────
  var board = document.getElementById('playBoard');
  if (!board) return;

  var THEMES = {
    forest: {
      name: 'Forest',
      tiles: ['forest1','forest2','forest3','forest4'],
      // Full 4×4 square — 16 tiles
      shape: {'0,0':1,'0,1':1,'0,2':1,'0,3':1,'1,0':1,'1,1':1,'1,2':1,'1,3':1,'2,0':1,'2,1':1,'2,2':1,'2,3':1,'3,0':1,'3,1':1,'3,2':1,'3,3':1},
      hint: 'Two tiles move freely. Find the clear paths and unlock the chain.',
      level: [
        { id: 't1',  row: 0, col: 0, dir: 'W'  },
        { id: 't2',  row: 0, col: 1, dir: 'S'  },
        { id: 't3',  row: 0, col: 2, dir: 'SE' },
        { id: 't4',  row: 0, col: 3, dir: 'N'  },
        { id: 't5',  row: 1, col: 0, dir: 'NE' },
        { id: 't6',  row: 1, col: 1, dir: 'NW' },
        { id: 't7',  row: 1, col: 2, dir: 'NE' },
        { id: 't8',  row: 1, col: 3, dir: 'N'  },
        { id: 't9',  row: 2, col: 0, dir: 'NE' },
        { id: 't10', row: 2, col: 1, dir: 'W'  },
        { id: 't11', row: 2, col: 2, dir: 'NW' },
        { id: 't12', row: 2, col: 3, dir: 'N'  },
        { id: 't13', row: 3, col: 0, dir: 'NE' },
        { id: 't14', row: 3, col: 1, dir: 'NW' },
        { id: 't15', row: 3, col: 2, dir: 'N'  },
        { id: 't16', row: 3, col: 3, dir: 'NW' }
      ]
    },
    ocean: {
      name: 'Ocean',
      tiles: ['ocean1','ocean2','ocean3','ocean4'],
      // Plus/cross — 4×4 without corners (12 tiles)
      shape: {'0,1':1,'0,2':1,'1,0':1,'1,1':1,'1,2':1,'1,3':1,'2,0':1,'2,1':1,'2,2':1,'2,3':1,'3,1':1,'3,2':1},
      hint: 'A tidal cross. Four tiles escape freely — find the right order.',
      level: [
        { id: 't1',  row: 0, col: 1, dir: 'N'  },
        { id: 't2',  row: 0, col: 2, dir: 'E'  },
        { id: 't3',  row: 1, col: 0, dir: 'W'  },
        { id: 't4',  row: 1, col: 1, dir: 'NE' },
        { id: 't5',  row: 1, col: 2, dir: 'N'  },
        { id: 't6',  row: 1, col: 3, dir: 'NW' },
        { id: 't7',  row: 2, col: 0, dir: 'N'  },
        { id: 't8',  row: 2, col: 1, dir: 'NW' },
        { id: 't9',  row: 2, col: 2, dir: 'NE' },
        { id: 't10', row: 2, col: 3, dir: 'S'  },
        { id: 't11', row: 3, col: 1, dir: 'NE' },
        { id: 't12', row: 3, col: 2, dir: 'NW' }
      ]
    },
    mountain: {
      name: 'Mountain',
      tiles: ['mountain1','mountain2','mountain3','mountain4'],
      // Descending staircase — top-heavy triangle (10 tiles)
      shape: {'0,0':1,'0,1':1,'0,2':1,'0,3':1,'1,0':1,'1,1':1,'1,2':1,'2,0':1,'2,1':1,'3,0':1},
      hint: 'A mountain staircase. Five paths open from the peak — work down.',
      level: [
        { id: 't1',  row: 0, col: 0, dir: 'S'  },
        { id: 't2',  row: 0, col: 1, dir: 'E'  },
        { id: 't3',  row: 0, col: 2, dir: 'E'  },
        { id: 't4',  row: 0, col: 3, dir: 'S'  },
        { id: 't5',  row: 1, col: 0, dir: 'E'  },
        { id: 't6',  row: 1, col: 1, dir: 'SE' },
        { id: 't7',  row: 1, col: 2, dir: 'S'  },
        { id: 't8',  row: 2, col: 0, dir: 'S'  },
        { id: 't9',  row: 2, col: 1, dir: 'S'  },
        { id: 't10', row: 3, col: 0, dir: 'E'  }
      ]
    },
    snow: {
      name: 'Snow',
      tiles: ['snow1','snow2','snow3','snow4'],
      // Hollow frame — outer ring, no center 2×2 (12 tiles)
      shape: {'0,0':1,'0,1':1,'0,2':1,'0,3':1,'1,0':1,'1,3':1,'2,0':1,'2,3':1,'3,0':1,'3,1':1,'3,2':1,'3,3':1},
      hint: 'A snowflake ring. Six tiles are free — clear the frame.',
      level: [
        { id: 't1',  row: 0, col: 0, dir: 'N'  },
        { id: 't2',  row: 0, col: 1, dir: 'N'  },
        { id: 't3',  row: 0, col: 2, dir: 'N'  },
        { id: 't4',  row: 0, col: 3, dir: 'E'  },
        { id: 't5',  row: 1, col: 0, dir: 'NE' },
        { id: 't6',  row: 1, col: 3, dir: 'W'  },
        { id: 't7',  row: 2, col: 0, dir: 'SE' },
        { id: 't8',  row: 2, col: 3, dir: 'NW' },
        { id: 't9',  row: 3, col: 0, dir: 'S'  },
        { id: 't10', row: 3, col: 1, dir: 'S'  },
        { id: 't11', row: 3, col: 2, dir: 'S'  },
        { id: 't12', row: 3, col: 3, dir: 'W'  }
      ]
    }
  };
  var DIR_ORDER = ['N','NE','E','SE','S','SW','W','NW'];
  var DIRS = {
    N:  { dr: -1, dc:  0, deg: -90 },
    NE: { dr: -1, dc:  1, deg: -45 },
    E:  { dr:  0, dc:  1, deg:   0 },
    SE: { dr:  1, dc:  1, deg:  45 },
    S:  { dr:  1, dc:  0, deg:  90 },
    SW: { dr:  1, dc: -1, deg: 135 },
    W:  { dr:  0, dc: -1, deg: 180 },
    NW: { dr: -1, dc: -1, deg: -135 }
  };
  function rotateCW(dir) {
    var i = DIR_ORDER.indexOf(dir);
    return DIR_ORDER[(i + 1) % 8];
  }

  var BOARD = 4;

  var device = document.getElementById('playDevice');
  var hintEl = document.getElementById('playHint');
  var tapsEl = document.getElementById('playTaps');
  var winScreenEl = document.getElementById('playWinScreen');
  var crackEl = document.getElementById('playCrack');
  var pointsNumEl = document.getElementById('playPointsNum');
  var winMsgEl = document.getElementById('playWinMsg');
  var resetBtn = document.getElementById('playReset');
  var themeNameEl = document.getElementById('themeName');
  var themeSubHintEl = document.getElementById('themeSubHint');

  // Tool state
  var TOOL_INITIAL = { undo: 2, rotate: 2 };
  var toolUses = Object.assign({}, TOOL_INITIAL);
  var armedTool = null;            // 'rotate' or null
  var history = [];                // stack of { type, data } for undo
  var undoBtn = document.getElementById('toolUndo');
  var rotateBtn = document.getElementById('toolRotate');
  var undoPill = document.getElementById('toolUndoPill');
  var rotatePill = document.getElementById('toolRotatePill');

  var tiles = [];
  var taps = 0;
  var isResetting = false;

  function isTappable(tile) {
    var v = DIRS[tile.dir];
    var r = tile.row + v.dr, c = tile.col + v.dc;
    while (r >= 0 && r < BOARD && c >= 0 && c < BOARD) {
      var blocker = tiles.find(function (t) { return t.row === r && t.col === c && !t.escaped; });
      if (blocker) return false;
      r += v.dr; c += v.dc;
    }
    return true;
  }

  function pos(row, col) {
    var step = 100 / BOARD;
    return { left: (col * step) + '%', top: (row * step) + '%' };
  }

  function buildEmptyCell(row, col) {
    var cell = document.createElement('div');
    cell.className = 'play-cell';
    var p = pos(row, col);
    cell.style.left = p.left;
    cell.style.top = p.top;
    var shape = document.createElement('div');
    shape.className = 'play-cell__shape';
    cell.appendChild(shape);
    return cell;
  }

  function buildTile(tile, themeKey) {
    var el = document.createElement('div');
    el.className = 'play-tile';
    el.dataset.id = tile.id;
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', 'Arrow tile pointing ' + tile.dir);
    var p = pos(tile.row, tile.col);
    el.style.left = p.left;
    el.style.top = p.top;

    var tileArts = THEMES[themeKey].tiles;
    var idx = parseInt(tile.id.replace('t', ''), 10) - 1;
    var art = tileArts[idx % tileArts.length];

    var img = document.createElement('img');
    img.className = 'play-tile__img';
    img.src = 'game-assets/tiles/' + art + '.png';
    img.alt = '';
    img.draggable = false;
    el.appendChild(img);

    var arrowWrap = document.createElement('div');
    arrowWrap.className = 'play-tile__arrow';
    arrowWrap.innerHTML = '<svg viewBox="0 0 48 48" aria-hidden="true">' +
      '<g transform="rotate(' + DIRS[tile.dir].deg + ' 24 24)">' +
      '<path d="M 8 24 L 36 24 M 28 14 L 38 24 L 28 34" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
      '</g></svg>';
    el.appendChild(arrowWrap);
    return el;
  }

  function renderBoard() {
    board.innerHTML = '';
    var shape = THEMES[currentTheme].shape;
    for (var r = 0; r < BOARD; r++) {
      for (var c = 0; c < BOARD; c++) {
        if (!shape[r + ',' + c]) continue;
        var occupied = tiles.find(function (t) { return t.row === r && t.col === c && !t.escaped; });
        if (!occupied) board.appendChild(buildEmptyCell(r, c));
      }
    }
    tiles.forEach(function (tile) {
      if (tile.escaped) return;
      var el = buildTile(tile, currentTheme);
      if (armedTool === 'rotate') {
        el.classList.add('is-rotate-target');
      } else if (isTappable(tile)) {
        el.classList.add('is-tappable');
      }
      el.addEventListener('click', function () { onTileClick(tile.id); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onTileClick(tile.id);
        }
      });
      board.appendChild(el);
    });
  }

  function vibrate(pattern) {
    if (reducedMotion) return;
    if (navigator.vibrate) { try { navigator.vibrate(pattern); } catch (e) {} }
  }

  function setHint(msg, mode) {
    hintEl.textContent = msg;
    hintEl.classList.remove('is-warn', 'is-win');
    if (mode === 'warn') hintEl.classList.add('is-warn');
    if (mode === 'win') hintEl.classList.add('is-win');
  }

  function spawnConfetti() {
    if (reducedMotion) return;
    var colors = ['#d4af37', '#f0c97c', '#6ee7a7', '#38bdf8', '#93c5fd', '#f59e0b'];
    var rect = board.getBoundingClientRect();
    for (var i = 0; i < 26; i++) {
      var piece = document.createElement('span');
      piece.className = 'confetti';
      piece.style.background = colors[i % colors.length];
      piece.style.left = (rect.width / 2 - 4) + 'px';
      piece.style.top = (rect.height / 2 - 6) + 'px';
      piece.style.position = 'absolute';
      board.appendChild(piece);
      var angle = Math.random() * Math.PI * 2;
      var distance = 90 + Math.random() * 100;
      var dx = Math.cos(angle) * distance;
      var dy = Math.sin(angle) * distance;
      var rot = (Math.random() * 720 - 360) + 'deg';
      var dur = 900 + Math.random() * 700;
      piece.animate([
        { transform: 'translate(0,0) rotate(0)', opacity: 1 },
        { transform: 'translate(' + dx + 'px, ' + dy + 'px) rotate(' + rot + ')', opacity: 0 }
      ], { duration: dur, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
      (function (p, d) { setTimeout(function () { p.remove(); }, d + 80); })(piece, dur);
    }
  }

  // ─── Crack animation config per world ───
  var CRACK_CFG = {
    forest:   { glow: 'rgba(35,200,70,0.96)',   dust: ['rgba(130,245,135,0.95)','rgba(255,255,255,0.78)','rgba(45,150,70,0.72)'],    particle: '🍃', currency: 'Spirit Seeds',   amount: 120 },
    ocean:    { glow: 'rgba(40,150,235,0.96)',   dust: ['rgba(120,220,255,0.95)','rgba(255,255,255,0.9)','rgba(42,140,235,0.7)'],    particle: '🫧', currency: 'Moon Pearls',    amount: 100 },
    mountain: { glow: 'rgba(230,120,30,0.96)',   dust: ['rgba(255,198,112,0.95)','rgba(255,255,255,0.78)','rgba(165,85,30,0.72)'],   particle: '✨', currency: 'Sun Runes',     amount: 80  },
    snow:     { glow: 'rgba(165,190,250,0.96)',  dust: ['rgba(215,235,255,0.98)','rgba(255,255,255,0.95)','rgba(145,175,245,0.72)'], particle: '❄️', currency: 'Aurora Shards', amount: 90  }
  };

  function _buildCrackPath(svg, x1, y1, x2, y2, color, strokeWidth, opacityVal) {
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    var midX = (x1 + x2) / 2 + (Math.random() - 0.5) * 18;
    var midY = (y1 + y2) / 2 + (Math.random() - 0.5) * 8;
    p.setAttribute('d', 'M ' + x1 + ',' + y1 + ' Q ' + midX + ',' + midY + ' ' + x2 + ',' + y2);
    p.setAttribute('stroke', color);
    p.setAttribute('stroke-width', String(strokeWidth));
    p.setAttribute('fill', 'none');
    p.setAttribute('opacity', String(opacityVal));
    p.setAttribute('stroke-linecap', 'round');
    var len = 200;
    try { len = p.getTotalLength(); } catch (e) {}
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
    svg.appendChild(p);
    return p;
  }

  function _animateDash(pathEl, duration) {
    pathEl.style.transition = 'stroke-dashoffset ' + duration + 'ms ease-out';
    requestAnimationFrame(function () { pathEl.style.strokeDashoffset = '0'; });
  }

  function _spawnDust(container, bLeft, bTop, bW, bH, cfg) {
    for (var i = 0; i < 22; i++) {
      (function () {
        var dot = document.createElement('div');
        var sz = 2 + Math.random() * 5;
        dot.style.cssText = [
          'position:absolute;border-radius:50%;pointer-events:none;',
          'left:' + (bLeft + Math.random() * bW) + 'px;',
          'top:' + (bTop + Math.random() * bH) + 'px;',
          'width:' + sz + 'px;height:' + sz + 'px;',
          'background:' + cfg.dust[Math.floor(Math.random() * cfg.dust.length)] + ';',
        ].join('');
        container.appendChild(dot);
        var dx = (Math.random() - 0.5) * 90;
        var dy = -30 - Math.random() * 90;
        var dur = 500 + Math.random() * 800;
        if (dot.animate) {
          dot.animate(
            [{ transform: 'translate(0,0) scale(1)', opacity: 0.9 },
             { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(0)', opacity: 0 }],
            { duration: dur, easing: 'ease-out', fill: 'forwards' }
          );
        }
        setTimeout(function () { dot.remove(); }, dur + 60);
      })();
    }
  }

  function _spawnFragments(container, bLeft, bTop, bW, bH, cfg) {
    for (var i = 0; i < 18; i++) {
      (function () {
        var frag = document.createElement('div');
        var sz = 4 + Math.random() * 9;
        frag.style.cssText = [
          'position:absolute;pointer-events:none;',
          'left:' + (bLeft + Math.random() * bW) + 'px;',
          'top:' + (bTop + Math.random() * bH) + 'px;',
          'width:' + sz + 'px;height:' + sz + 'px;',
          'background:' + cfg.dust[Math.floor(Math.random() * cfg.dust.length)] + ';',
          'border-radius:2px;',
          'transform:rotate(' + Math.random() * 360 + 'deg);',
        ].join('');
        container.appendChild(frag);
        var dx = (Math.random() - 0.5) * 130;
        var dy = (Math.random() - 0.5) * 130;
        var rot = (Math.random() * 540 - 270) + 'deg';
        var dur = 600 + Math.random() * 700;
        if (frag.animate) {
          frag.animate(
            [{ transform: 'translate(0,0) rotate(0) scale(1)', opacity: 1 },
             { transform: 'translate(' + dx + 'px,' + dy + 'px) rotate(' + rot + ') scale(0.2)', opacity: 0 }],
            { duration: dur, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' }
          );
        }
        setTimeout(function () { frag.remove(); }, dur + 60);
      })();
    }
  }

  function _createSplitPanel(left, top, w, h, half, cfg) {
    var panel = document.createElement('div');
    panel.style.cssText = [
      'position:absolute;pointer-events:none;',
      'left:' + left + 'px;top:' + top + 'px;',
      'width:' + w + 'px;height:' + h + 'px;',
      half === 'top'
        ? 'border-radius:8px 8px 0 0;background:linear-gradient(to bottom,rgba(20,40,28,0.85) 0%,rgba(8,18,12,0.92) 100%);'
        : 'border-radius:0 0 8px 8px;background:linear-gradient(to top,rgba(20,40,28,0.85) 0%,rgba(8,18,12,0.92) 100%);',
      'transform-style:preserve-3d;will-change:transform;overflow:hidden;',
    ].join('');
    var glow = document.createElement('div');
    glow.style.cssText = [
      'position:absolute;left:0;right:0;height:2px;',
      half === 'top' ? 'bottom:0;' : 'top:0;',
      'background:linear-gradient(90deg,transparent 0%,' + cfg.glow + ' 40%,' + cfg.glow + ' 60%,transparent 100%);',
      'box-shadow:0 0 12px ' + cfg.glow + ';',
    ].join('');
    panel.appendChild(glow);
    return panel;
  }

  function _spawnAmbientParticles(container, cfg) {
    for (var i = 0; i < 12; i++) {
      (function (idx) {
        setTimeout(function () {
          var p = document.createElement('span');
          p.textContent = cfg.particle;
          p.style.cssText = [
            'position:absolute;pointer-events:none;z-index:11;',
            'font-size:' + (12 + Math.random() * 14) + 'px;',
            'left:' + (8 + Math.random() * 84) + '%;',
            'bottom:' + (12 + Math.random() * 30) + '%;',
            'opacity:0;',
            'animation:particleRise ' + (1.4 + Math.random() * 0.8) + 's ease-out ' + (Math.random() * 0.6) + 's both;',
          ].join('');
          container.appendChild(p);
          setTimeout(function () { p.remove(); }, 2800);
        }, idx * 180);
      })(i);
    }
  }

  function triggerWin() {
    vibrate([20, 60, 30]);
    setHint('✦ Level cleared!', 'win');

    if (reducedMotion || !crackEl) {
      var ptsR = Math.max(80, 500 - Math.max(0, taps - THEMES[currentTheme].level.length) * 15);
      if (pointsNumEl) pointsNumEl.textContent = ptsR;
      if (winMsgEl) winMsgEl.textContent = 'Board cleared in ' + taps + ' tap' + (taps === 1 ? '' : 's') + '.';
      if (winScreenEl) winScreenEl.classList.add('show');
      return;
    }

    var cfg = CRACK_CFG[currentTheme] || CRACK_CFG.forest;
    var screenEl = crackEl.parentElement;

    // Clear any previous run
    crackEl.innerHTML = '';
    crackEl.style.display = 'block';
    crackEl.style.opacity = '1';
    crackEl.style.transition = '';

    var screenRect = screenEl.getBoundingClientRect();
    var boardRect = board.getBoundingClientRect();
    var bLeft = boardRect.left - screenRect.left;
    var bTop = boardRect.top - screenRect.top;
    var bW = boardRect.width;
    var bH = boardRect.height;
    var cx = bW / 2;
    var cy = bH / 2;

    // ── Phase 1: Board pressure (0–300ms) ──
    board.style.transition = 'transform 0.15s ease';
    board.style.transform = 'scale(0.97)';
    setTimeout(function () {
      board.style.transform = 'scale(1.01)';
      setTimeout(function () {
        board.style.transform = '';
        board.style.transition = '';
      }, 150);
    }, 150);

    // ── Hairline SVG (80ms) ──
    var hairSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    hairSvg.setAttribute('viewBox', '0 0 ' + bW + ' ' + bH);
    hairSvg.style.cssText = 'position:absolute;left:' + bLeft + 'px;top:' + bTop + 'px;width:' + bW + 'px;height:' + bH + 'px;pointer-events:none;';
    var hairDefs = [
      [cx, cy, cx * 0.2, cy * 0.15],
      [cx, cy, cx * 1.8, cy * 0.2],
      [cx, cy, cx * 0.25, cy * 1.82],
      [cx, cy, cx * 1.75, cy * 1.85],
    ];
    var hairEls = hairDefs.map(function (d) {
      return _buildCrackPath(hairSvg, d[0], d[1], d[2], d[3], cfg.glow, 0.8, 0.65);
    });
    crackEl.appendChild(hairSvg);

    setTimeout(function () {
      hairEls.forEach(function (p, i) {
        setTimeout(function () { _animateDash(p, 220); }, i * 25);
      });
    }, 80);

    // ── Main crack SVG (330ms) ──
    var crackSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    crackSvg.setAttribute('viewBox', '0 0 ' + bW + ' ' + bH);
    crackSvg.style.cssText = 'position:absolute;left:' + bLeft + 'px;top:' + bTop + 'px;width:' + bW + 'px;height:' + bH + 'px;pointer-events:none;';

    // Glow layers (wide stroke, low opacity)
    var upGlow   = _buildCrackPath(crackSvg, cx, cy, cx, -4,      cfg.glow, 12, 0.35);
    var downGlow = _buildCrackPath(crackSvg, cx, cy, cx, bH + 4,  cfg.glow, 12, 0.35);
    // Core crack lines
    var upPath   = _buildCrackPath(crackSvg, cx, cy, cx, -4,      cfg.glow, 3,  0.95);
    var downPath = _buildCrackPath(crackSvg, cx, cy, cx, bH + 4,  cfg.glow, 3,  0.95);
    // Branches
    var branches = [
      _buildCrackPath(crackSvg, cx, cy * 0.65, cx - bW * 0.28, cy * 0.12, cfg.glow, 1.5, 0.65),
      _buildCrackPath(crackSvg, cx, cy * 0.65, cx + bW * 0.30, cy * 0.18, cfg.glow, 1.5, 0.65),
      _buildCrackPath(crackSvg, cx, cy * 1.35, cx - bW * 0.30, cy * 1.88, cfg.glow, 1.5, 0.65),
      _buildCrackPath(crackSvg, cx, cy * 1.35, cx + bW * 0.28, cy * 1.82, cfg.glow, 1.5, 0.65),
      _buildCrackPath(crackSvg, cx, cy,        cx - bW * 0.40, cy - cy * 0.3, cfg.glow, 1,  0.45),
      _buildCrackPath(crackSvg, cx, cy,        cx + bW * 0.38, cy + cy * 0.35, cfg.glow, 1, 0.45),
    ];
    crackEl.appendChild(crackSvg);

    setTimeout(function () {
      _animateDash(upPath, 250);
      _animateDash(upGlow, 260);
      _animateDash(downPath, 350);
      _animateDash(downGlow, 360);
    }, 330);

    setTimeout(function () {
      branches.forEach(function (b, i) {
        setTimeout(function () { _animateDash(b, 200); }, i * 38);
      });
    }, 480);

    // ── Phase 3: Impact flash + shake + dust (610ms) ──
    setTimeout(function () {
      vibrate([30, 50, 20]);

      var flash = document.createElement('div');
      flash.style.cssText = 'position:absolute;inset:0;background:rgba(255,255,255,0.84);border-radius:28px;pointer-events:none;transition:opacity 0.25s ease;';
      crackEl.appendChild(flash);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          flash.style.opacity = '0';
          setTimeout(function () { flash.remove(); }, 280);
        });
      });

      board.classList.add('shake');
      setTimeout(function () { board.classList.remove('shake'); }, 460);

      _spawnFragments(crackEl, bLeft, bTop, bW, bH, cfg);
      _spawnDust(crackEl, bLeft, bTop, bW, bH, cfg);
    }, 610);

    // ── Phase 4: Board splits apart (760ms) ──
    setTimeout(function () {
      board.style.opacity = '0';

      var topPanel = _createSplitPanel(bLeft, bTop, bW, bH / 2, 'top', cfg);
      var botPanel = _createSplitPanel(bLeft, bTop + bH / 2, bW, bH / 2, 'bottom', cfg);
      crackEl.appendChild(topPanel);
      crackEl.appendChild(botPanel);

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          var splitPx = Math.round(bH * 0.32);
          topPanel.style.transition = 'transform 0.56s cubic-bezier(0.4,0,0.2,1)';
          botPanel.style.transition = 'transform 0.56s cubic-bezier(0.4,0,0.2,1)';
          topPanel.style.transform = 'translateY(-' + splitPx + 'px) rotateX(10deg)';
          botPanel.style.transform = 'translateY(' + splitPx + 'px) rotateX(-10deg)';
        });
      });
    }, 760);

    // ── Phase 5: Chest springs up (1120ms) ──
    setTimeout(function () {
      var chestWrap = document.createElement('div');
      chestWrap.id = 'crackChestWrap';
      chestWrap.style.cssText = [
        'position:absolute;left:50%;top:50%;',
        'transform:translate(-50%,-50%) scale(0) rotate(-8deg);',
        'z-index:12;pointer-events:none;',
        'transition:transform 0.52s cubic-bezier(0.22,1.25,0.36,1);',
        'display:flex;flex-direction:column;align-items:center;gap:4px;',
      ].join('');

      var chestImg = document.createElement('img');
      chestImg.src = 'game-assets/chests/chest-' + currentTheme + '-closed.png';
      chestImg.alt = '';
      chestImg.style.cssText = 'width:82px;height:82px;object-fit:contain;display:block;filter:drop-shadow(0 8px 28px ' + cfg.glow + ') drop-shadow(0 2px 8px rgba(0,0,0,0.6));';
      chestWrap.appendChild(chestImg);
      crackEl.appendChild(chestWrap);

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          chestWrap.style.transform = 'translate(-50%,-50%) scale(1) rotate(0)';
        });
      });

      _spawnAmbientParticles(crackEl, cfg);

      // Chest opens (600ms after chest appears = 1720ms total)
      setTimeout(function () {
        chestImg.src = 'game-assets/chests/chest-' + currentTheme + '-open.png';
        chestWrap.style.transition = 'transform 0.18s cubic-bezier(0.22,1,0.36,1)';
        chestWrap.style.transform = 'translate(-50%,-50%) scale(1.18) rotate(2deg)';
        setTimeout(function () {
          chestWrap.style.transform = 'translate(-50%,-50%) scale(1) rotate(0)';
        }, 120);

        // Token arc (960ms after open = 2680ms total)
        setTimeout(function () {
          var tok = document.createElement('span');
          tok.textContent = cfg.particle;
          tok.style.cssText = [
            'position:absolute;font-size:22px;',
            'left:50%;top:18%;transform:translateX(-50%);',
            'pointer-events:none;z-index:13;',
          ].join('');
          crackEl.appendChild(tok);
          var startT = performance.now();
          var tokDur = 500;
          function tokFrame(now) {
            var t = Math.min((now - startT) / tokDur, 1);
            var ease = 1 - Math.pow(1 - t, 2);
            var arcY = -35 * Math.sin(Math.PI * t);
            tok.style.top = (18 + (50 - 18) * ease + arcY) + '%';
            tok.style.opacity = t < 0.85 ? '1' : String(1 - (t - 0.85) / 0.15);
            if (t < 1) requestAnimationFrame(tokFrame);
            else tok.remove();
          }
          requestAnimationFrame(tokFrame);

          // Chest bounces when token lands
          setTimeout(function () {
            chestWrap.style.transition = 'transform 0.22s cubic-bezier(0.22,1,0.36,1)';
            chestWrap.style.transform = 'translate(-50%,-50%) scale(0.92)';
            setTimeout(function () {
              chestWrap.style.transform = 'translate(-50%,-50%) scale(1)';
            }, 120);
          }, tokDur);
        }, 960);
      }, 600);

      // Reward chip (960ms after chest = 2080ms total)
      setTimeout(function () {
        var pts2 = Math.max(80, 500 - Math.max(0, taps - THEMES[currentTheme].level.length) * 15);
        var chip = document.createElement('div');
        chip.style.cssText = [
          'position:absolute;left:50%;bottom:22%;z-index:13;',
          'transform:translateX(-50%) translateY(20px);opacity:0;',
          'background:rgba(5,13,8,0.90);',
          'border:1.5px solid ' + cfg.glow + ';',
          'border-radius:999px;padding:5px 14px;',
          'font-size:13px;font-weight:700;',
          'color:#f4ecd6;white-space:nowrap;pointer-events:none;',
          'transition:transform 0.45s cubic-bezier(0.22,1,0.36,1),opacity 0.35s ease;',
          'text-shadow:0 0 10px ' + cfg.glow + ';',
          'box-shadow:0 0 16px ' + cfg.glow.replace('0.96','0.3') + ';',
        ].join('');
        chip.textContent = '+' + pts2 + ' ' + cfg.particle + ' ' + cfg.currency;
        crackEl.appendChild(chip);
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            chip.style.transform = 'translateX(-50%) translateY(0)';
            chip.style.opacity = '1';
          });
        });
      }, 960);

      // Chest closes (1760ms after chest = 2880ms total)
      setTimeout(function () {
        chestImg.src = 'game-assets/chests/chest-' + currentTheme + '-closed.png';
        chestWrap.style.transition = 'transform 0.28s ease';
        chestWrap.style.transform = 'translate(-50%,-50%) scale(0.88)';
        setTimeout(function () {
          chestWrap.style.transform = 'translate(-50%,-50%) scale(1)';
        }, 140);
      }, 1760);

      // "Tap to continue" hint (2160ms after chest = 3280ms total)
      setTimeout(function () {
        var tapHint = document.createElement('div');
        tapHint.style.cssText = [
          'position:absolute;left:50%;bottom:10%;z-index:13;',
          'font-size:10px;letter-spacing:0.1em;',
          'color:rgba(244,236,214,0.5);pointer-events:none;',
          'animation:fadeInUpHint 0.5s ease both;',
        ].join('');
        tapHint.textContent = 'tap to continue';
        crackEl.appendChild(tapHint);
      }, 2160);
    }, 1120);

    // ── Phase 9: Complete → win screen (3400ms) ──
    setTimeout(function () {
      var ptsF = Math.max(80, 500 - Math.max(0, taps - THEMES[currentTheme].level.length) * 15);
      if (pointsNumEl) pointsNumEl.textContent = ptsF;
      if (winMsgEl) winMsgEl.textContent = 'Board cleared in ' + taps + ' tap' + (taps === 1 ? '' : 's') + '.';

      crackEl.style.transition = 'opacity 0.5s ease';
      crackEl.style.opacity = '0';
      setTimeout(function () {
        crackEl.style.display = 'none';
        crackEl.style.opacity = '';
        crackEl.style.transition = '';
        board.style.opacity = '';
        if (winScreenEl) winScreenEl.classList.add('show');
        spawnConfetti();
      }, 500);
    }, 3400);
  }

  function onTileClick(id) {
    if (isResetting) return;
    if (armedTool === 'rotate') {
      rotateTile(id);
      return;
    }
    onEscapeTap(id);
  }

  function onEscapeTap(id) {
    var tile = tiles.find(function (t) { return t.id === id; });
    if (!tile || tile.escaped) return;
    taps++;
    tapsEl.textContent = taps;
    var tileEl = board.querySelector('[data-id="' + id + '"]');
    if (isTappable(tile)) {
      vibrate(12);
      // record for undo
      history.push({ type: 'escape', tileId: id, prevRow: tile.row, prevCol: tile.col, prevDir: tile.dir });
      tile.escaped = true;
      var v = DIRS[tile.dir];
      var dist = 1;
      var r = tile.row + v.dr, c = tile.col + v.dc;
      while (r >= 0 && r < BOARD && c >= 0 && c < BOARD) { dist++; r += v.dr; c += v.dc; }
      var dx = v.dc * dist * 100;
      var dy = v.dr * dist * 100;
      tileEl.classList.add('is-escaping');
      tileEl.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease-out';
      tileEl.style.transform = 'translate(' + dx + '%, ' + dy + '%) scale(0.88)';
      tileEl.style.opacity = '0';
      setTimeout(function () {
        renderBoard();
        var left = tiles.filter(function (t) { return !t.escaped; }).length;
        if (left === 0) {
          triggerWin();
        } else if (left === 1) {
          setHint('One more. The path opens.');
        } else {
          setHint('Nice. The chain unlocks the next tile.');
        }
      }, 480);
    } else {
      tileEl.classList.add('is-blocked');
      board.classList.add('shake');
      vibrate([22, 40, 22]);
      setHint('Blocked — another tile is in the way.', 'warn');
      setTimeout(function () {
        tileEl.classList.remove('is-blocked');
        board.classList.remove('shake');
      }, 460);
    }
  }

  // ─── Tools ───
  function setArmed(tool) {
    armedTool = tool;
    undoBtn.classList.toggle('is-armed', tool === 'undo');
    rotateBtn.classList.toggle('is-armed', tool === 'rotate');
    if (tool === 'rotate') {
      setHint('Rotate armed — tap any tile to rotate its arrow 45° clockwise.');
    } else if (tool === null) {
      var left = tiles.filter(function (t) { return !t.escaped; }).length;
      if (left > 0 && winScreenEl && !winScreenEl.classList.contains('show')) {
        setHint('Tap any tappable tile to continue the chain.');
      }
    }
    renderBoard();
  }

  function updateToolPills() {
    undoPill.textContent = toolUses.undo;
    rotatePill.textContent = toolUses.rotate;
    undoBtn.classList.toggle('is-depleted', toolUses.undo === 0);
    rotateBtn.classList.toggle('is-depleted', toolUses.rotate === 0);
  }

  function rotateTile(id) {
    if (toolUses.rotate <= 0) return;
    var tile = tiles.find(function (t) { return t.id === id; });
    if (!tile || tile.escaped) return;
    history.push({ type: 'rotate', tileId: id, prevDir: tile.dir });
    tile.dir = rotateCW(tile.dir);
    toolUses.rotate--;
    updateToolPills();
    setArmed(null);
    vibrate(14);
    setHint('Rotated. Now what opens up?');
  }

  function undoLast() {
    if (toolUses.undo <= 0) return;
    if (history.length === 0) return;
    var action = history.pop();
    if (action.type === 'escape') {
      var t = tiles.find(function (x) { return x.id === action.tileId; });
      if (t) {
        t.escaped = false;
        t.row = action.prevRow;
        t.col = action.prevCol;
        t.dir = action.prevDir;
      }
      taps = Math.max(0, taps - 1);
      tapsEl.textContent = taps;
    } else if (action.type === 'rotate') {
      var t2 = tiles.find(function (x) { return x.id === action.tileId; });
      if (t2) t2.dir = action.prevDir;
    }
    toolUses.undo--;
    updateToolPills();
    if (winScreenEl) winScreenEl.classList.remove('show');
    setHint('Undid the last move.');
    vibrate(14);
    renderBoard();
  }

  if (undoBtn) {
    undoBtn.addEventListener('click', function () {
      if (toolUses.undo <= 0) { setHint('No undos left for this level.', 'warn'); return; }
      undoLast();
    });
  }
  if (rotateBtn) {
    rotateBtn.addEventListener('click', function () {
      if (toolUses.rotate <= 0) { setHint('No rotates left for this level.', 'warn'); return; }
      setArmed(armedTool === 'rotate' ? null : 'rotate');
    });
  }

  function resetPuzzle() {
    isResetting = true;
    tiles = THEMES[currentTheme].level.map(function (t) { return Object.assign({}, t, { escaped: false }); });
    taps = 0;
    history = [];
    armedTool = null;
    toolUses = Object.assign({}, TOOL_INITIAL);
    tapsEl.textContent = '0';
    if (winScreenEl) winScreenEl.classList.remove('show');
    if (crackEl) {
      crackEl.classList.remove('active');
      crackEl.innerHTML = '';
      crackEl.style.display = 'none';
      crackEl.style.opacity = '';
      crackEl.style.transition = '';
    }
    board.style.opacity = '';
    if (board) board.style.setProperty('--cell-size', (100 / BOARD) + '%');
    undoBtn.classList.remove('is-armed');
    rotateBtn.classList.remove('is-armed');
    updateToolPills();
    renderBoard();
    setHint(THEMES[currentTheme].hint);
    setTimeout(function () { isResetting = false; }, 200);
  }

  function setTheme(themeKey) {
    if (!THEMES[themeKey]) return;
    currentTheme = themeKey;
    if (device) device.setAttribute('data-theme', themeKey);
    applyTheme(themeKey);
    persistTheme(themeKey);
    _updateWorldBg(themeKey);
    if (themeNameEl) themeNameEl.textContent = THEMES[themeKey].name;
    document.querySelectorAll('.theme-wheel .quad').forEach(function (q) {
      var on = q.getAttribute('data-theme') === themeKey;
      q.setAttribute('aria-checked', on ? 'true' : 'false');
    });
    document.querySelectorAll('.theme-wheel .quad-arc').forEach(function (arc) {
      arc.classList.toggle('arc-active', arc.getAttribute('data-world') === themeKey);
    });
    document.querySelectorAll('.theme-wheel .quad-icon').forEach(function (icon) {
      icon.classList.toggle('icon-active', icon.getAttribute('data-world') === themeKey);
    });
    var WORLD_HINTS = {
      forest:   '🌲 Spirit Seeds · tap quadrant to switch',
      ocean:    '🫧 Moon Pearls · tap quadrant to switch',
      mountain: '✨ Sun Runes · tap quadrant to switch',
      snow:     '❄️ Aurora Shards · tap quadrant to switch'
    };
    if (themeSubHintEl) themeSubHintEl.textContent = WORLD_HINTS[themeKey] || '';
    switchWorldPanel(themeKey);
    resetPuzzle();
  }

  // Theme wheel — sets both play board AND whole-site theme
  document.querySelectorAll('.theme-wheel .quad').forEach(function (quad) {
    quad.addEventListener('click', function () { setTheme(quad.getAttribute('data-theme')); });
    quad.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setTheme(quad.getAttribute('data-theme'));
      }
    });
  });

  // Initialize: apply persisted theme to both site and play
  setTheme(currentTheme);
  if (resetBtn) resetBtn.addEventListener('click', resetPuzzle);
})();
