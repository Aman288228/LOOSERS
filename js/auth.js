import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "./firebase.js";

let currentUser = null;

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

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    console.log("Logged In:", user.email);
  } else {
    currentUser = null;
    console.log("No User Logged In");
  }
});
