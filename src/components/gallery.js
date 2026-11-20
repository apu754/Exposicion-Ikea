import { photo } from './photo.js';
import './gallery.css';

// Varias fotos en el mismo espacio: pasan solas, con flechas y puntos (ver core/gallery.js).
// Cada una es una .photo normal, así que también se abre en grande.
export function gallery(srcs, label) {
  return `<div class="gallery" data-gallery>
    ${srcs.map((src, i) => photo({ src, label: `${label} ${i + 1}`, className: `gal-item${i ? '' : ' on'}` })).join('')}
    <button class="gal-btn gal-prev pixel-box" type="button" aria-label="Foto anterior">◀</button>
    <button class="gal-btn gal-next pixel-box" type="button" aria-label="Foto siguiente">▶</button>
    <div class="gal-dots">${srcs.map((_, i) => `<button type="button" class="${i ? '' : 'on'}" aria-label="Foto ${i + 1}"></button>`).join('')}</div>
  </div>`;
}
