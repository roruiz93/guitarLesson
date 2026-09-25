import { FREE_ONLY } from '../config/features.js';

/** Navbar persistente con estado de auth y plan */
export class NavUI {
  constructor(router, authModule) {
    this._router = router;
    this._auth = authModule;
    this._el = null;
  }

  mount() {
    const nav = document.createElement('nav');
    nav.id = 'main-nav';
    nav.className = 'navbar';
    document.getElementById('app').prepend(nav);
    this._el = nav;
    this.update();
  }

  /** Actualiza el navbar según el estado de auth */
  update(user = null, plan = 'free') {
    if (!this._el) return;
    const isAuth = !!user || this._auth.isAuthenticated();

    this._el.innerHTML = `
      <a class="logo" href="#/">🎸 Guitar+</a>

      <div class="nav-links" id="nav-links">
        <a class="nav-link" href="#/tuner">🎵 Afinador</a>
        <a class="nav-link" href="#/lessons">📚 Lecciones</a>
        ${isAuth ? `
          <a class="nav-link" href="#/leaderboard">🏆 Ranking</a>
          <a class="nav-link" href="#/badges">🏅 Badges</a>
          <a class="nav-link" href="#/profile">👤 Perfil</a>
          <button class="nav-btn-plan plan-${plan}" id="btn-upgrade">${this._planLabel(plan)}</button>
          <button class="nav-btn-logout" id="btn-logout">Salir</button>
        ` : `
          <a class="nav-link nav-link-accent" href="#/login">Iniciar sesión</a>
        `}
      </div>

      <button class="nav-hamburger" id="nav-hamburger" aria-label="Menú">☰</button>
    `;

    document.getElementById('btn-logout')?.addEventListener('click', async () => {
      await this._auth.signOut();
      this._router.navigate('/login');
    });

    document.getElementById('btn-upgrade')?.addEventListener('click', () => {
      this._router.navigate('/plans');
    });

    document.getElementById('nav-hamburger')?.addEventListener('click', () => {
      document.getElementById('nav-links')?.classList.toggle('open');
    });

    // Highlight ruta activa
    const currentHash = window.location.hash.replace('#', '');
    this._el.querySelectorAll('.nav-link').forEach((link) => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', currentHash.startsWith(href) && href !== '/');
    });
  }

  _planLabel(plan) {
    if (FREE_ONLY && plan === 'free') return '🎸 Plan Gratis';
    const labels = { free: '⬆ Mejorar plan', lite: '🎵 LITE', pro: '⭐ PRO', maestro: '👑 MAESTRO' };
    return labels[plan] || '⬆ Plan';
  }
}
