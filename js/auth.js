import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  doc,
  setDoc,
  serverTimestamp
} from "./firebase.js";

let currentUser = null;
let currentStep = 1;

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
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const backToLogin = document.getElementById("backToLogin");

document.getElementById("switchText").onclick = () => {
  loginForm.style.display = "none";
  signupForm.style.display = "block";
};
document.getElementById("createAccount").onclick = async () => {
  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPassword").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
const user = auth.currentUser;

await setDoc(doc(db, "users", user.uid), {
  name,
  username,
  email,
  createdAt: serverTimestamp()
});
   
 signupForm.style.display = "none";
loginForm.style.display = "block";

document.getElementById("newEmail").value = "";
document.getElementById("newPassword").value = "";
document.getElementById("name").value = "";
document.getElementById("username").value = "";

document.getElementById("email").value = email;
document.getElementById("password").value = "";

document.getElementById("msg").style.color = "green";
document.getElementById("msg").innerText =
  "✅ Account created successfully. Please enter your password to login.";
  } catch (e) {
    alert(e.message);
  }
};
document.getElementById("authTitle").onclick = () => {
  document.getElementById("signupForm").style.display = "none";

  document.getElementById("loginBtn").style.display = "block";
  document.getElementById("signupBtn").style.display = "block";
};
backToLogin.onclick = () => {
  signupForm.style.display = "none";
  loginForm.style.display = "block";
};
