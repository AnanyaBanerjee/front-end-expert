document.getElementById('year').textContent = new Date().getFullYear();
// ── Theme toggle ──────────────────────────────────────────────────────────
(function () {
  // Initialise on first paint: respect saved preference, then system pref
  const saved = localStorage.getItem('theme');
  const theme = saved || 'dark';
  document.documentElement.setAttribute('data-theme', theme);

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }
})();

// ── Scroll reveal with stagger ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const parent = entry.target.parentElement;
      const siblings = [...parent.querySelectorAll(':scope > .reveal')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.08}s`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Step number pop ──
const stepObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.step-num').forEach((n, i) => {
        setTimeout(() => n.classList.add('visible'), i * 200);
      });
      stepObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
const stepsContainer = document.getElementById('steps-container');
if (stepsContainer) stepObserver.observe(stepsContainer);

// ── Privacy table row stagger ──
const privacyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.privacy-row').forEach((row, i) => {
        setTimeout(() => row.classList.add('visible'), i * 100);
      });
      privacyObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
const privacyTerminal = document.getElementById('privacy-terminal');
if (privacyTerminal) privacyObserver.observe(privacyTerminal);

// ── Hero word-mask reveal ──
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setTimeout(() => {
    document.querySelectorAll('.word').forEach(w => w.classList.add('in'));
  }, 120);
} else {
  document.querySelectorAll('.word').forEach(w => w.classList.add('in'));
}

// ── Feature card micro-animation triggers ──
const featAnimObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const card = entry.target;
    // Workflow chips
    card.querySelectorAll('.feat-chip').forEach(el => el.classList.add('chip-play'));
    // Connected badge
    card.querySelectorAll('.connected-badge').forEach(el => el.classList.add('badge-play'));
    // Token stream lines
    card.querySelectorAll('.token-line').forEach(el => el.classList.add('chip-play'));
    featAnimObs.unobserve(card);
  });
}, { threshold: 0.3 });
document.querySelectorAll('.feat-card').forEach(c => featAnimObs.observe(c));

// ── Feature card spotlight + 3D tilt ──
document.querySelectorAll('.feat-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    // 3D tilt: max ±6deg
    const cx = rect.width / 2, cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -5;
    const ry = ((x - cx) / cx) * 5;
    card.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── Bento cell spotlight + subtle 3D tilt ──
document.querySelectorAll('.bento-cell').forEach(cell => {
  cell.addEventListener('mousemove', (e) => {
    const rect = cell.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cell.style.setProperty('--mouse-x', `${x}px`);
    cell.style.setProperty('--mouse-y', `${y}px`);
    const cx = rect.width / 2, cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -3;
    const ry = ((x - cx) / cx) * 3;
    cell.style.transform = `translateY(-3px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  cell.addEventListener('mouseleave', () => {
    cell.style.transform = '';
  });
});

// ── Connect-card reveal glow (static card now, matches real Add Agent screen) ──
const terminal = document.getElementById('terminal');
const termWrap = document.getElementById('terminal-wrap');
if (terminal && termWrap) {
  const termObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        terminal.classList.add('active-glow');
        termObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  termObserver.observe(termWrap);
}

// ── Interactive demo: scripted conversation in the real desktop-app UI ──
(function () {
  const msgsEl = document.getElementById('rc-msgs');
  const composerText = document.getElementById('rc-composer-text');
  const nameEl = document.getElementById('rc-name');
  const avatarEl = document.getElementById('rc-avatar');
  const agentItems = document.querySelectorAll('.rc-agent-item');
  const tabs = document.querySelectorAll('.demo-tab');
  if (!msgsEl) return;

  const AVATAR_COLORS = ['#3B82F6', '#8338EC', '#06D6A0'];

  const SCENARIOS = {
    assistant: {
      agentIndex: 0,
      prompts: [
        {
          label: 'Check schedule & move a meeting',
          steps: [
            { type: 'user', text: "What's on my schedule tomorrow, and move the 3 pm call to 4 pm." },
            { type: 'agent', text: 'Checking your calendar — tomorrow you have:\n• 10:00 AM — Team standup\n• 2:00 PM — Design review\n• 3:00 PM — Client call with Mehta & Co.\n\nMoving the 3 pm to 4 pm now.' },
            { type: 'agent', text: '✓ Done — Mehta & Co. call moved to 4:00 PM.' },
          ],
        },
        {
          label: 'Set a reminder before a meeting',
          steps: [
            { type: 'user', text: 'Set a reminder for my 3 pm call with Mehta & Co. — ping me 10 minutes before.' },
            { type: 'agent', text: "✓ Done — you'll get a ping at 2:50 PM, 10 minutes before the Mehta & Co. call." },
          ],
        },
        {
          label: "Draft an email to the team",
          steps: [
            { type: 'user', text: "Draft a quick email to my team about tomorrow's design review moving to 4 pm." },
            { type: 'agent', text: "Here's a short draft:\n\nSubject: Design review moved to 4 pm tomorrow\n\nHi team,\n\nQuick heads-up — tomorrow's design review is moving from 2 pm to 4 pm. Same room, same agenda.\n\nThanks" },
          ],
        },
      ],
    },
    research: {
      agentIndex: 1,
      prompts: [
        {
          label: 'Summarise a research paper',
          steps: [
            { type: 'user', text: 'What are the key architectural changes in this transformer paper?' },
            { type: 'agent', text: 'Three main changes over the standard Transformer:\n\nRotary Position Embeddings (RoPE) — better long-context generalisation.\n\nGrouped-Query Attention (GQA) — shares key/value heads, cutting KV cache memory.\n\nRMS Normalization — faster than LayerNorm with matched accuracy.' },
          ],
        },
        {
          label: 'Find recent papers on a topic',
          steps: [
            { type: 'user', text: 'Find the top 3 papers on efficient attention mechanisms from the last 2 years.' },
            { type: 'agent', text: 'Here are the three most-cited recent works:\n\nFlashAttention-2 (2023) — rewrites the attention kernel for GPU SRAM.\n\nRing Attention (2023) — distributes sequence length across devices.\n\nGQA (2023) — the grouped-query method used in LLaMA 2 and Mistral.' },
          ],
        },
        {
          label: 'Explain a concept in plain English',
          steps: [
            { type: 'user', text: "Explain chain-of-thought prompting like I'm not an ML engineer." },
            { type: 'agent', text: 'Imagine asking someone a hard maths problem. If you just say "what\'s the answer?" they might guess. But if you say "think it through step by step" they reason and get it right more often.\n\nChain-of-thought prompting does the same for AI — it asks the model to show its working before the answer.' },
          ],
        },
      ],
    },
    code: {
      agentIndex: 2,
      prompts: [
        {
          label: 'Add input validation to /register',
          steps: [
            { type: 'user', text: 'Add input validation to my /register endpoint — reject blank fields and emails without @.' },
            { type: 'agent', text: 'Here\'s a validator to drop in before you process the form:\n\ndef validate_register(data):\n    email = data.get("email", "").strip()\n    pw = data.get("password", "")\n    if not email or "@" not in email:\n        return False, "Valid email required"\n    if len(pw) < 8:\n        return False, "Password must be 8+ chars"\n    return True, None' },
          ],
        },
        {
          label: 'Write unit tests for my auth module',
          steps: [
            { type: 'user', text: 'Write unit tests for my JWT auth module. Cover valid, expired, and missing token.' },
            { type: 'agent', text: 'Here are three tests covering all three cases — run with `pytest -v`, all three should pass. Want a case for tampered signatures too?' },
          ],
        },
        {
          label: 'Refactor a nested callback to async/await',
          steps: [
            { type: 'user', text: 'This nested callback is a mess — refactor it to async/await.' },
            { type: 'agent', text: "Here's the async version — much easier to follow:\n\nasync function loadUserData(userId) {\n  const user = await fetchUser(userId);\n  const orders = await fetchOrders(user.id);\n  return { user, orders };\n}\n\nError handling is cleaner too — one try/catch at the call site." },
          ],
        },
      ],
    },
  };

  let currentKey = 'assistant';
  let currentPromptIndex = null;
  let controller = null;

  function sleep(ms, signal) {
    return new Promise((resolve, reject) => {
      const t = setTimeout(resolve, ms);
      signal.addEventListener('abort', () => { clearTimeout(t); reject(new DOMException('aborted', 'AbortError')); }, { once: true });
    });
  }

  function setComposer(text, typing) {
    if (!composerText) return;
    composerText.textContent = text;
    composerText.className = typing ? 'rc-typing' : 'rc-placeholder';
  }

  async function typeComposer(text, signal) {
    setComposer('', true);
    for (let i = 1; i <= text.length; i++) {
      if (signal.aborted) return;
      composerText.textContent = text.slice(0, i);
      await sleep(14, signal);
    }
    composerText.innerHTML = text + '<span class="rc-cursor"></span>';
  }

  function addRow(role) {
    const row = document.createElement('div');
    row.className = 'rc-row ' + role;
    msgsEl.appendChild(row);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return row;
  }

  function addBubble(row, text) {
    const bubble = document.createElement('div');
    bubble.className = 'rc-bubble';
    bubble.textContent = text;
    row.appendChild(bubble);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return bubble;
  }

  function addMeta(row, role) {
    const meta = document.createElement('div');
    meta.className = 'rc-meta' + (role === 'user' ? ' user-meta' : '');
    if (role === 'agent') {
      const pulse = document.createElement('span');
      pulse.className = 'rc-pulse';
      const badge = document.createElement('span');
      badge.className = 'rc-ai-badge';
      badge.textContent = '✦ AI';
      meta.appendChild(pulse);
      meta.appendChild(badge);
    }
    const time = document.createElement('span');
    time.className = 'rc-time';
    time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    meta.appendChild(time);
    row.appendChild(meta);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function showThinking() {
    const row = addRow('agent');
    const wrap = document.createElement('div');
    wrap.className = 'rc-thinking';
    wrap.innerHTML = '<span class="rc-tdot"></span><span class="rc-tdot"></span><span class="rc-tdot"></span>';
    row.appendChild(wrap);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return row;
  }

  async function streamBubble(bubble, text, signal) {
    for (let i = 1; i <= text.length; i++) {
      if (signal.aborted) return;
      bubble.textContent = text.slice(0, i);
      msgsEl.scrollTop = msgsEl.scrollHeight;
      await sleep(10, signal);
    }
  }

  function switchAgent(key) {
    currentKey = key;
    const sc = SCENARIOS[key];
    agentItems.forEach((el, i) => el.classList.toggle('active', i === sc.agentIndex));
    tabs.forEach(t => t.classList.toggle('active', t.dataset.scenario === key));
    const activeItem = agentItems[sc.agentIndex];
    const activeName = activeItem?.querySelector('.rc-agent-name')?.textContent;
    if (activeName) {
      nameEl.textContent = activeName;
      if (avatarEl) {
        avatarEl.textContent = activeName.trim()[0] || '?';
        avatarEl.style.background = AVATAR_COLORS[sc.agentIndex] || '#3B82F6';
      }
    }
  }

  function showPrompts(key) {
    controller && controller.abort();
    controller = null;
    currentPromptIndex = null;
    switchAgent(key);
    setComposer('Send a message…', false);
    msgsEl.innerHTML = '';

    const wrap = document.createElement('div');
    wrap.className = 'demo-prompts';
    const lbl = document.createElement('p');
    lbl.className = 'demo-prompts-label';
    lbl.textContent = 'Choose something to ask:';
    wrap.appendChild(lbl);

    SCENARIOS[key].prompts.forEach((prompt, i) => {
      const btn = document.createElement('button');
      btn.className = 'demo-prompt-btn';
      btn.innerHTML = '<span class="prompt-arrow" aria-hidden="true">→</span><span>' + prompt.label + '</span>';
      btn.addEventListener('click', () => play(key, i));
      wrap.appendChild(btn);
    });
    msgsEl.appendChild(wrap);
  }

  async function play(key, promptIndex) {
    controller && controller.abort();
    controller = new AbortController();
    const { signal } = controller;
    currentPromptIndex = promptIndex;
    switchAgent(key);

    try {
      const prompt = SCENARIOS[key].prompts[promptIndex];
      msgsEl.innerHTML = '';
      setComposer('Send a message…', false);
      await sleep(280, signal);

      for (const step of prompt.steps) {
        if (step.type === 'user') {
          await typeComposer(step.text, signal);
          const row = addRow('user');
          addBubble(row, step.text);
          addMeta(row, 'user');
          setComposer('Send a message…', false);
          await sleep(360, signal);
          continue;
        }
        if (step.type === 'agent') {
          const thinkRow = showThinking();
          await sleep(700 + Math.random() * 300, signal);
          thinkRow.remove();
          const row = addRow('agent');
          const bubble = addBubble(row, '');
          await streamBubble(bubble, step.text, signal);
          addMeta(row, 'agent');
          await sleep(500, signal);
          continue;
        }
      }
    } catch (e) {
      if (e.name !== 'AbortError') console.error(e);
    }
  }

  tabs.forEach(t => t.addEventListener('click', () => showPrompts(t.dataset.scenario)));
  agentItems.forEach((el, i) => {
    const keys = ['assistant', 'research', 'code'];
    el.addEventListener('click', () => showPrompts(keys[i]));
  });

  showPrompts(currentKey);
})();

// ── Desktop screenshot tab switcher ──
(function () {
  const img = document.getElementById('desktop-shot-img');
  const label = document.getElementById('desktop-shot-label');
  const tabs = document.querySelectorAll('.desktop-shot-tab');
  if (!img || !tabs.length) return;
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => { x.classList.remove('active'); x.setAttribute('aria-selected', 'false'); });
    t.classList.add('active');
    t.setAttribute('aria-selected', 'true');
    img.src = t.dataset.img;
    img.alt = t.dataset.alt;
    if (label) label.textContent = t.dataset.label;
  }));
})();

// ── Ferris wheel feature carousel ──
// The ring spins continuously in one direction, step by step (like cabins loading
// on a real wheel): rotate to the next pod, stop, pop up that feature's text, hold,
// then rotate again. Each pod's icon counter-rotates so it stays upright throughout.
(function () {
  const wheel = document.getElementById('ferris-wheel');
  const ring = document.getElementById('ferris-ring');
  if (!wheel || !ring) return;
  const pods = [...wheel.querySelectorAll('.ferris-pod')];
  const icons = pods.map(p => p.querySelector('.ferris-pod-icon'));
  const panels = [...document.querySelectorAll('.ferris-panel')];
  const count = pods.length;
  const STEP_DEG = 360 / count;
  const HOLD_MS = 1500;   // how long text stays up once the wheel stops
  const SPIN_MS = 900;    // matches the CSS transition duration on .ferris-ring / .ferris-pod-icon
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let step = 0;   // increases forever; active pod = step % count
  let timer = null;
  let paused = false;

  function replay(el) {
    el.classList.remove('chip-play', 'badge-play');
    el.style.animation = 'none';
    void el.offsetHeight; // force reflow so the animation restarts from 0%
    el.style.animation = '';
  }

  function showPanel(idx) {
    panels.forEach(p => {
      const on = +p.dataset.idx === idx;
      p.classList.toggle('active', on);
      if (!on) return;
      const playables = p.querySelectorAll('.feat-chip, .connected-badge, .token-line');
      playables.forEach(replay);
      requestAnimationFrame(() => {
        p.querySelectorAll('.feat-chip, .token-line').forEach(el => el.classList.add('chip-play'));
        p.querySelectorAll('.connected-badge').forEach(el => el.classList.add('badge-play'));
      });
    });
  }

  // Rotates the ring so pod `step % count` sits at the top, keeps every icon upright,
  // then (after the spin finishes) pops up that pod's text.
  function settle() {
    const rotation = -step * STEP_DEG;
    const active = ((step % count) + count) % count;
    ring.style.transform = reduced ? 'none' : `rotate(${rotation}deg)`;
    icons.forEach((icon, i) => {
      const scale = i === active ? ' scale(1.18)' : '';
      icon.style.transform = reduced ? '' : `rotate(${-rotation}deg)${scale}`;
    });
    pods.forEach(p => {
      const on = +p.dataset.idx === active;
      p.classList.toggle('active', on);
      p.setAttribute('aria-selected', String(on));
    });
    if (reduced) { showPanel(active); return; }
    setTimeout(() => showPanel(active), SPIN_MS);
  }

  function scheduleNext() {
    if (paused || reduced) return;
    timer = setTimeout(() => {
      step += 1;
      settle();
      scheduleNext();
    }, SPIN_MS + HOLD_MS);
  }

  function stop() {
    paused = true;
    if (timer) clearTimeout(timer);
    timer = null;
  }
  function start() {
    paused = false;
    scheduleNext();
  }

  pods.forEach(p => {
    p.addEventListener('click', () => {
      const target = +p.dataset.idx;
      const current = ((step % count) + count) % count;
      const delta = ((target - current) + count) % count;
      if (delta > 0) step += delta; // always advance forward, like the real wheel
      settle();
      stop();
      start();
    });
  });
  const wrap = wheel.closest('.ferris-wrap');
  wrap.addEventListener('mouseenter', stop);
  wrap.addEventListener('mouseleave', start);

  settle();
  showPanel(0);
  start();
})();

// ── Subtle parallax on dot grid ──
const heroGrid = document.getElementById('hero-grid');
if (heroGrid && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    heroGrid.style.transform = `translateY(${window.scrollY * 0.15}px)`;
  }, { passive: true });
}

