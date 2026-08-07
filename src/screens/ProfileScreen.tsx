import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { BadgeShowcase } from '../components/BadgeShowcase';
import { Paywall } from '../components/Paywall';
import { StatsChart } from '../components/StatsChart';
import { AdWrapper } from '../components/AdWrapper';

export default function ProfileScreen() {
  const { user, userData, signOut } = useAuth();
  const { currentPlan, entitlements, daysUntilCancel } = useSubscription();
  const [showPaywall, setShowPaywall] = useState(false);

  const handleSignOut = async () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar sesión', style: 'destructive', onPress: () => signOut() },
    ]);
  };

  const planColor: Record<string, string> = { lite: '#666', pro: '#F59E0B', maestro: '#8B5CF6' };

  return (
    <AdWrapper>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Cabecera perfil */}
          <View style={styles.header}>
            <View style={styles.avatarCirculo}>
              <Text style={styles.avatarLetras}>{(userData?.nombre ?? 'U').charAt(0).toUpperCase()}</Text>
            </View>
            <Text style={styles.nombre}>{userData?.nombre ?? 'Guitarrista'}</Text>
            <Text style={styles.email}>{user?.email ?? ''}</Text>
            <View style={[styles.planBadge, { borderColor: planColor[currentPlan] }]}>
              <Text style={[styles.planTexto, { color: planColor[currentPlan] }]}>{currentPlan.toUpperCase()}</Text>
            </View>
          </View>

          {/* Stats generales */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValor}>{userData?.xp ?? 0}</Text>
              <Text style={styles.statLabel}>XP total</Text>
            </View>
            <View style={styles.statSep} />
            <View style={styles.statItem}>
              <Text style={styles.statValor}>{userData?.rachaActual ?? 0}</Text>
              <Text style={styles.statLabel}>Racha</Text>
            </View>
            <View style={styles.statSep} />
            <View style={styles.statItem}>
              <Text style={styles.statValor}>
                {userData?.nivel ? userData.nivel.charAt(0).toUpperCase() + userData.nivel.slice(1) : '-'}
              </Text>
              <Text style={styles.statLabel}>Nivel</Text>
            </View>
          </View>

          {/* Plan */}
          <View style={styles.seccion}>
            <Text style={styles.seccionTitulo}>Suscripción</Text>
            <View style={styles.planCard}>
              <View>
                <Text style={[styles.planNombre, { color: planColor[currentPlan] }]}>{currentPlan.toUpperCase()}</Text>
                {daysUntilCancel !== null && <Text style={styles.planExpira}>Expira en {daysUntilCancel} días</Text>}
              </View>
              {!entitlements.hasIntermedio && (
                <TouchableOpacity style={styles.upgradeBtn} onPress={() => setShowPaywall(true)}>
                  <Text style={styles.upgradeBtnTexto}>Mejorar plan</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Grafico semanal */}
          <View style={styles.seccion}>
            <Text style={styles.seccionTitulo}>Actividad semanal</Text>
            <StatsChart />
          </View>

          {/* Badges */}
          {user && (
            <View style={styles.seccion}>
              <Text style={styles.seccionTitulo}>Logros</Text>
              <BadgeShowcase userId={user.uid} />
            </View>
          )}

          {/* Cerrar sesion */}
          <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
            <Text style={styles.signOutTexto}>Cerrar sesión</Text>
          </TouchableOpacity>
        </ScrollView>

        <Paywall visible={showPaywall} onClose={() => setShowPaywall(false)} />
      </SafeAreaView>
    </AdWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  header: { alignItems: 'center', padding: 24, paddingBottom: 16 },
  avatarCirculo: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1A1A1A', justifyContent: 'center', alignItems: 'center', marginBottom: 12, borderWidth: 2, borderColor: '#F59E0B' },
  avatarLetras: { color: '#F59E0B', fontSize: 32, fontWeight: 'bold' },
  nombre: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  email: { color: '#555', fontSize: 13, marginTop: 4 },
  planBadge: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4, marginTop: 8 },
  planTexto: { fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#1A1A1A', marginHorizontal: 16, borderRadius: 14, padding: 20, borderWidth: 1, borderColor: '#2A2A2A', marginBottom: 20 },
  statItem: { alignItems: 'center' },
  statValor: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  statLabel: { color: '#555', fontSize: 11, marginTop: 2 },
  statSep: { width: 1, backgroundColor: '#2A2A2A' },
  seccion: { marginHorizontal: 16, marginBottom: 24 },
  seccionTitulo: { color: '#888', fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 },
  planCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#2A2A2A' },
  planNombre: { fontSize: 18, fontWeight: 'bold' },
  planExpira: { color: '#666', fontSize: 12, marginTop: 2 },
  upgradeBtn: { backgroundColor: '#F59E0B', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 },
  upgradeBtnTexto: { color: '#000', fontWeight: 'bold', fontSize: 13 },
  signOutBtn: { margin: 16, borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginBottom: 32 },
  signOutTexto: { color: '#EF4444', fontSize: 15 },
});
