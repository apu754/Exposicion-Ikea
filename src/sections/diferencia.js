import { section } from '../components/section.js';
import { codeWindow } from '../components/window.js';
import './diferencia.css';

const id = 'diferencia';

const prompt = '<span class="t-prompt">juandiego@ikea</span>:<span class="t-path">~/carrera</span>$';
const commit = (hash, msg) => `<span class="t-hash">${hash}</span> ${msg}`;

const terminal = `${prompt} git log --oneline
${commit('d41b7a2', 'feat: Reposición, una app para la RP')}
${commit('c9e0f21', 'feat: ingeniería informática (casi lista)')}
${commit('b72c4d8', 'feat: medio tiempo')}
${commit('a1f3e90', 'init: fines de semana en IKEA')}

${prompt} git checkout -b planificador-de-cocinas
<span class="t-muted">Cambiado a nueva rama 'planificador-de-cocinas'</span>`;

export default {
  id,
  render: () => section({ id, title: 'Mi diferencia', className: 'ink diferencia' }, `
    <div class="wrap">
      <p class="eyebrow reveal">¿Qué me diferencia?</p>
      <p class="h-md dim reveal">Todos los candidatos son muy buenos.</p>
      <p class="h-md dim reveal" style="--d:.15s">IKEA nos formó a todos.</p>
      <h2 class="h-xl reveal" style="--d:.3s">Mi diferencia:<br><span class="grad">la tecnología.</span></h2>
      <div class="reveal" style="--d:.4s">${codeWindow({ title: 'juandiego — terminal', code: terminal, className: 'terminal', speed: 22 })}</div>
    </div>`),
};
