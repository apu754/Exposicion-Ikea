import { reduced } from './motion.js';
import { toggleTheme } from './theme.js';
import { toggleMusic } from './ambient.js';
import { getVolume, setVolume } from './volume.js';

// Modo presentación: flechas / espacio / AvPág (o un clicker) pasan de sección,
// F pone pantalla completa, T cambia el tema, M prende/apaga la música y +/- el volumen.
export function initPresenter(boot) {
  const slides = [...document.querySelectorAll('.slide')];

  // Paradas: el inicio de cada sección y, si es más alta que la pantalla, pasos intermedios
  function stops() {
    const vh = innerHeight;
    return slides.flatMap(s => {
      const top = Math.round(s.getBoundingClientRect().top + scrollY);
      const extra = s.offsetHeight - vh;
      const n = Math.max(0, Math.ceil(extra / vh - 0.1));
      return Array.from({ length: n + 1 }, (_, k) => Math.min(top + k * vh, top + Math.max(0, extra)));
    });
  }

  let goal = null, goalAt = 0;
  addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (!boot.done) { boot.end(); e.preventDefault(); return; }
    if (e.target.closest('button, a') && (e.key === ' ' || e.key === 'Enter')) return;

    const key = e.key.toLowerCase();
    if (key === 'f') {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen?.();
      return;
    }
    if (key === 't') return toggleTheme();
    if (key === 'm') return toggleMusic();
    if (key === '+' || key === '=') return setVolume(getVolume() + 0.1);
    if (key === '-') return setVolume(getVolume() - 0.1);

    const next = ['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key) || (e.key === ' ' && !e.shiftKey);
    const prev = ['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey);
    if (!next && !prev) return;
    e.preventDefault();

    // si una animación de scroll sigue en curso, se cuenta desde su destino
    const list = stops();
    const y = goal !== null && Date.now() - goalAt < 900 ? goal : scrollY;
    const target = next ? list.find(t => t > y + 8) : [...list].reverse().find(t => t < y - 8);
    if (target === undefined) return;
    goal = target;
    goalAt = Date.now();
    scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' });
  });
}
