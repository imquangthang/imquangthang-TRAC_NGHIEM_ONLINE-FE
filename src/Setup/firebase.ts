// Firebase setup for a web application
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDaLMvz3PiGMN8BpJ-cpnEqyplF3x_cfqk",
  authDomain: "quiz-online-326d6.firebaseapp.com",
  databaseURL:
    "https://quiz-online-326d6-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "quiz-online-326d6",
  storageBucket: "quiz-online-326d6.firebasestorage.app",
  messagingSenderId: "267120678946",
  appId: "1:267120678946:web:d95236e28e6006e432127b",
  measurementId: "G-46Q758GMSW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Export the initialized Firebase app and database reference
export { db };
