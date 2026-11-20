import { section } from '../components/section.js';
import { photo } from '../components/photo.js';
import { mascotas } from '../data/contenido.js';
import { gallery } from '../components/gallery.js';
import './manada.css';

const id = 'manada';

export default {
  id,
  render: () => section({ id, title: 'Mi manada' }, `
    <div class="wrap">
      <p class="eyebrow reveal">Personal</p>
      <h2 class="h-lg reveal">Mi manada.</h2>
      <p class="lead reveal">Dos perros, un gato de tres meses</p>
      <div class="grid pets" data-stagger>
        ${mascotas.map(m => `
          <figure class="pet reveal" data-tilt>
            ${Array.isArray(m.foto)
              ? gallery(m.foto, m.nombre)
              : photo({
                  src: m.foto,
                  label: m.tipo.split(' ')[0],
                  extra: m.badge ? `<span class="badge">${m.badge}</span>` : '',
                })}
            <figcaption><b>${m.nombre}</b><span>${m.tipo}</span></figcaption>
          </figure>`).join('')}
      </div>
    </div>`),
};
