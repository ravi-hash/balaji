import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyAZbCokWjMtk0iQA-MwU-LV7yIJOeMAm4U",
  authDomain: "aipower-e323e.firebaseapp.com",
  databaseURL:
    "https://aipower-e323e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aipower-e323e",
  storageBucket: "aipower-e323e.firebasestorage.app",
  messagingSenderId: "642451576660",
  appId: "1:642451576660:web:219567f1ff58a4f9b09ac1",
  measurementId: "G-F8NNX8XX6G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
