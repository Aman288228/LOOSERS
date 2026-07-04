import {
  auth,
  db,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc
} from "./firebase.js";

const publishBtn = document.getElementById("publishBlog");
const editorModal = document.getElementById("editorModal");

publishBtn.onclick = async () => {

  // ==========================
  // Get Blog Data
  // ==========================

  const title = document.getElementById("blogTitle").value.trim();
  const category = document.getElementById("blogCategory").value;
  const tags = document.getElementById("blogTags").value.trim();
  const content = document.getElementById("blogContent").value.trim();

  if (!title || !category || !content) {
    alert("Please fill all required fields.");
    return;
  }

  // ==========================
  // Check Login
  // ==========================

  const user = auth.currentUser;

  if (!user) {
    alert("Please login first.");
    return;
  }

  try {

    // ==========================
    // Get User Data
    // ==========================

    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      alert("User profile not found.");
      return;
    }

    const userData = userDoc.data();

    console.log("User Data:", userData);

    // ==========================
    // Save Blog
    // ==========================

    await addDoc(collection(db, "posts"), {

      title,
      content,
      category,

      tags: tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag !== ""),

      authorId: user.uid,
      authorEmail: user.email,

      authorName: userData.name,
      authorUsername: userData.username,

      likes: 0,
      comments: 0,
      views: 0,

      createdAt: serverTimestamp()

    });

    // ==========================
    // Success
    // ==========================

    alert("🎉 Blog Published Successfully!");

    document.getElementById("blogTitle").value = "";
    document.getElementById("blogCategory").value = "";
    document.getElementById("blogTags").value = "";
    document.getElementById("blogContent").value = "";

    editorModal.style.display = "none";

  } catch (e) {

    console.error(e);

    alert(e.message);

  }

};
