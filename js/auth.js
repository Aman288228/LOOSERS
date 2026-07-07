import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  doc,
  setDoc,
  serverTimestamp,
  signOut
} from "./firebase.js";

// ----------------------
// DOM Elements
// ----------------------

const authModal = document.getElementById("authModal");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

const switchText = document.getElementById("switchText");
const backToLogin = document.getElementById("backToLogin");
const closeModal = document.getElementById("closeModal");

const msg = document.getElementById("msg");

const name = document.getElementById("name");
const username = document.getElementById("username");
const newEmail = document.getElementById("newEmail");
const newPassword = document.getElementById("newPassword");

const createAccountBtn = document.getElementById("createAccount");

// ----------------------
// Current User
// ----------------------

let currentUser = null;

// ----------------------
// Login
// ----------------------

loginBtn.onclick = async () => {

  msg.innerText = "";

  try {

    await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    msg.style.color = "green";
    msg.innerText = "Login Successful";

    authModal.style.display = "none";

  } catch (e) {

    msg.style.color = "red";
    msg.innerText = e.message;

  }

};

// ----------------------
// Auth State
// ----------------------

onAuthStateChanged(auth, (user) => {

  currentUser = user;

 if (user) {

  console.log("Logged In:", user.email);

  currentUser = user;

  authModal.style.display = "none";
   document.getElementById("loginTopBtn").style.display = "none";
document.getElementById("profileArea").style.display="block";
document.getElementById("userName").innerText = user.email.split("@")[0];

  document.getElementById("profileMenu").style.display = "block";

} else {

  console.log("No User Logged In");

  currentUser = null;

  document.getElementById("profileMenu").style.display = "none";
   document.getElementById("loginTopBtn").style.display = "inline-block";
document.getElementById("profileArea").style.display="none";

}

});
// ----------------------
// Login ↔ Signup Switch
// ----------------------

switchText.onclick = () => {

  msg.innerText = "";

  loginForm.style.display = "none";
  signupForm.style.display = "block";

};

backToLogin.onclick = () => {

  signupForm.style.display = "none";
  loginForm.style.display = "block";

};

// ----------------------
// Create Account
// ----------------------

createAccountBtn.onclick = async () => {

  msg.innerText = "";

  const fullName = name.value.trim();
  const userName = username.value.trim();
  const userEmail = newEmail.value.trim();
  const userPassword = newPassword.value;

  if (
    !fullName ||
    !userName ||
    !userEmail ||
    !userPassword
  ) {

    alert("Please fill all fields.");
    return;

  }

  try {

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {

      name: fullName,
      username: userName,
      email: userEmail,
      createdAt: serverTimestamp()

    });

    signupForm.style.display = "none";
    loginForm.style.display = "block";

    email.value = userEmail;
    password.value = "";

    name.value = "";
    username.value = "";
    newEmail.value = "";
    newPassword.value = "";

    msg.style.color = "green";
    msg.innerText =
      "Account created successfully. Please login.";

  } catch (e) {

    msg.style.color = "red";
    msg.innerText = e.message;

  }

};
// ----------------------
// Close Modal
// ----------------------

closeModal.onclick = () => {

  authModal.style.display = "none";

};

// ----------------------
// Reset Forms
// ----------------------

function resetSignupForm() {

  name.value = "";
  username.value = "";
  newEmail.value = "";
  newPassword.value = "";

}

function showLoginForm() {

  signupForm.style.display = "none";
  loginForm.style.display = "block";

}

function showSignupForm() {

  loginForm.style.display = "none";
  signupForm.style.display = "block";

}
// ===== Profile Dropdown =====

const profileArea = document.getElementById("profileArea");
const userBox = document.getElementById("userBox");
const profileDropdown = document.getElementById("profileDropdown");
const logoutBtn = document.getElementById("logoutBtn");

userBox.onclick = () => {

    if(profileDropdown.style.display==="block"){

        profileDropdown.style.display="none";

    }else{

        profileDropdown.style.display="block";

    }

};

document.onclick=(e)=>{

    if(!profileArea.contains(e.target)){

        profileDropdown.style.display="none";

    }

};

logoutBtn.onclick=async()=>{

    await signOut(auth);

};
