# Guitar+

App móvil para aprender guitarra con detección de notas en tiempo real, lecciones por niveles, afinador, leaderboard y suscripciones via RevenueCat.

## Stack

- **Expo / React Native** con Expo Router
- **Firebase** (Auth, Firestore, Storage, Functions)
- **RevenueCat** para suscripciones in-app
- **Spotify Web API** para reproducción de canciones
- **Google AdMob** para monetización LITE

## Setup

```bash
npm install
cp .env.example .env
# Completar variables en .env
npx expo start
```

## Estructura

```
app/          # Rutas Expo Router
src/
  components/ # Componentes reutilizables
  screens/    # Pantallas completas
  hooks/      # Custom hooks
  services/   # Firebase, Spotify, RevenueCat, AdMob
  utils/      # Detector de pitch (YIN), progreso
  types/      # TypeScript types
  config/     # Firebase init
  context/    # AuthContext
  constants/  # Badges, etc.
functions/    # Cloud Functions Node 20
```
