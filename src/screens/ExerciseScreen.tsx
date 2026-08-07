import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useExercise } from '../hooks/useExercise';
import { usePitchDetection } from '../hooks/usePitchDetection';
import { NoteDisplay } from '../components/NoteDisplay';
import { FeedbackBar } from '../components/FeedbackBar';
import { ResultScreen } from '../components/ResultScreen';
import { Leccion } from '../types';

interface ExerciseScreenProps {
  leccion: Leccion;
  onComplete: (accuracy: number, score: number) => void;
}

export default function ExerciseScreen({ leccion, onComplete }: ExerciseScreenProps) {
  const { startListening, stopListening, isListening } = usePitchDetection();
  const {
    currentNote, ejercicioActual, score, accuracy, isCorrect,
    nextNote, resetExercise, isCompleted, totalNotas, notasCorrectas,
  } = useExercise();
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    resetExercise(leccion.ejercicios);
  }, [leccion.id]);

  useEffect(() => {
    if (isCompleted && !showResult) {
      stopListening();
      setShowResult(true);
      onComplete(accuracy, score);
    }
  }, [isCompleted]);

  const handleRepeat = () => {
    setShowResult(false);
    resetExercise(leccion.ejercicios);
    startListening();
  };

  const handleNext = () => {
    stopListening();
    onComplete(accuracy, score);
  };

  if (showResult) {
    return <ResultScreen accuracy={accuracy} score={score} onRepeat={handleRepeat} onNext={handleNext} />;
  }

  const ejercicioIndex = ejercicioActual
    ? leccion.ejercicios.findIndex(e => e.id === ejercicioActual.id) + 1
    : leccion.ejercicios.length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.leccionNombre}>{leccion.nombre}</Text>
        <Text style={styles.progreso}>{ejercicioIndex}/{leccion.ejercicios.length}</Text>
      </View>

      <Text style={styles.descripcion}>{leccion.descripcion}</Text>

      {ejercicioActual && (
        <View style={styles.tipoContainer}>
          <Text style={styles.tipoLabel}>Ejercicio</Text>
          <Text style={styles.tipoNombre}>{ejercicioActual.tipo.toUpperCase()}</Text>
        </View>
      )}

      {ejercicioActual && (
        <NoteDisplay
          notaEsperada={ejercicioActual.esperada}
          notaTocada={currentNote}
          isCorrect={isCorrect()}
        />
      )}

      <FeedbackBar accuracy={accuracy} score={score} notasCorrectas={notasCorrectas} totalNotas={totalNotas} />

      <Text style={styles.instruccion}>
        {isListening ? `Tocá: ${ejercicioActual?.esperada ?? '...'}` : 'Presá el micrófono para iniciar'}
      </Text>

      {isListening && ejercicioActual && (
        <TouchableOpacity
          style={[styles.botonNext, isCorrect() && styles.botonNextCorrecto]}
          onPress={nextNote}
        >
          <Text style={styles.botonNextTexto}>{isCorrect() ? '✓ Correcto — Siguiente' : 'Pasar →'}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.botonMic, isListening && styles.botonMicActivo]}
        onPress={isListening ? stopListening : startListening}
      >
        <Text style={styles.botonMicTexto}>{isListening ? '⏹ Detener' : '🎤 Iniciar'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingBottom: 8 },
  leccionNombre: { color: '#fff', fontSize: 18, fontWeight: 'bold', flex: 1 },
  progreso: { color: '#F59E0B', fontSize: 14 },
  descripcion: { color: '#666', fontSize: 13, paddingHorizontal: 20, marginBottom: 12 },
  tipoContainer: { alignItems: 'center', paddingVertical: 8 },
  tipoLabel: { color: '#555', fontSize: 11 },
  tipoNombre: { color: '#F59E0B', fontSize: 16, fontWeight: 'bold', letterSpacing: 2 },
  instruccion: { color: '#666', textAlign: 'center', fontSize: 14, marginVertical: 8 },
  botonNext: { margin: 16, borderWidth: 1, borderColor: '#333', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  botonNextCorrecto: { borderColor: '#22C55E', backgroundColor: '#052e16' },
  botonNextTexto: { color: '#fff', fontSize: 15, fontWeight: '600' },
  botonMic: { margin: 16, backgroundColor: '#1A1A1A', borderRadius: 14, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  botonMicActivo: { borderColor: '#EF4444', backgroundColor: '#1a0000' },
  botonMicTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
