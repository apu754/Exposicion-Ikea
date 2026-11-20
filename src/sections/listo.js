import { section } from '../components/section.js';
import { codeWindow } from '../components/window.js';
import { aportes, perfil } from '../data/contenido.js';
import './listo.css';

const id = 'listo';

const k = s => `<span class="tk-k">${s}</span>`;
const str = s => `<span class="tk-s">"${s}"</span>`;
const fn = s => `<span class="tk-f">${s}</span>`;
const com = s => `<span class="tk-c">${s}</span>`;

const code = `${com('// candidato.js')}
${k('const')} juanDiego = {
  cargo: ${str(perfil.cargo)},
  estudios: ${str('Ingeniería Informática')},
  aporta: [${str('tecnología')}, ${str('planificación')}, ${str('sistemas')}],
  modo: ${str('cacharrero')},
  detalle: <span class="tk-n">Infinity</span>,
  meta: ${str('Líder')},
};

${k('function')} ${fn('asesorar')}(cliente) {
  ${k('return')} {
    cocina: ${fn('planificar')}(cliente.sueño),
    atención: ${str('hasta el mínimo detalle')},
  };
}

${fn('asesorar')}(${str('cada cliente')}); ${com('// ✓ listo')}`;

export default {
  id,
  render: () => section({ id, title: '¿Por qué estoy listo?' }, `
    <div class="wrap split">
      <div>
        <p class="eyebrow reveal">03 · ¿Por qué estoy listo?</p>
        <h2 class="h-lg reveal">Lo que<br>aportaría.</h2>
        <ul class="aportes" data-stagger>
          ${aportes.map(([b, t]) => `<li class="reveal"><b>${b}</b>${t.startsWith(':') ? '' : ' '}${t}</li>`).join('')}
        </ul>
      </div>
      <div class="reveal" style="--d:.2s">${codeWindow({ title: 'candidato.js', code, className: 'editor' })}</div>
    </div>`),
};
