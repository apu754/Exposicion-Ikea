import { pixelArt, sprites } from '../components/pixel.js';

// Cursor de flecha pixelada (solo con mouse; en pantallas táctiles no aplica).
export function initPixelCursor() {
  if (!matchMedia('(pointer: fine)').matches) return;
  const svg = pixelArt(sprites.cursor, { k: '#2b1a17', w: '#fffaf4' }, { size: 2 })
    .replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
  document.body.style.cursor = `url("data:image/svg+xml,${encodeURIComponent(svg)}") 0 0, auto`;
}
