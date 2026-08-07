import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { CUERDAS } from '../utils/pitchDetector';
import { CuerdaGuitarra } from '../types';

interface StringSelectorProps { cuerdaSeleccionada: CuerdaGuitarra; onSelect: (cuerda: CuerdaGuitarra) => void; cuerdaAfinada?: boolean; }

export function StringSelector({ cuerdaSeleccionada, onSelect, cuerdaAfinada }: StringSelectorProps) {
  const handleSelect = async (cuerda: CuerdaGuitarra) => {
    if (cuerdaAfinada && cuerda.numero === cuerdaSeleccionada.numero) await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onSelect(cuerda);
  };
  return (
    <View style={styles.container}>
      {CUERDAS.map(cuerda => {
        const isSelected = cuerda.numero === cuerdaSeleccionada.numero;
        return (
          <TouchableOpacity key={cuerda.numero} style={[styles.boton, isSelected && styles.botonSeleccionado, isSelected && cuerdaAfinada && styles.botonAfinado]} onPress={() => handleSelect(cuerda)}>
            <Text style={[styles.notaNombre, isSelected && styles.notaNombreSeleccionada]}>{cuerda.nota.replace(/\d/, '')}</Text>
            <Text style={styles.numeroCuerda}>{cuerda.numero}</Text>
            <Text style={styles.frecuencia}>{cuerda.frecuencia} Hz</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginTop: 24 },
  boton: { flex: 1, marginHorizontal: 4, paddingVertical: 14, borderRadius: 12, backgroundColor: '#1E1E1E', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  botonSeleccionado: { backgroundColor: '#2A2A2A', borderColor: '#F59E0B' },
  botonAfinado: { borderColor: '#22C55E', backgroundColor: '#052e16' },
  notaNombre: { color: '#999', fontSize: 16, fontWeight: 'bold' },
  notaNombreSeleccionada: { color: '#fff' },
  numeroCuerda: { color: '#555', fontSize: 10, marginTop: 2 },
  frecuencia: { color: '#444', fontSize: 9, marginTop: 2 },
});
