const STRINGS = [
  { label: 'E', note: 'E2', freq: 82.41 },
  { label: 'A', note: 'A2', freq: 110.0 },
  { label: 'D', note: 'D3', freq: 146.83 },
  { label: 'G', note: 'G3', freq: 196.0 },
  { label: 'B', note: 'B3', freq: 246.94 },
  { label: 'E', note: 'E4', freq: 329.63 },
];

/** UI del afinador visual con Canvas y selector de cuerdas */
export class TunerUI {
  constructor() {
    this._canvas = null;
    this._ctx = null;
    this._selectedString = 3; // G3 por defecto
    this._lastCents = 0;
  }

  render() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
      <div class="tuner-container">
        <div class="frequency-display" id="frequency">0 Hz</div>
        <h2 id="note-name">--</h2>
        <div class="cents-display">
          <span id="cents">0</span> <span class="cents-label">cents</span>
        </div>
        <canvas id="tuner-canvas" width="300" height="150"></canvas>
        <div class="string-selector">
          ${STRINGS.map((s, i) => `
            <button class="string-btn ${i === this._selectedString ? 'active' : ''}"
              data-index="${i}" data-note="${s.note}" title="${s.note}">
              ${s.label}
            </button>
          `).join('')}
        </div>
        <div id="tuner-status" class="tuner-status">🎙️ Escuchando...</div>
      </div>
    `;

    this._canvas = document.getElementById('tuner-canvas');
    this._ctx = this._canvas.getContext('2d');
    this._drawNeedle(0);
    this._attachStringListeners();

    window.addEventListener('frequency', (e) => {
      const { frequency, nombre, octava, cents } = e.detail;
      this.updateFrequency(frequency, `${nombre}${octava}`, cents);
    });
  }

  /**
   * Actualiza todos los valores de UI sin re-render
   * @param {number} frequency
   * @param {string} note
   * @param {number} cents
   */
  updateFrequency(frequency, note, cents) {
    const freqEl = document.getElementById('frequency');
    const noteEl = document.getElementById('note-name');
    const centsEl = document.getElementById('cents');
    if (!freqEl) return;

    freqEl.textContent = `${frequency.toFixed(1)} Hz`;
    noteEl.textContent = note;
    centsEl.textContent = cents >= 0 ? `+${cents}` : `${cents}`;

    this.updateTunerIndicator(cents);
    this.updateStatus(cents);
  }

  /** Dibuja la aguja del afinador en el Canvas */
  updateTunerIndicator(cents) {
    if (!this._ctx) return;

    const canvas = this._canvas;
    const ctx = this._ctx;

    // Smooth interpolation
    this._lastCents += (cents - this._lastCents) * 0.3;
    this._drawNeedle(this._lastCents);
  }

  /** @param {number} cents */
  updateStatus(cents) {
    const statusEl = document.getElementById('tuner-status');
    if (!statusEl) return;
    const abs = Math.abs(cents);

    if (abs <= 5) {
      statusEl.textContent = '🟢 Afinada';
      statusEl.className = 'tuner-status tuned';
    } else if (abs <= 15) {
      statusEl.textContent = '🟡 Casi afinada';
      statusEl.className = 'tuner-status almost';
    } else {
      statusEl.textContent = cents < 0 ? '🔴 Demasiado grave' : '🔴 Demasiado aguda';
      statusEl.className = 'tuner-status out-of-tune';
    }
  }

  /** @param {number} cents @returns {string} Color CSS */
  getIndicatorColor(cents) {
    const abs = Math.abs(cents);
    if (abs <= 5) return '#22c55e';
    if (abs <= 15) return '#eab308';
    return '#ef4444';
  }

  _drawNeedle(cents) {
    const canvas = this._canvas;
    const ctx = this._ctx;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H - 10;
    const R = H - 20;

    ctx.clearRect(0, 0, W, H);

    // Arco de fondo
    ctx.beginPath();
    ctx.arc(cx, cy, R, Math.PI, 0, false);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#2a2a3e';
    ctx.stroke();

    // Zonas de color
    const zones = [
      { from: Math.PI, to: Math.PI * 0.75, color: '#ef4444' },
      { from: Math.PI * 0.75, to: Math.PI * 0.6, color: '#eab308' },
      { from: Math.PI * 0.6, to: Math.PI * 0.4, color: '#22c55e' },
      { from: Math.PI * 0.4, to: Math.PI * 0.25, color: '#eab308' },
      { from: Math.PI * 0.25, to: 0, color: '#ef4444' },
    ];
    zones.forEach(({ from, to, color }) => {
      ctx.beginPath();
      ctx.arc(cx, cy, R, from, to, false);
      ctx.strokeStyle = color;
      ctx.lineWidth = 8;
      ctx.stroke();
    });

    // Aguja — mapea -50..+50 cents a 0..180°
    const angle = Math.PI - ((cents + 50) / 100) * Math.PI;
    const color = this.getIndicatorColor(cents);
    const nx = cx + R * 0.85 * Math.cos(angle);
    const ny = cy - R * 0.85 * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(nx, ny);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Punto central
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  _attachStringListeners() {
    document.querySelectorAll('.string-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.string-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this._selectedString = parseInt(btn.dataset.index);
      });
    });
  }
}
