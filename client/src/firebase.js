import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkudVQYwlxsXd7MBtMqhAy6Vdil0eMfi0",
  authDomain: "quizmo-6f845.firebaseapp.com",
  projectId: "quizmo-6f845",
  storageBucket: "quizmo-6f845.firebasestorage.app",
  messagingSenderId: "76250857753",
  appId: "1:76250857753:web:895dba0abd11a443880588",
  measurementId: "G-EMM1NBPQW3",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
