import { section } from '../components/section.js';
import { photo } from '../components/photo.js';
import { pixelArt, sprites, invader } from '../components/pixel.js';
import { fotos } from '../data/contenido.js';
import './libre.css';

const id = 'libre';

const mic = `
  <svg class="mic" viewBox="0 0 120 160" aria-hidden="true">
    <defs>
      <linearGradient id="micG" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#d62839"/><stop offset="1" stop-color="#ff7eaa"/>
      </linearGradient>
    </defs>
    <circle cx="60" cy="42" r="32" fill="url(#micG)"/>
    <path d="M38 34h44M36 46h48M40 58h40" stroke="rgba(0,0,0,.25)" stroke-width="2"/>
    <path d="M44 72l6 70h20l6-70z" fill="#3a1d25"/>
    <rect x="50" y="98" width="20" height="5" rx="2.5" fill="#5a2f3a"/>
    <g class="notes" fill="currentColor">
      <text x="96" y="30" font-size="20">♪</text>
      <text x="6" y="56" font-size="16">♫</text>
      <text x="100" y="78" font-size="14">♪</text>
    </g>
  </svg>`;

export default {
  id,
  render: () => section({ id, title: 'Tiempo libre' }, `
    <div class="wrap">
      <p class="eyebrow reveal">Tiempo libre</p>
      <h2 class="h-lg reveal">Lo que disfruto.</h2>
      <div class="grid cols-3" data-stagger>
        <article class="tile reveal" data-tilt="glare">
          ${photo({ src: fotos.amigos, label: 'Tú con tus amigos' })}
          <div class="tile-body"><h3>Mis amigos</h3><p>Los de siempre.</p></div>
        </article>
        <article class="tile karaoke reveal" data-tilt="glare">
          ${mic}
          <div class="tile-body"><h3>Karaoke</h3><p>Con mis amigos, cualquier noche.</p></div>
        </article>
        <article class="tile games reveal" data-tilt="glare">
          <div class="games-screen">
            <div class="games-row">${invader('#ff7eaa', 5)}${invader('#ffb07a', 5)}${invader('#ff7eaa', 5)}</div>
            ${pixelArt(sprites.controller, { x: '#fbefe9', d: '#2b1a17', o: '#ff4d5e' }, { size: 6, className: 'pad' })}
            <p class="pixel blink">Press start</p>
          </div>
          <div class="tile-body"><h3>Videojuegos</h3><p>Fanático desde siempre.</p></div>
        </article>
      </div>
    </div>`),
};
