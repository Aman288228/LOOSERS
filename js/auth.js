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
  } else {
    currentUser = null;
    console.log("No User Logged In");
  }
});
document.getElementById("switchText").onclick = () => {
  document.getElementById("authModal").style.display = "none";
  document.getElementById("signupWizard").style.display = "flex";

  resetSignupWizard();
};
document.getElementById("next1").onclick = () => {
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
  currentStep = 2;
};
document.getElementById("next2").onclick = () => {
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "block";
  currentStep = 3;
};

document.getElementById("back1Btn").onclick = () => {
  document.getElementById("step1").style.display = "block";
  document.getElementById("step2").style.display = "none";
  currentStep = 1;
};

document.getElementById("back2Btn").onclick = () => {
  document.getElementById("step2").style.display = "block";
  document.getElementById("step3").style.display = "none";
  currentStep = 2;
};

function resetSignupWizard() {
  currentStep = 1;

  document.getElementById("step1").style.display = "block";
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "none";

  document.getElementById("name").value = "";
  document.getElementById("username").value = "";
  document.getElementById("newEmail").value = "";
  document.getElementById("newPassword").value = "";
}
document.getElementById("createAccount").onclick = async () => {
  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPassword").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);

   document.getElementById("signupWizard").style.display = "none";

setTimeout(() => {
  document.getElementById("authModal").style.display = "flex";
  document.getElementById("msg").innerText = "Account created! Please login now.";
}, 300);
  } catch (e) {
    alert(e.message);
  }
};
