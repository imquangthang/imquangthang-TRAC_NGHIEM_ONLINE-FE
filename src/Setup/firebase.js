// Firebase setup for a web application
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBqtuWLDn1DJXMzFWaVCkFSYShAmu83pos",
  authDomain: "healthy-heart-7f60d.firebaseapp.com",
  projectId: "healthy-heart-7f60d",
  storageBucket: "healthy-heart-7f60d.firebasestorage.app",
  messagingSenderId: "575879998029",
  appId: "1:575879998029:web:69a5eb3e528d949df7ca04",
  measurementId: "G-HSQVGB9NP2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Export the initialized Firebase app and database reference
export { app, db };
