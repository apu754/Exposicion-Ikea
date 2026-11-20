import { perfil } from '../data/contenido.js';
import { icons } from './icons.js';
import { renderSound, initSound } from './sound.js';

const links = [
  ['conoceme', 'Conóceme'],
  ['trayectoria', 'Mi logro'],
  ['reposicion', 'Reposición'],
  ['listo', '¿Por qué yo?'],
];

export function renderNav(el) {
  el.innerHTML = `
    <a href="#inicio" class="brand">${perfil.iniciales}<span>.</span></a>
    <ul>${links.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ul>
    <div class="nav-tools">
      ${renderSound()}
      <button class="theme-btn" id="themeBtn" type="button" aria-label="Cambiar entre modo claro y oscuro">
        <span class="i-sun">${icons.sun}</span><span class="i-moon">${icons.moon}</span>
      </button>
    </div>`;
  initSound(el);
}
