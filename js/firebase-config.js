/* ==========================================================
   GILGAL INVESTMENTS — Firebase Configuration & Setup
   ========================================================== */

// Firebase SDK imports (from CDN — no npm needed)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB32Lkf1B_SYbWERBJgVMU65EBeDIOba3Q",
  authDomain: "gilgal-investments.firebaseapp.com",
  projectId: "gilgal-investments",
  storageBucket: "gilgal-investments.firebasestorage.app",
  messagingSenderId: "300184533987",
  appId: "1:300184533987:web:df9ae582e34007dea17ed6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Export for use in other files
export { 
  db, 
  auth,
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};