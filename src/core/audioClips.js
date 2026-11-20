// Reproduce unos segundos de cada canción, con entrada y salida suaves.
// Suena una sola a la vez y se detiene si su sección sale de pantalla.
// Emite 'clip:play' (con detail.mode) y 'clip:stop' para que las secciones reaccionen.

let current = null;

export function initClips(root) {
  const tracks = [...root.querySelectorAll('.track')];
  tracks.forEach(btn => btn.addEventListener('click', () => (current?.btn === btn ? stop() : play(btn))));

  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting && current && e.target.contains(current.btn)) stop();
  }));
  new Set(tracks.map(t => t.closest('.slide'))).forEach(s => io.observe(s));
}

function play(btn) {
  stop();
  const start = +btn.dataset.start || 0;
  const len = +btn.dataset.len || 15;
  if (!btn._audio) {
    btn._audio = new Audio(`${btn.dataset.audio}#t=${start}`);
    btn._audio.preload = 'auto';
    btn._audio.addEventListener('error', () => markMissing(btn));
  }
  const audio = btn._audio;
  audio.volume = 0;
  if (audio.readyState >= 1) audio.currentTime = start;
  else audio.addEventListener('loadedmetadata', () => (audio.currentTime = start), { once: true });

  current = { btn, audio, start, len, raf: 0 };
  btn.classList.add('playing');
  btn.dispatchEvent(new CustomEvent('clip:play', { bubbles: true, detail: { mode: btn.dataset.mode } }));
  audio.play()
    .then(() => { if (current?.btn === btn) loop(); })
    .catch(err => { if (err.name === 'NotSupportedError') markMissing(btn); });
}

function loop() {
  const c = current;
  if (!c) return;
  const t = c.audio.currentTime - c.start;
  c.btn.style.setProperty('--t', Math.min(1, Math.max(0, t / c.len)));
  c.audio.volume = Math.min(1, Math.max(0, t / 0.6), Math.max(0, (c.len - t) / 1.5));
  if (t >= c.len || c.audio.ended) return stop();
  c.raf = requestAnimationFrame(loop);
}

function markMissing(btn) {
  btn.classList.add('missing');
  if (current?.btn === btn) stop();
}

export function stop() {
  if (!current) return;
  const { btn, audio, raf } = current;
  current = null;
  cancelAnimationFrame(raf);
  audio.pause();
  btn.classList.remove('playing');
  btn.style.setProperty('--t', 0);
  btn.dispatchEvent(new CustomEvent('clip:stop', { bubbles: true }));
}
