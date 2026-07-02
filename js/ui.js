import { auth } from "./firebase.js";

console.log("UI Loaded");

const writeBlogBtn = document.getElementById("writeBlogBtn");
const authModal = document.getElementById("authModal");

writeBlogBtn.onclick = () => {

if (auth.currentUser) {

    document.getElementById("editorModal").style.display = "flex";


  } else {

    // User Login Nahi Hai
    authModal.style.display = "flex";

  }

};
document.getElementById("closeEditor").onclick = () => {

    document.getElementById("editorModal").style.display = "none";

};
