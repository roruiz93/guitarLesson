/**
 * @typedef {Object} Badge
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {'common'|'rare'|'epic'|'legendary'} rarity
 * @property {function({lessonsCompleted, streak, correctNotes, maxTempo, advancedLessons, xp, accuracy, subnivelCompleted}): boolean} condition
 * @property {string} icon
 */

/** @type {Badge[]} */
export const BADGES = [
  {
    id: 'primer_rasgueo',
    name: '🎸 Primer Rasgueo',
    description: 'Completa tu primera lección',
    rarity: 'common',
    icon: '🎸',
    condition: (s) => s.lessonsCompleted >= 1,
  },
  {
    id: 'rasgueador_maestro',
    name: '🏆 Rasgueador Maestro',
    description: '10 ejercicios de rasgueo con 90%+ accuracy',
    rarity: 'rare',
    icon: '🏆',
    condition: (s) => s.rasgueosPerfectos >= 10,
  },
  {
    id: 'semana_de_oro',
    name: '💎 Semana de Oro',
    description: '7 días consecutivos de práctica',
    rarity: 'rare',
    icon: '💎',
    condition: (s) => s.streak >= 7,
  },
  {
    id: 'racha_imparable',
    name: '🔥 Racha Imparable',
    description: '30 días consecutivos de práctica',
    rarity: 'epic',
    icon: '🔥',
    condition: (s) => s.streak >= 30,
  },
  {
    id: 'cazador_de_notas',
    name: '🎯 Cazador de Notas',
    description: '100 notas correctas en el afinador',
    rarity: 'common',
    icon: '🎯',
    condition: (s) => s.correctNotes >= 100,
  },
  {
    id: 'velocidad_relampago',
    name: '🚀 Velocidad Relámpago',
    description: 'Completa un ejercicio a 1.5x de tempo',
    rarity: 'rare',
    icon: '🚀',
    condition: (s) => s.maxTempo >= 1.5,
  },
  {
    id: 'virtuoso',
    name: '👑 Virtuoso',
    description: 'Completa 5 lecciones del nivel Avanzado',
    rarity: 'epic',
    icon: '👑',
    condition: (s) => s.advancedLessons >= 5,
  },
  {
    id: 'primeros_pasos',
    name: '👣 Primeros Pasos',
    description: 'Completa el sub-nivel 1 completo',
    rarity: 'common',
    icon: '👣',
    condition: (s) => s.subnivelCompleted >= 1,
  },
  {
    id: 'afinado',
    name: '🎵 Siempre Afinado',
    description: 'Usa el afinador 20 veces',
    rarity: 'common',
    icon: '🎵',
    condition: (s) => s.tunerUses >= 20,
  },
  {
    id: 'estudiante_dedicado',
    name: '📚 Estudiante Dedicado',
    description: 'Completa 25 lecciones',
    rarity: 'rare',
    icon: '📚',
    condition: (s) => s.lessonsCompleted >= 25,
  },
  {
    id: 'maestro_de_acordes',
    name: '🎼 Maestro de Acordes',
    description: 'Completa todas las lecciones de acordes básicos',
    rarity: 'rare',
    icon: '🎼',
    condition: (s) => s.acordesCompletados >= 10,
  },
  {
    id: 'perfeccionista',
    name: '💯 Perfeccionista',
    description: 'Obtén 100% de accuracy en una lección',
    rarity: 'epic',
    icon: '💯',
    condition: (s) => s.maxAccuracy >= 100,
  },
  {
    id: 'maratonista',
    name: '🏃 Maratonista',
    description: 'Practica más de 2 horas en un día',
    rarity: 'rare',
    icon: '🏃',
    condition: (s) => s.dailyMinutes >= 120,
  },
  {
    id: 'flamenco_soul',
    name: '💃 Alma Flamenca',
    description: 'Completa 5 lecciones de Flamenco',
    rarity: 'epic',
    icon: '💃',
    condition: (s) => s.flamencoLessons >= 5,
  },
  {
    id: 'xp_1000',
    name: '⭐ Mil Estrellas',
    description: 'Acumula 1,000 XP',
    rarity: 'common',
    icon: '⭐',
    condition: (s) => s.xp >= 1000,
  },
  {
    id: 'xp_10000',
    name: '🌟 Diez Mil Estrellas',
    description: 'Acumula 10,000 XP',
    rarity: 'epic',
    icon: '🌟',
    condition: (s) => s.xp >= 10000,
  },
  {
    id: 'spotify_maestro',
    name: '🎧 DJ Guitarrista',
    description: 'Practica con 10 canciones diferentes de Spotify',
    rarity: 'rare',
    icon: '🎧',
    condition: (s) => s.spotifySongsUsed >= 10,
  },
  {
    id: 'tapping_pro',
    name: '⚡ Tapping Pro',
    description: 'Completa las lecciones de tapping con 80%+',
    rarity: 'epic',
    icon: '⚡',
    condition: (s) => s.tappingAccuracy >= 80,
  },
  {
    id: 'leyenda',
    name: '🌌 Leyenda',
    description: 'Completa las 300 lecciones',
    rarity: 'legendary',
    icon: '🌌',
    condition: (s) => s.lessonsCompleted >= 300,
  },
  {
    id: 'guitarra_clasica',
    name: '🎻 Clásico',
    description: 'Completa el sub-nivel de Guitarra Clásica',
    rarity: 'rare',
    icon: '🎻',
    condition: (s) => s.clasicaCompleted >= 10,
  },
];

export const RARITY_COLORS = {
  common: '#9ca3af',
  rare: '#60a5fa',
  epic: '#a855f7',
  legendary: '#f59e0b',
};
