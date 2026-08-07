import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface NoteDisplayProps { notaEsperada: string; notaTocada: string | null; isCorrect: boolean; }

export function NoteDisplay({ notaEsperada, notaTocada, isCorrect }: NoteDisplayProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (notaTocada) { Animated.sequence([Animated.parallel([Animated.spring(scaleAnim, { toValue: 1.1, useNativeDriver: true }), Animated.timing(opacityAnim, { toValue: 1, duration: 150, useNativeDriver: true })]), Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true })]).start(); }
    else { opacityAnim.setValue(0); }
  }, [notaTocada, isCorrect]);
  const colorTocada = isCorrect ? '#22C55E' : '#EF4444';
  return (
    <View style={styles.container}>
      <View style={styles.labelsRow}>
        <View style={styles.labelItem}><View style={[styles.labelDot, { backgroundColor: '#3B82F6' }]} /><Text style={styles.labelTexto}>Esperada</Text><Text style={[styles.notaNombre, { color: '#3B82F6' }]}>{notaEsperada}</Text></View>
        {notaTocada && (<Animated.View style={[styles.labelItem, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}><View style={[styles.labelDot, { backgroundColor: colorTocada }]} /><Text style={styles.labelTexto}>Tocada</Text><Text style={[styles.notaNombre, { color: colorTocada }]}>{notaTocada}</Text></Animated.View>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 16 },
  labelsRow: { flexDirection: 'row', gap: 32, marginTop: 16 },
  labelItem: { alignItems: 'center' },
  labelDot: { width: 12, height: 12, borderRadius: 6, marginBottom: 4 },
  labelTexto: { color: '#666', fontSize: 11 },
  notaNombre: { fontSize: 20, fontWeight: 'bold', marginTop: 2 },
});
