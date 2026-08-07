import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Share } from 'react-native';
import { Badge } from '../types';
import { RARITY_COLORS } from '../constants/badges.const';

export function BadgeUnlockedModal({ badge, onClose }: { badge: Badge | null; onClose: () => void }) {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (badge) { Animated.parallel([Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 100 }), Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true })]).start(); }
    else { scaleAnim.setValue(0.5); opacityAnim.setValue(0); }
  }, [badge]);
  if (!badge) return null;
  const color = RARITY_COLORS[badge.rarity];
  const handleShare = async () => { await Share.share({ message: `Desbloqueé el logro "${badge.name}" ${badge.icono} en Guitar+! 🎸` }); };
  return (
    <Modal visible={!!badge} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[styles.card, { borderColor: color, opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.subtitulo}>Logro desbloqueado</Text>
          <Text style={styles.icono}>{badge.icono}</Text>
          <Text style={[styles.nombre, { color }]}>{badge.name}</Text>
          <Text style={styles.descripcion}>{badge.descripcion}</Text>
          <View style={[styles.rarityBadge, { backgroundColor: color + '22', borderColor: color }]}><Text style={[styles.rarityTexto, { color }]}>{badge.rarity.toUpperCase()}</Text></View>
          <TouchableOpacity style={[styles.botonCompartir, { borderColor: color }]} onPress={handleShare}><Text style={[styles.botonCompartirTexto, { color }]}>Compartir en redes</Text></TouchableOpacity>
          <TouchableOpacity style={styles.botonCerrar} onPress={onClose}><Text style={styles.botonCerrarTexto}>Continuar</Text></TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#1A1A1A', borderRadius: 20, padding: 32, width: '80%', alignItems: 'center', borderWidth: 1 },
  subtitulo: { color: '#888', fontSize: 13, marginBottom: 16 }, icono: { fontSize: 64, marginBottom: 12 },
  nombre: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' }, descripcion: { color: '#aaa', fontSize: 14, textAlign: 'center', marginBottom: 16 },
  rarityBadge: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4, marginBottom: 24 }, rarityTexto: { fontSize: 11, fontWeight: 'bold' },
  botonCompartir: { borderWidth: 1, borderRadius: 10, paddingVertical: 12, paddingHorizontal: 24, width: '100%', alignItems: 'center', marginBottom: 12 }, botonCompartirTexto: { fontSize: 14, fontWeight: '600' },
  botonCerrar: { paddingVertical: 12, width: '100%', alignItems: 'center' }, botonCerrarTexto: { color: '#666', fontSize: 14 },
});
