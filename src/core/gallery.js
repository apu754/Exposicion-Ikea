import { reduced } from './motion.js';

const EVERY = 3800;   // milisegundos por foto

// Galerías [data-gallery]: avanzan solas mientras están en pantalla (pausa al pasar el mouse),
// con flechas y puntos para elegir.
export function initGalleries(root) {
  root.querySelectorAll('[data-gallery]').forEach(g => {
    const items = [...g.querySelectorAll('.gal-item')];
    const dots = [...g.querySelectorAll('.gal-dots button')];
    if (items.length < 2) {
      g.querySelectorAll('.gal-btn, .gal-dots').forEach(el => el.remove());
      return;
    }
    let current = 0, timer = 0, visible = false, hover = false;

    const go = n => {
      current = (n + items.length) % items.length;
      items.forEach((it, i) => it.classList.toggle('on', i === current));
      dots.forEach((d, i) => d.classList.toggle('on', i === current));
      restart();
    };
    // con una foto abierta en grande no se cambia: espera a que se cierre
    const tick = () => (document.querySelector('.lightbox') ? restart() : go(current + 1));
    const restart = () => {
      clearTimeout(timer);
      if (visible && !hover && !reduced) timer = setTimeout(tick, EVERY);
    };

    g.querySelector('.gal-prev').addEventListener('click', () => go(current - 1));
    g.querySelector('.gal-next').addEventListener('click', () => go(current + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    g.addEventListener('pointerenter', () => { hover = true; restart(); });
    g.addEventListener('pointerleave', () => { hover = false; restart(); });

    new IntersectionObserver(([e]) => { visible = e.isIntersecting; restart(); }, { threshold: 0.4 }).observe(g);
  });
}
