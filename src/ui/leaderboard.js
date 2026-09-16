/** UI de rankings y perfil de usuario con gráfico de XP semanal */
export class LeaderboardUI {
  constructor() {
    this._currentPeriod = 'weekly';
  }

  /**
   * @param {Array<{uid, displayName, xp, streak, avatar}>} users
   * @param {string|null} currentUserId
   * @param {'weekly'|'monthly'|'friends'} period
   */
  renderLeaderboard(users, currentUserId, period) {
    this._currentPeriod = period;
    const main = document.getElementById('main-content');

    main.innerHTML = `
      <div class="leaderboard-container">
        <h2 class="section-title">🏆 Rankings</h2>
        <div class="tabs">
          <button class="tab-btn ${period === 'weekly' ? 'active' : ''}" data-period="weekly">Semanal</button>
          <button class="tab-btn ${period === 'monthly' ? 'active' : ''}" data-period="monthly">Mensual</button>
          <button class="tab-btn ${period === 'friends' ? 'active' : ''}" data-period="friends">Amigos</button>
        </div>

        <table class="leaderboard-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Usuario</th>
              <th>XP</th>
              <th>Racha 🔥</th>
            </tr>
          </thead>
          <tbody id="leaderboard-body">
            ${this._renderRows(users, currentUserId)}
          </tbody>
        </table>

        ${users.length === 0 ? '<p class="empty-state">No hay datos aún. ¡Completa lecciones para aparecer!</p>' : ''}
      </div>
    `;

    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.dispatchEvent(
          new CustomEvent('leaderboard:period-change', { detail: btn.dataset.period })
        );
      });
    });
  }

  /** @param {{displayName, xp, streak, level, badges, lessonsCompleted, accuracy}} userStats */
  renderProfile(userStats) {
    const main = document.getElementById('main-content');

    main.innerHTML = `
      <div class="profile-container">
        <div class="profile-header">
          <div class="avatar">${userStats.avatar || '🎸'}</div>
          <div class="profile-info">
            <h2>${userStats.displayName || 'Guitarrista'}</h2>
            <span class="level-badge">Nivel ${userStats.level || 1}</span>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-value">${userStats.xp?.toLocaleString() || 0}</span>
            <span class="stat-label">XP Total</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">${userStats.streak || 0}🔥</span>
            <span class="stat-label">Racha días</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">${userStats.lessonsCompleted || 0}</span>
            <span class="stat-label">Lecciones</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">${userStats.accuracy || 0}%</span>
            <span class="stat-label">Accuracy media</span>
          </div>
        </div>

        <div class="chart-section">
          <h3>XP esta semana</h3>
          <canvas id="stats-canvas" width="320" height="160"></canvas>
        </div>
      </div>
    `;

    if (userStats.weeklyData) {
      this.renderStatsChart(userStats.weeklyData);
    }
  }

  /**
   * Gráfico de barras de XP por día
   * @param {Array<{day: string, xp: number}>} weeklyData - 7 días
   */
  renderStatsChart(weeklyData) {
    const canvas = document.getElementById('stats-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const padding = { top: 20, right: 10, bottom: 30, left: 40 };
    const chartW = W - padding.left - padding.right;
    const chartH = H - padding.top - padding.bottom;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, W, H);

    const maxXP = Math.max(...weeklyData.map((d) => d.xp), 1);
    const barW = chartW / weeklyData.length - 4;

    weeklyData.forEach(({ day, xp }, i) => {
      const barH = (xp / maxXP) * chartH;
      const x = padding.left + i * (chartW / weeklyData.length) + 2;
      const y = padding.top + chartH - barH;

      const gradient = ctx.createLinearGradient(x, y, x, y + barH);
      gradient.addColorStop(0, '#7c6af7');
      gradient.addColorStop(1, '#4f46e5');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, 4);
      ctx.fill();

      ctx.fillStyle = '#888';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(day.slice(0, 3), x + barW / 2, H - 8);

      if (xp > 0) {
        ctx.fillStyle = '#fff';
        ctx.fillText(xp, x + barW / 2, y - 4);
      }
    });
  }

  _renderRows(users, currentUserId) {
    if (!users.length) return '';
    return users
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 100)
      .map((user, index) => {
        const pos = index + 1;
        const isMe = user.uid === currentUserId;
        const medal = pos === 1 ? '🥇' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : pos;

        return `
          <tr class="${isMe ? 'current-user' : ''}">
            <td>${medal}</td>
            <td>${user.avatar || '🎸'} ${user.displayName || 'Anónimo'}</td>
            <td>${user.xp?.toLocaleString() || 0}</td>
            <td>${user.streak || 0}🔥</td>
          </tr>
        `;
      })
      .join('');
  }
}
