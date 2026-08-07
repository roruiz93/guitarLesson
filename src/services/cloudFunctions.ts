import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '../config/firebase';

const functions = getFunctions(app);

export async function logExerciseResult(
  userId: string,
  leccionId: string,
  accuracy: number
): Promise<{ xpGanado: number }> {
  const fn = httpsCallable<
    { exerciseId: string; leccionId: string; accuracy: number },
    { xpGanado: number }
  >(functions, 'logExerciseResult');

  const result = await fn({ exerciseId: leccionId, leccionId, accuracy });
  return result.data;
}

export async function checkSubscription(): Promise<{
  plan: string;
  hasPrincipiante: boolean;
  hasIntermedio: boolean;
  hasAvanzado: boolean;
  noAds: boolean;
}> {
  const fn = httpsCallable(functions, 'checkSubscription');
  const result = await fn({});
  return result.data as any;
}

export async function getLeaderboard(periodo: string) {
  const fn = httpsCallable(functions, 'checkLeaderboard');
  const result = await fn({ periodo });
  return result.data;
}
