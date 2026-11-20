import { getVolume, onVolume } from './volume.js';

// Música espacial relajante generada en vivo con Web Audio (no usa archivos):
// un acorde suave con mucha reverberación y campanitas sueltas de vez en cuando.
// Se apaga sola mientras suena una canción (eventos clip:play / clip:stop).

const LEVEL = 0.45;                                           // respecto al volumen general
const CHORD = [110, 164.81, 220, 246.94, 261.63, 329.63];     // La menor con novena
const BELLS = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];  // escala pentatónica

let ctx = null, music, sfx, reverb;
let on = (() => { try { return localStorage.getItem('musica') !== 'off'; } catch { return true; } })();
let ducked = false;
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
  document.addEventListener('blackhole:swallow', rumble);
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
  music = ctx.createGain();
  music.gain.value = 0;
  music.connect(ctx.destination);
  sfx = ctx.createGain();
  sfx.connect(ctx.destination);

  // reverberación larga, como un espacio enorme
  reverb = ctx.createConvolver();
  reverb.buffer = impulse(5, 2.8);
  const wet = ctx.createGain();
  wet.gain.value = 0.7;
  reverb.connect(wet).connect(music);

  // colchón: dos osciladores un poco desafinados por nota, filtrados y con vaivén lento
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 800;
  filter.Q.value = 0.6;
  lfo(0.03, 350).connect(filter.frequency);
  filter.connect(music);
  filter.connect(reverb);

  CHORD.forEach((freq, i) => {
    const voice = ctx.createGain();
    voice.gain.value = 0.045;
    lfo(0.05 + i * 0.013, 0.025).connect(voice.gain);
    voice.connect(filter);
    [-6, 6].forEach((cents, k) => {
      const o = ctx.createOscillator();
      o.type = k ? 'triangle' : 'sine';
      o.frequency.value = freq;
      o.detune.value = cents;
      o.connect(voice);
      o.start();
    });
  });

  const ring = () => {
    if (on && !ducked && ctx.state === 'running') bell();
    setTimeout(ring, 2500 + Math.random() * 4000);
  };
  ring();
}

function lfo(freq, depth) {
  const o = ctx.createOscillator();
  o.frequency.value = freq;
  const g = ctx.createGain();
  g.gain.value = depth;
  o.connect(g);
  o.start();
  return g;
}

function bell() {
  const t = ctx.currentTime;
  const freq = BELLS[(Math.random() * BELLS.length) | 0];
  const env = ctx.createGain();
  env.gain.setValueAtTime(0, t);
  env.gain.linearRampToValueAtTime(0.05, t + 0.02);
  env.gain.exponentialRampToValueAtTime(0.0001, t + 4);
  env.connect(reverb);
  env.connect(music);
  [1, 2.01].forEach((mult, i) => {
    const o = ctx.createOscillator();
    o.frequency.value = freq * mult;
    const g = ctx.createGain();
    g.gain.value = i ? 0.3 : 1;
    o.connect(g).connect(env);
    o.start(t);
    o.stop(t + 4.1);
  });
}

// estruendo grave cuando el agujero negro se traga la página
function rumble() {
  if (!ctx) build();
  ctx.resume();
  update();
  const t = ctx.currentTime;
  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(0.6, t + 1.2);
  env.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
  env.connect(sfx);

  const o = ctx.createOscillator();
  o.frequency.setValueAtTime(90, t);
  o.frequency.exponentialRampToValueAtTime(28, t + 2);
  o.connect(env);

  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer(2.5);
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.setValueAtTime(900, t);
  lp.frequency.exponentialRampToValueAtTime(60, t + 2);
  const ng = ctx.createGain();
  ng.gain.value = 0.5;
  noise.connect(lp).connect(ng).connect(env);

  o.start(t); o.stop(t + 2.5);
  noise.start(t); noise.stop(t + 2.5);
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
