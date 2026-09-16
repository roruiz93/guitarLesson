/** Productos disponibles en Guitar+ */
export const PRODUCTS = {
  LITE: { id: 'guitar_plus_lite_monthly', price: 0, label: 'LITE' },
  PRO: { id: 'guitar_plus_pro_monthly', price: 4.99, label: 'PRO' },
  MAESTRO: { id: 'guitar_plus_maestro_monthly', price: 9.99, label: 'MAESTRO' },
};

const CACHE_KEY = 'gp_subscription';
const CACHE_TTL = 60 * 60 * 1000; // 1 hora

/** Gestión de suscripciones via RevenueCat con fallback a Firestore */
export class SubscriptionModule {
  constructor() {
    this._apiKey = null;
    this._userId = null;
    this._cached = null;
    this._callbacks = [];
  }

  /**
   * @param {string} userId
   * @param {string} apiKey - RevenueCat public API key
   */
  initRevenueCat(userId, apiKey) {
    this._userId = userId;
    this._apiKey = apiKey;
    this._loadFromCache();
  }

  /**
   * @returns {Promise<{hasPrincipiante: boolean, hasIntermedio: boolean, hasAvanzado: boolean, noAds: boolean, plan: string, expiresAt: Date|null}>}
   */
  async getEntitlements() {
    if (this._cached && Date.now() - this._cached.ts < CACHE_TTL) {
      return this._cached.data;
    }

    // Sin userId o sin API key → ir directo a Firestore
    if (!this._userId || !this._apiKey) {
      return this._firestoreFallback();
    }

    try {
      const data = await this._fetchRevenueCat();
      this._saveToCache(data);
      return data;
    } catch {
      return this._firestoreFallback();
    }
  }

  /**
   * @returns {Promise<{plan: string, expiresAt: Date|null, isActive: boolean, daysRemaining: number}>}
   */
  async getSubscriptionStatus() {
    const ent = await this.getEntitlements();
    const expiresAt = ent.expiresAt;
    const isActive = ent.plan !== 'free';
    const daysRemaining = expiresAt
      ? Math.max(0, Math.ceil((expiresAt - Date.now()) / 86400000))
      : 0;
    return { plan: ent.plan, expiresAt, isActive, daysRemaining };
  }

  /**
   * @param {string} productId - ID de producto de PRODUCTS
   * TODO(pagos-web): este POST a /v1/subscribers/{id}/subscriptions NO es un endpoint
   * real de la API pública de RevenueCat — la key pública no puede iniciar una compra así.
   * Los pagos web reales requieren el SDK oficial `@revenuecat/purchases-js` (Web Billing,
   * vía Stripe) o el checkout de Paddle configurado del lado de RevenueCat. Falta decidir
   * el flujo de cobro antes de reescribir este método.
   */
  async purchaseSubscription(productId) {
    if (!this._apiKey) throw new Error('RevenueCat no inicializado');

    const resp = await fetch(`https://api.revenuecat.com/v1/subscribers/${this._userId}/subscriptions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this._apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product_id: productId }),
    });

    if (!resp.ok) throw new Error('Error al procesar compra');
    this._cached = null;

    const data = await this.getEntitlements();
    this._notify(data);
    return data;
  }

  async cancelSubscription() {
    this._cached = null;
    const data = await this.getEntitlements();
    this._notify(data);
  }

  /** @param {function} callback */
  onSubscriptionChanged(callback) {
    this._callbacks.push(callback);
    return () => {
      this._callbacks = this._callbacks.filter((cb) => cb !== callback);
    };
  }

  async _fetchRevenueCat() {
    const resp = await fetch(`https://api.revenuecat.com/v1/subscribers/${this._userId}`, {
      headers: { Authorization: `Bearer ${this._apiKey}` },
    });

    if (!resp.ok) throw new Error('RevenueCat error');

    const json = await resp.json();
    const entitlements = json.subscriber?.entitlements || {};

    const hasAvanzado = !!entitlements['maestro']?.expires_date;
    const hasIntermedio = hasAvanzado || !!entitlements['pro']?.expires_date || !!entitlements['lite']?.expires_date;
    const noAds = hasAvanzado || !!entitlements['pro']?.expires_date;

    let plan = 'free';
    if (hasAvanzado) plan = 'maestro';
    else if (entitlements['pro']?.expires_date) plan = 'pro';
    else if (entitlements['lite']?.expires_date) plan = 'lite';

    const expiresStr =
      entitlements[plan]?.expires_date || entitlements['pro']?.expires_date || null;
    const expiresAt = expiresStr ? new Date(expiresStr) : null;

    return { hasPrincipiante: true, hasIntermedio, hasAvanzado, noAds, plan, expiresAt };
  }

  async _firestoreFallback() {
    const FREE = { hasPrincipiante: true, hasIntermedio: false, hasAvanzado: false, noAds: false, plan: 'free', expiresAt: null };
    if (!this._userId) return FREE;

    const { doc, getDoc } = await import('firebase/firestore');
    const { db } = await import('../services/firebase.js');

    try {
      const snap = await getDoc(doc(db, 'users', this._userId));
      const plan = snap.data()?.plan || 'free';
      return {
        hasPrincipiante: true,
        hasIntermedio: ['lite', 'pro', 'maestro'].includes(plan),
        hasAvanzado: plan === 'maestro',
        noAds: ['pro', 'maestro'].includes(plan),
        plan,
        expiresAt: null,
      };
    } catch {
      return FREE;
    }
  }

  _saveToCache(data) {
    this._cached = { data, ts: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(this._cached));
    window.dispatchEvent(new CustomEvent('subscription:changed', { detail: data }));
  }

  _loadFromCache() {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) this._cached = JSON.parse(raw);
  }

  _notify(data) {
    window.dispatchEvent(new CustomEvent('subscription:changed', { detail: data }));
    this._callbacks.forEach((cb) => cb(data));
  }
}
