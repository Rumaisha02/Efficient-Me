// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config (get it from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyD0G_JLvaf-LMnOVrJ0cLUct6NqG0ZrnIw",
  authDomain: "study-site-1c85d.firebaseapp.com",
  projectId: "study-site-1c85d",
  storageBucket: "study-site-1c85d.firebasestorage.app",
  messagingSenderId: "182015092307",
  appId: "1:182015092307:web:935a77e4e72b412dbac8a6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export { auth, googleProvider };
// export default app;
