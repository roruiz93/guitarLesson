/** UI de autenticación: login, registro y recuperación de contraseña */
export class AuthUI {
  constructor(authModule) {
    this._auth = authModule;
    this._mode = 'login'; // 'login' | 'register' | 'forgot'
  }

  /** Renderiza el formulario en el contenedor principal */
  render(onSuccess) {
    const main = document.getElementById('main-content') || document.getElementById('app');
    main.innerHTML = this._buildHTML();
    this._attachListeners(onSuccess);
  }

  _buildHTML() {
    return `
      <div class="auth-wrapper">
        <div class="auth-card">
          <div class="auth-logo">🎸 Guitar+</div>

          <!-- Tabs login / register -->
          <div class="auth-tabs" id="auth-tabs">
            <button class="auth-tab ${this._mode === 'login' ? 'active' : ''}" data-mode="login">
              Iniciar sesión
            </button>
            <button class="auth-tab ${this._mode === 'register' ? 'active' : ''}" data-mode="register">
              Registrarse
            </button>
          </div>

          <!-- Form login -->
          <form id="login-form" class="auth-form ${this._mode !== 'login' ? 'hidden' : ''}">
            <div class="form-group">
              <label for="login-email">Email</label>
              <input type="email" id="login-email" placeholder="tu@email.com" autocomplete="email" required />
            </div>
            <div class="form-group">
              <label for="login-password">Contraseña</label>
              <input type="password" id="login-password" placeholder="••••••" autocomplete="current-password" required />
            </div>
            <div id="login-error" class="auth-error hidden"></div>
            <button type="submit" class="btn-primary btn-full" id="login-submit">
              Iniciar sesión
            </button>
            <button type="button" class="btn-link" id="btn-forgot">¿Olvidaste tu contraseña?</button>
          </form>

          <!-- Form registro -->
          <form id="register-form" class="auth-form ${this._mode !== 'register' ? 'hidden' : ''}">
            <div class="form-group">
              <label for="reg-name">Nombre</label>
              <input type="text" id="reg-name" placeholder="Tu nombre" autocomplete="name" required />
            </div>
            <div class="form-group">
              <label for="reg-email">Email</label>
              <input type="email" id="reg-email" placeholder="tu@email.com" autocomplete="email" required />
            </div>
            <div class="form-group">
              <label for="reg-password">Contraseña</label>
              <input type="password" id="reg-password" placeholder="Mínimo 6 caracteres" autocomplete="new-password" required />
              <div class="password-strength" id="pwd-strength"></div>
            </div>
            <div class="form-group">
              <label for="reg-password2">Confirmar contraseña</label>
              <input type="password" id="reg-password2" placeholder="Repite la contraseña" required />
            </div>
            <div id="register-error" class="auth-error hidden"></div>
            <button type="submit" class="btn-primary btn-full" id="register-submit">
              Crear cuenta gratis
            </button>
            <p class="auth-terms">
              Al registrarte aceptas nuestros
              <a href="#/terms">Términos de uso</a> y
              <a href="#/privacy">Política de privacidad</a>.
            </p>
          </form>

          <!-- Form forgot password -->
          <form id="forgot-form" class="auth-form ${this._mode !== 'forgot' ? 'hidden' : ''}">
            <p class="auth-hint">Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.</p>
            <div class="form-group">
              <label for="forgot-email">Email</label>
              <input type="email" id="forgot-email" placeholder="tu@email.com" required />
            </div>
            <div id="forgot-msg" class="auth-success hidden"></div>
            <div id="forgot-error" class="auth-error hidden"></div>
            <button type="submit" class="btn-primary btn-full">Enviar enlace</button>
            <button type="button" class="btn-link" id="btn-back-login">← Volver al login</button>
          </form>

          <!-- Plan selector (solo en registro) -->
          <div id="plan-selector" class="${this._mode !== 'register' ? 'hidden' : ''}">
            <p class="plan-label">Empieza con el plan gratuito:</p>
            <div class="plan-cards">
              ${this._planCard('free', '🎸 Gratis', '$0', ['100 lecciones principiante', 'Afinador básico'], true)}
              ${this._planCard('lite', '🎵 LITE', '$0 + ads', ['+ 100 lecciones intermedio', 'Badges + Leaderboard', '100 canciones Spotify'], false)}
              ${this._planCard('pro', '⭐ PRO', '$4.99/mes', ['Sin publicidad', '200 canciones Spotify', 'Análisis IA de postura'], false)}
            </div>
          </div>

        </div>
      </div>
    `;
  }

  _planCard(id, name, price, features, selected) {
    return `
      <div class="plan-card ${selected ? 'selected' : ''}" data-plan="${id}">
        <div class="plan-name">${name}</div>
        <div class="plan-price">${price}</div>
        <ul class="plan-features">
          ${features.map(f => `<li>✓ ${f}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  _attachListeners(onSuccess) {
    // Tabs
    document.querySelectorAll('.auth-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        this._mode = tab.dataset.mode;
        this.render(onSuccess);
      });
    });

    // Login form
    document.getElementById('login-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this._handleLogin(onSuccess);
    });

    // Register form
    document.getElementById('register-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this._handleRegister(onSuccess);
    });

    // Forgot form
    document.getElementById('forgot-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this._handleForgot();
    });

    document.getElementById('btn-forgot')?.addEventListener('click', () => {
      this._mode = 'forgot';
      this.render(onSuccess);
    });

    document.getElementById('btn-back-login')?.addEventListener('click', () => {
      this._mode = 'login';
      this.render(onSuccess);
    });

    // Password strength
    document.getElementById('reg-password')?.addEventListener('input', (e) => {
      this._updatePasswordStrength(e.target.value);
    });

    // Plan cards
    document.querySelectorAll('.plan-card').forEach((card) => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.plan-card').forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });
  }

  async _handleLogin(onSuccess) {
    const btn = document.getElementById('login-submit');
    const errEl = document.getElementById('login-error');
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    this._setLoading(btn, true);
    errEl.classList.add('hidden');

    try {
      await this._auth.signIn(email, password);
      onSuccess?.();
    } catch (err) {
      this._showError(errEl, err.message);
    } finally {
      this._setLoading(btn, false);
    }
  }

  async _handleRegister(onSuccess) {
    const btn = document.getElementById('register-submit');
    const errEl = document.getElementById('register-error');
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const password2 = document.getElementById('reg-password2').value;

    if (password !== password2) {
      return this._showError(errEl, 'Las contraseñas no coinciden');
    }

    this._setLoading(btn, true);
    errEl.classList.add('hidden');

    try {
      const user = await this._auth.signUp(email, password);

      // Guardar displayName en Firestore
      const { doc, updateDoc } = await import('firebase/firestore');
      const { db } = await import('../services/firebase.js');
      await updateDoc(doc(db, 'users', user.uid), { displayName: name });

      onSuccess?.();
    } catch (err) {
      this._showError(errEl, err.message);
    } finally {
      this._setLoading(btn, false);
    }
  }

  async _handleForgot() {
    const email = document.getElementById('forgot-email').value.trim();
    const errEl = document.getElementById('forgot-error');
    const msgEl = document.getElementById('forgot-msg');

    errEl.classList.add('hidden');
    msgEl.classList.add('hidden');

    try {
      const { sendPasswordResetEmail } = await import('firebase/auth');
      const { auth } = await import('../services/firebase.js');
      await sendPasswordResetEmail(auth, email);
      msgEl.textContent = '✓ Email enviado. Revisa tu bandeja de entrada.';
      msgEl.classList.remove('hidden');
    } catch (err) {
      this._showError(errEl, 'No se pudo enviar el email. Verifica la dirección.');
    }
  }

  _updatePasswordStrength(password) {
    const el = document.getElementById('pwd-strength');
    if (!el) return;

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const labels = ['', 'Muy débil', 'Débil', 'Regular', 'Fuerte', '¡Excelente!'];
    const colors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#15803d'];

    el.innerHTML = `
      <div class="strength-bar">
        ${[1,2,3,4,5].map(i => `<div class="strength-segment ${i <= strength ? 'filled' : ''}" style="${i <= strength ? `background:${colors[strength]}` : ''}"></div>`).join('')}
      </div>
      <span style="color:${colors[strength]};font-size:0.75rem">${labels[strength]}</span>
    `;
  }

  _showError(el, message) {
    el.textContent = message;
    el.classList.remove('hidden');
  }

  _setLoading(btn, loading) {
    btn.disabled = loading;
    btn.textContent = loading ? 'Cargando...' : btn.dataset.label || btn.textContent;
    if (!btn.dataset.label) btn.dataset.label = btn.textContent;
  }
}
