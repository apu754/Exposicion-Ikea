// Marca las fotos y videos que no cargan para mostrar el aviso con el nombre del archivo.
// Los videos solo se reproducen mientras están en pantalla.
export function initPhotos(root) {
  root.querySelectorAll('.photo img').forEach(img => {
    const mark = () => img.closest('.photo').classList.add('is-empty');
    if (img.complete && img.naturalWidth === 0) mark();
    img.addEventListener('error', mark);
  });

  const io = new IntersectionObserver(entries => entries.forEach(e => {
    e.target.dataset.visible = e.isIntersecting ? '1' : '';
    if (e.isIntersecting) e.target.play().catch(() => { /* aún no cargó o no existe */ });
    else e.target.pause();
  }), { threshold: 0.3 });

  root.querySelectorAll('.photo video').forEach(v => {
    const mark = () => v.closest('.photo').classList.add('is-empty');
    if (v.error) mark();
    v.addEventListener('error', mark);
    // si ya estaba en pantalla cuando terminó de cargar, arranca
    v.addEventListener('canplay', () => { if (v.dataset.visible && v.paused && !document.querySelector('.lightbox')) v.play().catch(() => {}); });
    io.observe(v);
  });
}
