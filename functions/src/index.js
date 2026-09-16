const { onCall, HttpsError } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hora
const PLAN_LEVELS = { free: 0, lite: 1, pro: 2, maestro: 3 };
const XP_PER_ACCURACY_POINT = 10;
const MIN_ACCURACY_FOR_STREAK = 70;

// ──────────────────────────────────────────────────────────────────────────────
// checkSubscription
// ──────────────────────────────────────────────────────────────────────────────

exports.checkSubscription = onCall(async (request) => {
  const { userId } = request.data;
  if (!userId) throw new HttpsError('invalid-argument', 'userId requerido');

  const cacheRef = db.collection('subscriptionCache').doc(userId);
  const cached = await cacheRef.get();

  if (cached.exists) {
    const data = cached.data();
    if (Date.now() - data.cachedAt.toMillis() < CACHE_TTL_MS) {
      return data.entitlements;
    }
  }

  let entitlements = { hasIntermedio: false, hasAvanzado: false, noAds: false, expiresAt: null, plan: 'free' };

  const rcApiKey = process.env.REVENUECAT_API_KEY;
  if (rcApiKey) {
    try {
      const fetch = require('node-fetch');
      const resp = await fetch(`https://api.revenuecat.com/v1/subscribers/${userId}`, {
        headers: { Authorization: `Bearer ${rcApiKey}` },
      });

      if (resp.ok) {
        const json = await resp.json();
        const ent = json.subscriber?.entitlements || {};

        entitlements.hasAvanzado = !!ent.maestro?.expires_date;
        entitlements.hasIntermedio = entitlements.hasAvanzado || !!(ent.pro || ent.lite)?.expires_date;
        entitlements.noAds = entitlements.hasAvanzado || !!ent.pro?.expires_date;

        if (entitlements.hasAvanzado) entitlements.plan = 'maestro';
        else if (ent.pro?.expires_date) entitlements.plan = 'pro';
        else if (ent.lite?.expires_date) entitlements.plan = 'lite';

        const expStr = ent[entitlements.plan]?.expires_date;
        entitlements.expiresAt = expStr || null;
      }
    } catch (e) {
      console.warn('RevenueCat error, using Firestore fallback:', e.message);
    }
  }

  // Fallback Firestore
  if (entitlements.plan === 'free') {
    const userSnap = await db.collection('users').doc(userId).get();
    const plan = userSnap.data()?.plan || 'free';
    entitlements.plan = plan;
    entitlements.hasIntermedio = PLAN_LEVELS[plan] >= 1;
    entitlements.hasAvanzado = plan === 'maestro';
    entitlements.noAds = PLAN_LEVELS[plan] >= 2;
  }

  await cacheRef.set({ entitlements, cachedAt: admin.firestore.FieldValue.serverTimestamp() });

  return entitlements;
});

// ──────────────────────────────────────────────────────────────────────────────
// logExerciseResult
// ──────────────────────────────────────────────────────────────────────────────

exports.logExerciseResult = onCall(async (request) => {
  const { userId, exerciseId, accuracy } = request.data;

  if (!userId || !exerciseId || accuracy == null) {
    throw new HttpsError('invalid-argument', 'userId, exerciseId y accuracy son requeridos');
  }

  if (accuracy < 0 || accuracy > 100) {
    throw new HttpsError('invalid-argument', 'accuracy debe estar entre 0 y 100');
  }

  const xpGained = Math.round(accuracy * XP_PER_ACCURACY_POINT);
  const passed = accuracy >= MIN_ACCURACY_FOR_STREAK;

  const userRef = db.collection('users').doc(userId);
  const userSnap = await userRef.get();
  const userData = userSnap.data() || {};

  // Actualizar racha
  let streak = userData.streak || 0;
  const lastActivity = userData.lastActivity?.toDate();
  const today = new Date();
  const isConsecutiveDay = lastActivity
    ? Math.floor((today - lastActivity) / 86400000) === 1
    : false;

  if (passed) {
    streak = isConsecutiveDay ? streak + 1 : 1;
  }

  // Verificar badges
  const completedLessons = (userData.lessonsCompleted || []).length + (passed ? 1 : 0);
  const newBadges = [];

  const badgeChecks = [
    { id: 'primer_rasgueo', condition: completedLessons >= 1 },
    { id: 'estudiante_dedicado', condition: completedLessons >= 25 },
    { id: 'xp_1000', condition: (userData.xp || 0) + xpGained >= 1000 },
    { id: 'xp_10000', condition: (userData.xp || 0) + xpGained >= 10000 },
    { id: 'semana_de_oro', condition: streak >= 7 },
    { id: 'racha_imparable', condition: streak >= 30 },
  ];

  const existingBadges = userData.badges || [];
  for (const check of badgeChecks) {
    if (check.condition && !existingBadges.includes(check.id)) {
      newBadges.push(check.id);
    }
  }

  // Actualizar Firestore en batch
  const batch = db.batch();

  batch.update(userRef, {
    xp: admin.firestore.FieldValue.increment(xpGained),
    streak,
    lastActivity: admin.firestore.FieldValue.serverTimestamp(),
    ...(passed && { lessonsCompleted: admin.firestore.FieldValue.arrayUnion(exerciseId) }),
    ...(newBadges.length > 0 && { badges: admin.firestore.FieldValue.arrayUnion(...newBadges) }),
    [`lessonProgress.${exerciseId}`]: {
      accuracy,
      xpGained,
      passed,
      completedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
  });

  // Actualizar leaderboard
  const leaderboardRef = db.collection('leaderboard').doc(userId);
  batch.set(leaderboardRef, {
    userId,
    displayName: userData.displayName || 'Guitarrista',
    xp: admin.firestore.FieldValue.increment(xpGained),
    streak,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  }, { merge: true });

  await batch.commit();

  // Registrar en historial de ejercicios
  await db.collection('exerciseHistory').add({
    userId,
    exerciseId,
    accuracy,
    xpGained,
    passed,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });

  const { LESSONS } = require('../../../src/data/lessons.js');
  const currentLesson = LESSONS?.[exerciseId];
  const nextLessonId = currentLesson?.prerequisito
    ? Object.keys(LESSONS).find((id) => LESSONS[id]?.prerequisito === exerciseId)
    : null;

  return { xpGained, newBadges, nextLessonId: nextLessonId || null, streak };
});

// ──────────────────────────────────────────────────────────────────────────────
// getLeaderboard
// ──────────────────────────────────────────────────────────────────────────────

exports.getLeaderboard = onCall(async (request) => {
  const { period = 'weekly', userId } = request.data;

  const cacheRef = db.collection('leaderboardCache').doc(period);
  const cached = await cacheRef.get();

  if (cached.exists) {
    const data = cached.data();
    if (Date.now() - data.cachedAt.toMillis() < CACHE_TTL_MS) {
      const leaderboard = data.leaderboard;
      const userPosition = userId
        ? leaderboard.findIndex((u) => u.userId === userId) + 1
        : null;
      return { leaderboard: leaderboard.slice(0, 100), userPosition };
    }
  }

  let query = db.collection('leaderboard').orderBy('xp', 'desc').limit(100);

  if (period === 'weekly') {
    const weekAgo = new Date(Date.now() - 7 * 86400000);
    query = query.where('updatedAt', '>=', weekAgo);
  } else if (period === 'monthly') {
    const monthAgo = new Date(Date.now() - 30 * 86400000);
    query = query.where('updatedAt', '>=', monthAgo);
  }

  const snap = await query.get();
  const leaderboard = snap.docs.map((d, i) => ({ rank: i + 1, ...d.data() }));

  await cacheRef.set({
    leaderboard,
    cachedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  const userPosition = userId
    ? leaderboard.findIndex((u) => u.userId === userId) + 1
    : null;

  return { leaderboard, userPosition };
});

// ──────────────────────────────────────────────────────────────────────────────
// validateLessonAccess
// ──────────────────────────────────────────────────────────────────────────────

exports.validateLessonAccess = onCall(async (request) => {
  const { userId, lessonId } = request.data;
  if (!userId || !lessonId) {
    throw new HttpsError('invalid-argument', 'userId y lessonId requeridos');
  }

  const PLAN_MINIMUMS = {
    principiante: 'free',
    intermedio: 'lite',
    avanzado: 'maestro',
  };

  // Determinar nivel de la lección por prefijo de ID
  let lessonNivel = 'principiante';
  if (lessonId.startsWith('inter_')) lessonNivel = 'intermedio';
  if (lessonId.startsWith('av_')) lessonNivel = 'avanzado';

  const requiredPlan = PLAN_MINIMUMS[lessonNivel];

  // Obtener usuario
  const userSnap = await db.collection('users').doc(userId).get();
  if (!userSnap.exists) {
    return { canAccess: false, reason: 'Usuario no encontrado' };
  }

  const userData = userSnap.data();
  const userPlan = userData.plan || 'free';

  if (PLAN_LEVELS[userPlan] < PLAN_LEVELS[requiredPlan]) {
    const planLabels = { lite: 'LITE', pro: 'PRO', maestro: 'MAESTRO' };
    return {
      canAccess: false,
      reason: `Esta lección requiere plan ${planLabels[requiredPlan]}`,
    };
  }

  // Verificar prerequisito
  const idParts = lessonId.match(/^(\w+)_sub(\d+)_lec(\d+)$/);
  if (idParts) {
    const [, abbr, si, li] = idParts;
    const licNum = parseInt(li);
    if (licNum > 1) {
      const prevId = `${abbr}_sub${si}_lec${licNum - 1}`;
      const prevProgress = userData.lessonProgress?.[prevId];

      if (!prevProgress || prevProgress.accuracy < 70) {
        return {
          canAccess: false,
          reason: 'Debes completar la lección anterior con al menos 70% de accuracy',
        };
      }
    }
  }

  return { canAccess: true, reason: '' };
});
