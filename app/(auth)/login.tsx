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
} from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';

export default function LoginScreen() {
  const { signIn, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) return;
    clearError();
    await signIn(email.trim(), password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <Text style={styles.logo}>🎸</Text>
        <Text style={styles.titulo}>Guitar+</Text>
        <Text style={styles.subtitulo}>Iniciá sesión para continuar</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#555"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#555"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={[styles.boton, (!email || !password || isLoading) && styles.botonDisabled]}
            onPress={handleLogin}
            disabled={!email || !password || isLoading}
          >
            {isLoading
              ? <ActivityIndicator color="#000" />
              : <Text style={styles.botonTexto}>Iniciar sesión</Text>
            }
          </TouchableOpacity>

          <View style={styles.registroRow}>
            <Text style={styles.registroTexto}>¿No tenés cuenta? </Text>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Text style={styles.registroLink}>Registrate</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  inner: { flex: 1, justifyContent: 'center', paddingHorizontal: 32 },
  logo: { fontSize: 64, textAlign: 'center', marginBottom: 8 },
  titulo: { color: '#fff', fontSize: 32, fontWeight: 'bold', textAlign: 'center' },
  subtitulo: { color: '#666', fontSize: 15, textAlign: 'center', marginBottom: 40, marginTop: 8 },
  form: { gap: 12 },
  input: {
    backgroundColor: '#1A1A1A',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  error: { color: '#EF4444', fontSize: 13, textAlign: 'center' },
  boton: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  botonDisabled: { opacity: 0.4 },
  botonTexto: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  registroRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  registroTexto: { color: '#666', fontSize: 14 },
  registroLink: { color: '#F59E0B', fontSize: 14, fontWeight: '600' },
});
