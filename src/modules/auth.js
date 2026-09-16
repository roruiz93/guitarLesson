import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged as fbOnAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase.js';

/** Gestión de autenticación con Firebase Auth y persistencia en Firestore */
export class AuthModule {
  constructor() {
    this._currentUser = JSON.parse(localStorage.getItem('gp_user') || 'null');
  }

  /**
   * Crea un nuevo usuario y su documento en Firestore
   * @param {string} email
   * @param {string} password
   */
  async signUp(email, password) {
    this._validateEmail(email);
    this._validatePassword(password);

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', cred.user.uid), {
        email,
        plan: 'free',
        xp: 0,
        streak: 0,
        createdAt: serverTimestamp(),
        lessonsCompleted: [],
        badges: [],
      });
      this._persistUser(cred.user);
      window.dispatchEvent(new CustomEvent('auth:login', { detail: cred.user }));
      return cred.user;
    } catch (err) {
      window.dispatchEvent(new CustomEvent('auth:error', { detail: err }));
      throw this._mapError(err);
    }
  }

  /**
   * Autentica un usuario existente
   * @param {string} email
   * @param {string} password
   */
  async signIn(email, password) {
    this._validateEmail(email);
    this._validatePassword(password);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      this._persistUser(cred.user);
      window.dispatchEvent(new CustomEvent('auth:login', { detail: cred.user }));
      return cred.user;
    } catch (err) {
      window.dispatchEvent(new CustomEvent('auth:error', { detail: err }));
      throw this._mapError(err);
    }
  }

  async signOut() {
    await fbSignOut(auth);
    localStorage.removeItem('gp_user');
    this._currentUser = null;
    window.dispatchEvent(new CustomEvent('auth:logout'));
  }

  /** @param {function} callback - Recibe user o null */
  onAuthStateChanged(callback) {
    return fbOnAuthStateChanged(auth, (user) => {
      this._currentUser = user;
      if (user) this._persistUser(user);
      else localStorage.removeItem('gp_user');
      callback(user);
    });
  }

  getCurrentUser() {
    return auth.currentUser || this._currentUser;
  }

  isAuthenticated() {
    return !!this.getCurrentUser();
  }

  _validateEmail(email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Email no válido');
    }
  }

  _validatePassword(password) {
    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
  }

  _persistUser(user) {
    this._currentUser = user;
    localStorage.setItem('gp_user', JSON.stringify({ uid: user.uid, email: user.email }));
  }

  _mapError(err) {
    const map = {
      'auth/email-already-in-use': 'Este email ya está registrado',
      'auth/invalid-email': 'Email no válido',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
    };
    return new Error(map[err.code] || err.message);
  }
}
