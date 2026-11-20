import { section } from '../components/section.js';
import { photo } from '../components/photo.js';
import { perfil, fotos } from '../data/contenido.js';
import './hero.css';

const id = 'inicio';

export default {
  id,
  render: () => section({ id, title: 'Inicio', className: 'hero' }, `
    <p class="eyebrow reveal">Proceso interno · ${perfil.cargo}</p>
    <h1 class="h-xl reveal" style="--d:.1s">
      <span>${perfil.nombre}</span>
      <span class="grad">${perfil.apellidos}.</span>
    </h1>
    <p class="lead reveal" style="--d:.2s">Coworker. Casi ingeniero informático.<br>Listo para el siguiente paso.</p>
    <div class="hero-media reveal" style="--d:.35s">
      ${photo({ src: fotos.principal, label: 'Tu foto principal', className: 'hero-photo' })}
    </div>`),

  // la foto se encoge un poco al bajar
  init(el) {
    const update = () => el.style.setProperty('--p', Math.min(1, scrollY / innerHeight).toFixed(3));
    addEventListener('scroll', update, { passive: true });
    update();
  },
};
