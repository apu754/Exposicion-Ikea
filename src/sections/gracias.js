import { section } from '../components/section.js';
import { pixelArt, sprites } from '../components/pixel.js';
import { perfil } from '../data/contenido.js';
import './gracias.css';

const id = 'gracias';

export default {
  id,
  render: () => section({ id, title: 'Gracias', className: 'gracias' }, `
    <div class="reveal">${pixelArt(sprites.heart, { x: 'currentColor' }, { size: 8, className: 'heart' })}</div>
    <h2 class="h-xl reveal">Gracias<span class="grad">.</span></h2>
    <p class="lead reveal" style="--d:.15s">¿Preguntas?</p>
    <p class="pixel blink thanks reveal" style="--d:.25s">Thanks for playing</p>
    <p class="sig reveal" style="--d:.3s">${perfil.nombre} ${perfil.apellidos}</p>
    <code class="commit reveal" style="--d:.45s">git commit -m "listo para ${perfil.cargo.toLowerCase()}"</code>`),
};
