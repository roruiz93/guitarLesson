import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, User, AuthError } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { UserData, NivelUsuario } from '../types';

interface AuthState { user: User | null; userData: UserData | null; isLoading: boolean; error: string | null; }
interface AuthContextValue extends AuthState { signUp: (email: string, password: string, nombre: string) => Promise<void>; signIn: (email: string, password: string) => Promise<void>; signOut: () => Promise<void>; clearError: () => void; }
const AuthContext = createContext<AuthContextValue | null>(null);

function getAuthErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    'auth/email-already-in-use': 'Ya existe una cuenta con este email.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/invalid-email': 'El email ingresado no es válido.',
    'auth/user-not-found': 'No existe cuenta con este email.',
    'auth/wrong-password': 'Contraseña incorrecta.',
    'auth/too-many-requests': 'Demasiados intentos. Intentá más tarde.',
    'auth/id-token-expired': 'Sesión expirada. Volvé a iniciar sesión.',
  };
  return messages[code] ?? 'Error de autenticación. Intentá nuevamente.';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) { const snap = await getDoc(doc(db, 'users', firebaseUser.uid)); if (snap.exists()) setUserData(snap.data() as UserData); }
      else setUserData(null);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, nombre: string) => {
    setIsLoading(true); setError(null);
    try {
      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
      const newUserData: UserData = { uid: newUser.uid, email, nombre, nivel: 'principiante' as NivelUsuario, xp: 0, rachaActual: 0, creadoEn: new Date() };
      await setDoc(doc(db, 'users', newUser.uid), { ...newUserData, creadoEn: serverTimestamp(), subscriptionStatus: { plan: 'lite', expira: null, trialActivo: false }, stats: { horasPracticadas: 0, notasCorrectas: 0, notasTotales: 0, accuracyPromedio: 0 } });
      setUserData(newUserData);
    } catch (err) { const authError = err as AuthError; setError(getAuthErrorMessage(authError.code)); throw err; }
    finally { setIsLoading(false); }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true); setError(null);
    try { await signInWithEmailAndPassword(auth, email, password); }
    catch (err) { const authError = err as AuthError; setError(getAuthErrorMessage(authError.code)); throw err; }
    finally { setIsLoading(false); }
  };

  const signOut = async () => { await firebaseSignOut(auth); setUserData(null); };
  const clearError = () => setError(null);

  return <AuthContext.Provider value={{ user, userData, isLoading, error, signUp, signIn, signOut, clearError }}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext debe usarse dentro de AuthProvider');
  return ctx;
}
