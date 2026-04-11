import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyC-zp5gQDukQduHBaAXLTDX6Rwo6Z714D4",
  authDomain: "sitetryhardacademy.firebaseapp.com",
  projectId: "sitetryhardacademy",
  storageBucket: "sitetryhardacademy.firebasestorage.app",
  messagingSenderId: "109272024949",
  appId: "1:109272024949:web:7f4c52201427945e0bb53c",
  measurementId: "G-3VV0J6KQX2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
