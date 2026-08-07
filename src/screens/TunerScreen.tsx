import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { usePitchDetection } from '../hooks/usePitchDetection';
import { StringSelector } from '../components/StringSelector';
import { CUERDAS } from '../utils/pitchDetector';
import { CuerdaGuitarra, EstadoAfinacion, NotaDetectada } from '../types';
import { AdWrapper } from '../components/AdWrapper';

function getCentsColor(cents: number): string {
  const abs = Math.abs(cents);
  if (abs <= 5) return '#22C55E';
  if (abs <= 15) return '#F59E0B';
  return '#EF4444';
}

function getTuningStatus(notaDetectada: NotaDetectada | null, cuerdaObj: CuerdaGuitarra): EstadoAfinacion {
  if (!notaDetectada) return 'desafinada';
  const notaCuerda = cuerdaObj.nota.replace(/\d/, '');
  if (notaDetectada.nota !== notaCuerda) return 'desafinada';
  if (Math.abs(notaDetectada.cents) <= 5) return 'afinada';
  return 'afinando';
}

export default function TunerScreen() {
  const { notaActual, frecuencia, isListening, error, startListening, stopListening } = usePitchDetection();
  const [cuerdaSeleccionada, setCuerdaSeleccionada] = useState<CuerdaGuitarra>(CUERDAS[0]);

  const estado = getTuningStatus(notaActual, cuerdaSeleccionada);
  const centsColor = notaActual ? getCentsColor(notaActual.cents) : '#555';
  const cuerdaAfinada = estado === 'afinada';

  const toggleListening = () => { isListening ? stopListening() : startListening(); };

  const statusTexto: Record<EstadoAfinacion, string> = {
    afinada: 'Afinada ✓',
    afinando: 'Afinando...',
    desafinada: 'Desafinada',
  };

  return (
    <AdWrapper>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Afinador</Text>

        {/* Display principal */}
        <View style={styles.displayContainer}>
          <View style={[styles.circulo, { borderColor: centsColor }]}>
            {notaActual ? (
              <>
                <Text style={[styles.notaNombre, { color: centsColor }]}>{notaActual.nota}</Text>
                <Text style={styles.octava}>{notaActual.octava}</Text>
                <Text style={[styles.cents, { color: centsColor }]}>
                  {notaActual.cents > 0 ? '+' : ''}{notaActual.cents} ¢
                </Text>
              </>
            ) : (
              <Text style={styles.placeholder}>{isListening ? '...' : 'Iniciá'}</Text>
            )}
          </View>

          {frecuencia > 0 && (
            <Text style={styles.frecuencia}>{frecuencia} Hz</Text>
          )}

          {notaActual && (
            <Text style={[styles.estadoTexto, { color: centsColor }]}>{statusTexto[estado]}</Text>
          )}

          {/* Barra de cents */}
          <View style={styles.centsContainer}>
            <Text style={styles.centsLabel}>-50</Text>
            <View style={styles.centsBarra}>
              <View style={styles.centsCentro} />
              {notaActual && (
                <View style={[
                  styles.centsIndicador,
                  { left: `${50 + Math.max(-48, Math.min(48, notaActual.cents))}%`, backgroundColor: centsColor }
                ]} />
              )}
            </View>
            <Text style={styles.centsLabel}>+50</Text>
          </View>
        </View>

        {/* Selector de cuerdas */}
        <StringSelector
          cuerdaSeleccionada={cuerdaSeleccionada}
          onSelect={setCuerdaSeleccionada}
          cuerdaAfinada={cuerdaAfinada}
        />

        {/* Nota objetivo */}
        <View style={styles.objetivoContainer}>
          <Text style={styles.objetivoLabel}>Cuerda seleccionada</Text>
          <Text style={styles.objetivoNota}>{cuerdaSeleccionada.nota}</Text>
          <Text style={styles.objetivoFrec}>{cuerdaSeleccionada.frecuencia} Hz</Text>
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          style={[styles.boton, isListening && styles.botonActivo]}
          onPress={toggleListening}
        >
          <Text style={styles.botonTexto}>{isListening ? '⏹ Detener' : '🎤 Iniciar afinador'}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </AdWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  titulo: { color: '#fff', fontSize: 22, fontWeight: 'bold', textAlign: 'center', paddingVertical: 16 },
  displayContainer: { alignItems: 'center', paddingVertical: 24 },
  circulo: { width: 160, height: 160, borderRadius: 80, borderWidth: 3, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  notaNombre: { fontSize: 52, fontWeight: 'bold' },
  octava: { color: '#666', fontSize: 18 },
  cents: { fontSize: 16, marginTop: 4 },
  placeholder: { color: '#333', fontSize: 24 },
  frecuencia: { color: '#555', fontSize: 14, marginBottom: 4 },
  estadoTexto: { fontSize: 16, fontWeight: '600', marginBottom: 16 },
  centsContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 32, width: '100%', gap: 8, marginTop: 8 },
  centsLabel: { color: '#444', fontSize: 11, width: 24, textAlign: 'center' },
  centsBarra: { flex: 1, height: 4, backgroundColor: '#222', borderRadius: 2, position: 'relative', justifyContent: 'center' },
  centsCentro: { position: 'absolute', left: '50%', width: 2, height: 10, backgroundColor: '#333', top: -3 },
  centsIndicador: { position: 'absolute', width: 8, height: 8, borderRadius: 4, top: -2, marginLeft: -4 },
  objetivoContainer: { alignItems: 'center', paddingVertical: 12 },
  objetivoLabel: { color: '#555', fontSize: 11 },
  objetivoNota: { color: '#F59E0B', fontSize: 24, fontWeight: 'bold' },
  objetivoFrec: { color: '#444', fontSize: 12 },
  error: { color: '#EF4444', textAlign: 'center', margin: 16, fontSize: 13 },
  boton: { margin: 24, backgroundColor: '#1A1A1A', borderRadius: 14, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  botonActivo: { backgroundColor: '#1a1a2e', borderColor: '#F59E0B' },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
