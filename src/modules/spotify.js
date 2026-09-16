const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API = 'https://api.spotify.com/v1';
const REDIRECT_URI = `${window.location.origin}/spotify-callback`;

const SONGS_LIMIT = { free: 0, lite: 100, pro: 200, maestro: 500 };

const CATEGORY_PLAYLISTS = {
  criolla: 'criolla guitarra',
  clasica: 'classical guitar',
  flamenco: 'flamenco guitar',
  tango: 'tango guitarra',
};

/** Integración con Spotify Web API usando OAuth PKCE */
export class SpotifyModule {
  constructor() {
    this._token = null;
    this._tokenExpiry = null;
    this._deviceId = null;
    this._callbacks = [];
    this._verifier = null;
  }

  /** Inicia flujo OAuth PKCE — redirige al usuario a Spotify */
  async authenticate() {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    if (!clientId) return;

    // Verifica si ya hay token válido
    const stored = localStorage.getItem('gp_spotify_token');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.expiry > Date.now()) {
        this._token = parsed.token;
        this._tokenExpiry = parsed.expiry;
        return;
      }
    }

    this._verifier = this._generateVerifier();
    const challenge = await this._generateChallenge(this._verifier);
    localStorage.setItem('gp_pkce_verifier', this._verifier);

    const params = new URLSearchParams({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      scope: 'streaming user-read-playback-state user-modify-playback-state playlist-read-private',
      code_challenge_method: 'S256',
      code_challenge: challenge,
    });

    window.location.href = `${SPOTIFY_AUTH_URL}?${params}`;
  }

  /** Maneja el callback de Spotify tras OAuth — llamar si URL tiene ?code= */
  async handleCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');

    if (!code && !error) return;

    // El código es de un solo uso: limpiamos la URL apenas lo leemos para
    // que un re-render (ej: otro fire de onAuthStateChanged) no lo reintente.
    const cleanUrl = window.location.pathname.replace(/\/?spotify-callback\/?$/, '/') + window.location.hash;
    history.replaceState(null, '', cleanUrl || '/');

    if (error) {
      window.dispatchEvent(new CustomEvent('spotify:error', { detail: error }));
      return;
    }

    const verifier = localStorage.getItem('gp_pkce_verifier');
    localStorage.removeItem('gp_pkce_verifier');

    const resp = await fetch(SPOTIFY_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        code_verifier: verifier,
      }),
    });

    const data = await resp.json();
    if (!resp.ok || !data.access_token) {
      window.dispatchEvent(new CustomEvent('spotify:error', { detail: data.error_description || 'Error al obtener token de Spotify' }));
      return;
    }

    this._saveToken(data.access_token, data.expires_in);
    this._scheduleRefresh(data.refresh_token, data.expires_in);
  }

  /**
   * @param {'criolla'|'clasica'|'flamenco'|'tango'} category
   * @returns {Promise<Array>}
   */
  async getPlaylists(category) {
    await this._ensureToken();
    const query = CATEGORY_PLAYLISTS[category] || category;
    const data = await this._request(`/search?q=${encodeURIComponent(query)}&type=playlist&limit=10`);
    return data.playlists?.items || [];
  }

  /** @param {string} playlistId */
  async getSongs(playlistId) {
    await this._ensureToken();
    const data = await this._request(`/playlists/${playlistId}/tracks?limit=50`);
    return data.items?.map((i) => i.track) || [];
  }

  /**
   * @param {string} trackUri - URI de Spotify
   * @param {number} tempo - velocidad de reproducción 0.75-1.5
   */
  async playSong(trackUri, tempo = 1.0) {
    await this._ensureToken();
    await this._request('/me/player/play', {
      method: 'PUT',
      body: JSON.stringify({ uris: [trackUri] }),
    });
    window.dispatchEvent(new CustomEvent('spotify:playing', { detail: { trackUri, tempo } }));
  }

  async pauseSong() {
    await this._ensureToken();
    await this._request('/me/player/pause', { method: 'PUT' });
    window.dispatchEvent(new CustomEvent('spotify:paused'));
  }

  async resumeSong() {
    await this._ensureToken();
    await this._request('/me/player/play', { method: 'PUT' });
  }

  /** @param {number} speed - 0.75 a 1.5 */
  setTempo(speed) {
    const clamped = Math.min(1.5, Math.max(0.75, speed));
    console.log(`Tempo set to ${clamped} (simulado — Spotify no soporta nativo)`);
  }

  async getCurrentTrack() {
    await this._ensureToken();
    const data = await this._request('/me/player/currently-playing');
    return data?.item || null;
  }

  /** @param {function} callback */
  onTrackChanged(callback) {
    this._callbacks.push(callback);
    const interval = setInterval(async () => {
      const track = await this.getCurrentTrack();
      callback(track);
    }, 5000);
    return () => {
      clearInterval(interval);
      this._callbacks = this._callbacks.filter((cb) => cb !== callback);
    };
  }

  /**
   * Filtra canciones según el plan del usuario
   * @param {'free'|'lite'|'pro'|'maestro'} userPlan
   */
  async getAvailableSongs(userPlan) {
    const limit = SONGS_LIMIT[userPlan] || 0;
    const playlists = await this.getPlaylists('clasica');
    if (!playlists.length) return [];

    const songs = await this.getSongs(playlists[0].id);
    return songs.slice(0, limit);
  }

  async _ensureToken() {
    if (!this._token || Date.now() > this._tokenExpiry) {
      await this.authenticate();
    }
  }

  async _request(path, options = {}) {
    const resp = await fetch(`${SPOTIFY_API}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this._token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (resp.status === 401) {
      this._token = null;
      window.dispatchEvent(new CustomEvent('spotify:error', { detail: 'Token expirado' }));
      throw new Error('Spotify: token expirado');
    }

    if (!resp.ok) {
      window.dispatchEvent(new CustomEvent('spotify:error', { detail: resp.statusText }));
      throw new Error(`Spotify API error: ${resp.status}`);
    }

    if (resp.status === 204) return null;
    return resp.json();
  }

  _saveToken(token, expiresIn) {
    this._token = token;
    this._tokenExpiry = Date.now() + expiresIn * 1000 - 60000;
    localStorage.setItem('gp_spotify_token', JSON.stringify({ token, expiry: this._tokenExpiry }));
  }

  _scheduleRefresh(refreshToken, expiresIn) {
    setTimeout(async () => {
      try {
        const resp = await fetch(SPOTIFY_TOKEN_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
          }),
        });
        const data = await resp.json();
        this._saveToken(data.access_token, data.expires_in);
        this._scheduleRefresh(data.refresh_token || refreshToken, data.expires_in);
      } catch (e) {
        window.dispatchEvent(new CustomEvent('spotify:error', { detail: e.message }));
      }
    }, (expiresIn - 120) * 1000);
  }

  _generateVerifier() {
    const arr = new Uint8Array(32);
    crypto.getRandomValues(arr);
    return btoa(String.fromCharCode(...arr)).replace(/[+/=]/g, (c) => ({ '+': '-', '/': '_', '=': '' }[c]));
  }

  async _generateChallenge(verifier) {
    const encoded = new TextEncoder().encode(verifier);
    const hash = await crypto.subtle.digest('SHA-256', encoded);
    return btoa(String.fromCharCode(...new Uint8Array(hash))).replace(/[+/=]/g, (c) => ({ '+': '-', '/': '_', '=': '' }[c]));
  }
}
