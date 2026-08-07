import { useState, useEffect, useRef, useCallback } from 'react';
import { getFrequency, getNoteFromFrequency, getRMSLevel, NOISE_THRESHOLD_DB, PitchSmoother } from '../utils/pitchDetector';
import { NotaDetectada } from '../types';

const BUFFER_SIZE = 4096;
const DEBOUNCE_MS = 100;

interface UsePitchDetectionReturn { notaActual: NotaDetectada | null; frecuencia: number; isListening: boolean; error: string | null; startListening: () => Promise<void>; stopListening: () => void; }

export function usePitchDetection(): UsePitchDetectionReturn {
  const [notaActual, setNotaActual] = useState<NotaDetectada | null>(null);
  const [frecuencia, setFrecuencia] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const smootherRef = useRef(new PitchSmoother(5));

  const processAudio = useCallback(() => {
    if (!analyserRef.current || !audioContextRef.current) return;
    const buffer = new Float32Array(BUFFER_SIZE);
    analyserRef.current.getFloatTimeDomainData(buffer);
    if (getRMSLevel(buffer) > NOISE_THRESHOLD_DB) {
      const freq = getFrequency(buffer, audioContextRef.current.sampleRate);
      const smoothed = smootherRef.current.smooth(freq);
      if (smoothed > 80 && smoothed < 400) {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => { setNotaActual(getNoteFromFrequency(smoothed)); setFrecuencia(Math.round(smoothed * 10) / 10); }, DEBOUNCE_MS);
      }
    }
    animationFrameRef.current = requestAnimationFrame(processAudio);
  }, []);

  const startListening = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = BUFFER_SIZE * 2;
      analyserRef.current = analyser;
      audioContext.createMediaStreamSource(stream).connect(analyser);
      smootherRef.current.reset();
      setIsListening(true);
      processAudio();
    } catch (err) {
      if (err instanceof Error) setError(err.name === 'NotAllowedError' ? 'Permiso de micrófono denegado.' : 'Error al acceder al micrófono: ' + err.message);
    }
  }, [processAudio]);

  const stopListening = useCallback(() => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    if (audioContextRef.current) audioContextRef.current.close();
    smootherRef.current.reset();
    setIsListening(false); setNotaActual(null); setFrecuencia(0);
  }, []);

  useEffect(() => { return () => stopListening(); }, [stopListening]);
  return { notaActual, frecuencia, isListening, error, startListening, stopListening };
}
