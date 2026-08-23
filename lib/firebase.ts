import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Firebase Web configuration is public client configuration. Access control is
// enforced by Firebase Authentication and your Firebase security rules.
const firebaseConfig = {
  apiKey: 'AIzaSyAsZx8nnarMC9NLUQ5BHVwZsGfOPMgt2g',
  authDomain: 'neempure.firebaseapp.com',
  projectId: 'neempure',
  storageBucket: 'neempure.firebasestorage.app',
  messagingSenderId: '1053122682059',
  appId: '1:1053122682059:web:6727ff26c2964ad9b70f4e',
  measurementId: 'G-KP4SX0SMLY',
}

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
