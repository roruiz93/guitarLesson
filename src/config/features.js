/**
 * Lanzamiento solo con el plan Gratis.
 * Mientras esté en true, los planes pagos y los niveles intermedio/avanzado
 * se muestran con candado como "Próximamente". Poner en false para habilitarlos.
 */
export const FREE_ONLY = true;

/** Niveles disponibles durante el lanzamiento gratuito */
export const FREE_NIVELES = ['principiante'];

/** @param {string} nivel */
export const isNivelComingSoon = (nivel) => FREE_ONLY && !FREE_NIVELES.includes(nivel);
