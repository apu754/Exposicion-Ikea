import { getVolume, onVolume } from './volume.js';

// Música de fondo generada en vivo con Web Audio (no usa archivos), al estilo de los
// soundtracks tranquilos de videojuegos tipo Minecraft: piano suave, acordes lentos
// con séptimas y novenas, melodías sueltas que van y vienen, y silencios entre frases.
// Nunca se repite igual. Se apaga sola mientras suena una canción (clip:play / clip:stop).

const LEVEL = 0.5;                 // respecto al volumen general
const BEAT = 60 / 66;              // 66 pulsos por minuto: lento
const CHORD_BEATS = 8;             // cada acorde dura dos compases

// Notas MIDI (60 = Do central). Progresión suave en Do mayor.
const PROGRESSION = [
  { bass: 41, chord: [53, 57, 60, 64] },   // Fa maj7
  { bass: 36, chord: [52, 55, 59, 62] },   // Do maj9
  { bass: 45, chord: [52, 55, 60, 64] },   // La m7
  { bass: 43, chord: [50, 55, 59, 64] },   // Sol 6
  { bass: 41, chord: [53, 57, 60, 67] },   // Fa add9
  { bass: 40, chord: [52, 55, 59, 64] },   // Mi m7
  { bass: 38, chord: [50, 57, 60, 65] },   // Re m7
  { bass: 43, chord: [50, 55, 60, 62] },   // Sol sus
];
const MELODY = [72, 74, 76, 79, 81, 84, 86, 88];  // pentatónica de Do, octava alta

let ctx = null, music, sfx, dry, reverb;
let on = (() => { try { return localStorage.getItem('musica') !== 'off'; } catch { return true; } })();
let ducked = false;
let nextChordAt = 0, chordIndex = 0, melodyStep = 3;
const listeners = new Set();

export const isMusicOn = () => on;
export const onMusicChange = fn => listeners.add(fn);

export function initAmbient() {
  // los navegadores solo dejan sonar audio después de un clic o una tecla
  const unlock = () => {
    removeEventListener('pointerdown', unlock);
    removeEventListener('keydown', unlock);
    if (on) start();
  };
  addEventListener('pointerdown', unlock);
  addEventListener('keydown', unlock);

  document.addEventListener('clip:play', () => { ducked = true; update(); });
  document.addEventListener('clip:stop', () => { ducked = false; update(); });
  document.addEventListener('blackhole:swallow', e => rumble(e.detail?.strength, e.detail?.length));
  onVolume(update);
}

export function toggleMusic() {
  on = !on;
  try { localStorage.setItem('musica', on ? 'on' : 'off'); } catch { /* sin almacenamiento */ }
  if (on) start(); else update();
  listeners.forEach(fn => fn(on));
}

function start() {
  if (!ctx) build();
  ctx.resume();
  update();
}

// subidas y bajadas suaves, nunca cortes bruscos
function update() {
  if (!ctx) return;
  music.gain.setTargetAtTime(on && !ducked ? getVolume() * LEVEL : 0, ctx.currentTime, 0.6);
  sfx.gain.setTargetAtTime(getVolume(), ctx.currentTime, 0.05);
}

function build() {
  ctx = new AudioContext();
  // el compresor empareja el volumen y evita que se sature cuando coinciden varias notas
  const glue = ctx.createDynamicsCompressor();
  glue.threshold.value = -18;
  glue.ratio.value = 3;
  glue.connect(ctx.destination);
  music = ctx.createGain();
  music.gain.value = 0;
  music.connect(glue);
  sfx = ctx.createGain();
  sfx.connect(ctx.destination);

  // sala mediana: el piano suena cercano pero con aire
  dry = ctx.createGain();
  dry.gain.value = 0.8;
  dry.connect(music);
  reverb = ctx.createConvolver();
  reverb.buffer = impulse(3.2, 3);
  const wet = ctx.createGain();
  wet.gain.value = 0.45;
  reverb.connect(wet).connect(music);

  // programa las notas con un poco de anticipación para que el ritmo sea exacto
  nextChordAt = ctx.currentTime + 0.2;
  setInterval(schedule, 250);
}

function schedule() {
  if (ctx.state !== 'running') return;
  // si el audio estuvo pausado, retoma desde ahora en vez de ponerse al día
  if (nextChordAt < ctx.currentTime) nextChordAt = ctx.currentTime + 0.1;
  while (nextChordAt < ctx.currentTime + 1.5) {
    playChord(nextChordAt, PROGRESSION[chordIndex % PROGRESSION.length]);
    nextChordAt += BEAT * CHORD_BEATS;
    chordIndex++;
  }
}

function playChord(t, { bass, chord }) {
  const len = BEAT * CHORD_BEATS;
  piano(bass, t, 0.38);
  pad(chord, t, len);

  // arpegio lento hacia arriba, a veces con notas omitidas
  const spacing = [1, 1.5, 2][(Math.random() * 3) | 0];
  chord.forEach((n, i) => {
    if (i > 0 && Math.random() < 0.2) return;
    piano(n, t + i * spacing * BEAT, 0.2);
  });

  // la melodía aparece en algunos acordes y en otros se deja respirar
  if (Math.random() < 0.65) {
    const count = 2 + ((Math.random() * 4) | 0);
    const beats = new Set();
    while (beats.size < count) beats.add(2 + Math.floor(Math.random() * 11) / 2);
    [...beats].sort((a, b) => a - b).forEach(b => {
      melodyStep = Math.max(0, Math.min(MELODY.length - 1, melodyStep + [-2, -1, -1, 1, 1, 2][(Math.random() * 6) | 0]));
      piano(MELODY[melodyStep], t + b * BEAT, 0.27 + Math.random() * 0.09);
    });
  }
  // de vez en cuando, una nota grave más que resuena al final
  if (Math.random() < 0.3) piano(bass + 12, t + (len - BEAT * 2), 0.18);
}

// Nota de piano suave: armónicos que se apagan, y un filtro que oscurece el sonido tras el golpe.
function piano(midi, t, vel) {
  const f = 440 * 2 ** ((midi - 69) / 12);
  const dur = 2.6 + (84 - midi) * 0.07;           // las graves duran más
  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(vel, t + 0.01);
  env.gain.exponentialRampToValueAtTime(vel * 0.35, t + 0.4);
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  const tone = ctx.createBiquadFilter();
  tone.type = 'lowpass';
  tone.frequency.setValueAtTime(Math.min(f * 5, 3500), t);
  tone.frequency.exponentialRampToValueAtTime(Math.max(f * 1.4, 280), t + 1);
  tone.connect(env);
  env.connect(dry);
  env.connect(reverb);
  [[1, 1], [2, 0.32], [3, 0.1], [4.01, 0.04]].forEach(([harmonic, gain]) => {
    const o = ctx.createOscillator();
    o.frequency.value = f * harmonic;
    o.detune.value = (Math.random() - 0.5) * 4;
    const g = ctx.createGain();
    g.gain.value = gain;
    o.connect(g).connect(tone);
    o.start(t);
    o.stop(t + dur + 0.1);
  });
}

// Colchón muy bajito debajo del piano, que entra y sale despacio.
function pad(notes, t, len) {
  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(0.035, t + 2);
  env.gain.setValueAtTime(0.035, t + len - 1);
  env.gain.exponentialRampToValueAtTime(0.0001, t + len + 1.5);
  const soft = ctx.createBiquadFilter();
  soft.type = 'lowpass';
  soft.frequency.value = 900;
  soft.connect(env);
  env.connect(reverb);
  notes.forEach(n => {
    const o = ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.value = 440 * 2 ** ((n - 69) / 12);
    o.connect(soft);
    o.start(t);
    o.stop(t + len + 1.6);
  });
}

// Estruendo grave del agujero negro. `strength` = qué tan fuerte (1 en la portada),
// `length` = cuántos segundos dura.
function rumble(strength = 1, length = 2.4) {
  if (!ctx) build();
  ctx.resume();
  update();
  const t = ctx.currentTime;
  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(0.6 * strength, t + length * 0.5);
  env.gain.exponentialRampToValueAtTime(0.0001, t + length);
  env.connect(sfx);

  const o = ctx.createOscillator();
  o.frequency.setValueAtTime(90, t);
  o.frequency.exponentialRampToValueAtTime(28, t + length * 0.83);
  o.connect(env);

  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer(length + 0.1);
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.setValueAtTime(900, t);
  lp.frequency.exponentialRampToValueAtTime(60, t + length * 0.83);
  const ng = ctx.createGain();
  ng.gain.value = 0.5;
  noise.connect(lp).connect(ng).connect(env);

  o.start(t); o.stop(t + length + 0.1);
  noise.start(t); noise.stop(t + length + 0.1);
}

function noiseBuffer(seconds) {
  const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

// respuesta de impulso sintética: ruido que se apaga poco a poco
function impulse(seconds, decay) {
  const len = ctx.sampleRate * seconds;
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
  }
  return buf;
}
