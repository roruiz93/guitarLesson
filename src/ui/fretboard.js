/**
 * Diagrama de mástil SVG con posición de dedos.
 * Muestra las 6 cuerdas, 5 trastes y marca dónde pisar.
 */

// Nota → {cuerda (1=aguda, 6=grave), traste, dedo (1-4), nombre}
export const NOTE_POSITIONS = {
  'E4':  { cuerda: 1, traste: 0, dedo: null, label: 'Mi agudo', cuerdaNombre: '1ª (E)' },
  'F4':  { cuerda: 1, traste: 1, dedo: 1,    label: 'Fa',       cuerdaNombre: '1ª (E)' },
  'F#4': { cuerda: 1, traste: 2, dedo: 2,    label: 'Fa#',      cuerdaNombre: '1ª (E)' },
  'G4':  { cuerda: 1, traste: 3, dedo: 3,    label: 'Sol',      cuerdaNombre: '1ª (E)' },
  'G#4': { cuerda: 1, traste: 4, dedo: 4,    label: 'Sol#',     cuerdaNombre: '1ª (E)' },
  'B3':  { cuerda: 2, traste: 0, dedo: null, label: 'Si',       cuerdaNombre: '2ª (B)' },
  'C4':  { cuerda: 2, traste: 1, dedo: 1,    label: 'Do',       cuerdaNombre: '2ª (B)' },
  'C#4': { cuerda: 2, traste: 2, dedo: 2,    label: 'Do#',      cuerdaNombre: '2ª (B)' },
  'D4':  { cuerda: 2, traste: 3, dedo: 3,    label: 'Re',       cuerdaNombre: '2ª (B)' },
  'G3':  { cuerda: 3, traste: 0, dedo: null, label: 'Sol',      cuerdaNombre: '3ª (G)' },
  'G#3': { cuerda: 3, traste: 1, dedo: 1,    label: 'Sol#',     cuerdaNombre: '3ª (G)' },
  'A3':  { cuerda: 3, traste: 2, dedo: 2,    label: 'La',       cuerdaNombre: '3ª (G)' },
  'D3':  { cuerda: 4, traste: 0, dedo: null, label: 'Re',       cuerdaNombre: '4ª (D)' },
  'D#3': { cuerda: 4, traste: 1, dedo: 1,    label: 'Re#',      cuerdaNombre: '4ª (D)' },
  'E3':  { cuerda: 4, traste: 2, dedo: 2,    label: 'Mi',       cuerdaNombre: '4ª (D)' },
  'F3':  { cuerda: 4, traste: 3, dedo: 3,    label: 'Fa',       cuerdaNombre: '4ª (D)' },
  'A2':  { cuerda: 5, traste: 0, dedo: null, label: 'La',       cuerdaNombre: '5ª (A)' },
  'A#2': { cuerda: 5, traste: 1, dedo: 1,    label: 'La#',      cuerdaNombre: '5ª (A)' },
  'B2':  { cuerda: 5, traste: 2, dedo: 2,    label: 'Si',       cuerdaNombre: '5ª (A)' },
  'C3':  { cuerda: 5, traste: 3, dedo: 3,    label: 'Do',       cuerdaNombre: '5ª (A)' },
  'E2':  { cuerda: 6, traste: 0, dedo: null, label: 'Mi grave', cuerdaNombre: '6ª (E)' },
  'F2':  { cuerda: 6, traste: 1, dedo: 1,    label: 'Fa',       cuerdaNombre: '6ª (E)' },
  'F#2': { cuerda: 6, traste: 2, dedo: 2,    label: 'Fa#',      cuerdaNombre: '6ª (E)' },
  'G2':  { cuerda: 6, traste: 3, dedo: 3,    label: 'Sol',      cuerdaNombre: '6ª (E)' },
};

const DEDO_LABELS = { 1: 'Índice', 2: 'Medio', 3: 'Anular', 4: 'Meñique' };
const DEDO_COLORS = { 1: '#7c6af7', 2: '#22c55e', 3: '#f59e0b', 4: '#ef4444' };
const STRING_NAMES = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2']; // cuerda 1..6

export class FretboardDiagram {
  /**
   * @param {string} containerId - ID del elemento donde insertar el SVG
   * @param {string} nota - Ej: 'E4', 'A2'
   */
  render(containerId, nota) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const pos = NOTE_POSITIONS[nota];
    container.innerHTML = pos
      ? this._buildSVG(pos, nota)
      : `<p class="fretboard-no-pos">Diagrama no disponible para ${nota}</p>`;
  }

  _buildSVG(pos, nota) {
    const W = 280, H = 180;
    const LEFT = 48, TOP = 30, RIGHT = 20, BOTTOM = 30;
    const fretW = (W - LEFT - RIGHT) / 5;   // 5 trastes visibles
    const strH  = (H - TOP - BOTTOM) / 5;   // 6 cuerdas → 5 espacios

    const isOpen = pos.traste === 0;
    // Traste de inicio del diagrama (si el dedo va en traste > 3, desplazamos la vista)
    const startFret = pos.traste > 3 ? pos.traste - 2 : 0;
    const endFret   = startFret + 5;

    let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="fretboard-svg">`;

    // ── Fondo ──
    svg += `<rect width="${W}" height="${H}" fill="#16213e" rx="10"/>`;

    // ── Cejuela (traste 0) ──
    if (startFret === 0) {
      svg += `<rect x="${LEFT}" y="${TOP}" width="5" height="${strH * 5}" fill="#e2e8f0" rx="2"/>`;
    }

    // ── Trastes ──
    for (let f = 1; f <= 5; f++) {
      const x = LEFT + f * fretW;
      svg += `<line x1="${x}" y1="${TOP}" x2="${x}" y2="${TOP + strH * 5}" stroke="#334155" stroke-width="1.5"/>`;
      // número de traste
      const fretNum = startFret + f;
      svg += `<text x="${x - fretW / 2}" y="${TOP - 10}" text-anchor="middle" fill="#64748b" font-size="10">${fretNum}</text>`;
    }

    // ── Cuerdas ──
    for (let s = 0; s < 6; s++) {
      const y = TOP + s * strH;
      const thickness = 1 + s * 0.35;
      svg += `<line x1="${LEFT}" y1="${y}" x2="${W - RIGHT}" y2="${y}" stroke="#94a3b8" stroke-width="${thickness}"/>`;
      // nombre cuerda izquierda
      svg += `<text x="${LEFT - 6}" y="${y + 4}" text-anchor="end" fill="#64748b" font-size="9">${STRING_NAMES[s]}</text>`;
    }

    // ── Posición del dedo ──
    const sy = TOP + (pos.cuerda - 1) * strH;

    if (isOpen) {
      // Cuerda al aire → círculo en la cabeza
      svg += `<circle cx="${LEFT - 14}" cy="${sy}" r="7" fill="none" stroke="#22c55e" stroke-width="2"/>`;
      svg += `<text x="${LEFT - 14}" y="${sy + 4}" text-anchor="middle" fill="#22c55e" font-size="9">O</text>`;
    } else {
      const fx = LEFT + (pos.traste - startFret - 0.5) * fretW;
      const color = DEDO_COLORS[pos.dedo] || '#7c6af7';
      svg += `<circle cx="${fx}" cy="${sy}" r="10" fill="${color}" opacity="0.9"/>`;
      svg += `<text x="${fx}" y="${sy + 4}" text-anchor="middle" fill="white" font-size="10" font-weight="bold">${pos.dedo}</text>`;
    }

    // ── Leyenda abajo ──
    const instruccion = isOpen
      ? `Tocá la ${pos.cuerdaNombre} al aire (sin pisar)`
      : `Dedo ${pos.dedo} (${DEDO_LABELS[pos.dedo]}) en traste ${pos.traste}, ${pos.cuerdaNombre}`;

    svg += `<text x="${W / 2}" y="${H - 8}" text-anchor="middle" fill="#94a3b8" font-size="10">${instruccion}</text>`;

    svg += `</svg>`;
    return svg;
  }
}
