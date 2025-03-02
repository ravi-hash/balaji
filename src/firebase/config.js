import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyC8eV4qPbETaMPX18a3ZGqXnaJYbR8xuOg",
  authDomain: "balajii-b7919.firebaseapp.com",
  projectId: "balajii-b7919",
  storageBucket: "balajii-b7919.appspot.com",
  messagingSenderId: "968238605726",
  appId: "1:968238605726:web:a72aaa8f83807f4bf2e28f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
