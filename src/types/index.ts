export type NivelUsuario = 'principiante' | 'intermedio' | 'avanzado';
export type PlanSuscripcion = 'lite' | 'pro' | 'maestro';

export interface UserData {
  uid: string; email: string; nombre: string; nivel: NivelUsuario;
  xp: number; rachaActual: number; fotoPerfil?: string; creadoEn: Date;
}
export interface SubscriptionStatus { plan: PlanSuscripcion; expira: Date | null; trialActivo: boolean; }
export interface UserStats { horasPracticadas: number; notasCorrectas: number; notasTotales: number; accuracyPromedio: number; ultimaActividad: Date; }
export type TipoEjercicio = 'nota' | 'acorde' | 'escala';
export interface Ejercicio { id: string; tipo: TipoEjercicio; esperada: string; duracion?: number; }
export interface ResultadoEjercicio { ejercicioId: string; accuracy: number; fecha: Date; xpGanado: number; }
export interface Leccion { id: string; nivel: NivelUsuario; nombre: string; descripcion: string; videoURL: string; ejercicios: Ejercicio[]; requiereMinimoAccuracy: number; orden: number; }
export interface ProgresoUsuario { leccionId: string; completada: boolean; accuracy: number; intentos: number; fechaCompletado?: Date; }
export interface NotaDetectada { nota: string; octava: number; frecuencia: number; cents: number; afinada: boolean; }
export type EstadoAfinacion = 'desafinada' | 'afinando' | 'afinada';
export interface CuerdaGuitarra { numero: 1 | 2 | 3 | 4 | 5 | 6; nota: string; frecuencia: number; }
export type RaridadBadge = 'common' | 'rare' | 'epic' | 'legendary';
export interface Badge { id: string; name: string; descripcion: string; icono: string; rarity: RaridadBadge; condition: (stats: UserStats & { leccionesCompletadas: number; racha: number }) => boolean; }
export interface BadgeDesbloqueado { badgeId: string; nombre: string; timestamp: Date; }
export type PeriodoLeaderboard = 'semanal' | 'mensual' | 'amigos';
export interface EntradaLeaderboard { uid: string; nombre: string; fotoPerfil?: string; xp: number; racha: number; posicion: number; }
export type CategoriaSpotify = 'criolla' | 'clasica' | 'flamenco' | 'tango';
export interface Cancion { trackId: string; title: string; artist: string; duration: number; previewUrl?: string; }
export interface SpotifyTokens { accessToken: string; refreshToken: string; expiresAt: number; }
export interface Entitlements { hasPrincipiante: boolean; hasIntermedio: boolean; hasAvanzado: boolean; noAds: boolean; }
