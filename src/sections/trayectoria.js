import { section } from '../components/section.js';
import { trayectoria, meta } from '../data/contenido.js';
import './trayectoria.css';

const id = 'trayectoria';

export default {
  id,
  render: () => section({ id, title: 'Trayectoria', className: 'ink' }, `
    <div class="wrap">
      <p class="eyebrow reveal">02 · Mi principal logro</p>
      <h2 class="h-lg reveal">Crecer dentro<br>de <span class="grad">IKEA.</span></h2>

      <ol class="timeline reveal">
        ${trayectoria.map(p => `
          <li class="step ${p.estado}">
            <span class="dot"></span>
            <span class="ver">${p.ver}${p.estado === 'siguiente' ? ' · próximamente' : ''}${p.estado === 'meta' ? ' · la meta' : ''}</span>
            <b>${p.titulo}</b>
            <small>${p.texto}</small>
          </li>`).join('')}
      </ol>

      <p class="meta-line reveal">Mi meta: <b class="grad">${meta}</b></p>
    </div>`),
};
