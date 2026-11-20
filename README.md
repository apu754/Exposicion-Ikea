# Exposición · Planificador de cocinas

Página web interactiva que reemplaza las diapositivas de PowerPoint para mi exposición del proceso interno de IKEA al cargo de **Planificador de cocinas**.

Tiene estilo Apple, toques de pixel art y videojuegos, y un tema espacial: un agujero negro en la portada, estrellas, un sistema solar en 3D y música de fondo generada en vivo.

**Juan Diego Carmona Villegas**

---

## Cómo correrla

Necesitas [Node.js](https://nodejs.org/) 20 o más reciente.

```bash
npm install      # solo la primera vez
npm run dev      # abre la página en http://localhost:5173
```

Para la versión final:

```bash
npm run build    # genera la carpeta dist/
npm run preview  # sirve dist/ para revisarla
```

> La página **no se abre con doble clic** en `index.html`: hay que usar `npm run dev` o `npm run preview`.
> Todo funciona **sin internet**: la fuente pixel, la música y los dibujos van incluidos en el proyecto.

---

## Controles para presentar

| Tecla | Qué hace |
|---|---|
| `→` `↓` `Espacio` `AvPág` | Siguiente sección (también con un control de diapositivas) |
| `←` `↑` `Shift+Espacio` `RePág` | Sección anterior |
| `F` | Pantalla completa |
| `T` | Modo claro / oscuro |
| `M` | Prender / apagar la música de fondo |
| `+` / `-` | Subir / bajar el volumen |
| `Esc` | Cerrar una foto abierta |

Con el mouse:

- **Agujero negro de la portada:** clic para que se trague la página y salte a la siguiente sección.
- **Fotos:** clic para verlas en grande, con la misma animación de agujero negro.
- **Sistema solar:** se inclina con el mouse y gira al arrastrarlo.
- **Tarjetas:** se inclinan en 3D al pasar el mouse.
- **Canciones:** clic para escuchar unos segundos.

---

## Personalizar

### Textos, nombres y canciones

Casi todo el contenido está en un solo archivo: **`src/data/contenido.js`**.

| Qué | Dónde |
|---|---|
| Nombre, cargo, iniciales | `perfil` |
| Nombres de las mascotas | `mascotas` |
| Bandas y canciones | `bandas`, `canciones`, `cancionPunk` |
| Planetas del sistema solar | `universo` |
| Niveles de la trayectoria y la meta | `trayectoria`, `meta` |
| Idea de la app Reposición | `reposicion` |
| Resultados y aportes | `resultados`, `aportes` |

### Fotos → `public/img/`

Guárdalas con estos nombres y aparecen solas. Mientras falte una, la página muestra un recuadro con el nombre del archivo que va ahí.

| Archivo | Dónde sale | Formato |
|---|---|---|
| `yo-principal.jpg` | Portada (foto redonda) | Cuadrada 1:1 |
| `perro-1.jpg` | Mi manada | Vertical 3:4 |
| `perro-2.jpg` | Mi manada | Vertical 3:4 |
| `gato.jpg` | Mi manada | Vertical 3:4 |
| `yo-ikea.jpg` | IKEA, mi escuela | Horizontal o cuadrada |
| `tiempo-1.jpg` … `tiempo-4.jpg` | Tiempo libre · galería "Pasar tiempo" (pon las que quieras en `fotos.tiempo`) | Horizontal 4:3 |

### Video → `public/video/`

| Archivo | Dónde sale | Formato |
|---|---|---|
| `concierto.mp4` | Dato curioso (música) | Horizontal, MP4 |

En la página se ve en silencio y en bucle; al hacerle clic se abre en grande con sonido.

### Canciones → `public/audio/`

| Archivo | Canción |
|---|---|
| `territory.mp3` | Territory — Sepultura |
| `hasta-que-me-olvides.mp3` | Hasta que me olvides — Luis Miguel |
| `sin-reaccion-mutantex.mp3` | Sin reacción — Pestes Mutantex |

Puede ser la canción completa: solo suenan unos segundos. En `contenido.js`, `inicio` es el segundo donde empieza el clip y `duracion` cuántos segundos suena. Si falta un archivo, el botón muestra "Falta public/audio/…".

---

## Secciones

1. **Inicio:** agujero negro, avatar y nombre.
2. **Conóceme:** frase que se ilumina al bajar.
3. **Mi manada:** mascotas.
4. **IKEA, mi escuela:** habilidades y carrera.
5. **Dato curioso:** conciertos, metal y "música para planchar".
6. **Punk.**
7. **Tiempo libre:** galería "Pasar tiempo", karaoke y videojuegos.
8. **Astronomía:** sistema solar en 3D.
9. **Trayectoria:** niveles LVL 1 → LVL 4 · boss (Líder).
10. **Acciones** y **Reposición:** la app para la RP.
11. **Resultados.**
12. **¿Por qué estoy listo?:** editor de código que se escribe solo.
13. **Cocina:** cocina que se arma módulo a módulo.
14. **Mi diferencia:** terminal con `git log`.
15. **Gracias.**

---

## Estructura del código

```
├── index.html               Esqueleto: intro, menú y <main> donde se arman las secciones
├── public/
│   ├── img/                 Fotos
│   └── audio/               Canciones
└── src/
    ├── main.js              Arma la página e inicia cada módulo
    ├── data/contenido.js    Todo el contenido editable
    ├── sections/            Una sección = un .js (render + init) y su .css
    ├── components/          Piezas reutilizables: foto, clip de canción, pixel art, menú, sonido…
    ├── core/                Comportamiento general
    │   ├── presenter.js     Navegación con teclado / clicker
    │   ├── swallow.js       Animación del agujero negro que se traga la página
    │   ├── lightbox.js      Fotos en primer plano
    │   ├── starfield.js     Cielo de estrellas en canvas
    │   ├── tilt.js          Inclinación 3D con el mouse
    │   ├── ambient.js       Música de fondo generada en vivo
    │   ├── audioClips.js    Clips de las canciones
    │   └── …                Tema, volumen, intro, animaciones de entrada
    └── styles/              Colores, tipografía, layout y estilo pixel
```

Para agregar o quitar una sección: crea su módulo en `src/sections/` y ponlo en el orden deseado en `src/sections/index.js`.

---

## Tecnologías

- [Vite](https://vitejs.dev/) y JavaScript con módulos ES, sin frameworks.
- CSS con transformaciones 3D, `preserve-3d` y animaciones.
- Canvas 2D para las estrellas.
- Web Audio API para la música de fondo y los efectos de sonido. Es una composición original generada en vivo, sin archivos.
- Web Animations API para las animaciones del agujero negro.
- Fuente [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) (licencia SIL OFL) vía `@fontsource`.

Respeta la opción del sistema "reducir movimiento" y se adapta a celular, con modo claro y oscuro.

---

## Nota sobre las canciones

Los mp3 de `public/audio/` no vienen incluidos porque tienen derechos de autor. Son para uso personal en la exposición.
