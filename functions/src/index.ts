import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

function calcularXP(accuracy: number): number {
  if (accuracy >= 90) return 100;
  if (accuracy >= 75) return 75;
  if (accuracy >= 60) return 50;
  return 10;
}

export const logExerciseResult = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Requiere autenticación.');
  const { exerciseId, leccionId, accuracy } = data;
  const userId = context.auth.uid;
  const xpGanado = calcularXP(accuracy);

  const batch = db.batch();

  const exerciseRef = db.collection('users').doc(userId).collection('exercises').doc();
  batch.set(exerciseRef, {
    exerciseId,
    leccionId,
    accuracy,
    xpGanado,
    fecha: admin.firestore.FieldValue.serverTimestamp(),
  });

  const userRef = db.collection('users').doc(userId);
  batch.update(userRef, {
    xp: admin.firestore.FieldValue.increment(xpGanado),
    'stats.notasTotales': admin.firestore.FieldValue.increment(1),
    'stats.notasCorrectas': admin.firestore.FieldValue.increment(accuracy >= 60 ? 1 : 0),
    'stats.accuracyPromedio': accuracy,
    'stats.ultimaActividad': admin.firestore.FieldValue.serverTimestamp(),
  });

  await batch.commit();

  const ahora = new Date();
  const semana = `${ahora.getFullYear()}-W${Math.ceil(ahora.getDate() / 7)}`;
  await db
    .collection('leaderboard')
    .doc(semana)
    .collection('entries')
    .doc(userId)
    .set(
      { uid: userId, xp: admin.firestore.FieldValue.increment(xpGanado), fecha: admin.firestore.FieldValue.serverTimestamp() },
      { merge: true }
    );

  return { xpGanado };
});

export const checkSubscription = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Requiere autenticación.');
  const userId = context.auth.uid;
  const userSnap = await db.collection('users').doc(userId).get();
  if (!userSnap.exists) throw new functions.https.HttpsError('not-found', 'Usuario no encontrado.');
  const subscriptionStatus = userSnap.data()?.subscriptionStatus ?? { plan: 'lite' };
  const plan = subscriptionStatus.plan ?? 'lite';
  return {
    plan,
    hasPrincipiante: true,
    hasIntermedio: plan === 'pro' || plan === 'maestro',
    hasAvanzado: plan === 'maestro',
    noAds: plan === 'pro' || plan === 'maestro',
  };
});

export const checkLeaderboard = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Requiere autenticación.');
  const { periodo } = data;
  const ahora = new Date();
  let docId: string;
  if (periodo === 'semanal') {
    docId = `${ahora.getFullYear()}-W${Math.ceil(ahora.getDate() / 7)}`;
  } else {
    docId = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}`;
  }

  const entriesSnap = await db
    .collection('leaderboard')
    .doc(docId)
    .collection('entries')
    .orderBy('xp', 'desc')
    .limit(50)
    .get();

  const entries = await Promise.all(
    entriesSnap.docs.map(async (d, i) => {
      const userSnap = await db.collection('users').doc(d.id).get();
      const userData = userSnap.data();
      return {
        uid: d.id,
        nombre: userData?.nombre ?? 'Anónimo',
        fotoPerfil: userData?.fotoPerfil,
        xp: d.data().xp ?? 0,
        racha: userData?.rachaActual ?? 0,
        posicion: i + 1,
      };
    })
  );

  return entries;
});
