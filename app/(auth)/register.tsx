import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';

export default function RegisterScreen() {
  const { signUp, isLoading, error, clearError } = useAuth();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleRegister = async () => {
    setLocalError('');
    clearError();
    if (!nombre || !email || !password) { setLocalError('Completá todos los campos.'); return; }
    if (password.length < 6) { setLocalError('La contraseña debe tener al menos 6 caracteres.'); return; }
    if (password !== confirmPassword) { setLocalError('Las contraseñas no coinciden.'); return; }
    await signUp(email.trim(), password, nombre.trim());
  };

  const displayError = localError || error;
  const isValid = nombre && email && password && confirmPassword && !isLoading;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">
          <Text style={styles.logo}>🎸</Text>
          <Text style={styles.titulo}>Crear cuenta</Text>
          <Text style={styles.subtitulo}>Empezá a aprender guitarra hoy</Text>

          <View style={styles.form}>
            <TextInput style={styles.input} placeholder="Nombre" placeholderTextColor="#555" value={nombre} onChangeText={setNombre} autoCapitalize="words" />
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#555" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
            <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor="#555" value={password} onChangeText={setPassword} secureTextEntry />
            <TextInput style={styles.input} placeholder="Confirmar contraseña" placeholderTextColor="#555" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

            {displayError && <Text style={styles.error}>{displayError}</Text>}

            <TouchableOpacity style={[styles.boton, !isValid && styles.botonDisabled]} onPress={handleRegister} disabled={!isValid}>
              {isLoading ? <ActivityIndicator color="#000" /> : <Text style={styles.botonTexto}>Crear cuenta gratis</Text>}
            </TouchableOpacity>

            <View style={styles.loginRow}>
              <Text style={styles.loginTexto}>¿Ya tenés cuenta? </Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity><Text style={styles.loginLink}>Iniciá sesión</Text></TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  inner: { justifyContent: 'center', paddingHorizontal: 32, paddingVertical: 48 },
  logo: { fontSize: 56, textAlign: 'center', marginBottom: 8 },
  titulo: { color: '#fff', fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  subtitulo: { color: '#666', fontSize: 14, textAlign: 'center', marginBottom: 36, marginTop: 8 },
  form: { gap: 12 },
  input: { backgroundColor: '#1A1A1A', color: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, borderWidth: 1, borderColor: '#2A2A2A' },
  error: { color: '#EF4444', fontSize: 13, textAlign: 'center' },
  boton: { backgroundColor: '#F59E0B', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 4 },
  botonDisabled: { opacity: 0.4 },
  botonTexto: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  loginTexto: { color: '#666', fontSize: 14 },
  loginLink: { color: '#F59E0B', fontSize: 14, fontWeight: '600' },
});
