// ✏️ Todo el contenido de la exposición está aquí: textos, fotos y canciones.
// Las fotos van en public/img/ y los audios en public/audio/ (cada carpeta tiene su LEEME.md).

export const perfil = {
  nombre: 'Juan Diego',
  apellidos: 'Carmona Villegas',
  iniciales: 'JD',
  cargo: 'Planificador de cocinas',
};

export const fotos = {
  principal: 'img/yo-principal.jpg',
  ikea: 'img/yo-ikea.jpg',
  concierto: 'img/concierto.jpg',
  amigos: 'img/amigos.jpg',
};

// Las palabras entre [corchetes] se resaltan con el degradado.
export const frase = 'Lo más importante para mí son [mis mascotas,] [mis amigos] y mi gente.';

// ✏️ Cambia "Nombre" por el nombre de cada uno.
export const mascotas = [
  { nombre: 'Nombre', tipo: 'Perro', foto: 'img/perro-1.jpg' },
  { nombre: 'Nombre', tipo: 'Perro', foto: 'img/perro-2.jpg' },
  { nombre: 'Nombre', tipo: 'Gato · el nuevo jefe', foto: 'img/gato.jpg', badge: '3 meses' },
];

export const habilidades = [
  { icono: 'chat', titulo: 'Atención al cliente', texto: 'Escuchar primero. Asesorar después.' },
  { icono: 'team', titulo: 'Trabajo en equipo', texto: 'Nadie arma un mueble solo.' },
  { icono: 'star', titulo: 'Liderazgo', texto: 'Dar el ejemplo en cada temporada.' },
];

export const bandas = {
  metal: ['Limp Bizkit', 'Sepultura', 'Rammstein', 'Metallica', 'Ozzy Osbourne'],
  planchar: ['José José', 'Luis Miguel'],
};

// inicio = segundo de la canción donde empieza el clip · duracion = cuántos segundos suena
export const canciones = [
  { titulo: 'Territory', artista: 'Sepultura', genero: 'Metal', modo: 'metal', audio: 'audio/territory.mp3', inicio: 0, duracion: 15 },
  { titulo: 'Hasta que me olvides', artista: 'Luis Miguel', genero: 'Para planchar', modo: 'planchar', audio: 'audio/hasta-que-me-olvides.mp3', inicio: 0, duracion: 15 },
];

// ✏️ Escribe el nombre de la canción de Pestes Mutantex que vas a poner.
export const cancionPunk = {
  titulo: 'Nombre de la canción', artista: 'Pestes Mutantex', genero: 'Punk', modo: 'punk',
  audio: 'audio/pestes-mutantex.mp3', inicio: 0, duracion: 15,
};

export const trayectoria = [
  { ver: 'v1.0', titulo: 'Fines de semana', texto: 'Donde empezó todo.', estado: 'hecho' },
  { ver: 'v2.0', titulo: 'Medio tiempo', texto: 'Trabajo y estudio, en equilibrio.', estado: 'hecho' },
  { ver: 'v3.0', titulo: 'Planificador de cocinas', texto: 'El siguiente paso.', estado: 'siguiente' },
  { ver: 'v4.0', titulo: 'Líder', texto: 'A donde quiero llegar.', estado: 'meta' },
];
export const meta = 'llegar a ser líder en la empresa.';

export const acciones = [
  { titulo: 'Acompañar cada temporada', texto: 'Junto a la empresa, mis líderes y mis compañeros, en todo el proceso.' },
  { titulo: 'Ayudar en lo que falte', texto: 'Donde haga falta una mano, ahí estoy.' },
  { titulo: 'Reposición: una app para la RP', texto: 'Una idea para que sea más sencilla para coworkers y fulfillment.', destacada: true },
];

export const reposicion = {
  antes: 'Hoy, cada turno llega una hoja impresa (la Replenishment Proposal) y se revisa a mano.',
  pasos: [
    { titulo: 'Foto', texto: 'Se le toma una foto a la hoja con el celular.' },
    { titulo: 'La IA lee', texto: 'Gemini convierte la foto en líneas.' },
    { titulo: 'Se corrige', texto: 'La persona revisa lo leído antes de guardar.' },
    { titulo: 'Tarjetas', texto: 'Cada producto con su foto de ikea.com y sus alertas.' },
    { titulo: 'Sí / No', texto: 'Cada compañero marca cuántas trajo, o el motivo.' },
    { titulo: 'Resumen', texto: 'Listo para WhatsApp, o en CSV para Excel.' },
  ],
  alertas: ['No cabe', 'Picking en 0', 'Menor al MPQ', 'Mayor al PQ', 'SKU repetido'],
  stack: ['React 19', 'Vite', 'Node 22', 'Express 5', 'libSQL · Turso', 'Gemini', 'Render'],
};

export const resultados = [
  { icono: 'trend', titulo: 'Ascenso.', texto: 'De fines de semana a medio tiempo. Más espacio para estudiar y crecer.' },
  { icono: 'talk', titulo: 'Comunicación.', texto: 'Habilidades blandas más fuertes que nunca.' },
  { icono: 'medal', titulo: 'Reconocimiento.', texto: 'De parte de mis líderes.' },
];

export const aportes = [
  ['Informática', 'al servicio de la planificación.'],
  ['Conocer los sistemas', 'a fondo para sacarles provecho.'],
  ['Cacharrero', ': reviso hasta el mínimo detalle.'],
  ['Mejor asesoría', 'y atención para cada cliente.'],
];
