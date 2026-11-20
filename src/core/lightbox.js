import { reduced } from './motion.js';
import { createStarfield } from './starfield.js';
import './lightbox.css';

// Al hacer clic en una foto (.photo): cae en espiral a un pequeño agujero negro, el agujero
// crece hasta cubrir la pantalla y la foto sale en espiral al frente, en grande.
// Para cerrar (clic, Esc o cualquier tecla de navegación) hace el camino de vuelta.

let open = null;
let busy = false;

const IN = 'cubic-bezier(.55,0,.85,.35)';     // acelera al caer
const OUT = 'cubic-bezier(.2,.9,.3,1.1)';     // frena al salir, con un pequeño rebote

export function initLightbox(root) {
  root.querySelectorAll('.photo').forEach(ph => {
    ph.tabIndex = 0;
    ph.setAttribute('role', 'button');
    ph.setAttribute('aria-label', `Ver en grande: ${ph.dataset.label}`);
    ph.addEventListener('click', e => { e.stopPropagation(); show(ph); });
    ph.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(ph); }
    });
  });

  // en captura, para que el modo presentación no mueva la página mientras está abierta
  addEventListener('keydown', e => {
    if (!open) return;
    if (['Escape', 'Enter', ' ', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'PageDown', 'PageUp'].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      hide();
    }
  }, true);
}

async function show(ph) {
  if (open || busy) return;
  busy = true;
  // el mismo sonido del agujero negro de la portada, más suave y corto
  ph.dispatchEvent(new CustomEvent('blackhole:swallow', { bubbles: true, detail: { strength: 0.35, length: 1.6 } }));

  const r = ph.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const img = ph.querySelector('img');
  const loaded = !ph.classList.contains('is-empty') && img?.naturalWidth;
  const ratio = loaded ? img.naturalWidth / img.naturalHeight : r.width / r.height;

  // lo más grande que quepa en pantalla, sin deformar
  let w = innerWidth * 0.86;
  let h = w / ratio;
  if (h > innerHeight * 0.76) { h = innerHeight * 0.76; w = h * ratio; }

  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', ph.dataset.label);

  const hole = Math.max(40, Math.min(r.width, r.height) * 0.5);
  const veil = document.createElement('div');
  veil.className = 'lb-veil';
  Object.assign(veil.style, { left: `${cx}px`, top: `${cy}px`, width: `${hole}px`, height: `${hole}px` });

  const clone = ph.cloneNode(true);
  clone.classList.add('lb-photo');
  clone.removeAttribute('tabindex');
  clone.removeAttribute('role');
  clone.removeAttribute('aria-label');
  clone.querySelector('.badge')?.remove();
  Object.assign(clone.style, { width: `${w}px`, height: `${h}px` });

  const caption = document.createElement('p');
  caption.className = 'pixel lb-caption';
  caption.innerHTML = `${ph.dataset.label}<span>Esc o clic para cerrar</span>`;

  box.append(veil, clone, caption);
  document.body.append(box);
  createStarfield(box, { density: 1.2 });
  document.documentElement.classList.add('lb-open');
  box.addEventListener('click', hide);

  const cover = (Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy)) * 2.2) / hole;
  const at = s => `translate(-50%, -50%) scale(${s})`;

  if (reduced) {
    veil.style.transform = at(cover);
    clone.style.transform = 'translate(-50%, -50%)';
    box.classList.add('shown');
    open = { ph, box, veil, cover, sink: null };
    busy = false;
    return;
  }

  // 1. la foto cae en espiral a un agujero que se abre en su centro
  const sink = ph.animate([
    { transform: 'none', opacity: 1 },
    { transform: 'rotate(-160deg) scale(0)', opacity: 0 },
  ], { duration: 650, easing: IN, fill: 'forwards' });
  await Promise.all([
    sink.finished,
    veil.animate([{ transform: at(0) }, { transform: at(1) }], { duration: 400, easing: 'ease-out', fill: 'forwards' }).finished,
  ]);

  // 2. el agujero crece hasta cubrir la pantalla
  await veil.animate([{ transform: at(1) }, { transform: at(cover) }], { duration: 550, easing: 'cubic-bezier(.7,0,.9,.5)', fill: 'forwards' }).finished;
  box.classList.add('shown');

  // 3. la foto sale en espiral al frente
  await clone.animate([
    { transform: 'translate(-50%, -50%) rotate(160deg) scale(0)', opacity: 0 },
    { transform: 'translate(-50%, -50%) rotate(0) scale(1)', opacity: 1 },
  ], { duration: 750, easing: OUT, fill: 'forwards' }).finished;

  open = { ph, box, veil, cover, sink };
  busy = false;
}

async function hide() {
  if (!open || busy) return;
  busy = true;
  const { ph, box, veil, cover, sink } = open;
  const clone = box.querySelector('.lb-photo');
  const at = s => `translate(-50%, -50%) scale(${s})`;
  box.classList.remove('shown');

  if (!reduced) {
    // la foto grande se hunde, el agujero se encoge hasta su sitio y la foto original vuelve a salir
    await clone.animate([
      { transform: 'translate(-50%, -50%) rotate(0) scale(1)', opacity: 1 },
      { transform: 'translate(-50%, -50%) rotate(-160deg) scale(0)', opacity: 0 },
    ], { duration: 550, easing: IN, fill: 'forwards' }).finished;
    await veil.animate([{ transform: at(cover) }, { transform: at(1) }], { duration: 500, easing: 'cubic-bezier(.2,.6,.3,1)', fill: 'forwards' }).finished;
    sink?.cancel();
    await Promise.all([
      ph.animate([
        { transform: 'rotate(160deg) scale(0)', opacity: 0 },
        { transform: 'none', opacity: 1 },
      ], { duration: 700, easing: OUT }).finished,
      veil.animate([{ transform: at(1) }, { transform: at(0) }], { duration: 450, easing: 'ease-in', fill: 'forwards' }).finished,
    ]);
  }

  box.remove();
  document.documentElement.classList.remove('lb-open');
  open = null;
  busy = false;
  ph.focus({ preventScroll: true });
}
