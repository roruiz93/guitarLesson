import { collection, doc, getDocs, getDoc, setDoc, updateDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Leccion, ProgresoUsuario, NivelUsuario } from '../types';

export async function getLessons(nivel: NivelUsuario, userId: string): Promise<Leccion[]> {
  const snap = await getDocs(query(collection(db, 'lessons', nivel, 'lecciones'), orderBy('orden')));
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Leccion, 'id'>) }));
}

export async function markAsCompleted(userId: string, lessonId: string, accuracy: number): Promise<void> {
  const progressRef = doc(db, 'users', userId, 'progress', lessonId);
  const existing = await getDoc(progressRef);
  if (existing.exists()) {
    await updateDoc(progressRef, { completada: accuracy >= 60, accuracy: Math.max(existing.data().accuracy ?? 0, accuracy), intentos: (existing.data().intentos ?? 0) + 1, fechaCompletado: accuracy >= 60 ? serverTimestamp() : existing.data().fechaCompletado });
  } else {
    await setDoc(progressRef, { leccionId: lessonId, completada: accuracy >= 60, accuracy, intentos: 1, fechaCompletado: accuracy >= 60 ? serverTimestamp() : null });
  }
}

export async function canAccessLesson(userId: string, leccion: Leccion): Promise<{ allowed: boolean; reason?: string }> {
  const userSnap = await getDoc(doc(db, 'users', userId));
  if (!userSnap.exists()) return { allowed: false, reason: 'Usuario no encontrado.' };
  const plan = userSnap.data().subscriptionStatus?.plan ?? 'lite';
  if (leccion.nivel === 'intermedio' && plan === 'lite') return { allowed: false, reason: 'Requiere plan PRO o MAESTRO.' };
  if (leccion.nivel === 'avanzado' && plan !== 'maestro') return { allowed: false, reason: 'Requiere plan MAESTRO.' };
  return { allowed: true };
}
