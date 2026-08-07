import * as SecureStore from 'expo-secure-store';
import * as Linking from 'expo-linking';
import { SpotifyTokens } from '../types';

const CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID!;
const REDIRECT_URI = process.env.EXPO_PUBLIC_SPOTIFY_REDIRECT_URI!;
const SCOPES = ['streaming','user-read-email','user-read-private','playlist-read-private','user-library-read'].join('%20');
const STORAGE_KEY = 'spotify_tokens';

export function buildAuthUrl(): string {
  return `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
}

export async function exchangeCodeForTokens(code: string): Promise<SpotifyTokens> {
  const response = await fetch('https://accounts.spotify.com/api/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT_URI, client_id: CLIENT_ID }).toString() });
  if (!response.ok) throw new Error('Error al obtener tokens de Spotify');
  const data = await response.json();
  const tokens: SpotifyTokens = { accessToken: data.access_token, refreshToken: data.refresh_token, expiresAt: Date.now() + data.expires_in * 1000 };
  await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(tokens));
  return tokens;
}

export async function refreshAccessToken(refreshToken: string): Promise<SpotifyTokens> {
  const response = await fetch('https://accounts.spotify.com/api/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken, client_id: CLIENT_ID }).toString() });
  if (!response.ok) throw new Error('Error al refrescar token');
  const data = await response.json();
  const tokens: SpotifyTokens = { accessToken: data.access_token, refreshToken: data.refresh_token ?? refreshToken, expiresAt: Date.now() + data.expires_in * 1000 };
  await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(tokens));
  return tokens;
}

export async function getValidAccessToken(): Promise<string | null> {
  const raw = await SecureStore.getItemAsync(STORAGE_KEY);
  if (!raw) return null;
  const tokens: SpotifyTokens = JSON.parse(raw);
  if (Date.now() < tokens.expiresAt - 60000) return tokens.accessToken;
  const refreshed = await refreshAccessToken(tokens.refreshToken);
  return refreshed.accessToken;
}

export async function clearTokens(): Promise<void> { await SecureStore.deleteItemAsync(STORAGE_KEY); }
export function isSpotifyCallback(url: string): boolean { return url.startsWith(REDIRECT_URI); }
export function extractCodeFromUrl(url: string): string | null { const parsed = Linking.parse(url); return (parsed.queryParams?.code as string) ?? null; }
