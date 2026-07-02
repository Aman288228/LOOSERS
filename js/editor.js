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

  const title = document.getElementById("blogTitle").value.trim();
  const category = document.getElementById("blogCategory").value;
  const tags = document.getElementById("blogTags").value.trim();
  const content = document.getElementById("blogContent").value.trim();

  if (!title || !category || !content) {
    alert("Please fill all required fields.");
    return;
  }

  const user = auth.currentUser;
const userDoc = await getDoc(doc(db, "users", user.uid));

const userData = userDoc.data();
  if (!user) {
    alert("Please login first.");
    return;
  }

  try {

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

    alert("🎉 Blog Published Successfully!");

    document.getElementById("blogTitle").value = "";
    document.getElementById("blogCategory").value = "";
    document.getElementById("blogTags").value = "";
    document.getElementById("blogContent").value = "";

    editorModal.style.display = "none";

  } catch (e) {

    alert(e.message);

  }

};
