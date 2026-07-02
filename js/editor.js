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
const user = auth.currentUser;

if (!user) {
  alert("Please login first.");
  return;
}

const userDoc = await getDoc(doc(db, "users", user.uid));
const userData = userDoc.data();

console.log("User Data:", userData);
console.log("Name:", userData.name);
console.log("Username:", userData.username);

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
