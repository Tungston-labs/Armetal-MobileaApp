// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging"; // for FCM (web), skip if not needed
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB3F1Fjwbqm457t7WddBYevuTyi2dlJvKo",
  authDomain: "armetalbackend.firebaseapp.com",
  projectId: "armetalbackend",
  storageBucket: "armetalbackend.firebasestorage.app",
  messagingSenderId: "221301373874",
  appId: "1:221301373874:android:095686831e0c2e753902ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
