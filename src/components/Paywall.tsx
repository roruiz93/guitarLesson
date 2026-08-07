import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ActivityIndicator, Alert } from 'react-native';
import { purchaseSubscription, syncSubscriptionToFirestore } from '../services/subscriptionService';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';

const PLANES = [
  { id: 'lite' as const, nombre: 'LITE', precio: 'Gratis', color: '#666', features: ['Nivel Principiante', '100 canciones Spotify', 'Con publicidad'] },
  { id: 'pro' as const, nombre: 'PRO', precio: '$4.99/mes', color: '#F59E0B', features: ['Principiante + Intermedio', '200 canciones Spotify', 'Sin publicidad', '7 días gratis'] },
  { id: 'maestro' as const, nombre: 'MAESTRO', precio: '$9.99/mes', color: '#8B5CF6', features: ['Todos los niveles', '500+ canciones Spotify', 'Sin publicidad', 'Acceso anticipado'] },
];

export function Paywall({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { user } = useAuth(); const { refresh } = useSubscription();
  const [loadingPlan, setLoadingPlan] = useState<'pro' | 'maestro' | null>(null);

  const handlePurchase = async (plan: 'pro' | 'maestro') => {
    if (!user) return; setLoadingPlan(plan);
    try { const ci = await purchaseSubscription(plan); await syncSubscriptionToFirestore(user.uid, ci); await refresh(); onClose(); }
    catch (err: unknown) { if (err instanceof Error && err.message !== 'Purchase was cancelled.') Alert.alert('Error', 'No se pudo completar la compra.'); }
    finally { setLoadingPlan(null); }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Desbloqueá Guitar+</Text>
          <Text style={styles.subtitulo}>Elegí tu plan y empezá a tocar mejor</Text>
          {PLANES.map(plan => (
            <View key={plan.id} style={[styles.planCard, { borderColor: plan.color }]}>
              <View style={styles.planHeader}><Text style={[styles.planNombre, { color: plan.color }]}>{plan.nombre}</Text><Text style={styles.planPrecio}>{plan.precio}</Text></View>
              {plan.features.map(f => <Text key={f} style={styles.feature}>✓ {f}</Text>)}
              {plan.id !== 'lite' && <TouchableOpacity style={[styles.botonComprar, { backgroundColor: plan.color }]} onPress={() => handlePurchase(plan.id)} disabled={loadingPlan !== null}>{loadingPlan === plan.id ? <ActivityIndicator color="#fff" /> : <Text style={styles.botonTexto}>Empezar 7 días gratis</Text>}</TouchableOpacity>}
            </View>
          ))}
          <TouchableOpacity style={styles.cerrar} onPress={onClose}><Text style={styles.cerrarTexto}>Ahora no</Text></TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  container: { backgroundColor: '#1A1A1A', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  titulo: { color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  subtitulo: { color: '#999', fontSize: 14, textAlign: 'center', marginBottom: 24 },
  planCard: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 16 },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  planNombre: { fontSize: 18, fontWeight: 'bold' }, planPrecio: { color: '#fff', fontSize: 16 },
  feature: { color: '#ccc', fontSize: 13, marginBottom: 4 },
  botonComprar: { borderRadius: 8, padding: 12, marginTop: 12, alignItems: 'center' }, botonTexto: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  cerrar: { alignItems: 'center', paddingVertical: 16 }, cerrarTexto: { color: '#666', fontSize: 14 },
});
