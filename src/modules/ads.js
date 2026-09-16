const TEST_UNITS = {
  banner: 'ca-app-pub-3940256099942544/6300978111',
  interstitial: 'ca-app-pub-3940256099942544/1033173712',
  rewarded: 'ca-app-pub-3940256099942544/5224354917',
};

const MAX_INTERSTITIALS_PER_EXERCISES = 3;
const MAX_REWARDED_PER_DAY = 2;

/** Integración de anuncios Google AdMob — solo para plan LITE en nivel Intermedio+ */
export class AdsModule {
  constructor() {
    this._appId = null;
    this._exerciseSinceLastAd = 0;
    this._rewardedToday = 0;
    this._rewardedDate = null;
    this._interstitialLoaded = false;
    this._rewardedLoaded = false;
  }

  /** @param {string} appId */
  initAdMob(appId) {
    this._appId = appId;

    const today = new Date().toDateString();
    const stored = JSON.parse(localStorage.getItem('gp_ads_state') || '{}');
    this._rewardedToday = stored.date === today ? (stored.rewardedCount || 0) : 0;
    this._rewardedDate = today;

    window.dispatchEvent(new CustomEvent('ads:loaded', { detail: { appId } }));
  }

  /**
   * @param {string} unitId - Ad unit ID (usa TEST_UNITS.banner si no se provee)
   * @param {string} containerId - ID del elemento donde mostrar el banner
   */
  loadBannerAd(unitId = TEST_UNITS.banner, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const banner = document.createElement('div');
    banner.className = 'ad-banner';
    banner.dataset.adUnit = unitId;
    banner.innerHTML = `
      <div class="ad-placeholder" style="background:#2a2a3e;text-align:center;padding:8px;font-size:12px;color:#888;">
        📢 Publicidad — <a href="#" onclick="return false;" style="color:#7c6af7">¿Quieres eliminar anuncios?</a>
      </div>
    `;
    container.appendChild(banner);
    banner.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('ads:clicked', { detail: { type: 'banner', unitId } }));
    });
  }

  /** @param {string} unitId */
  loadInterstitialAd(unitId = TEST_UNITS.interstitial) {
    this._interstitialLoaded = true;
    this._interstitialUnitId = unitId;
  }

  showInterstitialAd() {
    if (!this._interstitialLoaded) return;
    this._exerciseSinceLastAd = 0;

    const overlay = document.createElement('div');
    overlay.className = 'ad-interstitial-overlay';
    overlay.innerHTML = `
      <div class="ad-interstitial">
        <div class="ad-content">
          <p>📢 Anuncio</p>
          <div class="ad-placeholder">Espacio publicitario</div>
        </div>
        <button class="ad-close" id="ad-close-btn">Cerrar (5s)</button>
      </div>
    `;
    document.body.appendChild(overlay);

    let seconds = 5;
    const btn = overlay.querySelector('#ad-close-btn');
    const timer = setInterval(() => {
      seconds--;
      btn.textContent = seconds > 0 ? `Cerrar (${seconds}s)` : 'Cerrar';
      if (seconds <= 0) {
        clearInterval(timer);
        btn.disabled = false;
      }
    }, 1000);

    btn.disabled = true;
    btn.addEventListener('click', () => {
      overlay.remove();
      window.dispatchEvent(new CustomEvent('ads:clicked', { detail: { type: 'interstitial' } }));
    });

    this._interstitialLoaded = false;
    this.loadInterstitialAd();
  }

  /** @param {string} unitId */
  loadRewardedAd(unitId = TEST_UNITS.rewarded) {
    this._rewardedLoaded = true;
    this._rewardedUnitId = unitId;
  }

  /**
   * Muestra anuncio recompensado
   * @returns {Promise<{rewarded: boolean, amount: number}>}
   */
  showRewardedAd() {
    return new Promise((resolve, reject) => {
      if (!this._rewardedLoaded) return reject(new Error('Rewarded ad no cargado'));

      const today = new Date().toDateString();
      if (this._rewardedDate !== today) {
        this._rewardedToday = 0;
        this._rewardedDate = today;
      }

      if (this._rewardedToday >= MAX_REWARDED_PER_DAY) {
        return reject(new Error('Límite diario de anuncios recompensados alcanzado'));
      }

      const overlay = document.createElement('div');
      overlay.className = 'ad-rewarded-overlay';
      overlay.innerHTML = `
        <div class="ad-rewarded">
          <p>📢 Ver anuncio para ganar XP extra</p>
          <div class="ad-placeholder" style="height:100px;background:#2a2a3e;margin:16px 0;"></div>
          <div id="rewarded-timer">Mirando anuncio... 10s</div>
        </div>
      `;
      document.body.appendChild(overlay);

      let seconds = 10;
      const timerEl = overlay.querySelector('#rewarded-timer');
      const interval = setInterval(() => {
        seconds--;
        timerEl.textContent = seconds > 0 ? `Mirando anuncio... ${seconds}s` : '¡Recompensa ganada!';
        if (seconds <= 0) {
          clearInterval(interval);
          setTimeout(() => {
            overlay.remove();
            this._rewardedToday++;
            this._saveAdsState();
            window.dispatchEvent(new CustomEvent('ads:reward', { detail: { amount: 50 } }));
            resolve({ rewarded: true, amount: 50 });
          }, 1000);
        }
      }, 1000);
    });
  }

  /**
   * @param {{plan: string}} userSubscription
   * @returns {boolean}
   */
  shouldShowAds(userSubscription) {
    return userSubscription?.plan === 'lite';
  }

  /** Llamar después de cada ejercicio completado */
  onExerciseCompleted(userSubscription) {
    if (!this.shouldShowAds(userSubscription)) return;

    this._exerciseSinceLastAd++;
    if (this._exerciseSinceLastAd >= MAX_INTERSTITIALS_PER_EXERCISES) {
      this.loadInterstitialAd();
      this.showInterstitialAd();
    }
  }

  _saveAdsState() {
    localStorage.setItem(
      'gp_ads_state',
      JSON.stringify({ date: this._rewardedDate, rewardedCount: this._rewardedToday })
    );
  }
}
