import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, increment, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyD0apa8kCYrCn7C2XvJQ4VlY4kTNQKqnlM",
  authDomain: "sagarsocial-93251.firebaseapp.com",
  projectId: "sagarsocial-93251",
  storageBucket: "sagarsocial-93251.firebasestorage.app",
  messagingSenderId: "967483981455",
  appId: "1:967483981455:web:6d3fcca8556b5f22247afa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
