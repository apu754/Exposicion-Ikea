import { icons } from './icons.js';

// Botón que reproduce unos segundos de una canción (ver core/audioClips.js).
export function track(c) {
  return `<button class="track" type="button"
      data-audio="${c.audio}" data-start="${c.inicio}" data-len="${c.duracion}" data-mode="${c.modo}"
      aria-label="Reproducir ${c.titulo} de ${c.artista}">
    <span class="track-play">
      <svg class="ring" viewBox="0 0 46 46" aria-hidden="true">
        <circle cx="23" cy="23" r="21"/><circle class="ring-fill" cx="23" cy="23" r="21" pathLength="1"/>
      </svg>
      <span class="i-play">${icons.play}</span><span class="i-pause">${icons.pause}</span>
    </span>
    <span class="track-meta">
      <b>${c.titulo}</b>
      <small>${c.artista} · ${c.genero}</small>
      <em class="track-missing">Falta public/${c.audio}</em>
    </span>
    <span class="track-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
  </button>`;
}
