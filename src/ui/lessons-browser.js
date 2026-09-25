import { LESSONS, LESSON_IDS } from '../data/lessons.js';
import { isNivelComingSoon } from '../config/features.js';

const NIVEL_CONFIG = {
  principiante: { label: 'Principiante', icon: '🌱', color: '#22c55e', plan: 'free' },
  intermedio:   { label: 'Intermedio',   icon: '🎯', color: '#7c6af7', plan: 'lite' },
  avanzado:     { label: 'Avanzado',     icon: '🔥', color: '#f59e0b', plan: 'maestro' },
};

const SUBNIVEL_NOMBRES = {
  principiante: ['Introducción', 'Acordes Básicos', 'Rasgueo Básico', 'Técnica Dedos', 'Notas Sueltas', 'Lectura Tablatura', 'Ritmos Simples', 'Arpegios Básicos', 'Canciones', 'Proyecto Final'],
  intermedio:   ['Rasgueo Avanzado', 'Arpegios Intermedios', 'Flamenco Básico', 'Técnica Mano Derecha', 'Tapping', 'Bending y Vibrato', 'Canciones Intermedias', 'Improvisación', 'Proyecto A', 'Proyecto B'],
  avanzado:     ['Flamenco Completo', 'Virtuosismo', 'Composición', 'Estilos Mundiales', 'Jazz', 'Teoría Avanzada', 'Grabación', 'Performance', 'Proyectos Artísticos', 'Maestría Total'],
};

/** Browser de lecciones por nivel y subnivel */
export class LessonsBrowserUI {
  constructor(lessonEngine, subscriptionModule, authModule) {
    this._engine = lessonEngine;
    this._sub = subscriptionModule;
    this._auth = authModule;
  }

  async render(nivel = 'principiante', subnivel = null) {
    const main = document.getElementById('main-content');
    const isAuth = this._auth?.isAuthenticated() || false;
    const status = isAuth
      ? await this._sub.getSubscriptionStatus().catch(() => ({ plan: 'free' }))
      : { plan: 'free' };

    if (!subnivel) {
      this._renderNivelView(main, nivel, status.plan, isAuth);
    } else {
      await this._renderSubnivelView(main, nivel, parseInt(subnivel), status, isAuth);
    }
  }

  _renderNivelView(main, nivelActual, userPlan, isAuth) {
    main.innerHTML = `
      <div class="lessons-container">
        <div class="nivel-tabs">
          ${Object.entries(NIVEL_CONFIG).map(([key, cfg]) => `
            <button class="nivel-tab ${key === nivelActual ? 'active' : ''}"
              data-nivel="${key}"
              style="${key === nivelActual ? `border-bottom-color:${cfg.color}` : ''}">
              ${cfg.icon} ${cfg.label}
              ${isNivelComingSoon(key)
                ? '<span class="coming-soon-tag">🔒 Próximamente</span>'
                : key !== 'principiante' && !isAuth ? '🔒' : ''}
            </button>
          `).join('')}
        </div>

        ${isNivelComingSoon(nivelActual)
          ? this._renderComingSoon(nivelActual)
          : nivelActual !== 'principiante' && !isAuth
          ? this._renderAuthWall(nivelActual)
          : `<div class="subniveles-grid">
              ${SUBNIVEL_NOMBRES[nivelActual].map((nombre, i) => {
                const si = i + 1;
                const lessonsInSub = LESSON_IDS.filter(id => LESSONS[id].nivel === nivelActual && LESSONS[id].subnivel === si);
                const needsPlan = nivelActual !== 'principiante' && !this._hasPlan(userPlan, NIVEL_CONFIG[nivelActual].plan);
                return `
                  <div class="subnivel-card ${needsPlan ? 'locked' : ''}"
                    data-nivel="${nivelActual}" data-subnivel="${si}" data-needs-plan="${needsPlan}">
                    <div class="subnivel-number">${si}</div>
                    <div class="subnivel-info">
                      <h3>${nombre}</h3>
                      <span>${lessonsInSub.length} lecciones</span>
                    </div>
                    ${needsPlan ? '<span class="lock-icon">🔒</span>' : '<span class="arrow-icon">→</span>'}
                  </div>
                `;
              }).join('')}
            </div>`
        }
      </div>
    `;

    document.querySelectorAll('.nivel-tab').forEach((btn) => {
      btn.addEventListener('click', () => this.render(btn.dataset.nivel));
    });

    document.querySelectorAll('.subnivel-card:not(.locked)').forEach((card) => {
      card.addEventListener('click', () => {
        window.location.hash = `#/lessons/${card.dataset.nivel}/${card.dataset.subnivel}`;
      });
    });

    document.querySelectorAll('.subnivel-card.locked').forEach((card) => {
      card.addEventListener('click', () => {
        window.location.hash = '#/plans';
      });
    });
  }

  _renderComingSoon(nivel) {
    const cfg = NIVEL_CONFIG[nivel];
    return `
      <div class="auth-wall coming-soon">
        <div class="auth-wall-icon">🔒</div>
        <h3>${cfg.icon} Nivel ${cfg.label}</h3>
        <span class="coming-soon-tag">Próximamente</span>
        <p>Estamos preparando este nivel. Mientras tanto, completá el nivel Principiante — es 100% gratis.</p>
        <div class="coming-soon-preview">
          ${SUBNIVEL_NOMBRES[nivel].map((nombre) => `<span>${nombre}</span>`).join('')}
        </div>
        <div class="auth-wall-actions">
          <a class="btn-primary" href="#/lessons/principiante">Ir a Principiante</a>
        </div>
      </div>
    `;
  }

  _renderAuthWall(nivel) {
    const cfg = NIVEL_CONFIG[nivel];
    return `
      <div class="auth-wall">
        <div class="auth-wall-icon">${cfg.icon}</div>
        <h3>Nivel ${cfg.label}</h3>
        <p>Creá una cuenta gratuita para acceder a este nivel y guardar tu progreso.</p>
        <div class="auth-wall-actions">
          <a class="btn-primary" href="#/login?mode=register">Crear cuenta gratis</a>
          <a class="btn-secondary" href="#/login">Ya tengo cuenta</a>
        </div>
        <p class="auth-wall-note">✓ Gratis · ✓ Sin tarjeta · ✓ En 30 segundos</p>
      </div>
    `;
  }

  async _renderSubnivelView(main, nivel, subnivel, status, isAuth) {
    // Nivel próximamente, o sin cuenta y no es principiante → volver a la vista del nivel
    if (isNivelComingSoon(nivel) || (nivel !== 'principiante' && !isAuth)) {
      window.location.hash = `#/lessons/${nivel}`;
      return;
    }

    const lessons = this._engine.getLessons(nivel, subnivel);
    const cfg = NIVEL_CONFIG[nivel];
    const subNombre = SUBNIVEL_NOMBRES[nivel][subnivel - 1];

    main.innerHTML = `
      <div class="lessons-container">
        <div class="subnivel-header">
          <a class="btn-back" href="#/lessons/${nivel}">← ${cfg.label}</a>
          <h2>${cfg.icon} Sub-nivel ${subnivel}: ${subNombre}</h2>
        </div>
        <div class="lessons-list" id="lessons-list">
          <div class="loading-indicator">Cargando lecciones...</div>
        </div>
      </div>
    `;

    const listEl = document.getElementById('lessons-list');
    const statuses = await Promise.all(
      lessons.map((l) => this._engine.canAccessLesson(l.id, status, null))
    );

    listEl.innerHTML = lessons.map((lesson, i) => {
      const access = statuses[i];
      const progress = this._engine._userProgress?.[lesson.id];
      const completed = progress?.passed;
      const accuracy = progress?.accuracy;

      return `
        <div class="lesson-row ${!access.canAccess ? 'locked' : ''} ${completed ? 'completed' : ''}"
          data-lesson-id="${lesson.id}">
          <div class="lesson-row-left">
            <div class="lesson-number">${lesson.leccion}</div>
            <div class="lesson-info">
              <h4>${lesson.nombre}</h4>
              <span class="lesson-meta">${this._tipoLabel(lesson.tipo)} · ${lesson.duracion} min</span>
            </div>
          </div>
          <div class="lesson-row-right">
            ${completed ? `<span class="lesson-accuracy">${Math.round(accuracy)}%</span>` : ''}
            ${!access.canAccess
              ? `<span class="lesson-lock" title="${access.reason}">🔒</span>`
              : completed
              ? `<button class="btn-start-lesson btn-repeat" data-id="${lesson.id}">🔄 Repetir</button>`
              : `<button class="btn-start-lesson" data-id="${lesson.id}">▶ Empezar</button>`
            }
          </div>
        </div>
      `;
    }).join('');

    document.querySelectorAll('.btn-start-lesson').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.location.hash = `#/exercise/${btn.dataset.id}`;
      });
    });
  }

  _hasPlan(userPlan, requiredPlan) {
    const order = { free: 0, lite: 1, pro: 2, maestro: 3 };
    return (order[userPlan] || 0) >= (order[requiredPlan] || 0);
  }

  _tipoLabel(tipo) {
    return { video: '🎬 Video', exercise: '🎸 Ejercicio', theory: '📖 Teoría' }[tipo] || tipo;
  }
}
