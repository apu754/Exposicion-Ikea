import { section } from '../components/section.js';
import { perfil } from '../data/contenido.js';
import './gracias.css';

const id = 'gracias';

export default {
  id,
  render: () => section({ id, title: 'Gracias', className: 'gracias' }, `
    <h2 class="h-xl reveal">Gracias<span class="grad">.</span></h2>
    <p class="lead reveal" style="--d:.15s">¿Preguntas?</p>
    <p class="sig reveal" style="--d:.3s">${perfil.nombre} ${perfil.apellidos}</p>
    <code class="commit reveal" style="--d:.45s">git commit -m "listo para ${perfil.cargo.toLowerCase()}"</code>`),
};
