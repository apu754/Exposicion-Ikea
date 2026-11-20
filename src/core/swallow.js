import { reduced } from './motion.js';
import './swallow.css';

let busy = false;

// El agujero negro "se traga" las piezas de la página: giran en espiral hacia su centro
// mientras el horizonte crece hasta cubrir la pantalla; luego se aparece en `target`.
// `onStart` sirve para efectos extra (por ejemplo, sonido).
export async function swallow(hole, target, parts, { onStart } = {}) {
  if (busy) return;
  if (reduced) return target.scrollIntoView({ behavior: 'instant' });
  busy = true;
  onStart?.();

  const r = hole.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  document.body.classList.add('swallowing');

  // cada pieza gira y se encoge hacia el centro del agujero
  const sucked = parts.map((el, i) => {
    const er = el.getBoundingClientRect();
    el.style.transformOrigin = `${cx - er.left}px ${cy - er.top}px`;
    return el.animate([
      { transform: 'none', opacity: 1, filter: 'blur(0)' },
      { transform: 'rotate(-40deg) scale(.55)', opacity: 1, filter: 'blur(1px)', offset: 0.55 },
      { transform: 'rotate(-160deg) scale(0)', opacity: 0, filter: 'blur(4px)' },
    ], { duration: 1500, delay: i * 70, easing: 'cubic-bezier(.55,0,.85,.35)', fill: 'forwards' });
  });

  // el horizonte crece hasta tapar todo
  const size = r.width * 0.38;
  const cover = (Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy)) * 2.2) / size;
  const veil = document.createElement('div');
  veil.className = 'swallow-veil';
  Object.assign(veil.style, { left: `${cx}px`, top: `${cy}px`, width: `${size}px`, height: `${size}px` });
  document.body.append(veil);
  const grow = veil.animate([
    { transform: 'translate(-50%, -50%) scale(1)' },
    { transform: `translate(-50%, -50%) scale(${cover})` },
  ], { duration: 1100, delay: 750, easing: 'cubic-bezier(.7,0,.9,.5)', fill: 'forwards' });

  await Promise.all([...sucked.map(a => a.finished), grow.finished]);

  // del otro lado: saltar a la sección y devolver todo a su sitio sin que se vea
  target.scrollIntoView({ behavior: 'instant' });
  sucked.forEach(a => a.cancel());
  parts.forEach(el => (el.style.transformOrigin = ''));

  await veil.animate([
    { transform: `translate(-50%, -50%) scale(${cover})`, opacity: 1 },
    { transform: `translate(-50%, -50%) scale(${cover * 1.15})`, opacity: 0 },
  ], { duration: 900, easing: 'ease-out', fill: 'forwards' }).finished;

  veil.remove();
  document.body.classList.remove('swallowing');
  busy = false;
}
