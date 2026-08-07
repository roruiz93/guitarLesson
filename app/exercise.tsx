import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../src/config/firebase';
import { markAsCompleted } from '../src/services/lessonService';
import { logExerciseResult } from '../src/services/cloudFunctions';
import { useAuth } from '../src/hooks/useAuth';
import ExerciseScreen from '../src/screens/ExerciseScreen';
import { Leccion } from '../src/types';

export default function ExercisePage() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const [leccion, setLeccion] = useState<Leccion | null>(null);

  useEffect(() => {
    if (lessonId) loadLeccion();
  }, [lessonId]);

  const loadLeccion = async () => {
    for (const nivel of ['principiante', 'intermedio', 'avanzado']) {
      const snap = await getDoc(doc(db, 'lessons', nivel, 'lecciones', lessonId));
      if (snap.exists()) {
        setLeccion({ id: snap.id, ...(snap.data() as Omit<Leccion, 'id'>) });
        return;
      }
    }
  };

  const handleComplete = async (accuracy: number, score: number) => {
    if (!user || !leccion) return;
    await Promise.all([
      markAsCompleted(user.uid, leccion.id, accuracy),
      logExerciseResult(user.uid, leccion.id, accuracy),
    ]);
    router.back();
  };

  if (!leccion) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#F59E0B" size="large" />
      </View>
    );
  }

  return <ExerciseScreen leccion={leccion} onComplete={handleComplete} />;
}

const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: '#0D0D0D', justifyContent: 'center', alignItems: 'center' },
});
