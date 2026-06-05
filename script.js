import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

document.getElementById("signupBtn").onclick = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    document.getElementById("msg").innerText = "Signup Successful!";
  } catch (e) {
    document.getElementById("msg").innerText = e.message;
  }
};

document.getElementById("loginBtn").onclick = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    document.getElementById("msg").innerText = "Login Successful!";
  } catch (e) {
    document.getElementById("msg").innerText = e.message;
  }
};
