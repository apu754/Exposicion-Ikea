// Foto con aviso: si el archivo no existe, se ve qué archivo falta (ver core/photos.js).
export function photo({ src, label, className = '', extra = '' }) {
  return `<figure class="photo ${className}" data-label="${label}" data-file="public/${src}">
    <img src="${src}" alt="${label}">${extra}
  </figure>`;
}
