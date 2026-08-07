import { getValidAccessToken } from './spotifyAuth';
import { Cancion, CategoriaSpotify, PlanSuscripcion } from '../types';

const API_BASE = 'https://api.spotify.com/v1';
const PLAYLIST_IDS: Record<CategoriaSpotify, string> = { criolla: '37i9dQZF1DX5vMFjRGzBQB', clasica: '37i9dQZF1DWWEJlAGA9gs0', flamenco: '37i9dQZF1DWYnCPJnFDxWB', tango: '37i9dQZF1DX9HBL4R0GCZB' };
const SONG_LIMITS: Record<PlanSuscripcion, number> = { lite: 100, pro: 200, maestro: 500 };

async function spotifyFetch<T>(endpoint: string): Promise<T> {
  const token = await getValidAccessToken();
  if (!token) throw new Error('No autenticado con Spotify.');
  const response = await fetch(`${API_BASE}${endpoint}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!response.ok) throw new Error(`Spotify API error: ${response.status}`);
  return response.json();
}

export async function getPlaylists(category: CategoriaSpotify) { return spotifyFetch(`/playlists/${PLAYLIST_IDS[category]}`); }

export async function getSongs(playlistId: string, plan: PlanSuscripcion = 'lite'): Promise<Cancion[]> {
  const limit = Math.min(SONG_LIMITS[plan], 50);
  const data = await spotifyFetch<{ items: any[] }>(`/playlists/${playlistId}/tracks?limit=${limit}&fields=items(track(id,name,artists,duration_ms,preview_url))`);
  return data.items.filter(i => i.track).map(i => ({ trackId: i.track.id, title: i.track.name, artist: i.track.artists[0]?.name ?? 'Desconocido', duration: i.track.duration_ms, previewUrl: i.track.preview_url ?? undefined }));
}

export async function playSong(trackId: string): Promise<void> {
  const token = await getValidAccessToken();
  if (!token) throw new Error('No autenticado con Spotify.');
  await fetch(`${API_BASE}/me/player/play`, { method: 'PUT', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ uris: [`spotify:track:${trackId}`] }) });
}

export async function pauseSong(): Promise<void> {
  const token = await getValidAccessToken();
  if (!token) throw new Error('No autenticado con Spotify.');
  await fetch(`${API_BASE}/me/player/pause`, { method: 'PUT', headers: { Authorization: `Bearer ${token}` } });
}
