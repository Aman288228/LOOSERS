import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
  query,
  where
} from "./firebase.js";
let currentUser = null;



/*document.getElementById("postBtn").onclick = async () => {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  try {
   await addDoc(collection(db, "posts"), {
  title: title,
  content: content,
  likes: 0,
  createdAt: new Date()
});

    document.getElementById("postMsg").innerText =
      "Post Published Successfully!";
    loadPosts();
  } catch (e) {
    document.getElementById("postMsg").innerText = e.message;
  }
}; */


loadPosts();



import "./auth.js";
import "./posts.js";
import "./ui.js";
