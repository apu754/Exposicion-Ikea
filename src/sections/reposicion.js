import { section } from '../components/section.js';
import { reposicion as r } from '../data/contenido.js';
import { reduced } from '../core/motion.js';
import './reposicion.css';

const id = 'reposicion';

const lamp = `
  <svg viewBox="0 0 80 100" aria-hidden="true">
    <path d="M22 10h36l12 34H10z" fill="var(--red)"/>
    <rect x="37" y="44" width="6" height="40" fill="var(--muted)"/>
    <ellipse cx="40" cy="88" rx="22" ry="6" fill="var(--muted)"/>
  </svg>`;

const productCard = (extra = '') => `
  <div class="pcard ${extra}">
    <div class="pimg">${lamp}</div>
    <div class="pinfo"><b>Lámpara de mesa</b><code>706.398.74</code><span>Ubicación 040200 · Traer 6</span></div>
    <div class="alerts"><em>No cabe</em><em>Menor al MPQ</em></div>
  </div>`;

// Una pantalla del celular por cada paso de r.pasos (mismo orden)
const screens = [
  `<div class="viewfinder">
     <div class="sheet"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
     <span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span>
   </div>
   <span class="shutter"></span>`,

  `<div class="sheet flat"><i></i><i></i><i></i><i></i><i></i><span class="scan"></span></div>
   <p class="mini">Leyendo con Gemini…</p>
   <ul class="parsed">
     <li style="--i:0"><code>040200</code><code>706.398.74</code><b>6</b></li>
     <li style="--i:1"><code>M10J16</code><code>204.117.35</code><b>2</b></li>
     <li style="--i:2"><code>040310</code><code>903.880.12</code><b>4</b></li>
   </ul>`,

  `<p class="mini">Revisa antes de guardar</p>
   <div class="field"><span>Ubicación</span><b>040200</b></div>
   <div class="field"><span>SKU</span><b>706.398.74</b></div>
   <div class="field fix"><span>Cantidad</span><b><s>8</s> 6</b></div>
   <span class="cta">Guardar hoja</span>`,

  `${productCard()}${productCard('ghost')}`,

  `${productCard('compact')}
   <div class="yesno"><span class="yes">Sí</span><span>No</span></div>
   <div class="qty"><i>−</i><b>4</b><small>de 6</small><i>+</i></div>
   <p class="mini">Marcó: Juan Diego</p>`,

  `<p class="mini">Resumen del turno</p>
   <div class="wa"><b>RP_693_HFB10</b><br>✅ 15 traídas<br>❌ 3 no · sin stock<br>👤 Equipo de bodega</div>
   <div class="file">📄 RP_693_HFB10.csv</div>`,
];

export default {
  id,
  render: () => section({ id, title: 'Reposición' }, `
    <div class="wrap">
      <p class="eyebrow reveal">La idea · Reposición</p>
      <h2 class="h-lg reveal">La RP, del papel<br><span class="grad">al celular.</span></h2>
      <p class="lead reveal">${r.antes}</p>

      <div class="repo${reduced ? ' manual' : ''}">
        <div class="phone reveal" data-tilt>
          <div class="phone-screen">
            <div class="app-bar"><span>Reposición</span><small>HFB 10</small></div>
            ${screens.map((s, i) => `<div class="scr scr-${i}">${s}</div>`).join('')}
          </div>
        </div>
        <ol class="repo-steps" data-stagger>
          ${r.pasos.map((p, i) => `
            <li class="reveal"><button type="button">
              <span class="n">0${i + 1}</span><b>${p.titulo}</b><small>${p.texto}</small>
            </button></li>`).join('')}
        </ol>
      </div>

      <div class="grid cols-3 repo-facts" data-stagger>
        <article class="card reveal" data-tilt="glare">
          <span class="kicker">Regla clave</span>
          <h3>La IA lee. La persona decide.</h3>
          <p>Nada se guarda sin que alguien lo revise.</p>
        </article>
        <article class="card reveal" data-tilt="glare">
          <span class="kicker">Alertas</span>
          <h3>Avisa antes del error.</h3>
          <div class="chips small">${r.alertas.map(a => `<span class="chip">${a}</span>`).join('')}</div>
        </article>
        <article class="card reveal" data-tilt="glare">
          <span class="kicker">Futuro</span>
          <h3>Aprende con cada hoja.</h3>
          <p>Cada hoja guardada es un dato para entrenar un modelo propio.</p>
        </article>
      </div>

      <div class="stack reveal">
        <span class="mono small muted">hecho con</span>
        <div class="chips small">${r.stack.map(s => `<span class="chip">${s}</span>`).join('')}</div>
      </div>
    </div>`),

  // Los pasos avanzan solos mientras la sección está en pantalla; un clic elige uno y detiene el avance.
  init(el) {
    const box = el.querySelector('.repo');
    const steps = [...box.querySelectorAll('.repo-steps button')];
    const scrs = [...box.querySelectorAll('.scr')];
    let current = 0;

    const go = n => {
      current = (n + steps.length) % steps.length;
      steps.forEach((s, k) => s.classList.toggle('on', k === current));
      scrs.forEach((s, k) => s.classList.toggle('on', k === current));
    };

    steps.forEach((s, k) => {
      s.addEventListener('click', () => { box.classList.add('manual'); go(k); });
      // la barrita del paso activo marca el tiempo; al terminar pasa al siguiente
      s.addEventListener('animationend', e => {
        if (e.animationName === 'stepbar' && !box.classList.contains('manual')) go(current + 1);
      });
    });

    new IntersectionObserver(([e]) => box.classList.toggle('running', e.isIntersecting), { threshold: 0.35 }).observe(box);
    go(0);
  },
};
