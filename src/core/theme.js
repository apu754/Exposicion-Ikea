// Modo claro/oscuro: sigue al sistema hasta que se elige uno con el botón o la tecla T.
const root = document.documentElement;

const isDark = () => root.dataset.theme
  ? root.dataset.theme === 'dark'
  : matchMedia('(prefers-color-scheme: dark)').matches;

export function toggleTheme() {
  const next = isDark() ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('tema', next); } catch { /* sin almacenamiento: solo dura esta visita */ }
}

export function initTheme() {
  document.getElementById('themeBtn')?.addEventListener('click', toggleTheme);
}
