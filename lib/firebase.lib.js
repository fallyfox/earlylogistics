import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getApp,getApps } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "earlylogistics-77fa3.firebaseapp.com",
  projectId: "earlylogistics-77fa3",
  storageBucket: "earlylogistics-77fa3.appspot.com",
  messagingSenderId: "869829883421",
  appId: "1:869829883421:web:84d0d37358d6c455b178f4"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { db,storage }