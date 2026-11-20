import { section } from '../components/section.js';
import { acciones } from '../data/contenido.js';
import './acciones.css';

const id = 'acciones';

export default {
  id,
  render: () => section({ id, title: 'Acciones' }, `
    <div class="wrap">
      <p class="eyebrow reveal">Qué hice</p>
      <h2 class="h-lg reveal">Estar ahí.<br>Siempre.</h2>
      <div class="grid cols-auto" data-stagger>
        ${acciones.map((a, i) => `
          <article class="card action${a.destacada ? ' hl' : ''} reveal" data-tilt="glare">
            <span class="kicker">0${i + 1}${a.destacada ? ' · nuevo' : ''}</span>
            <h3>${a.titulo}</h3>
            <p>${a.texto}</p>
          </article>`).join('')}
      </div>
    </div>`),
};
