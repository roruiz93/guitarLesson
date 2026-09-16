import { FretboardDiagram, NOTE_POSITIONS } from './fretboard.js';
import { LESSONS, LESSON_IDS } from '../data/lessons.js';

/** UI de ejercicios con descripción, feedback en tiempo real y soporte para lecciones de teoría */
export class ExerciseUI {
  constructor() {
    this._audioCtx = null;
    this._currentLesson = null;
    this._sessionXP = 0;
    this._pitchListener = null;
  }

  /** @param {object} lesson */
  render(lesson) {
    this._currentLesson = lesson;
    this._sessionXP = 0;
    this._removePitchListener();

    if (lesson.tipo === 'theory' || lesson.ejercicios?.length === 0) {
      if (lesson.quiz?.length > 0) {
        this._renderTheoryWithQuiz(lesson);
      } else {
        this._renderTheory(lesson);
      }
    } else {
      this._renderExercise(lesson);
    }
  }

  // ── Vista TEORÍA + QUIZ ─────────────────────────────────────────────────────

  _renderTheoryWithQuiz(lesson) {
    const main = document.getElementById('main-content');
    const html = lesson.descripcion ? this._parseMarkdown(lesson.descripcion) : '';

    main.innerHTML = `
      <div class="lesson-page">
        <div class="lesson-page-header">
          <a class="btn-back" href="#/lessons/${lesson.nivel}/${lesson.subnivel}">← Sub-nivel ${lesson.subnivel}</a>
          <span class="nivel-badge nivel-${lesson.nivel}">${lesson.nivel.toUpperCase()}</span>
        </div>

        <div class="lesson-card">
          <div class="lesson-card-meta">
            <span class="tipo-badge tipo-theory">📖 Teoría + Quiz</span>
            <span class="lesson-duration">⏱ ${lesson.duracion} min</span>
          </div>
          <h1 class="lesson-card-title">${lesson.nombre}</h1>
          <p class="lesson-card-objetivo">${lesson.objetivo}</p>
        </div>

        ${html ? `<div class="lesson-content">${html}</div>` : ''}

        <div class="quiz-section" id="quiz-section">
          <div class="quiz-header">
            <h3>🧠 Quiz — demostrá lo que aprendiste</h3>
            <span class="quiz-progress" id="quiz-progress">Pregunta 1 de ${lesson.quiz.length}</span>
          </div>
          <div id="quiz-body"></div>
        </div>
      </div>
    `;

    this._runQuiz(lesson.quiz);
  }

  _runQuiz(questions) {
    let current = 0;
    let correct = 0;
    const answers = [];

    const render = () => {
      const q = questions[current];
      const body = document.getElementById('quiz-body');
      const progress = document.getElementById('quiz-progress');
      if (!body) return;

      progress.textContent = `Pregunta ${current + 1} de ${questions.length}`;

      body.innerHTML = `
        <div class="quiz-question">
          <p class="quiz-q-text">${q.pregunta}</p>
          <div class="quiz-options">
            ${q.opciones.map((op, i) => `
              <button class="quiz-option" data-index="${i}">${op}</button>
            `).join('')}
          </div>
          <div id="quiz-feedback" class="quiz-feedback hidden"></div>
        </div>
      `;

      body.querySelectorAll('.quiz-option').forEach((btn) => {
        btn.addEventListener('click', () => {
          const chosen = parseInt(btn.dataset.index);
          const isCorrect = chosen === q.correcta;
          const feedback = document.getElementById('quiz-feedback');

          // Deshabilitar todas las opciones
          body.querySelectorAll('.quiz-option').forEach((b, i) => {
            b.disabled = true;
            if (i === q.correcta) b.classList.add('correct');
            else if (i === chosen && !isCorrect) b.classList.add('wrong');
          });

          if (isCorrect) {
            correct++;
            answers.push(true);
            feedback.textContent = '✅ ¡Correcto!';
            feedback.className = 'quiz-feedback correct';
          } else {
            answers.push(false);
            feedback.textContent = `❌ Incorrecto. La respuesta era: "${q.opciones[q.correcta]}"`;
            feedback.className = 'quiz-feedback wrong';
          }
          feedback.classList.remove('hidden');

          // Siguiente pregunta o resultado
          setTimeout(() => {
            current++;
            if (current < questions.length) {
              render();
            } else {
              this._showQuizResult(correct, questions.length);
            }
          }, 1500);

          this.playSound(isCorrect ? 'success' : 'error');
        });
      });
    };

    render();
  }

  _showQuizResult(correct, total) {
    const accuracy = Math.round((correct / total) * 100);
    const passed = accuracy >= 60;
    const body = document.getElementById('quiz-body');
    const progress = document.getElementById('quiz-progress');
    if (!body) return;

    progress.textContent = `Resultado: ${correct}/${total}`;

    body.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result-icon">${passed ? '🏆' : '💪'}</div>
        <h3>${passed ? '¡Aprobado!' : 'Casi — repasá el contenido'}</h3>
        <p class="quiz-score">${correct} de ${total} respuestas correctas (${accuracy}%)</p>
        ${passed
          ? `<button class="btn-primary btn-quiz-done" id="btn-quiz-done">✅ Completar lección</button>`
          : `<button class="btn-secondary btn-retry-quiz" id="btn-retry-quiz">🔄 Reintentar quiz</button>
             <a class="btn-link" href="#" id="btn-reread">↑ Releer el contenido</a>`
        }
      </div>
    `;

    document.getElementById('btn-quiz-done')?.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('exercise:complete', { detail: { accuracy } }));
      this.completeExercise(accuracy, Math.round(accuracy * 10));
    });

    document.getElementById('btn-retry-quiz')?.addEventListener('click', () => {
      this._runQuiz(this._currentLesson.quiz);
    });

    document.getElementById('btn-reread')?.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.lesson-content')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ── Vista TEORÍA simple (sin quiz) ──────────────────────────────────────────

  _renderTheory(lesson) {
    const main = document.getElementById('main-content');
    const html = lesson.descripcion
      ? this._parseMarkdown(lesson.descripcion)
      : `<p>${lesson.objetivo}</p>`;

    main.innerHTML = `
      <div class="lesson-page">
        <div class="lesson-page-header">
          <a class="btn-back" href="#/lessons/${lesson.nivel}/${lesson.subnivel}">← Sub-nivel ${lesson.subnivel}</a>
          <span class="nivel-badge nivel-${lesson.nivel}">${lesson.nivel.toUpperCase()}</span>
        </div>

        <div class="lesson-card">
          <div class="lesson-card-meta">
            <span class="tipo-badge tipo-theory">📖 Teoría</span>
            <span class="lesson-duration">⏱ ${lesson.duracion} min</span>
          </div>
          <h1 class="lesson-card-title">${lesson.nombre}</h1>
          <p class="lesson-card-objetivo">${lesson.objetivo}</p>
        </div>

        <div class="lesson-content">${html}</div>

        <div class="theory-actions">
          <button class="btn-primary btn-complete-theory" id="btn-complete">
            ✅ Lo entendí — Marcar como completado
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-complete').addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('exercise:complete', { detail: { accuracy: 100 } }));
      this.completeExercise(100, 100);
    });
  }

  // ── Vista EJERCICIO — 3 fases: teoría → posición → tocar ───────────────────

  _renderExercise(lesson) {
    const main = document.getElementById('main-content');
    const ejercicio = lesson.ejercicios?.[0];
    const notaEsperada = ejercicio?.esperada || '';
    const fretboard = new FretboardDiagram();
    const hasDiagram = notaEsperada && NOTE_POSITIONS[notaEsperada];
    const hasTheory = !!lesson.descripcion;

    const header = `
      <div class="lesson-page-header">
        <a class="btn-back" href="#/lessons/${lesson.nivel}/${lesson.subnivel}">← Sub-nivel ${lesson.subnivel}</a>
        <span class="nivel-badge nivel-${lesson.nivel}">${lesson.nivel.toUpperCase()}</span>
      </div>
      <div class="lesson-card">
        <div class="lesson-card-meta">
          <span class="tipo-badge tipo-exercise">🎸 Teórico-Práctico</span>
          <span class="lesson-duration">⏱ ${lesson.duracion} min</span>
        </div>
        <h1 class="lesson-card-title">${lesson.nombre}</h1>
        <p class="lesson-card-objetivo">${lesson.objetivo}</p>
      </div>
    `;

    main.innerHTML = `
      <div class="lesson-page">
        ${header}

        <!-- Fase 0: Teoría -->
        <div id="phase-0" class="${hasTheory ? '' : 'hidden'}">
          <div class="lesson-content tp-theory-block">
            ${hasTheory ? this._parseMarkdown(lesson.descripcion) : ''}
          </div>
          <div class="tp-phase-actions">
            <div class="tp-phase-label">📖 Paso 1 de 3 — Leé la teoría</div>
            <button class="btn-primary" id="btn-to-position">📍 Entendí, ver posición →</button>
          </div>
        </div>

        <!-- Fase 1: Posición en el mástil -->
        <div id="phase-1" class="${hasTheory ? 'hidden' : ''}">
          <div class="fretboard-section">
            <h3 class="fretboard-title">📍 Posición en el mástil</h3>
            <p class="fretboard-nota-label">Nota: <strong>${notaEsperada || '—'}</strong></p>
            <div id="fretboard-container"></div>
            ${!hasDiagram ? `<p class="fretboard-no-pos">Diagrama no disponible para ${notaEsperada}</p>` : ''}
          </div>
          <div class="tp-phase-actions">
            <div class="tp-phase-label">🎯 Paso 2 de 3 — Mirá dónde poner el dedo</div>
            <button class="btn-primary btn-ready" id="btn-ready">🎸 Listo, voy a tocar →</button>
            ${hasTheory ? `<button class="btn-link-sm" id="btn-back-theory">← Releer teoría</button>` : ''}
          </div>
        </div>

        <!-- Fase 2: Detectar nota -->
        <div id="phase-2" class="hidden">
          <div class="expected-note">
            <p class="expected-label">Nota esperada</p>
            <h3 id="expected-note-name">${notaEsperada || '—'}</h3>
          </div>
          <div id="feedback-message" class="feedback-message neutral">
            🎙️ Acercá el micrófono y tocá la nota
          </div>
          <div class="progress-section">
            <div class="progress-bar">
              <div class="accuracy-bar" id="accuracy-bar" style="width:0%"></div>
            </div>
            <span id="accuracy-text">0%</span>
          </div>
          <div class="xp-display">⭐ XP de sesión: <span id="session-xp">0</span></div>
          <div class="exercise-controls">
            <button id="btn-play" class="btn-secondary">▶ Escuchar nota</button>
            <button id="btn-hint" class="btn-secondary">📍 Ver posición</button>
            <button id="btn-skip" class="btn-secondary">⏭ Saltar</button>
          </div>
          <div class="tp-phase-label" style="margin-top:12px">🎤 Paso 3 de 3 — Tocá la nota</div>
        </div>
      </div>
    `;

    if (hasDiagram) fretboard.render('fretboard-container', notaEsperada);

    const show = (id) => document.getElementById(id)?.classList.remove('hidden');
    const hide = (id) => document.getElementById(id)?.classList.add('hidden');

    document.getElementById('btn-to-position')?.addEventListener('click', () => {
      hide('phase-0'); show('phase-1');
    });

    document.getElementById('btn-back-theory')?.addEventListener('click', () => {
      hide('phase-1'); show('phase-0');
    });

    document.getElementById('btn-ready')?.addEventListener('click', () => {
      hide('phase-1'); show('phase-2');
      this._attachControls();
      this._listenPitch();
    });

    document.getElementById('btn-hint')?.addEventListener('click', () => {
      hide('phase-2'); show('phase-1');
      this._removePitchListener();
    });
  }

  // ── Actualizar accuracy ─────────────────────────────────────────────────────

  updateAccuracy(accuracy, noteExpected, noteActual) {
    const bar = document.getElementById('accuracy-bar');
    const text = document.getElementById('accuracy-text');
    if (!bar) return;

    bar.style.width = `${accuracy}%`;
    bar.style.background = this._accuracyColor(accuracy);
    text.textContent = `${Math.round(accuracy)}%`;

    if (noteActual === noteExpected) {
      this.showCorrectFeedback(noteActual);
    } else if (accuracy > 40) {
      const fb = document.getElementById('feedback-message');
      if (fb) { fb.textContent = `🟡 Casi... detecté ${noteActual}`; fb.className = 'feedback-message almost'; }
    } else {
      this.showIncorrectFeedback();
    }
  }

  showCorrectFeedback(note) {
    const fb = document.getElementById('feedback-message');
    if (!fb) return;
    fb.textContent = `✓ ¡Correcto! ${note}`;
    fb.className = 'feedback-message correct';
    this.playSound('success');
    this._sessionXP += 10;
    const xpEl = document.getElementById('session-xp');
    if (xpEl) xpEl.textContent = this._sessionXP;
  }

  showIncorrectFeedback() {
    const fb = document.getElementById('feedback-message');
    if (!fb) return;
    fb.textContent = '✗ Intentá de nuevo — revisá la nota';
    fb.className = 'feedback-message incorrect';
    this.playSound('error');
  }

  completeExercise(finalAccuracy, totalXP) {
    this._removePitchListener();
    const main = document.getElementById('main-content');
    const passed = finalAccuracy >= (this._currentLesson?.requiereMinimoAccuracy || 70);
    const isTheory = this._currentLesson?.tipo === 'theory';

    main.innerHTML = `
      <div class="result-screen">
        <div class="result-icon">${passed ? '🏆' : '💪'}</div>
        <h2>${passed ? (isTheory ? '¡Lección completada!' : '¡Muy bien!') : 'Seguí practicando'}</h2>
        <p class="result-lesson-name">${this._currentLesson?.nombre || ''}</p>
        <div class="result-stats">
          <div class="stat">
            <span class="stat-value">${isTheory ? '✓' : `${Math.round(finalAccuracy)}%`}</span>
            <span class="stat-label">${isTheory ? 'Completado' : 'Accuracy'}</span>
          </div>
          <div class="stat">
            <span class="stat-value">+${totalXP}</span>
            <span class="stat-label">XP ganado</span>
          </div>
        </div>
        <div class="result-actions">
          <button id="btn-next" class="btn-primary">Siguiente lección →</button>
          ${!isTheory ? `<button id="btn-retry" class="btn-secondary">↩ Repetir</button>` : ''}
        </div>
      </div>
    `;

    this.playSound('success');

    document.getElementById('btn-retry')?.addEventListener('click', () => {
      this.render(this._currentLesson);
    });

    document.getElementById('btn-next')?.addEventListener('click', () => {
      const currentId = this._currentLesson?.id;
      const nextId = currentId
        ? LESSON_IDS.find((id) => LESSONS[id].prerequisito === currentId)
        : null;
      if (nextId) {
        window.location.hash = `#/exercise/${nextId}`;
      } else {
        const l = this._currentLesson;
        window.location.hash = l ? `#/lessons/${l.nivel}/${l.subnivel}` : '#/lessons';
      }
    });
  }

  playSound(type) {
    if (!this._audioCtx) this._audioCtx = new AudioContext();
    const ctx = this._audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const p = { success: { freq: 880, type: 'sine', dur: 0.3 }, error: { freq: 220, type: 'sawtooth', dur: 0.2 }, almost: { freq: 550, type: 'triangle', dur: 0.15 } }[type] || { freq: 880, type: 'sine', dur: 0.3 };
    osc.type = p.type;
    osc.frequency.setValueAtTime(p.freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + p.dur);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + p.dur);
  }

  // ── Internos ────────────────────────────────────────────────────────────────

  _listenPitch() {
    this._removePitchListener();
    this._pitchListener = (e) => {
      const { nombre, octava } = e.detail;
      const expected = this._currentLesson?.ejercicios?.[0]?.esperada;
      if (!expected) return;
      const noteStr = `${nombre}${octava}`;
      const match = noteStr.toLowerCase().includes(expected.toLowerCase());
      const accuracy = match ? 90 + Math.random() * 10 : Math.random() * 35;
      this.updateAccuracy(accuracy, expected, noteStr);
    };
    window.addEventListener('frequency', this._pitchListener);
  }

  _removePitchListener() {
    if (this._pitchListener) {
      window.removeEventListener('frequency', this._pitchListener);
      this._pitchListener = null;
    }
  }

  _attachControls() {
    document.getElementById('btn-play')?.addEventListener('click', () => window.dispatchEvent(new CustomEvent('exercise:play')));
    document.getElementById('btn-skip')?.addEventListener('click', () => window.dispatchEvent(new CustomEvent('exercise:skip')));
  }

  _tipoIcon(tipo) {
    return { video: '🎬', exercise: '🎸', theory: '📖' }[tipo] || '🎸';
  }

  _accuracyColor(a) {
    if (a >= 80) return 'linear-gradient(90deg,#22c55e,#16a34a)';
    if (a >= 50) return 'linear-gradient(90deg,#eab308,#ca8a04)';
    return 'linear-gradient(90deg,#ef4444,#dc2626)';
  }

  /** Convierte markdown simple a HTML (negritas, listas, saltos de línea) */
  _parseMarkdown(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/^#{1,3} (.+)$/gm, '<h4>$1</h4>')
      .replace(/^\| (.+) \|$/gm, '') // ignora tablas simples por ahora
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
      .replace(/\[([x ])\]/g, (_, c) => c === 'x' ? '☑' : '☐')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^(.)/m, '<p>$1')
      .replace(/$/, '</p>');
  }
}
