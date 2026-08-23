import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Firebase Web configuration is intended to be included in client-side apps.
// Security is enforced by Firebase Authentication/Firestore rules, not by hiding
// these web-app identifiers.
const firebaseConfig = {
  apiKey: 'AIzaSyAsZx8nnarMC9NLUQ5BHVwZsGfOPMgt2g',
  authDomain: 'neempure.firebaseapp.com',
  projectId: 'neempure',
  storageBucket: 'neempure.firebasestorage.app',
  messagingSenderId: '1053122682059',
  appId: '1:1053122682059:web:6746a52c6b40f57db70f4e',
  measurementId: 'G-N2QJH9QDCE0',
}

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
