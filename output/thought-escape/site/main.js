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

  // ─── World ambience particles (all pages) ───
  var ambienceLayer = document.getElementById('ambienceLayer');
  function _ambienceRand(seed) {
    var x = Math.sin(seed * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  }
  function _buildAmbience(theme) {
    if (!ambienceLayer) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var counts = { mountain: 22, forest: 18, ocean: 14, snow: 28 };
    var n = counts[theme] || 18;
    var vl = theme.length;
    ambienceLayer.className = 'te-ambience te-ambience--' + theme + ' te-ambience--fixed';
    ambienceLayer.innerHTML = '';
    for (var i = 0; i < n; i++) {
      var p = document.createElement('span');
      p.className = 'te-ambience__p';
      var l = _ambienceRand(i + 1 + vl) * 100;
      var t = _ambienceRand(i + 11 + vl) * 100;
      var d = _ambienceRand(i + 21 + vl) * 8;
      var dur = 4 + _ambienceRand(i + 31 + vl) * 8;
      var s = 0.5 + _ambienceRand(i + 41 + vl) * 1.5;
      p.style.cssText = 'left:' + l.toFixed(1) + '%;top:' + t.toFixed(1) + '%;animation-delay:' + d.toFixed(2) + 's;animation-duration:' + dur.toFixed(2) + 's;--s:' + s.toFixed(2) + ';';
      ambienceLayer.appendChild(p);
    }
  }
  _buildAmbience(currentTheme);

  // ─────────────── PLAYABLE MINI-LEVEL ───────────────
  var board = document.getElementById('playBoard');
  if (!board) return;
  var boardWrap = board.parentElement;

  // ─── Sound system ───
  var soundMuted = false;
  var escapeIndex = 0;
  var SOUNDS = {};
  (function () {
    var files = {
      escape_0:'escape_0.m4a', escape_1:'escape_1.m4a', escape_2:'escape_2.m4a',
      escape_3:'escape_3.m4a', escape_4:'escape_4.m4a', escape_5:'escape_5.m4a',
      escape_6:'escape_6.m4a', escape_7:'escape_7.m4a',
      blocked:'blocked.m4a', board_crack:'board_crack.m4a', victory:'victory_new.m4a', victory_perfect:'victory_perfect.m4a'
    };
    Object.keys(files).forEach(function (key) {
      try {
        var a = new Audio('game-assets/sounds/' + files[key]);
        a.preload = 'auto';
        SOUNDS[key] = a;
      } catch (e) {}
    });
  })();

  function playSound(key, vol) {
    if (soundMuted || !SOUNDS[key]) return;
    try {
      var snd = SOUNDS[key].cloneNode();
      snd.volume = vol !== undefined ? vol : 1.0;
      var p = snd.play();
      if (p && p.catch) p.catch(function () {});
    } catch (e) {}
  }

  var soundToggleBtn = document.getElementById('soundToggle');
  var SVG_ON  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
  var SVG_OFF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
  function syncSoundBtn() {
    if (!soundToggleBtn) return;
    soundToggleBtn.innerHTML = soundMuted ? SVG_OFF : SVG_ON;
    soundToggleBtn.setAttribute('aria-label', soundMuted ? 'Unmute sounds' : 'Mute sounds');
  }
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', function () {
      soundMuted = !soundMuted;
      syncSoundBtn();
    });
    syncSoundBtn();
  }

  var THEMES = {
    forest: {
      name: 'Forest',
      tiles: ['forest1','forest2','forest3','forest4','forest5','shared_moonstone','shared_sunstone'],
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
      tiles: ['ocean1','ocean2','ocean3','ocean4','ocean5','ocean6','shared_moonstone','shared_seafoam','shared_teal'],
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
      tiles: ['mountain1','mountain2','mountain3','mountain4','shared_sunstone','shared_ruby'],
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
      tiles: ['snow1','snow2','snow3','snow4','shared_moonstone','shared_aurora','shared_teal'],
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
  var winMsgEl = document.getElementById('playWinMsg');
  var winStarsEl = document.getElementById('playWinStars');
  var winCurrencyIconEl = document.getElementById('playWinCurrencyIcon');
  var winCurrencyAmtEl = document.getElementById('playWinCurrencyAmt');
  var winCurrencyLabelEl = document.getElementById('playWinCurrencyLabel');
  var winShardsAmtEl = document.getElementById('playWinShardsAmt');
  var winAgainBtn = document.getElementById('playWinAgain');
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
  var blockedTaps = 0;
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
    forest:   { glow: 'rgba(35,200,70,0.96)',   dust: ['rgba(130,245,135,0.95)','rgba(255,255,255,0.78)','rgba(45,150,70,0.72)'],    particle: '🍃', currency: 'Spirit Seeds',   rewardImg: 'spirit-seeds.png',   amount: 120 },
    ocean:    { glow: 'rgba(40,150,235,0.96)',   dust: ['rgba(120,220,255,0.95)','rgba(255,255,255,0.9)','rgba(42,140,235,0.7)'],    particle: '🫧', currency: 'Moon Pearls',    rewardImg: 'moon-pearls.png',    amount: 100 },
    mountain: { glow: 'rgba(230,120,30,0.96)',   dust: ['rgba(255,198,112,0.95)','rgba(255,255,255,0.78)','rgba(165,85,30,0.72)'],   particle: '✨', currency: 'Sun Runes',     rewardImg: 'sun-runes.png',      amount: 80  },
    snow:     { glow: 'rgba(165,190,250,0.96)',  dust: ['rgba(215,235,255,0.98)','rgba(255,255,255,0.95)','rgba(145,175,245,0.72)'], particle: '❄️', currency: 'Aurora Shards', rewardImg: 'aurora-shards.png',  amount: 90  }
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

  function _makeWanderingPath(ox, oy, bW, bH, dir) {
    var targetY = dir < 0 ? 0 : bH;
    var steps = [0.18, 0.38, 0.56, 0.76, 1.0];
    var pts = [{x: ox, y: oy}];
    steps.forEach(function (t) {
      var y = oy + (targetY - oy) * t;
      var wander = (Math.random() - 0.5) * bW * Math.max(0.04, 0.14 - t * 0.04);
      pts.push({x: Math.max(4, Math.min(bW - 4, ox + wander)), y: y});
    });
    var d = pts.map(function (p, i) {
      return (i === 0 ? 'M ' : 'L ') + p.x.toFixed(1) + ' ' + p.y.toFixed(1);
    }).join(' ');
    var len = 0;
    for (var i = 1; i < pts.length; i++) {
      len += Math.hypot(pts[i].x - pts[i-1].x, pts[i].y - pts[i-1].y);
    }
    return {d: d, len: len};
  }

  function _svgPathEl(svg, d, stroke, sw, opacity, dashLen) {
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', d);
    p.setAttribute('stroke', stroke);
    p.setAttribute('stroke-width', String(sw));
    p.setAttribute('fill', 'none');
    p.setAttribute('opacity', String(opacity));
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    if (dashLen !== undefined) {
      p.style.strokeDasharray = String(dashLen);
      p.style.strokeDashoffset = String(dashLen);
    }
    svg.appendChild(p);
    return p;
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
    var isLeft = half === 'left';
    var br = isLeft ? '8px 0 0 8px' : '0 8px 8px 0';
    var bg = isLeft
      ? 'linear-gradient(to right,rgba(20,40,28,0.85) 0%,rgba(8,18,12,0.92) 100%)'
      : 'linear-gradient(to left,rgba(20,40,28,0.85) 0%,rgba(8,18,12,0.92) 100%)';
    panel.style.cssText = [
      'position:absolute;pointer-events:none;',
      'left:' + left + 'px;top:' + top + 'px;',
      'width:' + w + 'px;height:' + h + 'px;',
      'border-radius:' + br + ';background:' + bg + ';',
      'transform-style:preserve-3d;will-change:transform;overflow:hidden;',
    ].join('');
    var glow = document.createElement('div');
    glow.style.cssText = [
      'position:absolute;top:0;bottom:0;width:2px;',
      isLeft ? 'right:0;' : 'left:0;',
      'background:linear-gradient(180deg,transparent 0%,' + cfg.glow + ' 40%,' + cfg.glow + ' 60%,transparent 100%);',
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

  function _tileCenter(tileEl) {
    var br = board.getBoundingClientRect();
    var tr = tileEl.getBoundingClientRect();
    return { x: tr.left - br.left + tr.width / 2, y: tr.top - br.top + tr.height / 2, sz: tr.width };
  }

  function _spawnTapRipple(tileEl) {
    if (reducedMotion) return;
    var c = _tileCenter(tileEl);
    var ring = document.createElement('div');
    ring.style.cssText = 'position:absolute;border-radius:50%;pointer-events:none;border:2px solid rgba(255,255,255,0.88);z-index:10;';
    board.appendChild(ring);
    var s0 = c.sz * 0.62, s1 = c.sz * 1.32, dur = 280, t0 = performance.now();
    (function frame(now) {
      var t = Math.min((now - t0) / dur, 1);
      var s = s0 + (s1 - s0) * t;
      var op = t < 0.15 ? t / 0.15 * 0.58 : (1 - (t - 0.15) / 0.85) * 0.58;
      ring.style.cssText = 'position:absolute;border-radius:50%;pointer-events:none;border:2px solid rgba(255,255,255,0.88);z-index:10;'
        + 'left:' + (c.x - s/2) + 'px;top:' + (c.y - s/2) + 'px;width:' + s + 'px;height:' + s + 'px;opacity:' + op + ';';
      if (t < 1) requestAnimationFrame(frame); else ring.remove();
    })(t0);
  }

  function _spawnEscapeRipple(tileEl, glowColor) {
    if (reducedMotion) return;
    var c = _tileCenter(tileEl);
    var ring = document.createElement('div');
    ring.style.cssText = 'position:absolute;border-radius:50%;pointer-events:none;border:2px solid ' + glowColor + ';'
      + 'box-shadow:0 0 8px ' + glowColor.replace('0.96', '0.45') + ';z-index:10;';
    board.appendChild(ring);
    var s0 = c.sz * 0.85, s1 = c.sz * 2.1, dur = 380, t0 = performance.now();
    (function frame(now) {
      var t = Math.min((now - t0) / dur, 1);
      var s = s0 + (s1 - s0) * t;
      var op = t < 0.12 ? t / 0.12 * 0.88 : (1 - (t - 0.12) / 0.88) * 0.88;
      ring.style.left = (c.x - s/2) + 'px';
      ring.style.top  = (c.y - s/2) + 'px';
      ring.style.width  = s + 'px';
      ring.style.height = s + 'px';
      ring.style.opacity = String(op);
      if (t < 1) requestAnimationFrame(frame); else ring.remove();
    })(t0);
  }

  function _spawnBlockedFlash(tileEl) {
    if (reducedMotion) return;
    var c = _tileCenter(tileEl);
    var sz = c.sz * 1.5;
    var flash = document.createElement('div');
    flash.style.cssText = 'position:absolute;border-radius:50%;pointer-events:none;z-index:10;'
      + 'background:rgba(255,59,48,0.68);'
      + 'left:' + (c.x - sz/2) + 'px;top:' + (c.y - sz/2) + 'px;width:' + sz + 'px;height:' + sz + 'px;';
    board.appendChild(flash);
    var dur = 500, t0 = performance.now();
    (function frame(now) {
      var t = Math.min((now - t0) / dur, 1);
      var op = t < 0.16 ? t / 0.16 : t < 0.6 ? 0.75 : (1 - t) / 0.4 * 0.75;
      flash.style.opacity = String(op);
      if (t < 1) requestAnimationFrame(frame); else flash.remove();
    })(t0);
  }

  // chestEl: the chestWrap element (already settled at center when called)
  // bLeft/bTop/bW/bH: original board coords in crackEl space
  // screenRect: crackEl's parent bounding rect (used to convert chestEl rect to local coords)
  function _spawnRewardTokens(container, bLeft, bTop, bW, bH, cfg, chestEl, screenRect) {
    if (reducedMotion) return;
    // Compute chest opening position in crackEl local coords.
    // getBoundingClientRect gives viewport coords; subtract screenRect.left/top for crackEl-local.
    var cr = chestEl.getBoundingClientRect();
    var chestCx = cr.left - screenRect.left + cr.width  * 0.5;
    var chestCy = cr.top  - screenRect.top  + cr.height * 0.28; // aim at opening (~28% from top)

    var srcs = [
      'game-assets/rewards/' + cfg.rewardImg,
      'game-assets/rewards/' + cfg.rewardImg,
      'game-assets/rewards/' + cfg.rewardImg,
      'game-assets/rewards/escape-shards.png',
      'game-assets/rewards/escape-shards.png',
    ];
    srcs.forEach(function (src, idx) {
      setTimeout(function () {
        var el = document.createElement('img');
        el.src = src;
        var sz = 52 + Math.random() * 16;
        var startX = bLeft + 10 + Math.random() * (bW - 20);
        var startY = bTop + 10 + Math.random() * (bH - 20);
        el.style.cssText = [
          'position:absolute;width:' + sz + 'px;height:' + sz + 'px;object-fit:contain;',
          'left:' + startX + 'px;top:' + startY + 'px;',
          'pointer-events:none;z-index:13;',
          'filter:drop-shadow(0 0 6px ' + cfg.glow + ');',
        ].join('');
        container.appendChild(el);
        var dur = 620 + Math.random() * 120;
        var startT = performance.now();
        var destX = chestCx - sz / 2;
        var destY = chestCy - sz / 2;
        // Arc upward if board is below chest, downward if above — always goes toward chest
        var midY = (startY + destY) / 2;
        var arcDir = startY > destY ? -1 : 1; // up when flying up, down when flying down
        var arcH = arcDir * (40 + Math.random() * 35);
        function frame(now) {
          var t = Math.min((now - startT) / dur, 1);
          var ease = 1 - Math.pow(1 - t, 2);
          var x = startX + (destX - startX) * ease;
          var arc = -Math.abs(arcH) * Math.sin(Math.PI * t); // always arc away from straight line
          var y = startY + (destY - startY) * ease + arc;
          var scale = 1.2 - t * 0.5;
          el.style.left = x + 'px';
          el.style.top = y + 'px';
          el.style.transform = 'scale(' + scale + ')';
          el.style.opacity = t > 0.75 ? String(1 - (t - 0.75) / 0.25) : '1';
          if (t < 1) requestAnimationFrame(frame);
          else el.remove();
        }
        requestAnimationFrame(frame);
      }, idx * 90);
    });
  }

  function triggerWin() {
    vibrate([20, 60, 30]);
    playSound('board_crack');
    setHint('✦ Level cleared!', 'win');

    if (reducedMotion || !crackEl) {
      var cfg0 = CRACK_CFG[currentTheme] || CRACK_CFG.forest;
      var shardsR = Math.max(5, 15 - Math.max(0, taps - THEMES[currentTheme].level.length));
      if (winMsgEl) winMsgEl.textContent = 'Board cleared in ' + taps + ' tap' + (taps === 1 ? '' : 's') + '.';
      if (winStarsEl) winStarsEl.src = 'game-assets/victory-stars/' + currentTheme + '.png';
      if (winCurrencyIconEl) winCurrencyIconEl.src = 'game-assets/rewards/' + cfg0.rewardImg;
      if (winCurrencyAmtEl) winCurrencyAmtEl.textContent = '+' + cfg0.amount;
      if (winCurrencyLabelEl) winCurrencyLabelEl.textContent = cfg0.currency;
      if (winShardsAmtEl) winShardsAmtEl.textContent = '+' + shardsR;
      if (winScreenEl) winScreenEl.classList.add('show');
      return;
    }

    var cfg = CRACK_CFG[currentTheme] || CRACK_CFG.forest;
    var screenEl = crackEl.parentElement;

    // Clear any previous run (restore board if a prior crack moved it)
    if (boardWrap && board.parentElement !== boardWrap) {
      board.removeAttribute('style');
      boardWrap.appendChild(board);
    }
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

    // Crack origin — near center but slightly randomised, like the real game
    var crackOx = Math.max(bW * 0.18, Math.min(bW * 0.82, cx + (Math.random() - 0.5) * bW * 0.16));
    var crackOy = Math.max(bH * 0.15, Math.min(bH * 0.85, cy + (Math.random() - 0.5) * bH * 0.16));

    // ── Hairlines: 7 short lines radiating from crack origin (80ms) ──
    var crackSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    crackSvg.setAttribute('viewBox', '0 0 ' + bW + ' ' + bH);
    crackSvg.style.cssText = 'position:absolute;left:' + bLeft + 'px;top:' + bTop + 'px;width:' + bW + 'px;height:' + bH + 'px;pointer-events:none;';

    var hairLen = bW * 0.35;
    var hairEls = [];
    for (var hi = 0; hi < 7; hi++) {
      var hSide = Math.random() > 0.5 ? 1 : -1;
      var hsx = Math.max(4, Math.min(bW-4, crackOx + (Math.random()-0.5)*bW*0.32));
      var hsy = Math.max(4, Math.min(bH-4, crackOy + (Math.random()-0.5)*bH*0.45));
      var hLen = bW * (0.045 + Math.random() * 0.08);
      var hex2 = Math.max(4, Math.min(bW-4, hsx + hSide * hLen));
      var hey2 = Math.max(4, Math.min(bH-4, hsy + (Math.random()-0.5) * hLen));
      var hd = 'M '+hsx.toFixed(1)+' '+hsy.toFixed(1)+' L '+hex2.toFixed(1)+' '+hey2.toFixed(1);
      hairEls.push(_svgPathEl(crackSvg, hd, 'white', 1.1, 0.32, hairLen));
    }

    // ── Main crack: two multi-segment wandering paths up and down ──
    var upGeom   = _makeWanderingPath(crackOx, crackOy, bW, bH, -1);
    var downGeom = _makeWanderingPath(crackOx, crackOy, bW, bH,  1);
    var mainLen  = Math.max(upGeom.len, downGeom.len, bH);

    // Wide white glow behind crack (matches real game strokeWidth 40, opacity 0.17)
    _svgPathEl(crackSvg, upGeom.d,   'white', 40, 0.17, mainLen);
    _svgPathEl(crackSvg, downGeom.d, 'white', 40, 0.17, mainLen);
    // Medium white bloom (strokeWidth 16, opacity 0.18)
    var upBloom   = _svgPathEl(crackSvg, upGeom.d,   'white', 16, 0.18, mainLen);
    var downBloom = _svgPathEl(crackSvg, downGeom.d, 'white', 16, 0.18, mainLen);
    // Core colored crack line (strokeWidth 3.2)
    var upCore   = _svgPathEl(crackSvg, upGeom.d,   cfg.glow, 3.2, 1.0, mainLen);
    var downCore = _svgPathEl(crackSvg, downGeom.d, cfg.glow, 3.2, 1.0, mainLen);

    // 6 branch cracks radiating diagonally from near origin
    var branchEls = [];
    for (var bi = 0; bi < 6; bi++) {
      var bvSign = bi < 3 ? -1 : 1;
      var bside  = bi % 2 === 0 ? -1 : 1;
      var bsx = Math.max(4, Math.min(bW-4, crackOx + (Math.random()-0.5)*bW*0.12));
      var bsy = Math.max(4, Math.min(bH-4, crackOy + bvSign*bH*(0.08+Math.random()*0.26)));
      var blen = bW * (0.1 + Math.random() * 0.16);
      var bmx = Math.max(4, Math.min(bW-4, bsx + bside*blen*0.45));
      var bmy = Math.max(4, Math.min(bH-4, bsy + bvSign*blen*0.18));
      var bex = Math.max(4, Math.min(bW-4, bsx + bside*blen));
      var bey = Math.max(4, Math.min(bH-4, bsy + bvSign*blen*(0.35+Math.random()*0.5)));
      var bd = 'M '+bsx.toFixed(1)+' '+bsy.toFixed(1)+' L '+bmx.toFixed(1)+' '+bmy.toFixed(1)+' L '+bex.toFixed(1)+' '+bey.toFixed(1);
      var bpLen = Math.hypot(bmx-bsx,bmy-bsy) + Math.hypot(bex-bmx,bey-bmy);
      var bstroke = bi % 2 === 0 ? 'white' : cfg.glow;
      branchEls.push({el: _svgPathEl(crackSvg, bd, bstroke, 1.7, 0.62, bpLen), delay: bi*55 + Math.random()*45});
    }

    crackEl.appendChild(crackSvg);

    // Draw hairlines in
    setTimeout(function () {
      hairEls.forEach(function (p, i) {
        setTimeout(function () { _animateDash(p, 230); }, i * 25);
      });
    }, 80);

    // Draw main crack (glow/bloom/core all together)
    setTimeout(function () {
      [upBloom, upCore].forEach(function (el) { _animateDash(el, 250); });
      [downBloom, downCore].forEach(function (el) { _animateDash(el, 350); });
      // Fade in the wide glow layers (they're children of crackSvg, already have dashoffset set)
      crackSvg.querySelectorAll('path').forEach(function (p) {
        if (parseFloat(p.getAttribute('stroke-width') || '0') >= 16 && p.style.strokeDashoffset !== '0') {
          _animateDash(p, 400);
        }
      });
    }, 330);

    setTimeout(function () {
      branchEls.forEach(function (b) {
        setTimeout(function () { _animateDash(b.el, 220); }, b.delay);
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

    // ── Phase 4: Board splits left/right — tiles visible in each half (760ms) ──
    setTimeout(function () {
      // splitX near crack origin x (like real game's splitX = origin.x ± small)
      var splitX = Math.max(Math.round(bW * 0.30), Math.min(Math.round(bW * 0.70),
        Math.round(crackOx + (Math.random() - 0.5) * bW * 0.05)));
      var tiltDeg = (4 + Math.random() * 4).toFixed(2);
      var SPLIT_PX = 78; // matches real game phone value

      // Left clip — overflow:hidden reveals only left side of board
      var leftClip = document.createElement('div');
      leftClip.style.cssText = [
        'position:absolute;overflow:hidden;pointer-events:none;',
        'left:' + bLeft + 'px;top:' + bTop + 'px;',
        'width:' + splitX + 'px;height:' + bH + 'px;',
      ].join('');

      // Right clip — overflow:hidden reveals only right side (board clone shifted left)
      var rightClip = document.createElement('div');
      rightClip.style.cssText = [
        'position:absolute;overflow:hidden;pointer-events:none;',
        'left:' + (bLeft + splitX) + 'px;top:' + bTop + 'px;',
        'width:' + (bW - splitX) + 'px;height:' + bH + 'px;',
      ].join('');

      // Move the real board into leftClip
      board.style.cssText = 'position:absolute;left:0;top:0;width:' + bW + 'px;height:' + bH + 'px;opacity:1;transition:none;pointer-events:none;';
      leftClip.appendChild(board);

      // Clone board into rightClip, shifted left by splitX to expose the right half
      var boardClone = board.cloneNode(true);
      boardClone.style.cssText = 'position:absolute;left:-' + splitX + 'px;top:0;width:' + bW + 'px;height:' + bH + 'px;pointer-events:none;';
      rightClip.appendChild(boardClone);

      crackEl.appendChild(leftClip);
      crackEl.appendChild(rightClip);

      // Animate: perspective + translateX + translateY + rotate + rotateX + scale
      // matches real game: { perspective:900 } + splitLeft/Right + tilt + pitch + panelScale
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          var dur = '0.56s cubic-bezier(0.4,0,0.2,1)';
          leftClip.style.transition  = 'transform ' + dur;
          rightClip.style.transition = 'transform ' + dur;
          leftClip.style.transform  = 'perspective(900px) translateX(-' + SPLIT_PX + 'px) translateY(-11px) rotate(-' + tiltDeg + 'deg) rotateX(-8deg) scale(0.984)';
          rightClip.style.transform = 'perspective(900px) translateX('  + SPLIT_PX + 'px) translateY(13px)  rotate('  + tiltDeg + 'deg) rotateX(8deg)  scale(0.984)';
        });
      });
    }, 760);

    // ── Phase 5: Chest springs up from below (1120ms) ──
    // CHEST_SZ: Math.min(boardSz * 0.78, 300) — matches real game phone formula
    setTimeout(function () {
      var CHEST_SZ = Math.min(Math.round(bW * 0.78), 300);
      var chestWrap = document.createElement('div');
      chestWrap.id = 'crackChestWrap';
      // Start: off the bottom of the screen (translateY = screenRect.height), scale 0.4, opacity 0
      // Spring to center using bouncy cubic-bezier (approx friction:6 tension:60)
      chestWrap.style.cssText = [
        'position:absolute;left:50%;top:50%;z-index:12;pointer-events:none;',
        'display:flex;flex-direction:column;align-items:center;gap:4px;',
        'transform:translate(-50%,calc(-50% + ' + screenRect.height + 'px)) scale(0.4);',
        'opacity:0;',
        'transition:transform 0.68s cubic-bezier(0.34,1.56,0.64,1),opacity 0.25s ease;',
      ].join('');

      var chestImg = document.createElement('img');
      chestImg.src = 'game-assets/chests/chest-' + currentTheme + '-closed.png';
      chestImg.alt = '';
      chestImg.style.cssText = 'width:' + CHEST_SZ + 'px;height:' + CHEST_SZ + 'px;object-fit:contain;display:block;filter:drop-shadow(0 12px 40px ' + cfg.glow + ') drop-shadow(0 2px 10px rgba(0,0,0,0.7));';
      chestWrap.appendChild(chestImg);
      crackEl.appendChild(chestWrap);

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          chestWrap.style.transform = 'translate(-50%,-50%) scale(1)';
          chestWrap.style.opacity = '1';
        });
      });

      _spawnAmbientParticles(crackEl, cfg);

      // Chest opens (600ms after chest appears = 1720ms total)
      // Reward tokens spawn here — chest is open and fully settled (spring=680ms, tokens at 600ms+)
      setTimeout(function () {
        chestImg.src = 'game-assets/chests/chest-' + currentTheme + '-open.png';
        playSound(blockedTaps === 0 ? 'victory_perfect' : 'victory', 0.85);
        chestWrap.style.transition = 'transform 0.18s cubic-bezier(0.22,1,0.36,1)';
        chestWrap.style.transform = 'translate(-50%,-50%) scale(1.18) rotate(2deg)';
        setTimeout(function () {
          chestWrap.style.transform = 'translate(-50%,-50%) scale(1) rotate(0)';
        }, 120);

        // Rewards fly into open chest — spawn 140ms after open so chest has settled its bounce
        setTimeout(function () {
          _spawnRewardTokens(crackEl, bLeft, bTop, bW, bH, cfg, chestWrap, screenRect);
        }, 140);

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
      var shardsF = Math.max(5, 15 - Math.max(0, taps - THEMES[currentTheme].level.length));
      if (winMsgEl) winMsgEl.textContent = 'Board cleared in ' + taps + ' tap' + (taps === 1 ? '' : 's') + '.';
      if (winStarsEl) winStarsEl.src = 'game-assets/victory-stars/' + currentTheme + '.png';
      if (winCurrencyIconEl) winCurrencyIconEl.src = 'game-assets/rewards/' + cfg.rewardImg;
      if (winCurrencyAmtEl) winCurrencyAmtEl.textContent = '+' + cfg.amount;
      if (winCurrencyLabelEl) winCurrencyLabelEl.textContent = cfg.currency;
      if (winShardsAmtEl) winShardsAmtEl.textContent = '+' + shardsF;

      crackEl.style.transition = 'opacity 0.5s ease';
      crackEl.style.opacity = '0';
      setTimeout(function () {
        // Restore the real board to its original parent before clearing crackEl
        if (boardWrap && board.parentElement !== boardWrap) {
          board.removeAttribute('style');
          boardWrap.appendChild(board);
        }
        crackEl.innerHTML = '';
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
    vibrate(8);
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
    if (tileEl) _spawnTapRipple(tileEl);
    if (isTappable(tile)) {
      vibrate(12);
      playSound('escape_' + (escapeIndex % 8));
      escapeIndex++;
      _spawnEscapeRipple(tileEl, CRACK_CFG[currentTheme].glow);
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
      blockedTaps++;
      _spawnBlockedFlash(tileEl);
      tileEl.classList.add('is-blocked');
      board.classList.add('shake');
      vibrate([22, 40, 22]);
      playSound('blocked', 0.75);
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
    blockedTaps = 0;
    history = [];
    armedTool = null;
    toolUses = Object.assign({}, TOOL_INITIAL);
    escapeIndex = 0;
    tapsEl.textContent = '0';
    if (winScreenEl) winScreenEl.classList.remove('show');
    if (crackEl) {
      crackEl.classList.remove('active');
      if (boardWrap && board.parentElement !== boardWrap) {
        board.removeAttribute('style');
        boardWrap.appendChild(board);
      }
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

  var HERO_PHONE_IMGS = {
    forest:   'images/screen-home.png',
    ocean:    'images/ocean-home.png',
    mountain: 'images/mountain-home.png',
    snow:     'images/snow-home.png'
  };
  var HERO_PHONE_ALTS = {
    forest:   'Forest world home screen with emerald canopy background, spirit seeds counter, and green Continue button',
    ocean:    'Ocean world home screen with coral reef background, moon pearls counter, and deep blue Continue button',
    mountain: 'Mountain world home screen with golden peaks at sunset, sun runes counter, and amber Continue button',
    snow:     'Snow world home screen with aurora-lit ice peaks, aurora shards counter, and icy Continue button'
  };
  var heroPhoneEl = document.getElementById('heroPhone');

  function setTheme(themeKey) {
    if (!THEMES[themeKey]) return;
    currentTheme = themeKey;
    if (device) device.setAttribute('data-theme', themeKey);
    applyTheme(themeKey);
    persistTheme(themeKey);
    _updateWorldBg(themeKey);
    _buildAmbience(themeKey);
    if (heroPhoneEl) {
      heroPhoneEl.src = HERO_PHONE_IMGS[themeKey] || HERO_PHONE_IMGS.forest;
      heroPhoneEl.alt = HERO_PHONE_ALTS[themeKey] || HERO_PHONE_ALTS.forest;
    }
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
  if (winAgainBtn) winAgainBtn.addEventListener('click', resetPuzzle);
})();
