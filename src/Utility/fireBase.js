

import firebase from "firebase/compat/app";
import "firebase/compat/firestore"; // Corrected import
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT3ssPTB5tSSdo5H8bM16ua5X7KcgnIyY",
  authDomain: "mule-e-2024.firebaseapp.com",
  projectId: "mule-e-2024",
  storageBucket: "mule-e-2024.firebasestorage.app",
  messagingSenderId: "759688961813",
  appId: "1:759688961813:web:a027f8254453496735d31c",
  measurementId: "G-0YTKDG24M7",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore()

