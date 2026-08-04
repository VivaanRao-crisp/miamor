/* ================================================================
   MIAMOR — script.js
   Part 1:  Terminal Gate
   Part 2:  Memory Album (Month Grid + Detail)
   Part 3:  Add Memory System
================================================================ */

'use strict';

/* ╔══════════════════════════════════════════════════════════════════╗
   ║  PART 1 — TERMINAL GATE                                         ║
   ╚══════════════════════════════════════════════════════════════════╝ */

const TERMINAL_CONFIG = {
  password: '141025',
  hint: 'the day',
};

const ADD_CONFIG = {
  password: 'mybaby',
};

/* ── Boot sequence lines ── */
const BOOT_LINES = [
  { text: 'MIAMOR OS  v1.0.0  [BUILD 20240101]', cls: 'term-bold', delay: 0 },
  { text: 'Memory Archive & Emotional Backup System', cls: 'term-dim', delay: 180 },
  { text: '─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─', cls: 'term-sep', delay: 280 },
  { text: '[ OK ]  Initializing memory sectors...', cls: 'term-ok', delay: 400 },
  { text: '[ OK ]  Loading love_archive.tar.gz...', cls: 'term-ok', delay: 650 },
  { text: '[ OK ]  Decrypting emotional_backup.db...', cls: 'term-ok', delay: 900 },
  { text: '[ OK ]  Bypassing rational_thought.exe...', cls: 'term-ok', delay: 1150 },
  { text: '[ OK ]  Calibrating heartbeat_monitor.sh...', cls: 'term-ok', delay: 1400 },
  { text: '[ OK ]  Running pasandida_protocol.sh...', cls: 'term-ok', delay: 1650 },
  { text: '[ OK ]  Mounting /home/meri_jaan/...', cls: 'term-ok', delay: 1900 },
  { text: '─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─', cls: 'term-sep', delay: 2100 },
  { text: 'All systems nominal. Standing by.', cls: 'term-bold', delay: 2300 },
  { text: '─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─', cls: 'term-sep', delay: 2500 },
];

const WRONG_MESSAGES = [
  'ACCESS DENIED. That\'s not it. Try again.',
  'ACCESS DENIED. Still no. Come on.',
  'ACCESS DENIED. Are you okay? 💀',
  'ACCESS DENIED. Bestie…',
  'ACCESS DENIED. I believe in you. Probably.',
];

/* ── Terminal state ── */
const termState = {
  phase: 'booting',   // 'booting' | 'password'
  inputBuffer: '',
  wrongCount: 0,
  overlay: null,
  output: null,
  display: null,
  cursor: null,
  hiddenInput: null,
};

/* ── Helpers ── */
const sleep = ms => new Promise(r => setTimeout(r, ms));

function printLine(text, cls = 'term-line') {
  const line = document.createElement('span');
  line.className = `term-line ${cls}`;
  line.textContent = text;
  termState.output.appendChild(line);
  termState.output.appendChild(document.createElement('br'));
  scrollToBottom();
}

function printBox(lines) {
  const wrapper = document.createElement('div');
  wrapper.className = 'term-box';
  lines.forEach(({ text, cls }) => {
    const s = document.createElement('span');
    s.className = `term-line ${cls || 'term-box-line'}`;
    s.textContent = text;
    wrapper.appendChild(s);
    wrapper.appendChild(document.createElement('br'));
  });
  termState.output.appendChild(wrapper);
  scrollToBottom();
}

function scrollToBottom() {
  const screen = document.getElementById('terminal-screen');
  if (screen) screen.scrollTop = screen.scrollHeight;
}

function updateDisplay() {
  const stars = '●'.repeat(termState.inputBuffer.length);
  termState.display.textContent = stars;
}

/* ── Boot sequence ── */
async function runBootSequence() {
  for (const line of BOOT_LINES) {
    await sleep(line.delay);
    printLine(line.text, line.cls);
  }
  await sleep(400);
  showPasswordPrompt();
}

function showPasswordPrompt() {
  termState.phase = 'password';

  printBox([
    { text: '  RESTRICTED ACCESS PORTAL', cls: 'term-bold' },
    { text: '  This system is for authorized eyes only.', cls: 'term-box-line' },
    { text: '  You know exactly who you are.  ♥', cls: 'term-pink' },
  ]);

  const hintNote = document.createElement('span');
  hintNote.className = 'term-line term-hint-avail';
  hintNote.textContent = 'Hint available — type  hint  at the prompt.';
  termState.output.appendChild(hintNote);
  termState.output.appendChild(document.createElement('br'));

  termState.hiddenInput.focus();
  scrollToBottom();
}

/* ── Input handling ── */
function processInput(key) {
  if (termState.phase !== 'password') return;

  if (key === 'Enter') {
    const val = termState.inputBuffer;
    termState.inputBuffer = '';
    updateDisplay();

    printLine('passphrase: ' + '●'.repeat(val.length), 'term-dim');
    document.getElementById('terminal-input-line').style.display = 'none';

    if (val.toLowerCase() === 'hint') {
      handleHint();
    } else if (val === TERMINAL_CONFIG.password) {
      handleSuccess();
    } else {
      handleWrongPassword();
    }

  } else if (key === 'Backspace') {
    termState.inputBuffer = termState.inputBuffer.slice(0, -1);
    updateDisplay();
  } else if (key.length === 1) {
    termState.inputBuffer += key;
    updateDisplay();
  }
}

function handleHint() {
  printLine('HINT ▶', 'term-bold');
  printLine(TERMINAL_CONFIG.hint, 'term-blue');

  setTimeout(() => {
    document.getElementById('terminal-input-line').style.display = 'flex';
    termState.hiddenInput.focus();
    scrollToBottom();
  }, 600);
}

function handleWrongPassword() {
  const msg = WRONG_MESSAGES[Math.min(termState.wrongCount, WRONG_MESSAGES.length - 1)];
  termState.wrongCount++;
  printLine(msg, 'term-red');

  setTimeout(() => {
    document.getElementById('terminal-input-line').style.display = 'flex';
    termState.hiddenInput.focus();
    scrollToBottom();
  }, 700);
}

async function handleSuccess() {
  printLine('ACCESS GRANTED.', 'term-grant');
  printLine('Identity confirmed. Welcome, my love. ♥', 'term-grant');
  await sleep(400);
  printLine('Decrypting memories...', 'term-decrypt');
  await sleep(500);
  printLine('Rendering love_archive...', 'term-decrypt');
  await sleep(600);

  termState.overlay.classList.add('glitch-out');
  await sleep(700);

  const mainSite = document.getElementById('main-site');
  mainSite.style.display = 'block';
  await sleep(50);
  mainSite.classList.add('revealed');

  await sleep(400);
  termState.overlay.style.display = 'none';

  initMainSite();
}

/* ── Init terminal ── */
function initTerminal() {
  termState.overlay = document.getElementById('terminal-overlay');
  termState.output = document.getElementById('terminal-output');
  termState.display = document.getElementById('term-display');
  termState.cursor = document.getElementById('term-cursor');
  termState.hiddenInput = document.getElementById('term-hidden-input');

  /* Desktop: keyboard on document */
  document.addEventListener('keydown', e => {
    if (termState.phase !== 'password') return;
    // Skip if the hidden input itself fired this (mobile path handles it)
    if (document.activeElement === termState.hiddenInput) return;
    if (['Tab', 'Escape', 'F1', 'F2', 'F3', 'F4', 'F5'].includes(e.key)) return;
    if (e.ctrlKey || e.metaKey) return;
    e.preventDefault();
    processInput(e.key);
  });

  /* Mobile: hidden input captures typed characters */
  termState.hiddenInput.addEventListener('input', function () {
    const chars = this.value;
    this.value = '';
    for (const ch of chars) {
      if (ch !== '\n' && ch !== '\r') processInput(ch);
    }
  });
  termState.hiddenInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); processInput('Enter'); }
    if (e.key === 'Backspace') { e.preventDefault(); processInput('Backspace'); }
  });

  /* Tap to focus on mobile */
  termState.overlay.addEventListener('click', () => {
    if (termState.phase === 'password') termState.hiddenInput.focus();
  });

  runBootSequence();
}

document.addEventListener('DOMContentLoaded', initTerminal);


/* ╔══════════════════════════════════════════════════════════════════╗
   ║  PART 2 — MEMORY ALBUM                                          ║
   ╚══════════════════════════════════════════════════════════════════╝ */

/* ── M-1: Memories data ── */
const memories = [
  {
    id: 'mem-01',
    monthKey: '2023-02',
    date: 'Feb 14, 2023',
    title: 'The Day My Brain Malfunctioned 🌷',
    photoUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80',
    caption: 'i literally short-circuited. you walked in and my internal monologue went "oh. oh no. oh no no no." and here we are, completely deranged about each other. love that journey for us.',
    vibe: 'the beginning of everything 🥹',
  },
  {
    id: 'mem-02',
    monthKey: '2023-04',
    date: 'Apr 3, 2023',
    title: 'Long Drive, Zero Sense of Direction 🌅',
    photoUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    caption: 'you confidently gave wrong directions for 45 minutes and blamed Google Maps. I would follow you off a cliff and still call it the best adventure. that\'s concerning but also very us.',
    vibe: 'chaotic but make it romantic',
  },
  {
    id: 'mem-03',
    monthKey: '2023-04',
    date: 'Apr 22, 2023',
    title: 'That Random Tuesday ✨',
    photoUrl: 'https://images.unsplash.com/photo-1543470373-e055b73a8f29?w=800&q=80',
    caption: 'nothing happened. we just sat there. and it was somehow the best day. that\'s how I know you\'re it for me — even boring days with you are my favorite.',
    vibe: 'domestic behavior 🏡',
  },
  {
    id: 'mem-04',
    monthKey: '2023-06',
    date: 'Jun 12, 2023',
    title: 'Caught in the Rain (Again) 🌧️',
    photoUrl: 'https://images.unsplash.com/photo-1428592953211-077101b2021b?w=800&q=80',
    caption: 'we were supposed to be prepared. we were not. you laughed instead of being upset and I thought "yeah I\'m keeping this one." absolutely unhinged behavior, no notes.',
    vibe: 'completely unhinged 💀',
  },
  {
    id: 'mem-05',
    monthKey: '2023-06',
    date: 'Jun 28, 2023',
    title: 'Midnight Ice Cream Crisis 🍦',
    photoUrl: 'https://images.unsplash.com/photo-1567206563114-c179706f56c8?w=800&q=80',
    caption: '2am. two idiots. an ice cream run that turned into a 3-hour parking lot conversation about life, dreams, us. peak us behavior. I\'d do it again right now tbh.',
    vibe: 'certified night owls 🦉',
  },
  {
    id: 'mem-06',
    monthKey: '2023-12',
    date: 'Dec 25, 2023',
    title: 'Christmas Together 🎄',
    photoUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80',
    caption: 'you gave me the most thoughtful thing and then got embarrassed when I cried. we\'re both so emotionally unhinged in the best way. best christmas I\'ve ever had, no contest.',
    vibe: 'soft hours ✨',
  },
  {
    id: 'mem-07',
    monthKey: '2023-12',
    date: 'Dec 31, 2023',
    title: 'NYE and Your Countdown Was Off 🎆',
    photoUrl: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&q=80',
    caption: 'you counted down from 10 starting at 7. the whole crowd was confused. I have never been more in love. the fireworks were pretty but I was only looking at you. embarrassing fr.',
    vibe: 'married behavior 💍',
  },
  {
    id: 'mem-08',
    monthKey: '2024-03',
    date: 'Mar 15, 2024',
    title: 'Cherry Blossom Walk 🌸',
    photoUrl: 'https://images.unsplash.com/photo-1477240756524-f9adeef00c62?w=800&q=80',
    caption: 'petals landed in your hair and you didn\'t notice. I let it stay there for 20 minutes because you looked like a main character. I am not normal about you. This is fine.',
    vibe: 'main character hours 🎬',
  },
  {
    id: 'mem-09',
    monthKey: '2024-03',
    date: 'Mar 29, 2024',
    title: 'That Spontaneous Trip 🗺️',
    photoUrl: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80',
    caption: 'zero planning. complete chaos. somehow the best 48 hours of my life. we are so bad at being responsible adults and so good at being us. trade offer: keep doing this forever.',
    vibe: 'no thoughts just vibes',
  },
  {
    id: 'mem-10',
    monthKey: '2024-07',
    date: 'Jul 4, 2024',
    title: 'Rooftop Fireworks 🎆',
    photoUrl: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=800&q=80',
    caption: 'the sky was literally exploding and you were worried about whether I was cold. you gave me your jacket. I am not okay. have not been okay since. this is your fault.',
    vibe: 'criminally sweet 🥺',
  },
  {
    id: 'mem-11',
    monthKey: '2024-07',
    date: 'Jul 20, 2024',
    title: 'That Argument We Had 💀',
    photoUrl: '',
    caption: 'we argued about something so unimportant I genuinely cannot remember what it was. made up in 20 minutes. spent 40 minutes laughing about how dramatic we were. we\'re insane and I love it.',
    vibe: 'healthy chaos 💪',
  },
  {
    id: 'mem-12',
    monthKey: '2026-08',
    date: 'Aug 1, 2026',
    title: 'Always & Forever 💛',
    photoUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80',
    caption: 'every single ordinary day with you. the texts, the voice notes, the 1am conversations, the dumb jokes nobody else gets. i am so lucky it\'s actually unreal. you are my whole world.',
    vibe: 'genuinely obsessed 🐱',
  },
];

/* ── M-2: Month palette ── */
const MONTH_PALETTE = [
  { bg: '#fff0f5', light: '#ffd6e7', accent: '#e8528c', border: '#ffa8cc' }, // pink
  { bg: '#f0faf4', light: '#c8ecd8', accent: '#3a9e5f', border: '#90d4ac' }, // green
  { bg: '#f8f4ff', light: '#ddd0f8', accent: '#7c5cbf', border: '#c0a8f0' }, // purple
  { bg: '#fff8f0', light: '#ffddb8', accent: '#e07820', border: '#ffc080' }, // orange
  { bg: '#f0f8ff', light: '#c8e4f8', accent: '#2888d0', border: '#90c8f0' }, // blue
  { bg: '#fffbf0', light: '#ffe8a0', accent: '#c89000', border: '#ffd060' }, // gold
  { bg: '#fff4f2', light: '#ffc8c0', accent: '#e04040', border: '#f09080' }, // coral
  { bg: '#f0fffc', light: '#b8f0e8', accent: '#168a70', border: '#70d8c8' }, // teal
];

const MONTH_EMOJIS = {
  '01': '❄️', '02': '💕', '03': '🌸', '04': '🌷',
  '05': '🌻', '06': '🌊', '07': '🍦', '08': '🎆',
  '09': '🍁', '10': '🎃', '11': '🍂', '12': '✨',
};

/* ── M-3: Utility functions ── */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatMonthKey(key) {
  const [y, m] = key.split('-');
  const d = new Date(+y, +m - 1, 1);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function getMonthEmoji(key) {
  const m = key.split('-')[1];
  return MONTH_EMOJIS[m] || '📸';
}

function getPalette(index) {
  return MONTH_PALETTE[index % MONTH_PALETTE.length];
}

function groupByMonth(allMems) {
  const map = {};
  allMems.forEach(m => {
    const k = m.monthKey || 'unknown';
    if (!map[k]) map[k] = [];
    map[k].push(m);
  });
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, mems]) => ({ key, mems }));
}

/* ── M-4: Navigation state ── */
let currentDetailKey = null;

/* ── M-5: Render month grid ── */
function renderMonthGrid() {
  const custom = loadCustomMemories();
  const all = [...memories, ...custom];
  const groups = groupByMonth(all);
  const grid = document.getElementById('month-grid');
  grid.innerHTML = '';

  if (groups.length === 0) {
    grid.innerHTML = '<p style="text-align:center;color:var(--text-muted);font-style:italic;">No memories yet. Add your first one! 🐱</p>';
    return;
  }

  groups.forEach(({ key, mems }, i) => {
    const palette = getPalette(i);
    const card = buildMonthCard(key, mems, palette, i);
    grid.appendChild(card);
  });
}

function buildMonthCard(key, mems, palette, paletteIdx) {
  const card = document.createElement('div');
  card.className = 'month-card';
  card.setAttribute('role', 'listitem');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `Open ${formatMonthKey(key)}, ${mems.length} memories`);
  card.style.cssText = `
    --mc-bg: ${palette.bg};
    --mc-light: ${palette.light};
    --mc-accent: ${palette.accent};
    --mc-border: ${palette.border};
  `;

  /* Photo thumbnails (up to 4) */
  const photos = mems.filter(m => m.photoUrl).slice(0, 4);
  const cnt = Math.min(photos.length, 4);

  let photosHTML = '';
  photos.forEach((m, idx) => {
    const isLast = idx === 3 && mems.filter(x => x.photoUrl).length > 4;
    const extraCnt = mems.filter(x => x.photoUrl).length - 4;
    const extraHTML = isLast
      ? `<div class="month-thumb-extra">+${extraCnt}</div>`
      : '';
    photosHTML += `<div class="month-thumb" style="background-image:url('${escapeHTML(m.photoUrl)}')">${extraHTML}</div>`;
  });

  const photoClass = cnt === 0 ? 'cnt-0' : `cnt-${Math.min(cnt, 4)}`;
  const emojiDisplay = cnt === 0
    ? `<div class="month-emoji-bg">${getMonthEmoji(key)}</div>`
    : '';

  /* Vibe from first memory that has one */
  const vibeSource = mems.find(m => m.vibe);
  const vibeText = vibeSource ? vibeSource.vibe : `${mems.length} moment${mems.length !== 1 ? 's' : ''} ♡`;

  card.innerHTML = `
    <div class="month-card-photos ${photoClass}">
      ${emojiDisplay}${photosHTML}
    </div>
    <div class="month-card-info">
      <div class="month-card-top">
        <span class="month-card-emoji">${getMonthEmoji(key)}</span>
        <h3 class="month-card-name">${formatMonthKey(key)}</h3>
      </div>
      <div class="month-card-count">♡ ${mems.length} ${mems.length === 1 ? 'memory' : 'memories'}</div>
      <div class="month-card-vibe">${escapeHTML(vibeText)}</div>
    </div>
  `;

  card.addEventListener('click', () => showMonthDetail(key, mems, palette));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showMonthDetail(key, mems, palette); }
  });

  return card;
}

/* ── M-6: Month detail view ── */
function showMonthDetail(key, mems, palette) {
  currentDetailKey = key;

  const emoji = getMonthEmoji(key);
  document.getElementById('detail-title').textContent = `${emoji} ${formatMonthKey(key)}`;
  document.getElementById('detail-sub').textContent =
    `${mems.length} ${mems.length === 1 ? 'memory' : 'memories'} saved 🐱`;

  /* Build memory cards */
  const grid = document.getElementById('detail-grid');
  grid.innerHTML = '';
  mems.forEach(m => {
    const card = buildDetailCard(m, palette);
    grid.appendChild(card);
  });

  /* Transition */
  const gridView = document.getElementById('month-grid-view');
  const detailView = document.getElementById('month-detail-view');

  gridView.classList.add('view--hidden');
  detailView.removeAttribute('aria-hidden');
  detailView.classList.remove('view--hidden');
  detailView.style.position = 'relative';
  detailView.style.transform = '';
  detailView.style.opacity = '';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToGrid() {
  currentDetailKey = null;

  const gridView = document.getElementById('month-grid-view');
  const detailView = document.getElementById('month-detail-view');

  detailView.classList.add('view--hidden');
  detailView.setAttribute('aria-hidden', 'true');
  gridView.classList.remove('view--hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── M-7: Detail memory cards ── */
function buildDetailCard(memory, palette) {
  const card = document.createElement('div');
  card.setAttribute('role', 'listitem');

  if (memory.photoUrl) {
    card.className = 'detail-card has-photo';
    card.innerHTML = `
      <img class="card-photo" src="${escapeHTML(memory.photoUrl)}" alt="${escapeHTML(memory.title)}" loading="lazy" />
      <div class="card-overlay">
        <div class="card-overlay-date">${escapeHTML(memory.date)}</div>
        <div class="card-overlay-title">${escapeHTML(memory.title)}</div>
      </div>
      ${memory.vibe ? `<div class="card-vibe-badge">${escapeHTML(memory.vibe)}</div>` : ''}
    `;
  } else {
    card.className = 'detail-card no-photo';
    card.style.cssText = `
      --dc-bg: ${palette.bg};
      --dc-border: ${palette.border};
      --dc-accent: ${palette.accent};
    `;
    const captionPreview = memory.caption.length > 120
      ? memory.caption.slice(0, 120) + '…'
      : memory.caption;
    card.innerHTML = `
      <div class="card-date">${escapeHTML(memory.date)}</div>
      <div class="card-title">${escapeHTML(memory.title)}</div>
      <div class="card-caption">${escapeHTML(captionPreview)}</div>
      ${memory.vibe ? `<div class="card-vibe-tag">${escapeHTML(memory.vibe)}</div>` : ''}
    `;
  }

  card.addEventListener('click', () => openModal(memory));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(memory); }
  });
  card.setAttribute('tabindex', '0');
  card.style.cursor = 'pointer';

  return card;
}

/* ── M-8: Lightbox modal ── */
function openModal(memory) {
  const overlay = document.getElementById('modal-overlay');
  const photo = document.getElementById('modal-photo');
  const dateEl = document.getElementById('modal-date');
  const titleEl = document.getElementById('modal-title');
  const captEl = document.getElementById('modal-caption');
  const vibeEl = document.getElementById('modal-vibe');

  const photoWrap = document.querySelector('.modal__photo-wrap');

  if (memory.photoUrl) {
    photoWrap.style.display = '';
    photo.src = memory.photoUrl;
    photo.alt = memory.title;
  } else {
    photoWrap.style.display = 'none';
  }

  dateEl.textContent = memory.date;
  titleEl.textContent = memory.title;
  captEl.textContent = memory.caption;
  vibeEl.textContent = memory.vibe || '';

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  overlay.focus();
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── M-9: Floating petals ── */
function createPetals() {
  const container = document.getElementById('petals-container');
  const petals = ['🌸', '🌺', '🌷', '🍀', '🌿', '✿', '♡', '🌼'];

  for (let i = 0; i < 18; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = petals[Math.floor(Math.random() * petals.length)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (12 + Math.random() * 16) + 's';
    p.style.animationDelay = (Math.random() * 20) + 's';
    p.style.fontSize = (0.7 + Math.random() * 0.6) + 'rem';
    p.style.opacity = (0.3 + Math.random() * 0.4).toString();
    container.appendChild(p);
  }
}

/* ── M-10: Init main site ── */
function initMainSite() {
  createPetals();

  /* Modal close */
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target.id === 'modal-overlay') closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
      if (document.getElementById('add-modal').open) closeAddModal();
      if (document.getElementById('admin-modal').open) closeAdminModal();
    }
  });

  /* Back button */
  document.getElementById('back-btn').addEventListener('click', backToGrid);

  /* Render the month grid */
  renderMonthGrid();

  /* Init add-memory system */
  initAddMemorySystem();
}


/* ╔══════════════════════════════════════════════════════════════════╗
   ║  PART 3 — ADD MEMORY SYSTEM                                     ║
   ╚══════════════════════════════════════════════════════════════════╝ */

/* ── Persistence ── */
function loadCustomMemories() {
  try {
    const raw = localStorage.getItem('miamor_custom_memories');
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveCustomMemories(arr) {
  try {
    localStorage.setItem('miamor_custom_memories', JSON.stringify(arr));
  } catch (e) {
    console.warn('miamor: localStorage save failed', e);
  }
}

/* ── Date → monthKey ── */
function parseDateToMonthKey(dateStr) {
  if (!dateStr) return currentMonthKey();

  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }

  const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
  const lower = dateStr.toLowerCase();
  let mi = -1;
  months.forEach((name, i) => { if (lower.includes(name)) mi = i; });
  const yearM = dateStr.match(/\b(20\d{2})\b/);
  if (mi >= 0 && yearM) {
    return `${yearM[1]}-${String(mi + 1).padStart(2, '0')}`;
  }

  return currentMonthKey();
}

function currentMonthKey() {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}`;
}

/* ── Admin gate ── */
let adminSessionUnlocked = false;

const adminDialog = () => document.getElementById('admin-modal');
const addDialog   = () => document.getElementById('add-modal');

function openAdminModal() {
  if (adminSessionUnlocked) {
    openAddModal();
    return;
  }
  const dlg = adminDialog();
  document.getElementById('admin-pw').value = '';
  document.getElementById('admin-err').textContent = '';
  dlg.showModal();
  document.getElementById('admin-pw').focus();
}

function closeAdminModal() {
  const dlg = adminDialog();
  if (dlg.open) dlg.close();
}

function checkAdminPassword() {
  const dlg = adminDialog();
  if (!dlg.open) return;

  const val = document.getElementById('admin-pw').value;

  if (val === ADD_CONFIG.password) {
    adminSessionUnlocked = true;
    closeAdminModal();
    openAddModal();
  } else {
    document.getElementById('admin-err').textContent = "Hmm, that's not right. Try again. 🌿";
    document.getElementById('admin-pw').value = '';
    document.getElementById('admin-pw').focus();
    const card = document.querySelector('.admin-card');
    card.style.animation = 'none';
    requestAnimationFrame(() => { card.style.animation = 'adminShake 0.4s ease'; });
  }
}

/* ── Add memory form ── */
function openAddModal() {
  const dlg = addDialog();
  document.getElementById('add-form').reset();
  document.getElementById('add-err').textContent = '';
  document.getElementById('af-preview').classList.remove('has-image');
  document.getElementById('af-preview-img').src = '';
  dlg.showModal();
  document.getElementById('af-date').focus();
}

function closeAddModal() {
  const dlg = addDialog();
  if (dlg.open) dlg.close();
}

function handleAddMemorySubmit(e) {
  e.preventDefault();

  const date    = document.getElementById('af-date').value.trim();
  const title   = document.getElementById('af-title').value.trim();
  const vibe    = document.getElementById('af-vibe').value.trim();
  const photo   = document.getElementById('af-photo').value.trim();
  const caption = document.getElementById('af-caption').value.trim();
  const errEl   = document.getElementById('add-err');

  if (!date || !title || !caption) {
    errEl.textContent = 'Please fill in the date, title, and caption ✦';
    return;
  }
  errEl.textContent = '';

  const monthKey = parseDateToMonthKey(date);
  const memory = {
    id:       'custom-' + Date.now(),
    monthKey,
    date,
    title,
    vibe:     vibe || null,
    photoUrl: photo || '',
    caption,
  };

  const existing = loadCustomMemories();
  existing.push(memory);
  saveCustomMemories(existing);

  closeAddModal();

  if (currentDetailKey) backToGrid();
  renderMonthGrid();
  showToast('Memory saved! 💛 It\'s in your album now.');
}

/* ── Photo preview (debounced) ── */
function debounce(fn, delay) {
  let t;
  return function (...args) { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), delay); };
}

const updatePhotoPreview = debounce(function (url) {
  const preview = document.getElementById('af-preview');
  const img     = document.getElementById('af-preview-img');
  if (!url) { preview.classList.remove('has-image'); img.src = ''; return; }
  img.onload  = () => preview.classList.add('has-image');
  img.onerror = () => preview.classList.remove('has-image');
  img.src = url;
}, 600);

/* ── Toast ── */
function showToast(msg) {
  const toast = document.getElementById('memory-toast');
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('visible'), 3500);
}

/* ── Wire everything up ── */
function initAddMemorySystem() {
  /* FAB */
  document.getElementById('add-memory-btn').addEventListener('click', openAdminModal);

  /* Admin dialog */
  document.getElementById('admin-unlock-btn').addEventListener('click', checkAdminPassword);
  document.getElementById('admin-pw').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); checkAdminPassword(); }
  });
  document.getElementById('admin-close-btn').addEventListener('click', closeAdminModal);
  // Close on backdrop click
  adminDialog().addEventListener('click', e => {
    if (e.target === adminDialog()) closeAdminModal();
  });

  /* Add memory dialog */
  document.getElementById('add-close-btn').addEventListener('click', closeAddModal);
  document.getElementById('add-cancel-btn').addEventListener('click', closeAddModal);
  // Close on backdrop click
  addDialog().addEventListener('click', e => {
    if (e.target === addDialog()) closeAddModal();
  });
  document.getElementById('add-form').addEventListener('submit', handleAddMemorySubmit);

  /* Photo preview */
  document.getElementById('af-photo').addEventListener('input', function () {
    updatePhotoPreview(this.value.trim());
  });
}


