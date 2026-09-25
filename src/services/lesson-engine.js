import { LESSONS, LESSON_IDS } from '../data/lessons.js';
import { doc, getDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase.js';
import { isNivelComingSoon } from '../config/features.js';

const PLAN_ORDER = { free: 0, lite: 1, pro: 2, maestro: 3 };

/** Motor de progresión de lecciones con validación de acceso y caching */
export class LessonEngine {
  constructor() {
    this._cache = {};
    this._userProgress = JSON.parse(sessionStorage.getItem('gp_progress') || '{}');
  }

  /**
   * @param {'principiante'|'intermedio'|'avanzado'} nivel
   * @param {number} subnivel - 1-10
   * @returns {import('../data/lessons.js').Lesson[]}
   */
  getLessons(nivel, subnivel) {
    return LESSON_IDS
      .map((id) => LESSONS[id])
      .filter((l) => l.nivel === nivel && l.subnivel === subnivel)
      .sort((a, b) => a.leccion - b.leccion);
  }

  /** @param {string} lessonId @returns {import('../data/lessons.js').Lesson|null} */
  getLessonDetail(lessonId) {
    return LESSONS[lessonId] || null;
  }

  /**
   * Valida si el usuario puede acceder a una lección
   * @param {string} lessonId
   * @param {{plan: string}} subscription
   * @param {string} userId
   * @returns {Promise<{canAccess: boolean, reason: string}>}
   */
  async canAccessLesson(lessonId, subscription, userId) {
    const lesson = LESSONS[lessonId];
    if (!lesson) return { canAccess: false, reason: 'Lección no encontrada' };
    if (isNivelComingSoon(lesson.nivel)) return { canAccess: false, reason: 'Próximamente', comingSoon: true };

    const userPlanLevel = PLAN_ORDER[subscription?.plan || 'free'] || 0;
    const requiredPlanLevel = PLAN_ORDER[lesson.planMinimo] || 0;

    if (userPlanLevel < requiredPlanLevel) {
      const planLabels = { lite: 'LITE', pro: 'PRO', maestro: 'MAESTRO' };
      return {
        canAccess: false,
        reason: `Requiere plan ${planLabels[lesson.planMinimo] || lesson.planMinimo}`,
      };
    }

    if (lesson.prerequisito) {
      const progress = await this._getProgress(userId);
      const prereqData = progress[lesson.prerequisito];
      if (!prereqData || prereqData.accuracy < lesson.requiereMinimoAccuracy) {
        return {
          canAccess: false,
          reason: `Debes completar "${LESSONS[lesson.prerequisito]?.nombre}" con al menos ${lesson.requiereMinimoAccuracy}%`,
        };
      }
    }

    return { canAccess: true, reason: '' };
  }

  /**
   * Marca una lección como completada y actualiza Firestore
   * @param {string} lessonId
   * @param {number} accuracy - 0-100
   * @param {string} userId
   */
  async markLessonComplete(lessonId, accuracy, userId) {
    const xpGained = Math.round(accuracy * 10);
    const passed = accuracy >= (LESSONS[lessonId]?.requiereMinimoAccuracy || 70);

    const progressEntry = {
      lessonId,
      accuracy,
      xpGained,
      passed,
      completedAt: new Date().toISOString(),
    };

    // Cache local
    if (!this._userProgress[lessonId] || this._userProgress[lessonId].accuracy < accuracy) {
      this._userProgress[lessonId] = progressEntry;
      sessionStorage.setItem('gp_progress', JSON.stringify(this._userProgress));
    }

    if (userId) {
      await updateDoc(doc(db, 'users', userId), {
        lessonsCompleted: arrayUnion(lessonId),
        xp: { increment: xpGained },
        lastActivity: serverTimestamp(),
        [`lessonProgress.${lessonId}`]: progressEntry,
      });
    }

    return { xpGained, passed };
  }

  /**
   * @param {string} lessonId
   * @returns {import('../data/lessons.js').Lesson|null}
   */
  getNextLesson(lessonId) {
    const current = LESSONS[lessonId];
    if (!current) return null;

    const nextId = LESSON_IDS.find((id) => LESSONS[id].prerequisito === lessonId);
    return nextId ? LESSONS[nextId] : null;
  }

  /**
   * @param {'principiante'|'intermedio'|'avanzado'} nivel
   * @param {string} userId
   * @returns {Promise<number>} Porcentaje 0-100
   */
  async getProgress(nivel, userId) {
    const total = LESSON_IDS.filter((id) => LESSONS[id].nivel === nivel).length;
    const progress = await this._getProgress(userId);
    const completed = Object.entries(progress)
      .filter(([id, data]) => LESSONS[id]?.nivel === nivel && data.passed)
      .length;

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  /**
   * @param {string} userId
   * @param {{plan: string}} subscription
   * @returns {Promise<{completed: string[], inProgress: string[], locked: string[], nextRecommended: string|null}>}
   */
  async getLessonsByStatus(userId, subscription) {
    const progress = await this._getProgress(userId);

    const completed = [];
    const inProgress = [];
    const locked = [];

    for (const id of LESSON_IDS) {
      const lesson = LESSONS[id];
      const accessCheck = await this.canAccessLesson(id, subscription, userId);

      if (!accessCheck.canAccess) {
        locked.push(id);
      } else if (progress[id]?.passed) {
        completed.push(id);
      } else if (progress[id]) {
        inProgress.push(id);
      }
    }

    const nextRecommended = inProgress[0] || LESSON_IDS.find((id) => !completed.includes(id) && !locked.includes(id)) || null;

    return { completed, inProgress, locked, nextRecommended };
  }

  async _getProgress(userId) {
    if (Object.keys(this._userProgress).length > 0) return this._userProgress;

    if (userId) {
      try {
        const snap = await getDoc(doc(db, 'users', userId));
        const progress = snap.data()?.lessonProgress || {};
        this._userProgress = progress;
        sessionStorage.setItem('gp_progress', JSON.stringify(progress));
        return progress;
      } catch {
        return {};
      }
    }

    return {};
  }
}
