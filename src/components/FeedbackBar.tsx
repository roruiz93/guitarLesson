import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function FeedbackBar({ accuracy, score, notasCorrectas, totalNotas }: { accuracy: number; score: number; notasCorrectas: number; totalNotas: number }) {
  const color = accuracy >= 80 ? '#22C55E' : accuracy >= 50 ? '#F59E0B' : '#EF4444';
  return (
    <View style={styles.container}>
      <View style={styles.stat}><Text style={styles.label}>Accuracy</Text><Text style={[styles.valor, { color }]}>{accuracy}%</Text></View>
      <View style={styles.barraContainer}><View style={[styles.barra, { width: `${accuracy}%`, backgroundColor: color }]} /></View>
      <View style={styles.fila}>
        <View style={styles.stat}><Text style={styles.label}>Notas</Text><Text style={styles.valor}>{notasCorrectas}/{totalNotas}</Text></View>
        <View style={styles.stat}><Text style={styles.label}>Score</Text><Text style={[styles.valor, { color: '#F59E0B' }]}>{score} XP</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#1A1A1A', borderRadius: 12, padding: 16, margin: 16 },
  stat: { alignItems: 'center' }, label: { color: '#666', fontSize: 11, marginBottom: 2 }, valor: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  barraContainer: { height: 6, backgroundColor: '#333', borderRadius: 3, marginVertical: 10, overflow: 'hidden' },
  barra: { height: '100%', borderRadius: 3 }, fila: { flexDirection: 'row', justifyContent: 'space-around' },
});
