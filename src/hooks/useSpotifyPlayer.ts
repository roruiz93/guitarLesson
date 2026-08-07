import { useState, useCallback } from 'react';
import { playSong, pauseSong } from '../services/spotifyService';
import { Cancion } from '../types';

export function useSpotifyPlayer() {
  const [nowPlaying, setNowPlaying] = useState<Cancion | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempoState] = useState(1.0);
  const [currentTime, setCurrentTime] = useState(0);

  const play = useCallback(async (cancion: Cancion) => {
    await playSong(cancion.trackId); setNowPlaying(cancion); setIsPlaying(true); setCurrentTime(0);
  }, []);

  const pause = useCallback(async () => { await pauseSong(); setIsPlaying(false); }, []);
  const setTempo = useCallback((value: number) => { setTempoState(Math.max(0.75, Math.min(1.5, value))); }, []);

  return { nowPlaying, isPlaying, tempo, currentTime, play, pause, setTempo };
}
