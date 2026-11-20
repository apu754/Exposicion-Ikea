import { section } from '../components/section.js';
import { photo } from '../components/photo.js';
import { track } from '../components/track.js';
import { fotos, bandas, canciones } from '../data/contenido.js';
import { stop as stopClip } from '../core/audioClips.js';
import './musica.css';

const id = 'musica';

// la lista va dos veces para que el desplazamiento infinito no tenga corte
const marquee = (names, sep, mode) => {
  const items = names.map((n, i) => `<span${i % 2 ? ' class="ol"' : ''}>${n}</span><span class="sep">${sep}</span>`).join('');
  return `<div class="marquee-track only-${mode}">${items}${items}${items}${items}</div>`;
};

export default {
  id,
  render: () => section({ id, title: 'Dato curioso', className: 'ink musica' }, `
    <div class="wrap">
      <p class="eyebrow reveal">Dato curioso</p>
      <h2 class="h-xl reveal">Vivo para los<br><span class="fire">conciertos.</span></h2>
      <p class="lead reveal">
        <span class="only-metal">El metal es lo mío.</span>
        <span class="only-planchar">…y también, música para planchar.</span>
      </p>
      <div class="eq reveal" aria-hidden="true"></div>
    </div>

    <div class="marquee" aria-label="Artistas favoritos">
      ${marquee(bandas.metal, '✦', 'metal')}
      ${marquee(bandas.planchar, '♥', 'planchar')}
    </div>

    <div class="wrap musica-bottom">
      <div class="reveal">${photo({ src: fotos.concierto, label: 'Tú en un concierto' })}</div>
      <div class="playlist reveal" style="--d:.15s">
        <div class="playlist-head">
          <h3>Suena así</h3>
          <div class="mode">
            <span>Metal</span>
            <button id="modeToggle" class="toggle" type="button" role="switch" aria-checked="false" aria-label="Música para planchar"><i></i></button>
            <span>Para planchar</span>
          </div>
        </div>
        ${canciones.map(track).join('')}
        <p class="small muted">Unos segundos de la canción.</p>
      </div>
    </div>`),

  init(el) {
    const eq = el.querySelector('.eq');
    for (let i = 0; i < 36; i++) {
      const bar = document.createElement('i');
      bar.style.setProperty('--i', i);
      bar.style.setProperty('--dur', `${(0.45 + Math.random() * 0.8).toFixed(2)}s`);
      eq.append(bar);
    }

    // el interruptor decide qué canción se ve (musica.css): Metal → Sepultura, Para planchar → Luis Miguel
    const toggle = el.querySelector('#modeToggle');
    const setMode = on => {
      el.classList.toggle('planchar', on);
      toggle.setAttribute('aria-checked', on);
    };
    toggle.addEventListener('click', () => {
      stopClip();
      setMode(!el.classList.contains('planchar'));
    });
    // al sonar una canción, la sección cambia a su estilo
    el.addEventListener('clip:play', e => setMode(e.detail.mode === 'planchar'));
  },
};
