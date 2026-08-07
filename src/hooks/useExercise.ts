import { useState, useCallback } from 'react';
import { usePitchDetection } from './usePitchDetection';
import { Ejercicio } from '../types';

export function useExercise() {
  const { notaActual } = usePitchDetection();
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [score, setScore] = useState(0);
  const [notasCorrectas, setNotasCorrectas] = useState(0);
  const [totalNotas, setTotalNotas] = useState(0);

  const ejercicioActual = ejercicios[indiceActual] ?? null;
  const isCompleted = indiceActual >= ejercicios.length && ejercicios.length > 0;
  const accuracy = totalNotas > 0 ? Math.round((notasCorrectas / totalNotas) * 100) : 0;
  const currentNote = notaActual ? `${notaActual.nota}${notaActual.octava}` : null;

  const isCorrect = useCallback((): boolean => {
    if (!notaActual || !ejercicioActual) return false;
    return `${notaActual.nota}${notaActual.octava}` === ejercicioActual.esperada && Math.abs(notaActual.cents) <= 20;
  }, [notaActual, ejercicioActual]);

  const nextNote = useCallback(() => {
    const correcto = isCorrect();
    setTotalNotas(t => t + 1);
    if (correcto) { setNotasCorrectas(n => n + 1); setScore(s => s + 100); }
    setIndiceActual(i => i + 1);
  }, [isCorrect]);

  const resetExercise = useCallback((nuevosEjercicios: Ejercicio[]) => {
    setEjercicios(nuevosEjercicios); setIndiceActual(0); setScore(0); setNotasCorrectas(0); setTotalNotas(0);
  }, []);

  return { currentNote, ejercicioActual, score, accuracy, isCorrect, nextNote, resetExercise, isCompleted, totalNotas, notasCorrectas };
}
