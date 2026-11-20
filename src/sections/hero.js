import { section } from '../components/section.js';
import { photo } from '../components/photo.js';
import { perfil, fotos } from '../data/contenido.js';
import { createStarfield } from '../core/starfield.js';
import { reduced } from '../core/motion.js';
import './hero.css';

const id = 'inicio';

export default {
  id,
  render: () => section({ id, title: 'Inicio', className: 'hero' }, `
    <div class="hero-stage">
      <div class="hero-orbs" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
      <p class="eyebrow reveal">Proceso interno · ${perfil.cargo}</p>
      <h1 class="h-xl reveal" style="--d:.1s">
        <span>${perfil.nombre}</span>
        <span class="grad">${perfil.apellidos}.</span>
      </h1>
      <p class="lead reveal" style="--d:.2s">Coworker. Casi ingeniero informático.<br>Listo para el siguiente paso.</p>
      <div class="hero-media reveal" style="--d:.35s">
        ${photo({ src: fotos.principal, label: 'Tu foto principal', className: 'hero-photo' })}
      </div>
    </div>`),

  init(el) {
    // estrellas: solo se ven en modo oscuro (ver --hero-sky en base.css)
    createStarfield(el, { density: 0.8 });

    // la foto se encoge un poco al bajar
    const onScroll = () => el.style.setProperty('--p', Math.min(1, scrollY / innerHeight).toFixed(3));
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

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
