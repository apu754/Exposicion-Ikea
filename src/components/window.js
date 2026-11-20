// Ventana tipo editor/terminal. `code` se escribe solo al aparecer (core/typewriter.js).
export function codeWindow({ title, code, className = '', speed }) {
  const speedAttr = speed ? ` data-speed="${speed}"` : '';
  return `<div class="window ${className}">
    <div class="window-bar"><i></i><i></i><i></i><span>${title}</span></div>
    <pre data-type${speedAttr}>${code}</pre>
  </div>`;
}
