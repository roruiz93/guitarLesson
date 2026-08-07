import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../hooks/useAuth';

export function StatsChart() {
  const { user } = useAuth();
  const [stats, setStats] = useState<{ dia: string; xp: number; accuracy: number }[]>([]);
  useEffect(() => { if (user) loadStats(); }, [user]);
  const loadStats = async () => {
    if (!user) return;
    try {
      const snap = await getDocs(query(collection(db, 'users', user.uid, 'exercises'), orderBy('fecha', 'desc'), limit(50)));
      const dias: Record<string, { xp: number; accuracy: number[] }> = {};
      const hoy = new Date();
      for (let i = 6; i >= 0; i--) { const d = new Date(hoy); d.setDate(d.getDate() - i); dias[d.toLocaleDateString('es-AR', { weekday: 'short' })] = { xp: 0, accuracy: [] }; }
      snap.docs.forEach(doc => { const data = doc.data(); const fecha = data.fecha?.toDate?.() ?? new Date(); const key = fecha.toLocaleDateString('es-AR', { weekday: 'short' }); if (dias[key]) { dias[key].xp += data.xpGanado ?? 0; dias[key].accuracy.push(data.accuracy ?? 0); } });
      setStats(Object.entries(dias).map(([dia, { xp, accuracy }]) => ({ dia, xp, accuracy: accuracy.length ? Math.round(accuracy.reduce((a, b) => a + b, 0) / accuracy.length) : 0 })));
    } catch { setStats([]); }
  };
  const maxXP = Math.max(...stats.map(s => s.xp), 1);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>XP por dia</Text>
      <View style={styles.barras}>
        {stats.map(s => (
          <View key={s.dia} style={styles.barraCol}>
            <Text style={styles.barraValor}>{s.xp > 0 ? s.xp : ''}</Text>
            <View style={styles.barraFondo}><View style={[styles.barra, { height: `${(s.xp / maxXP) * 100}%` }]} /></View>
            <Text style={styles.barraLabel}>{s.dia}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 }, label: { color: '#888', fontSize: 12, marginBottom: 8 },
  barras: { flexDirection: 'row', justifyContent: 'space-between', height: 100 },
  barraCol: { alignItems: 'center', flex: 1 }, barraValor: { color: '#F59E0B', fontSize: 9, marginBottom: 2 },
  barraFondo: { flex: 1, width: 16, backgroundColor: '#1A1A1A', borderRadius: 4, justifyContent: 'flex-end' },
  barra: { backgroundColor: '#F59E0B', borderRadius: 4, width: '100%' }, barraLabel: { color: '#555', fontSize: 9, marginTop: 4 },
});
