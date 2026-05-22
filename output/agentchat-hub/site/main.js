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

// ── Terminal typing animation ──
const terminalLines = [
  { type: 'cmd',   text: '$ <span class="tc-accent">connect</span> <span class="tc-secondary">https://research.example.com</span>' },
  { type: 'info',  text: '<span class="tc-accent">&#10003;</span> Agent Card discovered at /.well-known/agent.json' },
  { type: 'info',  text: '<span class="tc-accent">&#10003;</span> Capabilities: streaming, multimodal, push-notifications' },
  { type: 'info',  text: '<span class="tc-accent">&#10003;</span> Session established <span class="tc-muted">(anonymous, on-device)</span>' },
  { type: 'sep',   text: '' },
  { type: 'user',  text: '<span class="tc-accent">you</span>  Summarize the latest A2A protocol spec changes' },
  { type: 'agent', text: '<span class="tc-muted">agent</span> ', words: 'The March revision added three changes: streaming task updates via SSE, a new parts array for multi-modal responses, and push notification support for long-running tasks.' },
];

const termBody = document.getElementById('terminal-body');
const terminal = document.getElementById('terminal');
let termStarted = false;

function createLine(line) {
  const div = document.createElement('div');
  div.className = 'term-line';
  if (line.type === 'cmd' || line.type === 'user') {
    div.className += ' flex items-start gap-3';
    div.innerHTML = line.text;
  } else if (line.type === 'info') {
    div.className += ' pl-6 tc-muted text-xs font-mono';
    div.innerHTML = line.text;
  } else if (line.type === 'sep') {
    div.className = 'term-line glow-line my-4';
  } else if (line.type === 'agent') {
    div.className += ' flex items-start gap-3';
    div.innerHTML = line.text;
    const span = document.createElement('span');
    span.className = 'tc-secondary leading-relaxed';
    span.id = 'agent-response';
    div.appendChild(span);
  }
  return div;
}

async function typeTerminal() {
  for (let i = 0; i < terminalLines.length; i++) {
    const line = terminalLines[i];
    const el = createLine(line);
    termBody.appendChild(el);
    await new Promise(r => setTimeout(r, 80));
    el.classList.add('typed');

    if (line.type === 'agent') {
      const responseEl = el.querySelector('#agent-response');
      const words = line.words.split(' ');
      for (let w = 0; w < words.length; w++) {
        await new Promise(r => setTimeout(r, 40 + Math.random() * 30));
        responseEl.textContent += (w > 0 ? ' ' : '') + words[w];
      }
      const cursor = document.createElement('span');
      cursor.className = 'cursor-blink tc-accent ml-1';
      cursor.textContent = '|';
      responseEl.appendChild(cursor);
      terminal.classList.add('active-glow');
    } else {
      await new Promise(r => setTimeout(r, line.type === 'sep' ? 300 : 150));
    }
  }
}

const termObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !termStarted) {
      termStarted = true;
      setTimeout(typeTerminal, 900);
      termObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
const termWrap = document.getElementById('terminal-wrap');
if (termWrap) termObserver.observe(termWrap);

// ── Subtle parallax on dot grid ──
const heroGrid = document.getElementById('hero-grid');
if (heroGrid && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    heroGrid.style.transform = `translateY(${window.scrollY * 0.15}px)`;
  }, { passive: true });
}

// ── Demo section ──────────────────────────────────────────────────────────────
(function () {
  const SCENARIOS = {
    code: {
      agentIndex: 2,
      url: 'code-agent.fly.dev',
      prompts: [
        {
          label: 'Add input validation to /register',
          steps: [
            { type: 'user', text: 'Add input validation to my /register endpoint — reject blank fields and emails without @.' },
            { type: 'agent', text: 'Here\'s a validator to drop in before you process the form:', code: 'def validate_register(data: dict):\n    email = data.get("email", "").strip()\n    pw    = data.get("password", "")\n    if not email or "@" not in email:\n        return False, "Valid email required"\n    if len(pw) < 8:\n        return False, "Password must be 8+ chars"\n    return True, None' },
            { type: 'user', text: 'Wire it into my existing handler too.' },
            { type: 'agent', text: 'Done — /register now calls validate_register() first and returns 400 with the error message if validation fails. Want me to write a test?' },
          ],
        },
        {
          label: 'Write unit tests for my auth module',
          steps: [
            { type: 'user', text: 'Write unit tests for my JWT auth module. Cover valid token, expired token, and missing token.' },
            { type: 'agent', text: 'Here are three tests covering all three cases:', code: 'def test_valid_token():\n    token = create_token(user_id=42, exp=3600)\n    assert verify_token(token) == {"user_id": 42}\n\ndef test_expired_token():\n    token = create_token(user_id=42, exp=-1)\n    with pytest.raises(TokenExpiredError):\n        verify_token(token)\n\ndef test_missing_token():\n    with pytest.raises(MissingTokenError):\n        verify_token(None)' },
            { type: 'agent', text: 'Run with `pytest -v` — all three should pass. Want me to add a case for tampered signatures too?' },
          ],
        },
        {
          label: 'Refactor a nested callback to async/await',
          steps: [
            { type: 'user', text: 'This nested callback is a mess — refactor it to async/await.' },
            { type: 'agent', text: 'Here\'s the async version — much easier to follow:', code: 'async function loadUserData(userId) {\n    const user    = await fetchUser(userId);\n    const orders  = await fetchOrders(user.id);\n    const details = await fetchOrderDetails(orders[0].id);\n    return { user, orders, details };\n}' },
            { type: 'agent', text: 'Error handling is cleaner too — one try/catch at the call site catches everything. Want me to add that?' },
          ],
        },
      ],
    },
    research: {
      agentIndex: 1,
      url: 'research.my-server.com',
      prompts: [
        {
          label: 'Summarise a research paper',
          steps: [
            { type: 'file', name: 'transformer-paper.pdf', size: '2.4 MB' },
            { type: 'user', text: 'What are the key architectural changes in this paper?' },
            { type: 'agent', text: 'Three main changes over the standard Transformer:\n\n<b>Rotary Position Embeddings (RoPE)</b> — better long-context generalisation than absolute positions.\n\n<b>Grouped-Query Attention (GQA)</b> — shares key/value heads across groups, cutting KV cache memory.\n\n<b>RMS Normalization</b> — faster than LayerNorm with matched accuracy.\n\nWant me to pull related papers on any of these?' },
          ],
        },
        {
          label: 'Find recent papers on a topic',
          steps: [
            { type: 'user', text: 'Find the top 3 papers on efficient attention mechanisms from the last 2 years.' },
            { type: 'agent', text: 'Here are the three most-cited recent works:\n\n<b>FlashAttention-2 (2023)</b> — rewrites the attention kernel for GPU SRAM, 2–4× faster than standard attention.\n\n<b>Ring Attention (2023)</b> — distributes sequence length across devices for million-token contexts.\n\n<b>GQA: Generalised Multi-Query Transformer Models (2023)</b> — the grouped-query method used in LLaMA 2 and Mistral.\n\nWant abstracts or citation details for any of them?' },
          ],
        },
        {
          label: 'Explain a concept in plain English',
          steps: [
            { type: 'user', text: 'Explain chain-of-thought prompting in plain English — like I\'m not an ML engineer.' },
            { type: 'agent', text: 'Imagine asking someone a hard maths problem. If you just say "what\'s the answer?" they might guess. But if you say "think it through step by step" they slow down, reason, and get it right more often.\n\nChain-of-thought prompting does the same thing for AI. Instead of asking for the answer directly, you ask the model to show its working first.\n\nThe model writes out its reasoning, then its conclusion — and that process itself makes the conclusion more accurate.\n\nThat\'s it. It\'s just asking the AI to think out loud.' },
          ],
        },
      ],
    },
    assistant: {
      agentIndex: 0,
      url: 'assistant.local:8080',
      prompts: [
        {
          label: 'Check schedule & move a meeting',
          steps: [
            { type: 'user', text: 'What\'s on my schedule tomorrow, and move the 3 pm call to 4 pm.' },
            { type: 'agent', text: 'Let me check your calendar first —' },
            { type: 'tool', tool: 'read_calendar', params: 'date: "tomorrow"' },
            { type: 'agent', text: 'Tomorrow you have:\n• 10:00 AM — Team standup\n• 2:00 PM — Design review\n• 3:00 PM — Client call with Mehta & Co.\n\nMoving the 3 pm to 4 pm…' },
            { type: 'tool', tool: 'update_event', params: 'id: "call-mehta", start: "16:00"', autoApprove: true },
            { type: 'agent', text: '✓ Done — Mehta & Co. call moved to 4:00 PM.' },
          ],
        },
        {
          label: 'Set a reminder before a meeting',
          steps: [
            { type: 'user', text: 'Set a reminder for my 3 pm call with Mehta & Co. — ping me 10 minutes before.' },
            { type: 'agent', text: 'Creating that reminder —' },
            { type: 'tool', tool: 'create_reminder', params: 'event: "call-mehta", offset_min: 10' },
            { type: 'agent', text: '✓ Done — you\'ll get a ping at 2:50 PM, 10 minutes before the Mehta & Co. call.' },
          ],
        },
        {
          label: 'Draft an email to the team',
          steps: [
            { type: 'user', text: 'Draft a quick email to my team about tomorrow\'s design review moving to 4 pm.' },
            { type: 'agent', text: 'Here\'s a short draft:\n\n<b>Subject:</b> Design review moved to 4 pm tomorrow\n\nHi team,\n\nQuick heads-up — tomorrow\'s design review is moving from 2 pm to 4 pm. Same room, same agenda.\n\nLet me know if 4 pm doesn\'t work for anyone.\n\nThanks\n\nWant me to send it, or would you like to edit it first?' },
          ],
        },
      ],
    },
  };

  const msgsEl       = document.getElementById('demo-msgs');
  const composerText = document.getElementById('demo-composer-text');
  const connUrlEl    = document.getElementById('demo-conn-url');
  const agentItems   = document.querySelectorAll('.demo-agent-item');
  const tabs         = document.querySelectorAll('.demo-tab');
  const replayBtn    = document.getElementById('demo-replay-btn');

  if (!msgsEl) return;

  let currentKey         = 'code';
  let currentPromptIndex = null;
  let controller         = null;

  function sleep(ms, signal) {
    return new Promise((resolve, reject) => {
      if (signal.aborted) { reject(new DOMException('Aborted', 'AbortError')); return; }
      const t = setTimeout(resolve, ms);
      signal.addEventListener('abort', () => {
        clearTimeout(t);
        reject(new DOMException('Aborted', 'AbortError'));
      }, { once: true });
    });
  }

  function setComposer(text, typing) {
    composerText.textContent = text;
    composerText.className   = typing ? 'dc-typing' : 'dc-placeholder';
  }

  async function typeComposer(text, signal) {
    setComposer('', true);
    for (const ch of text) {
      await sleep(22 + Math.random() * 22, signal);
      composerText.textContent += ch;
    }
    await sleep(320, signal);
    setComposer('Send a message…', false);
  }

  function addRow(side) {
    const row = document.createElement('div');
    row.className = 'dmsg-row ' + side;
    const lbl = document.createElement('div');
    lbl.className = 'dmsg-lbl';
    lbl.textContent = side === 'user' ? 'You' : 'Agent';
    row.appendChild(lbl);
    msgsEl.appendChild(row);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return row;
  }

  function addBubble(row, html) {
    const b = document.createElement('div');
    b.className = 'dmsg-bubble';
    b.innerHTML = html;
    row.appendChild(b);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return b;
  }

  async function streamBubble(bubble, text, signal) {
    const cursor = '<span class="dmsg-cursor"></span>';
    let built = '';
    bubble.innerHTML = cursor;
    for (const ch of text) {
      await sleep(10 + Math.random() * 14, signal);
      built += ch;
      bubble.innerHTML = built.replace(/\n/g, '<br>') + cursor;
      msgsEl.scrollTop = msgsEl.scrollHeight;
    }
    bubble.innerHTML = built.replace(/\n/g, '<br>');
  }

  function addFileChip(name, size) {
    const chip = document.createElement('div');
    chip.className = 'file-chip-msg';
    chip.innerHTML = '<span style="font-size:15px">📎</span>'
      + '<div style="display:flex;flex-direction:column;gap:1px">'
      + '<span class="file-chip-name">' + name + '</span>'
      + '<span class="file-chip-sz">' + size + '</span></div>';
    msgsEl.appendChild(chip);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function showThinking() {
    const row = document.createElement('div');
    row.className = 'dmsg-row agent';
    const lbl = document.createElement('div');
    lbl.className = 'dmsg-lbl';
    lbl.textContent = 'Agent';
    const dots = document.createElement('div');
    dots.className = 'thinking-dots';
    dots.innerHTML = '<div class="t-dot"></div><div class="t-dot"></div><div class="t-dot"></div>';
    row.appendChild(lbl);
    row.appendChild(dots);
    msgsEl.appendChild(row);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return row;
  }

  function addToolCall(tool, params, autoApprove, signal) {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.innerHTML = '<div class="tool-card-hdr">'
      + '<svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="7" cy="7" r="5.5"/><line x1="7" y1="4.5" x2="7" y2="7"/><circle cx="7" cy="9.5" r=".5" fill="currentColor"/></svg>'
      + ' Agent wants to run a tool</div>'
      + '<div class="tool-card-body">'
      + '<div class="tool-fn">' + tool + '()</div>'
      + '<div class="tool-params">' + params + '</div>'
      + '<div class="tool-actions">'
      + '<button class="tc-btn tc-deny">Deny</button>'
      + '<button class="tc-btn tc-always">Always allow</button>'
      + '<button class="tc-btn tc-once">Allow once</button>'
      + '</div></div>';
    const row = document.createElement('div');
    row.className = 'dmsg-row agent';
    const lbl = document.createElement('div');
    lbl.className = 'dmsg-lbl';
    lbl.textContent = 'Tool Request';
    row.appendChild(lbl);
    row.appendChild(card);
    msgsEl.appendChild(row);
    msgsEl.scrollTop = msgsEl.scrollHeight;

    return new Promise((resolve) => {
      function approve(denied) {
        card.classList.add('tc-approved');
        const actions = card.querySelector('.tool-actions');
        if (actions) actions.style.display = 'none';
        const hdr = card.querySelector('.tool-card-hdr');
        if (denied) {
          hdr.innerHTML = '<span>✗</span> Tool denied';
          hdr.style.color = '#EF4444';
        } else {
          hdr.innerHTML = '<svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><polyline points="2,7 5.5,10.5 12,3"/></svg> Tool approved';
          const badge = document.createElement('div');
          badge.className = 'tc-approved-badge';
          badge.textContent = '✓ Approved';
          card.querySelector('.tool-card-body').appendChild(badge);
        }
        setTimeout(resolve, 280);
      }

      if (autoApprove) { setTimeout(() => approve(false), 700); return; }

      const autoTimer = setTimeout(() => approve(false), 4200);
      card.querySelector('.tc-once').addEventListener('click', () => { clearTimeout(autoTimer); approve(false); });
      card.querySelector('.tc-always').addEventListener('click', () => { clearTimeout(autoTimer); approve(false); });
      card.querySelector('.tc-deny').addEventListener('click', () => { clearTimeout(autoTimer); approve(true); });
      signal.addEventListener('abort', () => { clearTimeout(autoTimer); resolve(); }, { once: true });
    });
  }

  // Show 3 clickable prompt options for the selected scenario
  function showPrompts(key) {
    controller && controller.abort();
    controller = null;
    currentPromptIndex = null;

    const sc = SCENARIOS[key];
    agentItems.forEach((el, i) => el.classList.toggle('active', i === sc.agentIndex));
    if (connUrlEl) connUrlEl.textContent = sc.url;
    setComposer('Send a message…', false);

    msgsEl.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'demo-prompts';

    const lbl = document.createElement('p');
    lbl.className = 'demo-prompts-label';
    lbl.textContent = 'Choose something to ask:';
    wrap.appendChild(lbl);

    sc.prompts.forEach((prompt, i) => {
      const btn = document.createElement('button');
      btn.className = 'demo-prompt-btn';
      btn.innerHTML = '<span class="prompt-arrow" aria-hidden="true">→</span><span>' + prompt.label + '</span>';
      btn.addEventListener('click', () => play(key, i));
      wrap.appendChild(btn);
    });

    msgsEl.appendChild(wrap);
  }

  function showIdle() {
    controller && controller.abort();
    controller = null;
    msgsEl.innerHTML = '<div class="demo-idle-hint">← Pick a scenario tab to begin</div>';
    agentItems.forEach(el => el.classList.remove('active'));
    setComposer('Send a message…', false);
  }

  async function play(key, promptIndex) {
    controller && controller.abort();
    controller = new AbortController();
    const { signal } = controller;
    currentPromptIndex = promptIndex;

    try {
      const sc     = SCENARIOS[key];
      const prompt = sc.prompts[promptIndex];
      msgsEl.innerHTML = '';
      setComposer('Send a message…', false);
      await sleep(280, signal);

      for (const step of prompt.steps) {
        if (step.type === 'file') {
          addFileChip(step.name, step.size);
          await sleep(520, signal);
          continue;
        }
        if (step.type === 'user') {
          await typeComposer(step.text, signal);
          const row = addRow('user');
          addBubble(row, step.text);
          await sleep(360, signal);
          continue;
        }
        if (step.type === 'agent') {
          const thinkRow = showThinking();
          await sleep(780 + Math.random() * 320, signal);
          thinkRow.remove();
          const row    = addRow('agent');
          const bubble = addBubble(row, '');
          await streamBubble(bubble, step.text, signal);
          if (step.code) {
            const pre = document.createElement('div');
            pre.className = 'dmsg-code';
            pre.textContent = step.code;
            bubble.appendChild(pre);
            msgsEl.scrollTop = msgsEl.scrollHeight;
          }
          await sleep(620, signal);
          continue;
        }
        if (step.type === 'tool') {
          await addToolCall(step.tool, step.params, step.autoApprove, signal);
          await sleep(360, signal);
          continue;
        }
      }
    } catch (e) {
      if (e.name !== 'AbortError') console.error(e);
    }
  }

  function switchTo(key) {
    currentKey = key;
    tabs.forEach(t => {
      const on = t.dataset.scenario === key;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', String(on));
    });
    showPrompts(key);
  }

  tabs.forEach(t => t.addEventListener('click', () => switchTo(t.dataset.scenario)));

  // Replay: re-run last prompt, or re-show prompts if none played yet
  replayBtn && replayBtn.addEventListener('click', () => {
    if (currentPromptIndex !== null) {
      play(currentKey, currentPromptIndex);
    } else {
      showPrompts(currentKey);
    }
  });

  agentItems.forEach((el, i) => {
    const keys = ['assistant', 'research', 'code'];
    el.addEventListener('click', () => switchTo(keys[i]));
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') switchTo(keys[i]); });
  });

  showIdle();
})();
