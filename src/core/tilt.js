import { reduced } from './motion.js';
import './tilt.css';

const MAX_DEG = 8;

// Inclina en 3D los elementos con [data-tilt] siguiendo el mouse.
// Con data-tilt="glare" además aparece un brillo donde está el cursor.
// En pantallas táctiles o con animaciones reducidas no hace nada.
export function initTilt(root) {
  if (reduced || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  root.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--tilt-x', `${((0.5 - y) * MAX_DEG * 2).toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${((x - 0.5) * MAX_DEG * 2).toFixed(2)}deg`);
      el.style.setProperty('--glare-x', `${(x * 100).toFixed(1)}%`);
      el.style.setProperty('--glare-y', `${(y * 100).toFixed(1)}%`);
      el.classList.add('tilting');
    });
    el.addEventListener('pointerleave', () => {
      el.classList.remove('tilting');
      el.style.removeProperty('--tilt-x');
      el.style.removeProperty('--tilt-y');
    });
  });
}
