import { NotaDetectada, CuerdaGuitarra } from '../types';

export const CUERDAS: CuerdaGuitarra[] = [
  { numero: 6, nota: 'E2', frecuencia: 82.41 },
  { numero: 5, nota: 'A2', frecuencia: 110.0 },
  { numero: 4, nota: 'D3', frecuencia: 146.83 },
  { numero: 3, nota: 'G3', frecuencia: 196.0 },
  { numero: 2, nota: 'B3', frecuencia: 246.94 },
  { numero: 1, nota: 'E4', frecuencia: 329.63 },
];

const NOTAS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const FRECUENCIA_BASE = 440;
const TOLERANCIA_CENTS = 20;

function yinAlgorithm(buffer: Float32Array, sampleRate: number): number {
  const bufferSize = buffer.length;
  const halfBuffer = Math.floor(bufferSize / 2);
  const yinBuffer = new Float32Array(halfBuffer);
  yinBuffer[0] = 1;
  let runningSum = 0;
  for (let tau = 1; tau < halfBuffer; tau++) {
    let sum = 0;
    for (let i = 0; i < halfBuffer; i++) { const delta = buffer[i] - buffer[i + tau]; sum += delta * delta; }
    yinBuffer[tau] = sum;
    runningSum += sum;
    yinBuffer[tau] *= tau / runningSum;
  }
  const threshold = 0.1;
  for (let tau = 2; tau < halfBuffer; tau++) {
    if (yinBuffer[tau] < threshold) {
      while (tau + 1 < halfBuffer && yinBuffer[tau + 1] < yinBuffer[tau]) tau++;
      return sampleRate / tau;
    }
  }
  let minVal = yinBuffer[2]; let minTau = 2;
  for (let tau = 3; tau < halfBuffer; tau++) { if (yinBuffer[tau] < minVal) { minVal = yinBuffer[tau]; minTau = tau; } }
  return minVal > 0.3 ? -1 : sampleRate / minTau;
}

export function getNoteFromFrequency(frecuencia: number): NotaDetectada | null {
  if (frecuencia <= 0) return null;
  const semitonos = 12 * Math.log2(frecuencia / FRECUENCIA_BASE);
  const semitonoRedondeado = Math.round(semitonos) + 69;
  const octava = Math.floor(semitonoRedondeado / 12) - 1;
  const indiceNota = ((semitonoRedondeado % 12) + 12) % 12;
  const nota = NOTAS[indiceNota];
  const cents = Math.round((semitonos - Math.round(semitonos)) * 100);
  return { nota, octava, frecuencia, cents, afinada: Math.abs(cents) <= TOLERANCIA_CENTS };
}

export function getFrequency(buffer: Float32Array, sampleRate: number): number { return yinAlgorithm(buffer, sampleRate); }

export class PitchSmoother {
  private history: number[] = [];
  private readonly windowSize: number;
  constructor(windowSize = 5) { this.windowSize = windowSize; }
  smooth(value: number): number {
    if (value > 0) { this.history.push(value); if (this.history.length > this.windowSize) this.history.shift(); }
    if (this.history.length === 0) return -1;
    return this.history.reduce((a, b) => a + b, 0) / this.history.length;
  }
  reset() { this.history = []; }
}

export function getRMSLevel(buffer: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) sum += buffer[i] * buffer[i];
  return 20 * Math.log10(Math.sqrt(sum / buffer.length));
}
export const NOISE_THRESHOLD_DB = -60;
