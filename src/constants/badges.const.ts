import { Badge } from '../types';

export const BADGES: Badge[] = [
  { id: 'primer_rasgueo', name: 'Primer Rasgueo', descripcion: 'Completa tu primera leccion', icono: '🎸', rarity: 'common', condition: ({ leccionesCompletadas }) => leccionesCompletadas >= 1 },
  { id: 'racha_7', name: 'Racha de 7 dias', descripcion: 'Practica 7 dias seguidos', icono: '🔥', rarity: 'rare', condition: ({ racha }) => racha >= 7 },
  { id: 'rasgueador_maestro', name: 'Rasgueador Maestro', descripcion: 'Logra 10 rasgueos perfectos', icono: '🏆', rarity: 'epic', condition: ({ notasCorrectas }) => notasCorrectas >= 10 },
  { id: 'semana_de_oro', name: 'Semana de Oro', descripcion: 'Practica 7 dias con >80% accuracy', icono: '💎', rarity: 'legendary', condition: ({ racha, accuracyPromedio }) => racha >= 7 && accuracyPromedio >= 80 },
  { id: 'cinco_lecciones', name: 'Estudioso', descripcion: 'Completa 5 lecciones', icono: '📚', rarity: 'common', condition: ({ leccionesCompletadas }) => leccionesCompletadas >= 5 },
  { id: 'xp_1000', name: 'Mil XP', descripcion: 'Acumula 1000 XP', icono: '⭐', rarity: 'rare', condition: ({ xp }) => (xp ?? 0) >= 1000 },
];

export const RARITY_COLORS: Record<string, string> = { common: '#6B7280', rare: '#3B82F6', epic: '#8B5CF6', legendary: '#F59E0B' };
