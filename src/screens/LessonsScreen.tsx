import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getLessons, canAccessLesson } from '../services/lessonService';
import { getCompletionPercentage } from '../utils/userProgress';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { Paywall } from '../components/Paywall';
import { Leccion, NivelUsuario } from '../types';

const NIVELES: { id: NivelUsuario; label: string; icono: string; color: string }[] = [
  { id: 'principiante', label: 'Principiante', icono: '🌱', color: '#22C55E' },
  { id: 'intermedio',   label: 'Intermedio',   icono: '🔥', color: '#3B82F6' },
  { id: 'avanzado',     label: 'Avanzado',     icono: '⭐', color: '#8B5CF6' },
];

export default function LessonsScreen() {
  const { user, userData } = useAuth();
  const { entitlements } = useSubscription();
  const router = useRouter();

  const [nivelActivo, setNivelActivo] = useState<NivelUsuario>('principiante');
  const [lecciones, setLecciones] = useState<Leccion[]>([]);
  const [porcentaje, setPorcentaje] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    if (user) loadLecciones();
  }, [nivelActivo, user]);

  const loadLecciones = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const [data, pct] = await Promise.all([
        getLessons(nivelActivo, user.uid),
        getCompletionPercentage(user.uid, nivelActivo),
      ]);
      setLecciones(data);
      setPorcentaje(pct);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLesson = async (leccion: Leccion) => {
    if (!user) return;
    const { allowed, reason } = await canAccessLesson(user.uid, leccion);
    if (!allowed) {
      if (reason?.includes('PRO') || reason?.includes('MAESTRO')) {
        setShowPaywall(true);
      } else {
        Alert.alert('Bloqueada', reason ?? 'No podés acceder a esta lección.');
      }
      return;
    }
    router.push({ pathname: '/exercise', params: { lessonId: leccion.id } });
  };

  const nivelConfig = NIVELES.find(n => n.id === nivelActivo)!;

  const renderLeccion = ({ item, index }: { item: Leccion; index: number }) => (
    <TouchableOpacity style={styles.leccionCard} onPress={() => handleSelectLesson(item)}>
      <View style={[styles.numeroCirculo, { borderColor: nivelConfig.color }]}>
        <Text style={[styles.numeroTexto, { color: nivelConfig.color }]}>{index + 1}</Text>
      </View>
      <View style={styles.leccionInfo}>
        <Text style={styles.leccionNombre}>{item.nombre}</Text>
        <Text style={styles.leccionDesc}>{item.descripcion}</Text>
        <Text style={styles.leccionMeta}>{item.ejercicios.length} ejercicios</Text>
      </View>
      <Text style={styles.arrow}>→</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Lecciones</Text>

      <View style={styles.tabs}>
        {NIVELES.map(nivel => {
          const bloqueado =
            (nivel.id === 'intermedio' && !entitlements.hasIntermedio) ||
            (nivel.id === 'avanzado' && !entitlements.hasAvanzado);

          return (
            <TouchableOpacity
              key={nivel.id}
              style={[styles.tab, nivelActivo === nivel.id && { borderBottomColor: nivel.color }]}
              onPress={() => bloqueado ? setShowPaywall(true) : setNivelActivo(nivel.id)}
            >
              <Text style={styles.tabIcono}>{bloqueado ? '🔒' : nivel.icono}</Text>
              <Text style={[styles.tabTexto, nivelActivo === nivel.id && { color: nivel.color }]}>
                {nivel.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressTexto}>{porcentaje}% completado</Text>
        <View style={styles.progressBarra}>
          <View style={[styles.progressFill, { width: `${porcentaje}%`, backgroundColor: nivelConfig.color }]} />
        </View>
      </View>

      {isLoading
        ? <ActivityIndicator color="#F59E0B" style={{ marginTop: 48 }} />
        : <FlatList
            data={lecciones}
            keyExtractor={item => item.id}
            renderItem={renderLeccion}
            contentContainerStyle={{ paddingBottom: 24 }}
            ListEmptyComponent={
              <Text style={styles.vacio}>No hay lecciones disponibles aun.</Text>
            }
          />
      }

      <Paywall visible={showPaywall} onClose={() => setShowPaywall(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  titulo: { color: '#fff', fontSize: 22, fontWeight: 'bold', textAlign: 'center', paddingVertical: 16 },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#1A1A1A' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabIcono: { fontSize: 16, marginBottom: 2 },
  tabTexto: { color: '#666', fontSize: 12 },
  progressContainer: { padding: 16 },
  progressTexto: { color: '#888', fontSize: 12, marginBottom: 6 },
  progressBarra: { height: 4, backgroundColor: '#1A1A1A', borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },
  leccionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    gap: 12,
  },
  numeroCirculo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numeroTexto: { fontSize: 14, fontWeight: 'bold' },
  leccionInfo: { flex: 1 },
  leccionNombre: { color: '#fff', fontSize: 15, fontWeight: '600' },
  leccionDesc: { color: '#666', fontSize: 12, marginTop: 2 },
  leccionMeta: { color: '#444', fontSize: 11, marginTop: 4 },
  arrow: { color: '#444', fontSize: 18 },
  vacio: { color: '#444', textAlign: 'center', marginTop: 48, fontSize: 14 },
});
