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

  // World tabs in Worlds section
  var tabs = document.querySelectorAll('.world-tab');
  var panels = document.querySelectorAll('.world-panel');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var world = tab.getAttribute('data-world');
      tabs.forEach(function (t) {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      panels.forEach(function (p) {
        var match = p.getAttribute('data-world') === world;
        p.classList.toggle('active', match);
        if (match) p.removeAttribute('hidden'); else p.setAttribute('hidden', '');
      });
    });
  });

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

  // ─────────────── PLAYABLE MINI-LEVEL ───────────────
  var board = document.getElementById('playBoard');
  if (!board) return;

  var THEMES = {
    forest:   { name: 'Forest',   tiles: ['forest1','forest2','forest3','forest4'] },
    ocean:    { name: 'Ocean',    tiles: ['ocean1','ocean2','ocean3','ocean4'] },
    mountain: { name: 'Mountain', tiles: ['mountain1','mountain2','mountain3','mountain4'] },
    snow:     { name: 'Snow',     tiles: ['snow1','snow2','snow3','snow4'] }
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

  // 4x4 cascade — 8 tiles
  var initialTiles = [
    { id: 't1', row: 0, col: 1, dir: 'S' },
    { id: 't2', row: 0, col: 2, dir: 'S' },
    { id: 't3', row: 1, col: 0, dir: 'E' },
    { id: 't4', row: 1, col: 3, dir: 'N' },
    { id: 't5', row: 2, col: 0, dir: 'E' },
    { id: 't6', row: 2, col: 3, dir: 'S' },
    { id: 't7', row: 3, col: 1, dir: 'W' },
    { id: 't8', row: 3, col: 2, dir: 'E' }
  ];
  var BOARD = 4;

  var device = document.getElementById('playDevice');
  var hintEl = document.getElementById('playHint');
  var tapsEl = document.getElementById('playTaps');
  var successEl = document.getElementById('playSuccess');
  var resetBtn = document.getElementById('playReset');
  var themeNameEl = document.getElementById('themeName');

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
    for (var r = 0; r < BOARD; r++) {
      for (var c = 0; c < BOARD; c++) {
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
          setHint('✦ Level cleared in ' + taps + ' taps', 'win');
          successEl.classList.add('show');
          spawnConfetti();
          vibrate([20, 60, 30]);
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
      if (left > 0 && !successEl.classList.contains('show')) {
        setHint('Find a tile whose arrow points to a clear edge.');
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
    successEl.classList.remove('show');
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
    tiles = initialTiles.map(function (t) { return Object.assign({}, t, { escaped: false }); });
    taps = 0;
    history = [];
    armedTool = null;
    toolUses = Object.assign({}, TOOL_INITIAL);
    tapsEl.textContent = '0';
    successEl.classList.remove('show');
    setHint('Find a tile whose arrow points to a clear edge.');
    if (board) board.style.setProperty('--cell-size', (100 / BOARD) + '%');
    undoBtn.classList.remove('is-armed');
    rotateBtn.classList.remove('is-armed');
    updateToolPills();
    renderBoard();
    setTimeout(function () { isResetting = false; }, 200);
  }

  function setTheme(themeKey) {
    if (!THEMES[themeKey]) return;
    currentTheme = themeKey;
    if (device) device.setAttribute('data-theme', themeKey);
    applyTheme(themeKey);
    persistTheme(themeKey);
    if (themeNameEl) themeNameEl.textContent = THEMES[themeKey].name;
    document.querySelectorAll('.theme-wheel .quad').forEach(function (q) {
      var on = q.getAttribute('data-theme') === themeKey;
      q.setAttribute('aria-checked', on ? 'true' : 'false');
    });
    renderBoard();
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
  resetPuzzle();
  if (resetBtn) resetBtn.addEventListener('click', resetPuzzle);
})();
