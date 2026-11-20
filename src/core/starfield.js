import { reduced } from './motion.js';
import './starfield.css';

const COLORS = ['255,255,255', '255,214,224', '255,196,168', '214,222,255'];

// Cielo de estrellas en 3D sobre un <canvas> dentro de `host`.
// Las estrellas se acercan despacio, titilan, y las cercanas se mueven más con el mouse (paralaje).
// Solo se anima mientras la sección está en pantalla.
export function createStarfield(host, { density = 1, speed = 1, shooting = true } = {}) {
  const canvas = document.createElement('canvas');
  canvas.className = 'sky';
  canvas.setAttribute('aria-hidden', 'true');
  host.classList.add('has-sky');
  host.prepend(canvas);
  const ctx = canvas.getContext('2d');

  let w = 0, h = 0, stars = [], raf = 0, running = false, shoot = null;
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

  const newStar = (z = 1) => ({
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
    z,
    c: COLORS[(Math.random() * COLORS.length) | 0],
    t: Math.random() * Math.PI * 2,
    s: 0.5 + Math.random(),
  });

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = host.clientWidth;
    h = host.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(((w * h) / 2600) * density);
    stars = Array.from({ length: n }, () => newStar(0.08 + Math.random() * 0.92));
    if (!running) draw();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2, scale = Math.max(w, h) * 0.5;
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;

    for (const s of stars) {
      if (running) {
        s.z -= 0.0005 * speed;
        s.t += 0.03;
      }
      // proyección en perspectiva: lo cercano (z pequeño) se ve más grande y se mueve más
      const sx = cx + ((s.x - mouse.x * 0.06) / s.z) * scale;
      const sy = cy + ((s.y - mouse.y * 0.06) / s.z) * scale;
      if (s.z < 0.05 || sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) {
        Object.assign(s, newStar(1));
        continue;
      }
      // estrellas cuadradas y alineadas a la cuadrícula: un toque pixel art
      const depth = 1 - s.z;
      const size = Math.max(1, Math.round(s.s * depth * 3.2));
      const alpha = Math.min(1, depth * 1.5 + 0.15) * (0.65 + 0.35 * Math.sin(s.t));
      ctx.fillStyle = `rgba(${s.c},${alpha})`;
      ctx.fillRect(Math.round(sx), Math.round(sy), size, size);
    }

    if (shooting && running) drawShootingStar();
  }

  function drawShootingStar() {
    if (!shoot && Math.random() < 0.004) {
      shoot = { x: Math.random() * w * 0.7, y: Math.random() * h * 0.4, vx: 9 + Math.random() * 5, vy: 3 + Math.random() * 3, life: 1 };
    }
    if (!shoot) return;
    const { x, y, vx, vy, life } = shoot;
    const g = ctx.createLinearGradient(x, y, x - vx * 14, y - vy * 14);
    g.addColorStop(0, `rgba(255,236,242,${life})`);
    g.addColorStop(1, 'rgba(255,93,143,0)');
    ctx.strokeStyle = g;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - vx * 14, y - vy * 14);
    ctx.stroke();
    shoot.x += vx;
    shoot.y += vy;
    shoot.life -= 0.018;
    if (shoot.life <= 0) shoot = null;
  }

  const loop = () => { draw(); raf = requestAnimationFrame(loop); };
  const onMove = e => {
    mouse.tx = (e.clientX / innerWidth) * 2 - 1;
    mouse.ty = (e.clientY / innerHeight) * 2 - 1;
  };

  new ResizeObserver(resize).observe(host);
  if (!reduced) {
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        addEventListener('pointermove', onMove, { passive: true });
        loop();
      } else if (!e.isIntersecting && running) {
        running = false;
        removeEventListener('pointermove', onMove);
        cancelAnimationFrame(raf);
      }
    }).observe(host);
  }
}
