import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Client, Storage } from "appwrite"; // Import Appwrite SDK

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyB4psSpgVEUmMvkrPzKxYvc2Q526gfQ-JU",
  authDomain: "balaji-b711b.firebaseapp.com",
  projectId: "balaji-b711b",
  storageBucket: "balaji-b711b.firebasestorage.app",
  messagingSenderId: "196444199725",
  appId: "1:196444199725:web:19fd8aa042ec97fa2e11a4",
  measurementId: "G-G5WB3Q68LC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Appwrite Config
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite Endpoint
  .setProject("67cd705d00240a4d87ee"); // Appwrite Project ID

export const storage = new Storage(client);

export default app;
