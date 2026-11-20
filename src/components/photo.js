// Foto con aviso: si el archivo no existe, se ve qué archivo falta (ver core/photos.js).
export function photo({ src, label, className = '', extra = '' }) {
  return `<figure class="photo ${className}" data-label="${label}" data-file="public/${src}">
    <img src="${src}" alt="${label}">${extra}
  </figure>`;
}

// Video que se comporta como una foto: mismo aviso si falta, se abre en grande igual.
// En la página suena en silencio y en bucle; al abrirlo en grande, con sonido.
export function video({ src, label, className = '' }) {
  return `<figure class="photo video ${className}" data-label="${label}" data-file="public/${src}">
    <video src="${src}" muted loop playsinline preload="metadata" aria-label="${label}"></video>
  </figure>`;
}
