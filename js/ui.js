console.log("UI Loaded");
const writeBlogBtn = document.getElementById("writeBlogBtn");
const authModal = document.getElementById("authModal");

writeBlogBtn.onclick = () => {
  authModal.style.display = "flex";
};
