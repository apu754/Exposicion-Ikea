import { section } from '../components/section.js';
import { universo } from '../data/contenido.js';
import { createStarfield } from '../core/starfield.js';
import { reduced } from '../core/motion.js';
import './universo.css';

const id = 'universo';

// Cada órbita gira; el planeta gira al revés y "mira a la cámara" (billboard) para verse siempre de frente.
const planet = (p, i) => `
  <div class="orbit" style="--r:${p.radio}px; --dur:${p.vuelta}s; --delay:${-(i * 7.3) % p.vuelta}s">
    <div class="body" style="--size:${p.tamano}px">
      <div class="billboard">
        <span class="planet${p.anillo ? ' ringed' : ''}" style="--c1:${p.colores[0]}; --c2:${p.colores[1]}"></span>
        <b class="label">${p.nombre}</b>
      </div>
    </div>
  </div>`;

export default {
  id,
  render: () => section({ id, title: 'Astronomía', className: 'ink space' }, `
    <div class="wrap space-head">
      <p class="eyebrow reveal">Otra cosa sobre mí</p>
      <h2 class="h-lg reveal">Fanático de la<br><span class="grad">astronomía.</span></h2>
      <p class="lead reveal">${universo.frase}</p>
    </div>

    <div class="cosmos reveal" role="img" aria-label="Sistema solar con mis cosas favoritas como planetas">
      <div class="system">
        <div class="sun"><span>${universo.centro}</span></div>
        ${universo.planetas.map(planet).join('')}
      </div>
    </div>
    <p class="space-hint mono small">mueve el mouse · arrastra para girar</p>`),

  init(el) {
    createStarfield(el, { density: 1.3 });

    const cosmos = el.querySelector('.cosmos');
    const system = el.querySelector('.system');
    const maxR = Math.max(...universo.planetas.map(p => p.radio));

    // el sistema se encoge en pantallas pequeñas
    const fit = () => system.style.setProperty('--k', Math.min(1, cosmos.clientWidth / (maxR * 2 + 120)).toFixed(3));
    new ResizeObserver(fit).observe(cosmos);

    // inclinación con el mouse + giro arrastrando; todo se suaviza en cada cuadro
    const cur = { rx: 64, rz: 0 };
    const target = { rx: 64, rz: 0 };
    let base = 0, drag = null, raf = 0;

    el.addEventListener('pointermove', e => {
      const r = cosmos.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (drag) base = drag.base + (e.clientX - drag.x) * 0.4;
      target.rx = 64 - Math.max(-1, Math.min(1, ny)) * 16;
      target.rz = base + Math.max(-1, Math.min(1, nx)) * 25;
    });
    cosmos.addEventListener('pointerdown', e => {
      drag = { x: e.clientX, base };
      cosmos.setPointerCapture(e.pointerId);
      cosmos.classList.add('dragging');
    });
    const endDrag = () => { drag = null; cosmos.classList.remove('dragging'); };
    cosmos.addEventListener('pointerup', endDrag);
    cosmos.addEventListener('pointercancel', endDrag);

    const apply = () => {
      system.style.setProperty('--rx', `${cur.rx.toFixed(2)}deg`);
      system.style.setProperty('--rz', `${cur.rz.toFixed(2)}deg`);
    };
    const loop = () => {
      if (!drag) { base += 0.03; target.rz += 0.03; }
      cur.rx += (target.rx - cur.rx) * 0.08;
      cur.rz += (target.rz - cur.rz) * 0.08;
      apply();
      raf = requestAnimationFrame(loop);
    };
    apply();
    if (!reduced) {
      new IntersectionObserver(([e]) => {
        cancelAnimationFrame(raf);
        if (e.isIntersecting) loop();
      }).observe(el);
    }
  },
};
