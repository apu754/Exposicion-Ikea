import './styles/base.css';
import './styles/layout.css';
import './styles/chrome.css';
import './components/components.css';

import { sections } from './sections/index.js';
import { renderNav } from './components/nav.js';
import { initBoot } from './core/boot.js';
import { initTheme } from './core/theme.js';
import { initPhotos } from './core/photos.js';
import { initClips } from './core/audioClips.js';
import { initReveal } from './core/reveal.js';
import { initScroll } from './core/scroll.js';
import { initPresenter } from './core/presenter.js';
import { initTilt } from './core/tilt.js';
import { createStarfield } from './core/starfield.js';

const app = document.getElementById('app');
app.innerHTML = sections.map(s => s.render()).join('');
renderNav(document.getElementById('topnav'));

const boot = initBoot();
initTheme();
initPhotos(app);
sections.forEach(s => s.init?.(document.getElementById(s.id)));
// las secciones oscuras que no tienen su propio cielo reciben uno más tenue
app.querySelectorAll('.ink:not(.has-sky)').forEach(el => createStarfield(el, { density: 0.45, speed: 0.6, shooting: false }));
initClips(app);
initReveal(app);
initTilt(app);
initScroll();
initPresenter(boot);

// las secciones se crean con JS, así que el salto a un #ancla se hace aquí (y sin intro)
if (location.hash) {
  boot.end();
  document.querySelector(location.hash)?.scrollIntoView({ behavior: 'instant' });
}
