import { BADGES, RARITY_COLORS } from '../data/badges.js';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../services/firebase.js';

/** Sistema de gamificación: chequeo, desbloqueo y visualización de badges */
export class BadgeSystem {
  constructor() {
    this._unlockedIds = new Set(JSON.parse(localStorage.getItem('gp_badges') || '[]'));
  }

  /**
   * Verifica qué badges se han desbloqueado con las stats actuales
   * @param {object} stats - Stats del usuario
   * @returns {Badge[]} Badges recién desbloqueados
   */
  checkBadgeProgress(stats) {
    const newlyUnlocked = [];

    for (const badge of BADGES) {
      if (this._unlockedIds.has(badge.id)) continue;

      try {
        if (badge.condition(stats)) {
          newlyUnlocked.push(badge);
          this._unlockedIds.add(badge.id);
        }
      } catch {
        // Condición no aplicable con stats actuales
      }
    }

    if (newlyUnlocked.length > 0) {
      this._persistLocal();
      newlyUnlocked.forEach((badge) => {
        window.dispatchEvent(new CustomEvent('badge:unlocked', { detail: badge }));
      });
    }

    return newlyUnlocked;
  }

  /**
   * Desbloquea un badge manualmente y lo persiste en Firestore
   * @param {string} badgeId
   * @param {string} userId
   */
  async unlockBadge(badgeId, userId) {
    if (this._unlockedIds.has(badgeId)) return;

    this._unlockedIds.add(badgeId);
    this._persistLocal();

    if (userId) {
      await updateDoc(doc(db, 'users', userId), {
        badges: arrayUnion(badgeId),
      });
    }

    const badge = BADGES.find((b) => b.id === badgeId);
    if (badge) {
      window.dispatchEvent(new CustomEvent('badge:unlocked', { detail: badge }));
      this.showBadgeUnlockedModal(badge);
    }
  }

  /** @param {Badge} badge */
  showBadgeUnlockedModal(badge) {
    const existing = document.getElementById('badge-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'badge-modal';
    modal.className = 'badge-modal';
    modal.innerHTML = `
      <div class="badge-modal-content">
        <div class="badge-modal-icon">${badge.icon}</div>
        <h3>¡Badge Desbloqueado!</h3>
        <h4 class="badge-name" style="color:${RARITY_COLORS[badge.rarity]}">${badge.name}</h4>
        <p class="badge-desc">${badge.description}</p>
        <span class="rarity-label rarity-${badge.rarity}">${badge.rarity.toUpperCase()}</span>
        <div class="badge-actions">
          <button class="btn-primary" id="badge-close">¡Genial!</button>
          <button class="btn-secondary" id="badge-share">Compartir</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.classList.add('badge-modal-enter');

    document.getElementById('badge-close')?.addEventListener('click', () => {
      modal.classList.add('badge-modal-exit');
      setTimeout(() => modal.remove(), 300);
    });

    document.getElementById('badge-share')?.addEventListener('click', () => {
      this.shareBadge(badge);
    });

    setTimeout(() => {
      if (modal.parentNode) modal.remove();
    }, 8000);
  }

  /** @param {Badge} badge */
  shareBadge(badge) {
    const text = `¡Desbloqueé el badge ${badge.name} en Guitar+! ${badge.description} 🎸 #GuitarPlus`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /**
   * Renderiza grilla de badges del usuario
   * @param {string[]} unlockedIds - IDs de badges desbloqueados
   */
  renderBadgeShowcase(unlockedIds) {
    const main = document.getElementById('main-content');
    const unlockedSet = new Set(unlockedIds);

    main.innerHTML = `
      <div class="badges-container">
        <h2>🏅 Mis Badges <span class="badge-count">${unlockedIds.length}/${BADGES.length}</span></h2>
        <div class="badges-grid">
          ${BADGES.map((badge) => {
            const unlocked = unlockedSet.has(badge.id);
            return `
              <div class="badge-card ${unlocked ? 'unlocked' : 'locked'}" title="${badge.description}">
                <div class="badge-icon" style="filter:${unlocked ? 'none' : 'grayscale(1) opacity(0.4)'}">
                  ${badge.icon}
                </div>
                <span class="badge-card-name" style="color:${unlocked ? RARITY_COLORS[badge.rarity] : '#666'}">
                  ${badge.name.replace(badge.icon, '').trim()}
                </span>
                ${unlocked ? '' : '<span class="locked-label">🔒</span>'}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  _persistLocal() {
    localStorage.setItem('gp_badges', JSON.stringify([...this._unlockedIds]));
  }
}
