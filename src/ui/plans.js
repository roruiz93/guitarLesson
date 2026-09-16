import { PRODUCTS } from '../modules/subscription.js';

/** Pantalla de selección y upgrade de plan */
export class PlansUI {
  constructor(subscriptionModule) {
    this._sub = subscriptionModule;
  }

  async render() {
    const main = document.getElementById('main-content');
    const status = await this._sub.getSubscriptionStatus().catch(() => ({ plan: 'free' }));

    main.innerHTML = `
      <div class="plans-container">
        <h2 class="plans-title">Elige tu plan</h2>
        <p class="plans-subtitle">Aprende guitarra a tu ritmo — cancela cuando quieras</p>

        <div class="plans-grid">
          ${this._planCard({
            id: 'free', name: '🎸 Gratis', price: '$0', period: 'para siempre',
            current: status.plan === 'free',
            features: [
              '100 lecciones (nivel Principiante)',
              'Afinador visual completo',
              'Ejercicios con feedback',
              'Seguimiento de progreso básico',
            ],
            cta: 'Plan actual', disabled: true,
          })}
          ${this._planCard({
            id: 'lite', name: '🎵 LITE', price: '$0', period: '+ anuncios',
            current: status.plan === 'lite',
            badge: 'Popular',
            features: [
              'Todo lo del plan Gratis',
              '100 lecciones Intermedias',
              'Badges + Leaderboard',
              '100 canciones Spotify',
              'Anuncios ocasionales',
            ],
            cta: status.plan === 'lite' ? 'Plan actual' : 'Activar LITE', disabled: status.plan === 'lite',
            productId: PRODUCTS.LITE.id,
          })}
          ${this._planCard({
            id: 'pro', name: '⭐ PRO', price: '$4.99', period: '/mes',
            current: status.plan === 'pro',
            badge: 'Recomendado',
            features: [
              'Todo lo de LITE',
              'Sin publicidad',
              '200 canciones Spotify',
              'Análisis IA de postura',
              'Planes personalizados IA',
            ],
            cta: status.plan === 'pro' ? 'Plan actual' : 'Suscribirse a PRO', disabled: status.plan === 'pro',
            productId: PRODUCTS.PRO.id,
            highlight: true,
          })}
          ${this._planCard({
            id: 'maestro', name: '👑 MAESTRO', price: '$9.99', period: '/mes',
            current: status.plan === 'maestro',
            features: [
              'Todo lo de PRO',
              '500+ canciones Spotify',
              '100 lecciones Avanzadas',
              'Análisis avanzado con IA',
              'Planes IA premium',
              'Todos los ejercicios y estilos',
            ],
            cta: status.plan === 'maestro' ? 'Plan actual' : 'Suscribirse a MAESTRO', disabled: status.plan === 'maestro',
            productId: PRODUCTS.MAESTRO.id,
          })}
        </div>

        ${status.plan !== 'free' && status.expiresAt ? `
          <p class="plan-expiry">Tu plan ${status.plan.toUpperCase()} vence el ${new Date(status.expiresAt).toLocaleDateString('es-AR')}. ${status.daysRemaining} días restantes.</p>
        ` : ''}

        <div class="plans-guarantee">
          🔒 Pago seguro · Cancela en cualquier momento · Sin permanencia
        </div>
      </div>
    `;

    document.querySelectorAll('.plan-cta:not([disabled])').forEach((btn) => {
      btn.addEventListener('click', () => this._handlePurchase(btn.dataset.productId));
    });
  }

  _planCard({ id, name, price, period, current, badge, features, cta, disabled, productId, highlight }) {
    return `
      <div class="plan-card-full ${highlight ? 'plan-highlight' : ''} ${current ? 'plan-current' : ''}">
        ${badge ? `<div class="plan-badge">${badge}</div>` : ''}
        <div class="plan-header">
          <h3 class="plan-name-full">${name}</h3>
          <div class="plan-pricing">
            <span class="plan-price-big">${price}</span>
            <span class="plan-period">${period}</span>
          </div>
        </div>
        <ul class="plan-features-full">
          ${features.map(f => `<li>✓ ${f}</li>`).join('')}
        </ul>
        <button class="plan-cta ${highlight ? 'btn-primary' : 'btn-secondary'}"
          data-plan="${id}"
          data-product-id="${productId || ''}"
          ${disabled ? 'disabled' : ''}>
          ${cta}
        </button>
      </div>
    `;
  }

  async _handlePurchase(productId) {
    if (!productId) return;
    const btn = document.querySelector(`[data-product-id="${productId}"]`);
    if (btn) { btn.disabled = true; btn.textContent = 'Procesando...'; }

    try {
      await this._sub.purchaseSubscription(productId);
      this.render(); // re-render con nuevo plan
    } catch (err) {
      alert(`Error al procesar: ${err.message}`);
      if (btn) { btn.disabled = false; btn.textContent = 'Reintentar'; }
    }
  }
}
