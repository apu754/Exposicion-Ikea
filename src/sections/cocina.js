import { section } from '../components/section.js';
import './cocina.css';

const id = 'cocina';

// Cada .k entra en orden según --i: primero lo de abajo, luego lo de arriba.
const kitchen = `
  <svg viewBox="0 0 800 420" role="img" aria-label="Cocina armándose módulo a módulo">
    <defs>
      <linearGradient id="wood" x1="0" x2="1">
        <stop offset="0" stop-color="#dcb68b"/><stop offset="1" stop-color="#c0915f"/>
      </linearGradient>
    </defs>
    <rect class="k floor" style="--i:0" x="40" y="390" width="720" height="3" rx="1.5"/>

    <g class="k" style="--i:1"><rect class="cab" x="80" y="270" width="160" height="120" rx="6"/><rect class="handle" x="140" y="286" width="40" height="5" rx="2.5"/></g>
    <g class="k" style="--i:2"><rect class="cab" x="240" y="270" width="160" height="120" rx="6"/><rect class="handle" x="300" y="286" width="40" height="5" rx="2.5"/></g>
    <g class="k" style="--i:3">
      <rect class="cab" x="400" y="270" width="160" height="120" rx="6"/>
      <rect class="handle" x="460" y="284" width="40" height="5" rx="2.5"/>
      <rect x="418" y="300" width="124" height="74" rx="8" fill="#2b1a17"/>
      <rect x="430" y="312" width="100" height="6" rx="3" fill="#4a3330"/>
    </g>
    <g class="k" style="--i:4">
      <rect class="cab" x="560" y="270" width="160" height="120" rx="6"/>
      <line class="split-line" x1="560" y1="310" x2="720" y2="310"/>
      <line class="split-line" x1="560" y1="350" x2="720" y2="350"/>
      <rect class="handle" x="620" y="286" width="40" height="5" rx="2.5"/>
      <rect class="handle" x="620" y="326" width="40" height="5" rx="2.5"/>
      <rect class="handle" x="620" y="366" width="40" height="5" rx="2.5"/>
    </g>

    <rect class="k" style="--i:5" x="72" y="256" width="656" height="14" rx="3" fill="url(#wood)"/>
    <g class="k" style="--i:6">
      <rect x="150" y="250" width="100" height="8" rx="4" fill="#b9aca4"/>
      <path d="M200 250 V222 Q200 210 212 210 H222" stroke="#8e7f78" stroke-width="5" fill="none" stroke-linecap="round"/>
    </g>
    <rect class="k" style="--i:7" x="430" y="250" width="100" height="7" rx="3" fill="#2b1a17"/>

    <g class="k" style="--i:8"><rect class="cab" x="80" y="60" width="160" height="120" rx="6"/><rect class="handle" x="210" y="150" width="5" height="22" rx="2.5"/></g>
    <g class="k" style="--i:9">
      <rect class="cab" x="240" y="60" width="160" height="120" rx="6"/>
      <rect class="glass" x="256" y="76" width="128" height="88" rx="4"/>
      <rect class="handle" x="372" y="150" width="5" height="22" rx="2.5"/>
    </g>
    <g class="k hood" style="--i:10">
      <rect x="465" y="60" width="30" height="86"/>
      <path d="M430 176 H530 L512 146 H448 Z"/>
    </g>
    <g class="k" style="--i:11"><rect class="cab accent" x="560" y="60" width="160" height="120" rx="6"/><rect class="handle" x="575" y="150" width="5" height="22" rx="2.5"/></g>

    <g class="k" style="--i:12">
      <ellipse cx="652" cy="222" rx="9" ry="22" fill="#4caf6a" transform="rotate(-22 652 222)"/>
      <ellipse cx="672" cy="218" rx="9" ry="24" fill="#3e9a5b" transform="rotate(18 672 218)"/>
      <rect class="cab" x="646" y="228" width="34" height="28" rx="6"/>
    </g>

    <g class="k dim" style="--i:13">
      <line x1="80" y1="30" x2="720" y2="30"/>
      <line x1="80" y1="22" x2="80" y2="38"/>
      <line x1="720" y1="22" x2="720" y2="38"/>
      <rect x="350" y="17" width="100" height="26" rx="13"/>
      <text x="400" y="35">3.20 m</text>
    </g>
  </svg>`;

export default {
  id,
  render: () => section({ id, title: 'Cocinas', className: 'cocina' }, `
    <div class="wrap">
      <h2 class="h-lg reveal">Planificar una cocina<br>es <span class="grad">diseñar con datos.</span></h2>
      <p class="lead reveal">Medidas, módulos, sistemas.<br>Y en el centro, el cliente.</p>
      <div class="kitchen observe">${kitchen}</div>
      <div class="chips" data-stagger>
        <span class="chip reveal">📐 Medidas</span>
        <span class="chip reveal">🧩 Módulos</span>
        <span class="chip reveal">💰 Presupuesto</span>
        <span class="chip reveal">🖥️ Sistemas</span>
        <span class="chip hl reveal">❤️ El cliente</span>
      </div>
    </div>`),
};
