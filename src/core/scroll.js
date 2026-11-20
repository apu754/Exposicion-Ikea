// Barra de progreso, puntos laterales y color del menú según la sección visible.
export function initScroll() {
  const slides = [...document.querySelectorAll('.slide')];
  const dots = document.getElementById('dots');
  const bar = document.getElementById('progress-bar');

  slides.forEach(s => {
    const b = document.createElement('button');
    b.dataset.title = s.dataset.title || '';
    b.setAttribute('aria-label', `Ir a ${b.dataset.title}`);
    b.addEventListener('click', () => s.scrollIntoView({ behavior: 'smooth' }));
    dots.append(b);
  });
  const dotBtns = [...dots.children];

  let ticking = false;
  function update() {
    ticking = false;
    const vh = innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;

    let idx = 0;
    slides.forEach((s, i) => { if (s.getBoundingClientRect().top <= vh * 0.5) idx = i; });
    dotBtns.forEach((b, i) => b.classList.toggle('active', i === idx));
    document.body.classList.toggle('on-ink', slides[idx].matches('.ink, .punk'));
  }

  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  addEventListener('resize', update);
  update();
}
