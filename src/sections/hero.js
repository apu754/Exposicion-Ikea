import { section } from '../components/section.js';
import { photo } from '../components/photo.js';
import { pixelArt, sprites, invader } from '../components/pixel.js';
import { perfil, fotos } from '../data/contenido.js';
import { createStarfield } from '../core/starfield.js';
import { swallow } from '../core/swallow.js';
import { reduced } from '../core/motion.js';
import './hero.css';
import './blackhole.css';

const id = 'inicio';

// Agujero negro: capas de atrás hacia adelante (ver blackhole.css)
const blackhole = `
  <button class="blackhole" type="button" aria-label="Entrar al agujero negro e ir a la siguiente sección">
    <span class="bh-glow"></span>
    <span class="bh-disk bh-back"><i></i></span>
    <span class="bh-lens"></span>
    <span class="bh-horizon"></span>
    <span class="bh-ring"></span>
    <span class="bh-disk bh-front"><i></i></span>
  </button>`;

export default {
  id,
  render: () => section({ id, title: 'Inicio', className: 'hero ink' }, `
    <div class="hero-stage">
      <div class="hero-text">
        ${photo({ src: fotos.principal, label: 'Tu foto', className: 'hero-avatar' })}
        <p class="eyebrow reveal">Proceso interno · ${perfil.cargo}</p>
        <h1 class="reveal" style="--d:.1s">
          <span>${perfil.nombre}</span>
          <span class="grad">${perfil.apellidos}.</span>
        </h1>
        <p class="lead reveal" style="--d:.2s">Coworker. Casi ingeniero informático.<br>Listo para el siguiente paso.</p>
      </div>
      <div class="bh-wrap reveal" style="--d:.3s">
        ${blackhole}
        <p class="pixel blink bh-hint">▶ Clic en el agujero negro</p>
      </div>
      <div class="hero-sprites" aria-hidden="true">
        ${pixelArt(sprites.rocket, { r: '#ff4d5e', x: '#fbefe9', w: '#7cc4ff', o: '#ff9e3d', y: '#ffd479' }, { size: 5, className: 'rocket' })}
        <span class="ufo">${invader('#ff7eaa', 4)}</span>
        ${pixelArt(sprites.sparkle, { x: '#fff' }, { size: 3, className: 'spark s1' })}
        ${pixelArt(sprites.sparkle, { x: '#ffd1dc' }, { size: 2, className: 'spark s2' })}
        ${pixelArt(sprites.sparkle, { x: '#ffb07a' }, { size: 3, className: 'spark s3' })}
      </div>
    </div>`),

  init(el) {
    createStarfield(el, { density: 1 });

    // clic en el agujero negro: se traga la portada y aparece en la siguiente sección
    const hole = el.querySelector('.blackhole');
    const next = el.nextElementSibling;
    const parts = [...el.querySelectorAll('.hero-text > *, .hero-sprites, .bh-hint, .sky')];
    hole.addEventListener('click', () => swallow(hole, next, parts, {
      onStart: () => el.dispatchEvent(new CustomEvent('blackhole:swallow', { bubbles: true })),
    }));

    // el escenario gira hacia el mouse; cada capa está a otra profundidad (hero.css)
    if (reduced) return;
    el.addEventListener('pointermove', e => {
      const nx = (e.clientX / innerWidth) * 2 - 1;
      const ny = (e.clientY / innerHeight) * 2 - 1;
      el.style.setProperty('--hx', `${(-ny * 5).toFixed(2)}deg`);
      el.style.setProperty('--hy', `${(nx * 7).toFixed(2)}deg`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--hx', '0deg');
      el.style.setProperty('--hy', '0deg');
    });
  },
};
