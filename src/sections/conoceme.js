import { section } from '../components/section.js';
import { frase } from '../data/contenido.js';
import './conoceme.css';

const id = 'conoceme';

// "texto [resaltado] más" → [{ w: 'texto' }, { w: 'resaltado', hl: true }, ...]
const words = [];
frase.replace(/\[([^\]]+)\]|([^\s[\]]+)/g, (_, hl, w) => {
  (hl ? hl.split(/\s+/) : [w]).forEach(x => words.push({ w: x, hl: !!hl }));
});

export default {
  id,
  render: () => section({ id, title: 'Conóceme', className: 'scrub' }, `
    <div class="scrub-sticky">
      <p class="eyebrow">01 · Conóceme</p>
      <p class="scrub-text">${words.map(x => `<span class="w${x.hl ? ' hl' : ''}">${x.w}</span>`).join(' ')}</p>
    </div>`),

  // las palabras se iluminan a medida que se baja
  init(el) {
    const spans = [...el.querySelectorAll('.w')];
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.35 - r.top) / (r.height - vh)));
      const lit = Math.floor(p * 1.2 * spans.length);
      spans.forEach((s, i) => s.classList.toggle('on', i < lit));
    };
    addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    update();
  },
};
