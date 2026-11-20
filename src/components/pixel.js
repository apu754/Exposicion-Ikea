// Pixel art a partir de filas de texto: cada carácter es un color de la paleta y '.' es vacío.
export function pixelArt(rows, palette, { size = 4, className = '', label = '' } = {}) {
  const h = rows.length;
  const w = rows[0].length;
  const rects = rows.flatMap((row, y) => [...row].map((ch, x) =>
    ch === '.' ? '' : `<rect x="${x}" y="${y}" width="1" height="1" fill="${palette[ch]}"/>`
  )).join('');
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  return `<svg class="pixel-art ${className}" viewBox="0 0 ${w} ${h}" width="${w * size}" height="${h * size}" shape-rendering="crispEdges" ${a11y}>${rects}</svg>`;
}

export const sprites = {
  invader: [
    '..x.....x..',
    '...x...x...',
    '..xxxxxxx..',
    '.xx.xxx.xx.',
    'xxxxxxxxxxx',
    'x.xxxxxxx.x',
    'x.x.....x.x',
    '...xx.xx...',
  ],
  invader2: [
    '..x.....x..',
    'x..x...x..x',
    'x.xxxxxxx.x',
    'xxx.xxx.xxx',
    'xxxxxxxxxxx',
    '.xxxxxxxxx.',
    '..x.....x..',
    '.x.......x.',
  ],
  heart: [
    '.xx.xx.',
    'xxxxxxx',
    'xxxxxxx',
    '.xxxxx.',
    '..xxx..',
    '...x...',
  ],
  controller: [
    '..xxxx....xxxx..',
    '.xxxxxxxxxxxxxx.',
    'xxxdxxxxxxxxoxxx',
    'xxdddxxxxxxoxoxx',
    'xxxdxxxxxxxxoxxx',
    'xxxxxxxxxxxxxxxx',
    'xxxx........xxxx',
    '.xx..........xx.',
  ],
  rocket: [
    '...r...',
    '..rrr..',
    '..xxx..',
    '.xxwxx.',
    '.xwwwx.',
    '.xxwxx.',
    '.xxxxx.',
    'rxxxxxr',
    'rr.x.rr',
    '...o...',
    '..ooo..',
    '...y...',
  ],
  sparkle: [
    '..x..',
    '..x..',
    'xxxxx',
    '..x..',
    '..x..',
  ],
  speaker: [
    '...x.....',
    '..xx..x..',
    'xxxx...x.',
    'xxxx.x.x.',
    'xxxx.x.x.',
    'xxxx...x.',
    '..xx..x..',
    '...x.....',
  ],
  speakerOff: [
    '...x.....',
    '..xx.....',
    'xxxx.x.x.',
    'xxxx..x..',
    'xxxx..x..',
    'xxxx.x.x.',
    '..xx.....',
    '...x.....',
  ],
  cursor: [
    'k..........',
    'kk.........',
    'kwk........',
    'kwwk.......',
    'kwwwk......',
    'kwwwwk.....',
    'kwwwwwk....',
    'kwwwwwwk...',
    'kwwwwwwwk..',
    'kwwwwwwwwk.',
    'kwwwwwkkkkk',
    'kwwkwwk....',
    'kwk.kwwk...',
    'kk..kwwk...',
    'k....kwwk..',
    '.....kkkk..',
  ],
};

// Invasor animado: dos cuadros que se alternan (ver .invader en pixel.css)
export const invader = (color, size = 4) => `
  <span class="invader" aria-hidden="true">
    ${pixelArt(sprites.invader, { x: color }, { size })}
    ${pixelArt(sprites.invader2, { x: color }, { size })}
  </span>`;
