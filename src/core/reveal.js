import { typewrite } from './typewriter.js';

// Añade .in a .reveal / .observe cuando entran en pantalla, y arranca el texto que se escribe solo.
export function initReveal(root) {
  root.querySelectorAll('[data-stagger]').forEach(group =>
    group.querySelectorAll(':scope > .reveal').forEach((el, i) => el.style.setProperty('--d', `${i * 0.09}s`))
  );

  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add('in');
    io.unobserve(el);
    el.querySelectorAll('[data-type]').forEach(t => setTimeout(() => typewrite(t), 600));
  }), { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

  root.querySelectorAll('.reveal, .observe').forEach(el => io.observe(el));
}
