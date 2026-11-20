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

const app = document.getElementById('app');
app.innerHTML = sections.map(s => s.render()).join('');
renderNav(document.getElementById('topnav'));

const boot = initBoot();
initTheme();
initPhotos(app);
sections.forEach(s => s.init?.(document.getElementById(s.id)));
initClips(app);
initReveal(app);
initScroll();
initPresenter(boot);

// las secciones se crean con JS, así que el salto a un #ancla se hace aquí (y sin intro)
if (location.hash) {
  boot.end();
  document.querySelector(location.hash)?.scrollIntoView({ behavior: 'instant' });
}
