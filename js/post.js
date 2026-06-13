import {
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment
} from "./firebase.js";
async function loadPosts() {
  const postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "posts"));

for (const doc of querySnapshot.docs) {
  const postId = doc.id;
  const post = doc.data();

  postsDiv.innerHTML += `
    <div style="border:1px solid #ccc;padding:10px;margin:10px;">
      <h3>${post.title}</h3>
      <p>${post.content}</p>

      <button onclick="likePost('${postId}')">❤️ ${post.likes || 0}</button>
      <input type="text" id="comment-${postId}" placeholder="Write a comment">
      <button onclick="addComment('${postId}')">💬 Comment</button>

      <div></div>
    </div>
  `;
 }
}
