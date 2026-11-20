import { pixelArt, sprites } from './pixel.js';
import { getVolume, setVolume, onVolume } from '../core/volume.js';
import { isMusicOn, toggleMusic, onMusicChange } from '../core/ambient.js';
import './sound.css';

const STEPS = 10;

// Control de sonido del menú: música de fondo sí/no, bajar, barras de volumen, subir.
export const renderSound = () => `
  <div class="sound" role="group" aria-label="Sonido">
    <button class="snd-btn snd-toggle pixel-box" type="button" aria-pressed="true" aria-label="Música de fondo">
      <span class="i-on">${pixelArt(sprites.speaker, { x: 'currentColor' }, { size: 2 })}</span>
      <span class="i-off">${pixelArt(sprites.speakerOff, { x: 'currentColor' }, { size: 2 })}</span>
    </button>
    <button class="snd-btn snd-down pixel-box" type="button" aria-label="Bajar volumen">-</button>
    <span class="snd-bars" aria-hidden="true">${Array.from({ length: STEPS }, (_, i) => `<i style="height:${30 + i * 7}%"></i>`).join('')}</span>
    <button class="snd-btn snd-up pixel-box" type="button" aria-label="Subir volumen">+</button>
  </div>`;

export function initSound(root) {
  const el = root.querySelector('.sound');
  const toggle = el.querySelector('.snd-toggle');
  const bars = [...el.querySelectorAll('.snd-bars i')];

  const paint = () => {
    const v = getVolume();
    bars.forEach((b, i) => b.classList.toggle('on', i < Math.round(v * STEPS)));
    el.title = `Volumen ${Math.round(v * 100)}%`;
    toggle.setAttribute('aria-pressed', isMusicOn());
    el.classList.toggle('muted', !isMusicOn());
  };

  toggle.addEventListener('click', toggleMusic);
  el.querySelector('.snd-down').addEventListener('click', () => setVolume(getVolume() - 0.1));
  el.querySelector('.snd-up').addEventListener('click', () => setVolume(getVolume() + 0.1));
  onVolume(paint);
  onMusicChange(paint);
  paint();
}
