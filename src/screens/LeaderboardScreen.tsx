import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { getLeaderboard } from '../services/cloudFunctions';
import { useAuth } from '../hooks/useAuth';
import { EntradaLeaderboard, PeriodoLeaderboard } from '../types';
import { AdWrapper } from '../components/AdWrapper';

const PERIODOS: { id: PeriodoLeaderboard; label: string }[] = [
  { id: 'semanal', label: 'Semana' },
  { id: 'mensual', label: 'Mes' },
];

export default function LeaderboardScreen() {
  const { user } = useAuth();
  const [periodo, setPeriodo] = useState<PeriodoLeaderboard>('semanal');
  const [entries, setEntries] = useState<EntradaLeaderboard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { loadLeaderboard(); }, [periodo]);

  const loadLeaderboard = async () => {
    setIsLoading(true);
    try {
      const data = await getLeaderboard(periodo);
      setEntries((data as EntradaLeaderboard[]) ?? []);
    } catch { setEntries([]); }
    finally { setIsLoading(false); }
  };

  const renderEntry = ({ item }: { item: EntradaLeaderboard }) => {
    const isMe = item.uid === user?.uid;
    const medallas: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };
    return (
      <View style={[styles.entrada, isMe && styles.entradaPropia]}>
        <Text style={styles.posicion}>{medallas[item.posicion] ?? `#${item.posicion}`}</Text>
        <View style={styles.infoContainer}>
          <Text style={[styles.nombre, isMe && styles.nombrePropio]}>{item.nombre}{isMe ? ' (Vos)' : ''}</Text>
          <Text style={styles.racha}>🔥 {item.racha} días</Text>
        </View>
        <Text style={styles.xp}>{item.xp} XP</Text>
      </View>
    );
  };

  return (
    <AdWrapper>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Ranking</Text>

        <View style={styles.tabs}>
          {PERIODOS.map(p => (
            <TouchableOpacity
              key={p.id}
              style={[styles.tab, periodo === p.id && styles.tabActivo]}
              onPress={() => setPeriodo(p.id)}
            >
              <Text style={[styles.tabTexto, periodo === p.id && styles.tabTextoActivo]}>{p.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {isLoading ? (
          <ActivityIndicator color="#F59E0B" style={{ marginTop: 48 }} />
        ) : (
          <FlatList
            data={entries}
            keyExtractor={item => item.uid}
            renderItem={renderEntry}
            contentContainerStyle={{ paddingBottom: 24 }}
            ListEmptyComponent={
              <Text style={styles.vacio}>No hay datos del ranking aun.</Text>
            }
          />
        )}
      </SafeAreaView>
    </AdWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  titulo: { color: '#fff', fontSize: 22, fontWeight: 'bold', textAlign: 'center', paddingVertical: 16 },
  tabs: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 16, backgroundColor: '#1A1A1A', borderRadius: 10, padding: 4 },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  tabActivo: { backgroundColor: '#2A2A2A' },
  tabTexto: { color: '#555', fontSize: 14 },
  tabTextoActivo: { color: '#F59E0B', fontWeight: '600' },
  entrada: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 12, padding: 14, marginHorizontal: 16, marginBottom: 8, borderWidth: 1, borderColor: '#2A2A2A', gap: 12 },
  entradaPropia: { borderColor: '#F59E0B44', backgroundColor: '#1a1500' },
  posicion: { fontSize: 20, width: 36, textAlign: 'center' },
  infoContainer: { flex: 1 },
  nombre: { color: '#fff', fontSize: 14, fontWeight: '600' },
  nombrePropio: { color: '#F59E0B' },
  racha: { color: '#666', fontSize: 12, marginTop: 2 },
  xp: { color: '#F59E0B', fontSize: 16, fontWeight: 'bold' },
  vacio: { color: '#444', textAlign: 'center', marginTop: 48, fontSize: 14 },
});
