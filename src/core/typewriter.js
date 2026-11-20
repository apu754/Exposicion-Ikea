import { reduced } from './motion.js';

// Escribe el contenido de `el` letra por letra, conservando el resaltado de sintaxis.
// Un clic sobre el texto lo muestra completo.
export function typewrite(el) {
  if (el.dataset.done) return;
  el.dataset.done = '1';
  const caret = document.createElement('span');
  caret.className = 'caret';
  if (reduced) return el.append(caret);

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  const texts = nodes.map(n => n.textContent);
  nodes.forEach(n => (n.textContent = ''));
  // como el resto de nodos están vacíos, el cursor queda justo detrás del texto escrito
  el.append(caret);

  const speed = +el.dataset.speed || 14;
  let i = 0, j = 0, timer;
  const finish = () => {
    clearTimeout(timer);
    nodes.forEach((n, k) => (n.textContent = texts[k]));
  };
  el.addEventListener('click', finish, { once: true });

  (function tick() {
    if (i >= nodes.length) return;
    const t = texts[i];
    // los espacios seguidos se escriben de una vez
    do { j++; } while (j < t.length && /\s/.test(t[j - 1]) && /\s/.test(t[j]));
    nodes[i].textContent = t.slice(0, j);
    const ch = t[j - 1];
    if (j >= t.length) { i++; j = 0; }
    timer = setTimeout(tick, ch === '\n' ? 140 : speed);
  })();
}
