import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BADGES, RARITY_COLORS } from '../constants/badges.const';
import { useBadges } from '../hooks/useBadges';

export function BadgeShowcase({ userId }: { userId: string }) {
  const { badgesDesbloqueados } = useBadges(userId);
  const progreso = (badgesDesbloqueados.length / BADGES.length) * 100;
  return (
    <View style={styles.container}>
      <View style={styles.progressRow}><Text style={styles.progressTexto}>{badgesDesbloqueados.length}/{BADGES.length} logros</Text><View style={styles.progressBarra}><View style={[styles.progressFill, { width: `${progreso}%` }]} /></View></View>
      <View style={styles.grilla}>
        {BADGES.map(badge => {
          const desbloqueado = badgesDesbloqueados.includes(badge.id);
          const color = RARITY_COLORS[badge.rarity];
          return (
            <View key={badge.id} style={[styles.badgeItem, desbloqueado ? { borderColor: color } : styles.badgeBloqueado]}>
              <Text style={[styles.badgeIcono, !desbloqueado && styles.bloqueadoTexto]}>{desbloqueado ? badge.icono : '🔒'}</Text>
              <Text style={[styles.badgeNombre, !desbloqueado && styles.bloqueadoTexto]} numberOfLines={2}>{badge.name}</Text>
              {!desbloqueado && <Text style={styles.condicionTexto} numberOfLines={2}>{badge.descripcion}</Text>}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 }, progressRow: { marginBottom: 12 }, progressTexto: { color: '#888', fontSize: 12, marginBottom: 6 },
  progressBarra: { height: 4, backgroundColor: '#222', borderRadius: 2, overflow: 'hidden' }, progressFill: { height: '100%', backgroundColor: '#F59E0B', borderRadius: 2 },
  grilla: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  badgeItem: { width: '30%', backgroundColor: '#1A1A1A', borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 1 },
  badgeBloqueado: { borderColor: '#222', opacity: 0.5 }, badgeIcono: { fontSize: 28, marginBottom: 6 }, bloqueadoTexto: { opacity: 0.4 },
  badgeNombre: { color: '#fff', fontSize: 11, textAlign: 'center', fontWeight: '600' }, condicionTexto: { color: '#555', fontSize: 9, textAlign: 'center', marginTop: 4 },
});
