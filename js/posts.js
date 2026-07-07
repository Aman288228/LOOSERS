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
<div class="post-card">

<div class="post-header">

<div>

<strong>👤 Guest User</strong><br>

<small>Just now</small>

</div>

</div>

<h2>${post.title}</h2>
<p class="post-content">
${post.content}
</p>

<div class="post-actions">

<button onclick="likePost('${postId}')">
❤️ ${post.likes || 0}
</button>

<input
id="comment-${postId}"
type="text"
placeholder="Write a comment">

<button onclick="addComment('${postId}')">
💬 Comment
</button>

</div>

<div id="comments-${postId}"></div>

</div>
`;
 }
}
window.likePost = async function(postId) {
  const postRef = doc(db, "posts", postId);

  await updateDoc(postRef, {
    likes: increment(1)
  });

  loadPosts();
}
window.addComment = async function(postId) {

  const text =
    document.getElementById(`comment-${postId}`).value;

  if (!text) {
    alert("Comment likho");
    return;
  };

  await addDoc(collection(db, "comments"), {
    postId: postId,
    text: text
  });

  alert("Comment Added!");
}
loadPosts();
