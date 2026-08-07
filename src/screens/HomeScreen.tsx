import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { getNextLesson } from '../utils/userProgress';
import { StatsChart } from '../components/StatsChart';
import { AdWrapper } from '../components/AdWrapper';
import { Leccion } from '../types';

export default function HomeScreen() {
  const { user, userData } = useAuth();
  const { currentPlan, entitlements } = useSubscription();
  const router = useRouter();
  const [nextLesson, setNextLesson] = useState<Leccion | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && userData) loadNextLesson();
  }, [user, userData]);

  const loadNextLesson = async () => {
    if (!user || !userData) return;
    try {
      const lesson = await getNextLesson(user.uid, userData.nivel);
      setNextLesson(lesson);
    } catch { /* silently fail */ }
    finally { setIsLoading(false); }
  };

  return (
    <AdWrapper>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Hola, {userData?.nombre ?? 'Guitarrista'} 👋</Text>
              <Text style={styles.nivel}>Nivel: {userData?.nivel ?? 'principiante'}</Text>
            </View>
            <View style={styles.xpBadge}>
              <Text style={styles.xpTexto}>⭐ {userData?.xp ?? 0} XP</Text>
            </View>
          </View>

          {/* Racha */}
          <View style={styles.rachaCard}>
            <Text style={styles.rachaIcono}>🔥</Text>
            <View>
              <Text style={styles.rachaTitulo}>Racha actual</Text>
              <Text style={styles.rachaDias}>{userData?.rachaActual ?? 0} días seguidos</Text>
            </View>
          </View>

          {/* Proxima leccion */}
          <View style={styles.seccion}>
            <Text style={styles.seccionTitulo}>Continuar aprendiendo</Text>
            {isLoading ? (
              <ActivityIndicator color="#F59E0B" style={{ marginTop: 16 }} />
            ) : nextLesson ? (
              <TouchableOpacity
                style={styles.leccionCard}
                onPress={() => router.push({ pathname: '/exercise', params: { lessonId: nextLesson.id } })}
              >
                <View style={styles.leccionInfo}>
                  <Text style={styles.leccionNombre}>{nextLesson.nombre}</Text>
                  <Text style={styles.leccionDesc}>{nextLesson.descripcion}</Text>
                  <Text style={styles.leccionMeta}>{nextLesson.ejercicios?.length ?? 0} ejercicios</Text>
                </View>
                <Text style={styles.leccionArrow}>→</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.sinLeccion}>Completaste todas las lecciones de tu nivel! 🎉</Text>
            )}
          </View>

          {/* Accesos rapidos */}
          <View style={styles.seccion}>
            <Text style={styles.seccionTitulo}>Accesos rápidos</Text>
            <View style={styles.accesoRow}>
              <TouchableOpacity style={styles.accesoCard} onPress={() => router.push('/(tabs)/tuner')}>
                <Text style={styles.accesoIcono}>🎸</Text>
                <Text style={styles.accesoTexto}>Afinador</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.accesoCard} onPress={() => router.push('/(tabs)/lessons')}>
                <Text style={styles.accesoIcono}>📚</Text>
                <Text style={styles.accesoTexto}>Lecciones</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.accesoCard} onPress={() => router.push('/(tabs)/leaderboard')}>
                <Text style={styles.accesoIcono}>🏆</Text>
                <Text style={styles.accesoTexto}>Ranking</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats chart */}
          <View style={styles.seccion}>
            <Text style={styles.seccionTitulo}>Tu progreso esta semana</Text>
            <StatsChart />
          </View>

          {/* Plan actual */}
          <View style={styles.planCard}>
            <Text style={styles.planTexto}>Plan actual: <Text style={styles.planNombre}>{currentPlan.toUpperCase()}</Text></Text>
            {!entitlements.hasIntermedio && (
              <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
                <Text style={styles.upgradeTexto}>Mejorar plan →</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </AdWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 16 },
  greeting: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  nivel: { color: '#888', fontSize: 13, marginTop: 2, textTransform: 'capitalize' },
  xpBadge: { backgroundColor: '#1A1A1A', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, borderWidth: 1, borderColor: '#F59E0B22' },
  xpTexto: { color: '#F59E0B', fontSize: 14, fontWeight: '600' },
  rachaCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#1A1A1A', margin: 16, marginTop: 0, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#2A2A2A' },
  rachaIcono: { fontSize: 32 },
  rachaTitulo: { color: '#888', fontSize: 12 },
  rachaDias: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  seccion: { marginHorizontal: 16, marginBottom: 20 },
  seccionTitulo: { color: '#888', fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 },
  leccionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#F59E0B44' },
  leccionInfo: { flex: 1 },
  leccionNombre: { color: '#fff', fontSize: 15, fontWeight: '600' },
  leccionDesc: { color: '#666', fontSize: 12, marginTop: 2 },
  leccionMeta: { color: '#444', fontSize: 11, marginTop: 4 },
  leccionArrow: { color: '#F59E0B', fontSize: 20 },
  sinLeccion: { color: '#666', fontSize: 14, textAlign: 'center', paddingVertical: 24 },
  accesoRow: { flexDirection: 'row', gap: 10 },
  accesoCard: { flex: 1, backgroundColor: '#1A1A1A', borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#2A2A2A' },
  accesoIcono: { fontSize: 28, marginBottom: 6 },
  accesoTexto: { color: '#ccc', fontSize: 12 },
  planCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 16, marginTop: 0, backgroundColor: '#1A1A1A', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#2A2A2A' },
  planTexto: { color: '#888', fontSize: 13 },
  planNombre: { color: '#F59E0B', fontWeight: 'bold' },
  upgradeTexto: { color: '#F59E0B', fontSize: 13, fontWeight: '600' },
});
