import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "./firebase.js";

let currentUser = null;
let currentStep = 1;
document.getElementById("signupBtn").onclick = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    document.getElementById("msg").innerText = "Signup Successful!";
    document.getElementById("authModal").style.display = "none";
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
    document.getElementById("authModal").style.display = "none";
  } catch (e) {
    document.getElementById("msg").innerText = e.message;
  }
};
document.getElementById("closeModal").onclick = () => {
  document.getElementById("authModal").style.display = "none";
};
onAuthStateChanged(auth, (user) => {
  const modal = document.getElementById("authModal");

  if (user) {
    currentUser = user;
    console.log("Logged In:", user.email);

    modal.style.display = "none";
  } else {
    currentUser = null;
    console.log("No User Logged In");

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  }
});
const signupForm = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

document.getElementById("switchText").onclick = () => {

  if (emailInput) emailInput.style.display = "none";
  if (passwordInput) passwordInput.style.display = "none";

  if (loginBtn) loginBtn.style.display = "none";
  if (signupBtn) signupBtn.style.display = "none";

  if (signupForm) signupForm.style.display = "block";
};
document.getElementById("createAccount").onclick = async () => {
  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPassword").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);

   
  document.getElementById("signupForm").style.display = "none";
document.getElementById("authModal").style.display = "flex";

document.getElementById("email").value = "";
document.getElementById("password").value = "";

document.getElementById("msg").innerText =
  "Account Created Successfully! Now login.";
  } catch (e) {
    alert(e.message);
  }
};
document.getElementById("authTitle").onclick = () => {
  document.getElementById("signupForm").style.display = "none";

  document.getElementById("loginBtn").style.display = "block";
  document.getElementById("signupBtn").style.display = "block";
};

