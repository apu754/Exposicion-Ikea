import { section } from '../components/section.js';
import { track } from '../components/track.js';
import { cancionPunk } from '../data/contenido.js';
import './punk.css';

const id = 'punk';

export default {
  id,
  render: () => section({ id, title: 'Punk', className: 'punk' }, `
    <div class="wrap punk-grid">
      <div>
        <p class="eyebrow reveal">Y abajo en la lista…</p>
        <h2 class="ransom reveal" aria-label="Punk"><span>P</span><span>U</span><span>N</span><span>K</span></h2>
        <p class="lead reveal">También me gusta el punk.</p>
      </div>
      <div class="flyer reveal" style="--d:.2s">
        <span class="tape"></span>
        <p class="flyer-kicker">Suena en mi cabeza</p>
        <p class="flyer-band">${cancionPunk.artista}</p>
        ${track(cancionPunk)}
      </div>
    </div>`),
};
