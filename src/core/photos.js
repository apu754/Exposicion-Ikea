// Marca las fotos que no cargan para mostrar el aviso con el nombre del archivo.
export function initPhotos(root) {
  root.querySelectorAll('.photo img').forEach(img => {
    const mark = () => img.closest('.photo').classList.add('is-empty');
    if (img.complete && img.naturalWidth === 0) mark();
    img.addEventListener('error', mark);
  });
}
