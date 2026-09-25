import { AuthModule } from './modules/auth.js';
import { PitchDetector } from './modules/pitch.js';
import { SubscriptionModule } from './modules/subscription.js';
import { SpotifyModule } from './modules/spotify.js';
import { AdsModule } from './modules/ads.js';
import { TunerUI } from './ui/tuner.js';
import { ExerciseUI } from './ui/exercise.js';
import { LeaderboardUI } from './ui/leaderboard.js';
import { BadgeSystem } from './ui/badges.js';
import { AuthUI } from './ui/auth.js';
import { NavUI } from './ui/nav.js';
import { PlansUI } from './ui/plans.js';
import { LessonsBrowserUI } from './ui/lessons-browser.js';
import { LegalUI } from './ui/legal.js';
import { FooterUI } from './ui/footer.js';
import { LessonEngine } from './services/lesson-engine.js';
import { Router } from './router.js';
import { LESSONS } from './data/lessons.js';

// ── Bootstrap ─────────────────────────────────────────────────────────────────

const auth = new AuthModule();
const pitch = new PitchDetector();
const subscription = new SubscriptionModule();
const spotify = new SpotifyModule();
const ads = new AdsModule();
const lessonEngine = new LessonEngine();

const tunerUI = new TunerUI();
const exerciseUI = new ExerciseUI();
const leaderboardUI = new LeaderboardUI();
const badgeSystem = new BadgeSystem();
const authUI = new AuthUI(auth);
const plansUI = new PlansUI(subscription);
const lessonsBrowserUI = new LessonsBrowserUI(lessonEngine, subscription, auth);

const router = new Router();
const navUI = new NavUI(router, auth);
const legalUI = new LegalUI();
const footerUI = new FooterUI();

// ── Guardia de autenticación ──────────────────────────────────────────────────
// Principiante es libre — solo pide cuenta para intermedio/avanzado

router.addGuard((path, params) => {
  // Rutas siempre públicas
  const alwaysPublic = ['/login', '/plans', '/terms', '/privacy', '/cookies', '/tuner', '/'];
  if (alwaysPublic.some((p) => path === p || path.startsWith(p + '/'))) return true;

  // Lecciones principiante: libre sin cuenta
  if (path === '/lessons') return true;
  if (path.startsWith('/lessons/principiante')) return true;

  // Ejercicios: libre si la lección es de nivel principiante
  if (path.startsWith('/exercise/')) {
    const lessonId = path.replace('/exercise/', '');
    const lesson = LESSONS[lessonId];
    if (lesson?.nivel === 'principiante') return true;
  }

  // Todo lo demás requiere cuenta
  if (!auth.isAuthenticated()) return '/login';
  return true;
});

// ── Rutas ─────────────────────────────────────────────────────────────────────

router
  .on('/', () => {
    router.replace('/lessons');
  })

  .on('/login', () => {
    navUI.update();
    // ?mode=register abre directamente el tab de registro
    const mode = new URLSearchParams(window.location.hash.split('?')[1] || '').get('mode');
    if (mode === 'register') authUI._mode = 'register';
    authUI.render(() => {
      router.navigate('/lessons');
    });
  })

  .on('/tuner', () => {
    navUI.update();
    tunerUI.render();
    pitch.start().catch((err) => {
      document.getElementById('tuner-status').textContent = `⚠️ ${err.message}`;
    });
  })

  .on('/lessons', () => {
    navUI.update();
    const user = auth.getCurrentUser();
    if (user) subscription.initRevenueCat(user.uid, import.meta.env.VITE_REVENUECAT_API_KEY);
    lessonsBrowserUI.render('principiante');
  })

  .on('/lessons/:nivel', ({ nivel }) => {
    navUI.update();
    lessonsBrowserUI.render(nivel);
  })

  .on('/lessons/:nivel/:subnivel', ({ nivel, subnivel }) => {
    navUI.update();
    lessonsBrowserUI.render(nivel, subnivel);
  })

  .on('/exercise/:lessonId', async ({ lessonId }) => {
    navUI.update();
    const lesson = LESSONS[lessonId];
    if (!lesson) return router.navigate('/lessons');

    const status = await subscription.getSubscriptionStatus().catch(() => ({ plan: 'free' }));
    const access = await lessonEngine.canAccessLesson(lessonId, status, auth.getCurrentUser()?.uid);

    if (!access.canAccess) {
      showBlockedLesson(access);
      return;
    }

    exerciseUI.render(lesson);
    pitch.start().catch(console.warn);

    // Escuchar completion — guarda directo en Firestore (sin Cloud Functions)
    window.addEventListener('exercise:complete', async (e) => {
      const { accuracy } = e.detail;
      const userId = auth.getCurrentUser()?.uid;
      const xpGained = Math.round(accuracy * 10);

      if (userId) {
        await saveExerciseResult(userId, lessonId, accuracy, xpGained);
        const newBadges = await checkBadges(userId);
        newBadges.forEach((b) => badgeSystem.unlockBadge(b, userId));
        ads.onExerciseCompleted(status);
      }

      exerciseUI.completeExercise(accuracy, xpGained);
    }, { once: true });
  })

  .on('/leaderboard', async () => {
    navUI.update();
    const userId = auth.getCurrentUser()?.uid;
    try {
      const { collection, query, orderBy, limit, getDocs } = await import('firebase/firestore');
      const { db } = await import('./services/firebase.js');
      const q = query(collection(db, 'leaderboard'), orderBy('xp', 'desc'), limit(100));
      const snap = await getDocs(q);
      const users = snap.docs.map((d, i) => ({ rank: i + 1, ...d.data() }));
      leaderboardUI.renderLeaderboard(users, userId, 'weekly');
    } catch {
      leaderboardUI.renderLeaderboard([], userId, 'weekly');
    }
  })

  .on('/badges', async () => {
    navUI.update();
    const userId = auth.getCurrentUser()?.uid;
    const unlockedIds = userId
      ? (await (async () => {
          const { doc, getDoc } = await import('firebase/firestore');
          const { db } = await import('./services/firebase.js');
          const snap = await getDoc(doc(db, 'users', userId));
          return snap.data()?.badges || [];
        })().catch(() => []))
      : [];
    badgeSystem.renderBadgeShowcase(unlockedIds);
  })

  .on('/profile', async () => {
    navUI.update();
    const userId = auth.getCurrentUser()?.uid;
    if (!userId) return router.navigate('/login');

    const { doc, getDoc } = await import('firebase/firestore');
    const { db } = await import('./services/firebase.js');
    const snap = await getDoc(doc(db, 'users', userId));
    const data = snap.data() || {};

    leaderboardUI.renderProfile({
      displayName: data.displayName || 'Guitarrista',
      xp: data.xp || 0,
      streak: data.streak || 0,
      level: Math.floor((data.xp || 0) / 1000) + 1,
      lessonsCompleted: data.lessonsCompleted?.length || 0,
      accuracy: 75,
      weeklyData: generateWeeklyPlaceholder(),
    });
  })

  .on('/plans', () => {
    navUI.update();
    plansUI.render();
  })

  .on('/terms', () => {
    navUI.update();
    legalUI.render('terms');
  })

  .on('/privacy', () => {
    navUI.update();
    legalUI.render('privacy');
  })

  .on('/cookies', () => {
    navUI.update();
    legalUI.render('cookies');
  })

  .notFound(({ path }) => {
    const main = document.getElementById('main-content');
    if (main) {
      main.innerHTML = `
        <div class="not-found">
          <h2>404 — Página no encontrada</h2>
          <p>La ruta <code>${path}</code> no existe.</p>
          <a class="btn-primary" href="#/lessons">Ir a lecciones</a>
        </div>
      `;
    }
  });

// ── Auth state listener ───────────────────────────────────────────────────────

auth.onAuthStateChanged(async (user) => {
  if (user) {
    subscription.initRevenueCat(user.uid, import.meta.env.VITE_REVENUECAT_API_KEY);

    const status = await subscription.getSubscriptionStatus().catch(() => ({ plan: 'free' }));
    navUI.update(user, status.plan);

    if (import.meta.env.VITE_ADMOB_APP_ID) {
      ads.initAdMob(import.meta.env.VITE_ADMOB_APP_ID);
    }

    // Callback de Spotify si venimos del redirect (?code= o ?error=)
    if (/[?&](code|error)=/.test(window.location.search)) {
      await spotify.handleCallback();
    }
  } else {
    navUI.update(null, 'free');
  }
});

// ── Eventos globales ──────────────────────────────────────────────────────────

window.addEventListener('badge:unlocked', (e) => {
  badgeSystem.showBadgeUnlockedModal(e.detail);
});

window.addEventListener('subscription:changed', async () => {
  const user = auth.getCurrentUser();
  if (user) {
    const status = await subscription.getSubscriptionStatus().catch(() => ({ plan: 'free' }));
    navUI.update(user, status.plan);
  }
});

window.addEventListener('spotify:error', (e) => {
  console.warn('Spotify error:', e.detail);
});

// ── Init ──────────────────────────────────────────────────────────────────────

function initApp() {
  // Crear contenedor de contenido principal si no existe
  const app = document.getElementById('app');
  let main = document.getElementById('main-content');
  if (!main) {
    main = document.createElement('main');
    main.id = 'main-content';
    app.appendChild(main);
  }

  document.getElementById('loading')?.remove();
  navUI.mount();
  footerUI.mount();
  router.start();
}

// ── Helpers cliente (reemplazan Cloud Functions en desarrollo) ────────────────

async function saveExerciseResult(userId, lessonId, accuracy, xpGained) {
  try {
    const { doc, getDoc, updateDoc, arrayUnion, increment, serverTimestamp } = await import('firebase/firestore');
    const { db } = await import('./services/firebase.js');

    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data() || {};

    // Calcular racha
    const lastActivity = userData.lastActivity?.toDate?.();
    const today = new Date();
    const diffDays = lastActivity
      ? Math.floor((today - lastActivity) / 86400000)
      : null;
    const passed = accuracy >= 70;
    let streak = userData.streak || 0;
    if (passed) streak = diffDays === 1 ? streak + 1 : 1;

    await updateDoc(userRef, {
      xp: increment(xpGained),
      streak,
      lastActivity: serverTimestamp(),
      ...(passed && { lessonsCompleted: arrayUnion(lessonId) }),
      [`lessonProgress.${lessonId}`]: { accuracy, xpGained, passed, completedAt: new Date().toISOString() },
    });

    // Actualizar leaderboard
    const lbRef = doc(db, 'leaderboard', userId);
    await updateDoc(lbRef, {
      xp: increment(xpGained),
      streak,
      displayName: userData.displayName || 'Guitarrista',
      updatedAt: serverTimestamp(),
    }).catch(async () => {
      // Si no existe el doc de leaderboard, crearlo
      const { setDoc } = await import('firebase/firestore');
      await setDoc(lbRef, {
        userId,
        displayName: userData.displayName || 'Guitarrista',
        xp: xpGained,
        streak,
        updatedAt: serverTimestamp(),
      });
    });
  } catch (err) {
    console.warn('saveExerciseResult error:', err.message);
  }
}

async function checkBadges(userId) {
  try {
    const { doc, getDoc } = await import('firebase/firestore');
    const { db } = await import('./services/firebase.js');
    const snap = await getDoc(doc(db, 'users', userId));
    const data = snap.data() || {};

    const stats = {
      lessonsCompleted: (data.lessonsCompleted || []).length,
      xp: data.xp || 0,
      streak: data.streak || 0,
    };

    const { BADGES } = await import('./data/badges.js');
    const existing = new Set(data.badges || []);
    return BADGES
      .filter((b) => !existing.has(b.id) && (() => { try { return b.condition(stats); } catch { return false; } })())
      .map((b) => b.id);
  } catch {
    return [];
  }
}

function showBlockedLesson({ reason, comingSoon }) {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="blocked-lesson">
      <div class="blocked-icon">🔒</div>
      <h2>${comingSoon ? 'Próximamente' : 'Lección bloqueada'}</h2>
      <p>${comingSoon ? 'Este nivel todavía no está disponible. ¡Muy pronto!' : reason}</p>
      ${comingSoon ? '' : '<a class="btn-primary" href="#/plans">Ver planes</a>'}
      <a class="btn-secondary" href="#/lessons">Volver a lecciones</a>
    </div>
  `;
}

function generateWeeklyPlaceholder() {
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  return days.map((day) => ({ day, xp: Math.floor(Math.random() * 200) }));
}

initApp();
