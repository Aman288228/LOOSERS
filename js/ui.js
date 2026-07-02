import { auth } from "./firebase.js";

console.log("UI Loaded");

const writeBlogBtn = document.getElementById("writeBlogBtn");
const authModal = document.getElementById("authModal");

writeBlogBtn.onclick = () => {

  if (auth.currentUser) {

    // User Login Hai
    alert("Blog Editor Open Hoga (Next Step)");

  } else {

    // User Login Nahi Hai
    authModal.style.display = "flex";

  }

};
