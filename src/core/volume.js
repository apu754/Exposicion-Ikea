// Volumen general (0 a 1) que comparten la música de fondo y las canciones. Se recuerda entre visitas.
const listeners = new Set();

let level = (() => {
  try {
    const v = parseFloat(localStorage.getItem('volumen'));
    return Number.isFinite(v) ? v : 0.6;
  } catch { return 0.6; }
})();

export const getVolume = () => level;
export const onVolume = fn => listeners.add(fn);

export function setVolume(v) {
  level = Math.round(Math.min(1, Math.max(0, v)) * 10) / 10;
  try { localStorage.setItem('volumen', level); } catch { /* sin almacenamiento: solo dura esta visita */ }
  listeners.forEach(fn => fn(level));
}
