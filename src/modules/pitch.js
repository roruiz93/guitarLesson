/** Frecuencias de referencia para las 6 cuerdas de guitarra estándar */
export const NOTE_FREQUENCIES = {
  E2: 82.41,
  A2: 110.0,
  D3: 146.83,
  G3: 196.0,
  B3: 246.94,
  E4: 329.63,
};

const ALGORITHM = 'YIN';

const ALL_NOTES = [
  { name: 'C', freq: 16.35 },
  { name: 'C#', freq: 17.32 },
  { name: 'D', freq: 18.35 },
  { name: 'D#', freq: 19.45 },
  { name: 'E', freq: 20.6 },
  { name: 'F', freq: 21.83 },
  { name: 'F#', freq: 23.12 },
  { name: 'G', freq: 24.5 },
  { name: 'G#', freq: 25.96 },
  { name: 'A', freq: 27.5 },
  { name: 'A#', freq: 29.14 },
  { name: 'B', freq: 30.87 },
];

/** Detector de pitch basado en el algoritmo YIN usando Web Audio API */
export class PitchDetector {
  constructor() {
    this._audioCtx = null;
    this._analyser = null;
    this._stream = null;
    this._buffer = null;
    this._animFrame = null;
    this._lastEmit = 0;
    this._freqHistory = [];
    this._running = false;
  }

  /** Inicia captura de micrófono y emite evento 'frequency' con cada detección */
  async start() {
    if (this._running) return;

    this._stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this._audioCtx = new AudioContext();
    const source = this._audioCtx.createMediaStreamSource(this._stream);

    this._analyser = this._audioCtx.createAnalyser();
    this._analyser.fftSize = 2048;
    source.connect(this._analyser);

    this._buffer = new Float32Array(this._analyser.fftSize);
    this._running = true;
    this._loop();
  }

  stop() {
    this._running = false;
    cancelAnimationFrame(this._animFrame);
    this._stream?.getTracks().forEach((t) => t.stop());
    this._audioCtx?.close();
  }

  /** @returns {number|null} Frecuencia en Hz usando YIN, o null si no detecta */
  getFrequency() {
    this._analyser.getFloatTimeDomainData(this._buffer);

    const rms = Math.sqrt(this._buffer.reduce((s, v) => s + v * v, 0) / this._buffer.length);
    // Noise gate: -60dB ≈ 0.001
    if (rms < 0.001) return null;

    return this._yin(this._buffer, this._audioCtx.sampleRate);
  }

  /**
   * Convierte frecuencia a nota musical
   * @param {number} freq - Frecuencia en Hz
   * @returns {{nombre: string, octava: number, cents: number}}
   */
  getNoteFromFrequency(freq) {
    const midi = 12 * Math.log2(freq / 440) + 69;
    const midiRounded = Math.round(midi);
    const cents = Math.round((midi - midiRounded) * 100);
    const octava = Math.floor((midiRounded - 12) / 12);
    const noteIndex = ((midiRounded % 12) + 12) % 12;
    const nombre = ALL_NOTES[noteIndex].name;
    return { nombre, octava, cents };
  }

  /**
   * Calcula desviación en cents entre frecuencia detectada y esperada
   * @param {number} freq - Frecuencia detectada
   * @param {number} expectedFreq - Frecuencia esperada
   * @returns {number} Cents de desviación (-50 a +50)
   */
  calculateCents(freq, expectedFreq) {
    return Math.round(1200 * Math.log2(freq / expectedFreq));
  }

  _loop() {
    if (!this._running) return;
    this._animFrame = requestAnimationFrame(() => this._loop());

    const now = Date.now();
    if (now - this._lastEmit < 100) return; // debounce 100ms
    this._lastEmit = now;

    const freq = this.getFrequency();
    if (!freq || freq < 80 || freq > 400) return;

    // Moving average 5 frames
    this._freqHistory.push(freq);
    if (this._freqHistory.length > 5) this._freqHistory.shift();
    const avgFreq = this._freqHistory.reduce((a, b) => a + b, 0) / this._freqHistory.length;

    const note = this.getNoteFromFrequency(avgFreq);
    window.dispatchEvent(new CustomEvent('frequency', { detail: { frequency: avgFreq, ...note } }));
  }

  /** Implementación del algoritmo YIN para detección de pitch */
  _yin(buffer, sampleRate) {
    const W = buffer.length;
    const half = Math.floor(W / 2);
    const d = new Float32Array(half);

    // Diferencia cuadrática
    for (let tau = 1; tau < half; tau++) {
      let sum = 0;
      for (let i = 0; i < half; i++) {
        const delta = buffer[i] - buffer[i + tau];
        sum += delta * delta;
      }
      d[tau] = sum;
    }

    // Diferencia cuadrática media normalizada acumulada
    const cmndf = new Float32Array(half);
    cmndf[0] = 1;
    let runSum = 0;
    for (let tau = 1; tau < half; tau++) {
      runSum += d[tau];
      cmndf[tau] = d[tau] / (runSum / tau);
    }

    // Umbral de 0.1
    const threshold = 0.1;
    for (let tau = 2; tau < half; tau++) {
      if (cmndf[tau] < threshold) {
        while (tau + 1 < half && cmndf[tau + 1] < cmndf[tau]) tau++;
        return sampleRate / tau;
      }
    }

    return null;
  }
}
