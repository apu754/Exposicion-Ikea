// Orden de la exposición. Cada sección es un módulo con render() y, si lo necesita, init(el).
import hero from './hero.js';
import conoceme from './conoceme.js';
import manada from './manada.js';
import profesional from './profesional.js';
import musica from './musica.js';
import punk from './punk.js';
import libre from './libre.js';
import trayectoria from './trayectoria.js';
import acciones from './acciones.js';
import reposicion from './reposicion.js';
import resultados from './resultados.js';
import listo from './listo.js';
import cocina from './cocina.js';
import diferencia from './diferencia.js';
import gracias from './gracias.js';

export const sections = [
  hero, conoceme, manada, profesional, musica, punk, libre,
  trayectoria, acciones, reposicion, resultados,
  listo, cocina, diferencia, gracias,
];
