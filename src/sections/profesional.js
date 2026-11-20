import { section } from '../components/section.js';
import { photo } from '../components/photo.js';
import { icons } from '../components/icons.js';
import { fotos, habilidades } from '../data/contenido.js';
import './profesional.css';

const id = 'profesional';

export default {
  id,
  render: () => section({ id, title: 'IKEA, mi escuela' }, `
    <div class="wrap">
      <p class="eyebrow reveal">Profesional</p>
      <h2 class="h-lg reveal">IKEA, mi escuela.</h2>
      <p class="lead reveal">Mi trabajo más largo.<br>Y donde más he crecido.</p>

      <div class="grid bento" data-stagger>
        <article class="card photo-card reveal" data-tilt="glare">
          ${photo({ src: fotos.ikea, label: 'Tú en IKEA' })}
          <div class="caption"><h3>Coworker.</h3><p>De fines de semana a medio tiempo.</p></div>
        </article>

        ${habilidades.map(h => `
          <article class="card reveal" data-tilt="glare">
            ${icons[h.icono]}
            <h3>${h.titulo}</h3>
            <p>${h.texto}</p>
          </article>`).join('')}

        <article class="card code-card wide reveal" data-tilt="glare">
          <p class="mono">$ ingenieria_informatica --status</p>
          <h3>Terminando la carrera.</h3>
          <p>Y ayudando a mis compañeros con todo lo que es tecnología.</p>
          <div class="loader"><i></i></div>
          <p class="mono small">cargando título… <span class="ok">casi listo</span></p>
        </article>
      </div>
    </div>`),
};
