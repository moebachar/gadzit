import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1S3iqqYu8bLnALHFKMn8EjFZr9SYGaXk",
  authDomain: "gadzit-e77ff.firebaseapp.com",
  projectId: "gadzit-e77ff",
  storageBucket: "gadzit-e77ff.appspot.com",
  messagingSenderId: "212398414038",
  appId: "1:212398414038:web:70113b8f773410d1e91177",
  measurementId: "G-17PCKDN00Z",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
