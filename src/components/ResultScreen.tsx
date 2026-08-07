import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function getCalificacion(accuracy: number) {
  if (accuracy >= 90) return { label: 'Excelente', color: '#22C55E' };
  if (accuracy >= 75) return { label: 'Muy bien', color: '#3B82F6' };
  if (accuracy >= 60) return { label: 'Bien', color: '#F59E0B' };
  return { label: 'Seguí practicando', color: '#EF4444' };
}

export function ResultScreen({ accuracy, score, onRepeat, onNext }: { accuracy: number; score: number; onRepeat: () => void; onNext: () => void }) {
  const { label, color } = getCalificacion(accuracy);
  return (
    <View style={styles.container}>
      <Text style={styles.checkmark}>✓</Text>
      <Text style={styles.titulo}>Ejercicio completado</Text>
      <Text style={[styles.calificacion, { color }]}>{label}</Text>
      <View style={styles.statsRow}>
        <View style={styles.statItem}><Text style={[styles.statValor, { color }]}>{accuracy}%</Text><Text style={styles.statLabel}>Accuracy</Text></View>
        <View style={styles.separador} />
        <View style={styles.statItem}><Text style={[styles.statValor, { color: '#F59E0B' }]}>+{score}</Text><Text style={styles.statLabel}>XP ganado</Text></View>
      </View>
      <TouchableOpacity style={styles.botonSecundario} onPress={onRepeat}><Text style={styles.botonSecundarioTexto}>Repetir ejercicio</Text></TouchableOpacity>
      <TouchableOpacity style={styles.botonPrimario} onPress={onNext}><Text style={styles.botonPrimarioTexto}>Siguiente leccion →</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', justifyContent: 'center', alignItems: 'center', padding: 32 },
  checkmark: { fontSize: 64, marginBottom: 16 }, titulo: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }, calificacion: { fontSize: 18, marginBottom: 32 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 40 }, statItem: { alignItems: 'center', paddingHorizontal: 24 }, statValor: { fontSize: 36, fontWeight: 'bold' }, statLabel: { color: '#666', fontSize: 13, marginTop: 4 }, separador: { width: 1, height: 48, backgroundColor: '#333' },
  botonPrimario: { backgroundColor: '#F59E0B', borderRadius: 14, paddingVertical: 16, paddingHorizontal: 32, width: '100%', alignItems: 'center', marginTop: 12 }, botonPrimarioTexto: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  botonSecundario: { borderWidth: 1, borderColor: '#333', borderRadius: 14, paddingVertical: 16, paddingHorizontal: 32, width: '100%', alignItems: 'center' }, botonSecundarioTexto: { color: '#999', fontSize: 15 },
});
