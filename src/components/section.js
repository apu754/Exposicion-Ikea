// Envuelve una sección con los atributos que usan la navegación y el modo presentación.
export function section({ id, title, className = '' }, inner) {
  return `<section class="slide ${className}" id="${id}" data-title="${title}">${inner}</section>`;
}
