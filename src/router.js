/**
 * Router SPA minimalista basado en hash (#/ruta)
 * Soporta rutas con parámetros: /lessons/:nivel/:subnivel
 */
export class Router {
  constructor() {
    this._routes = {};
    this._notFound = null;
    this._guards = [];
    this._current = null;
  }

  /**
   * Registra una ruta
   * @param {string} path - Ej: '/tuner', '/lessons/:nivel/:subnivel'
   * @param {function(params): void} handler
   */
  on(path, handler) {
    this._routes[path] = handler;
    return this;
  }

  /** Handler para rutas no encontradas */
  notFound(handler) {
    this._notFound = handler;
    return this;
  }

  /**
   * Guard de navegación (ej: verificar auth)
   * @param {function(path, params): boolean|string} fn - Retorna true para permitir, string para redirigir
   */
  addGuard(fn) {
    this._guards.push(fn);
    return this;
  }

  start() {
    window.addEventListener('hashchange', () => this._resolve());
    window.addEventListener('popstate', () => this._resolve());
    this._resolve();
  }

  /** Navega a una ruta */
  navigate(path) {
    window.location.hash = path;
  }

  /** Reemplaza la ruta actual sin agregar al historial */
  replace(path) {
    history.replaceState(null, '', `#${path}`);
    this._resolve();
  }

  _resolve() {
    const hash = window.location.hash.replace('#', '') || '/';
    const { handler, params } = this._match(hash);

    // Ejecutar guards
    for (const guard of this._guards) {
      const result = guard(hash, params);
      if (result !== true) {
        this.replace(typeof result === 'string' ? result : '/');
        return;
      }
    }

    this._current = { path: hash, params };

    if (handler) {
      handler(params);
    } else if (this._notFound) {
      this._notFound({ path: hash });
    }
  }

  _match(path) {
    for (const [pattern, handler] of Object.entries(this._routes)) {
      const { match, params } = this._testPattern(pattern, path);
      if (match) return { handler, params };
    }
    return { handler: null, params: {} };
  }

  _testPattern(pattern, path) {
    const patternParts = pattern.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);

    if (patternParts.length !== pathParts.length) return { match: false };

    const params = {};
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        params[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
      } else if (patternParts[i] !== pathParts[i]) {
        return { match: false };
      }
    }

    return { match: true, params };
  }
}
