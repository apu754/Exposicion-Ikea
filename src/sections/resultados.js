import { section } from '../components/section.js';
import { icons } from '../components/icons.js';
import { resultados } from '../data/contenido.js';
import './resultados.css';

const id = 'resultados';

export default {
  id,
  render: () => section({ id, title: 'Resultados', className: 'ink' }, `
    <div class="wrap">
      <p class="eyebrow reveal">Resultados</p>
      <h2 class="h-lg reveal">Lo que logré.</h2>
      <div class="grid cols-auto" data-stagger>
        ${resultados.map(x => `
          <div class="card stat reveal" data-tilt="glare">
            ${icons[x.icono]}
            <div><span class="big grad">${x.titulo}</span><p>${x.texto}</p></div>
          </div>`).join('')}
      </div>
    </div>`),
};
