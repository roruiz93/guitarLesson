import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ProgresoUsuario, NivelUsuario, Leccion } from '../types';

export async function getCompletionPercentage(userId: string, nivel: NivelUsuario): Promise<number> {
  const [leccionesSnap, progressSnap] = await Promise.all([getDocs(collection(db, 'lessons', nivel, 'lecciones')), getDocs(collection(db, 'users', userId, 'progress'))]);
  if (leccionesSnap.size === 0) return 0;
  const idsDeNivel = new Set(leccionesSnap.docs.map(d => d.id));
  const completadas = progressSnap.docs.filter(d => idsDeNivel.has(d.id) && d.data().completada).length;
  return Math.round((completadas / leccionesSnap.size) * 100);
}

export async function getNextLesson(userId: string, nivel: NivelUsuario): Promise<Leccion | null> {
  const leccionesSnap = await getDocs(query(collection(db, 'lessons', nivel, 'lecciones'), orderBy('orden')));
  const progressSnap = await getDocs(collection(db, 'users', userId, 'progress'));
  const progressMap: Record<string, ProgresoUsuario> = {};
  progressSnap.docs.forEach(d => { progressMap[d.id] = d.data() as ProgresoUsuario; });
  for (const lecDoc of leccionesSnap.docs) {
    const prog = progressMap[lecDoc.id];
    if (!prog || !prog.completada) return { id: lecDoc.id, ...(lecDoc.data() as Omit<Leccion, 'id'>) };
  }
  return null;
}

export async function canUnlockLevel(userId: string, nivelActual: NivelUsuario): Promise<boolean> {
  const porcentaje = await getCompletionPercentage(userId, nivelActual);
  if (porcentaje < 70) return false;
  const userSnap = await getDoc(doc(db, 'users', userId));
  const plan = userSnap.data()?.subscriptionStatus?.plan ?? 'lite';
  if (nivelActual === 'principiante') return plan === 'pro' || plan === 'maestro';
  if (nivelActual === 'intermedio') return plan === 'maestro';
  return false;
}
