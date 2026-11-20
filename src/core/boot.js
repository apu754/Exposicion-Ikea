import { reduced } from './motion.js';

const lines = [
  '<span class="ok">$</span> ./exposicion --cargo=planificador-de-cocinas',
  '  cargando perfil ............ <span class="ok">[ok]</span>',
  '  cargando experiencia ....... <span class="ok">[ok]</span>',
  '  cargando ganas ............. <span class="ok">[100%]</span>',
  '  iniciando<span class="caret"></span>',
];

// Pantalla de arranque tipo terminal. Se salta con un clic o cualquier tecla.
export function initBoot() {
  const boot = document.getElementById('boot');
  const text = document.getElementById('boot-text');
  let done = false;

  const end = () => {
    if (done) return;
    done = true;
    boot.classList.add('gone');
    document.body.classList.remove('booting');
  };

  if (reduced) end();
  else {
    lines.forEach((_, i) => setTimeout(() => {
      if (!done) text.innerHTML = lines.slice(0, i + 1).join('\n');
    }, 250 + i * 380));
    setTimeout(end, 250 + lines.length * 380 + 600);
    boot.addEventListener('click', end);
  }

  return { end, get done() { return done; } };
}
