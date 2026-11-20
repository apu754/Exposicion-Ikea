# Audios

Guarda aquí las canciones en .mp3 con estos nombres:

| Archivo                     | Canción                                   |
|-----------------------------|-------------------------------------------|
| `territory.mp3`             | Territory — Sepultura                     |
| `hasta-que-me-olvides.mp3`  | Hasta que me olvides — Luis Miguel        |
| `sin-reaccion-mutantex.mp3` | Sin reacción — Pestes Mutantex            |

Puede ser la canción completa: la página solo toca unos segundos.
En `src/data/contenido.js` cambias para cada una:

- `inicio`: segundo donde empieza el clip (ej. 42 para arrancar en el coro).
- `duracion`: cuántos segundos suena (por defecto 15).

Si falta un archivo, el botón muestra "Falta public/audio/…".
