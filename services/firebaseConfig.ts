import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLRJdV7rF0DrsUxPW8ME2YKMvje6pspYI",
  authDomain: "desafio-do-deposito.firebaseapp.com",
  projectId: "desafio-do-deposito",
  storageBucket: "desafio-do-deposito.firebasestorage.app",
  messagingSenderId: "966293285153",
  appId: "1:966293285153:web:8cba9c3e64b4af07e9f660",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
