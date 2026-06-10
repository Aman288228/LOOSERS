import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, increment, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyD0apa8kCYrCn7C2XvJQ4VlY4kTNQKqnlM",
  authDomain: "sagarsocial-93251.firebaseapp.com",
  projectId: "sagarsocial-93251",
  storageBucket: "sagarsocial-93251.firebasestorage.app",
  messagingSenderId: "967483981455",
  appId: "1:967483981455:web:6d3fcca8556b5f22247afa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
document.getElementById("signupBtn").onclick = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    document.getElementById("msg").innerText = "Signup Successful!";
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
  } catch (e) {
    document.getElementById("msg").innerText = e.message;
  }
};
document.getElementById("postBtn").onclick = async () => {
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
};
async function loadPosts() {
  const postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "posts"));

  querySnapshot.forEach((doc) => {
    const postId = doc.id;
    const post = doc.data();
    const commentsQuery = query(
  collection(db, "comments"),
  where("postId", "==", postId)
);

const commentsSnapshot = await getDocs(commentsQuery);

let commentsHTML = "";

commentsSnapshot.forEach((commentDoc) => {
  commentsHTML += `<p>💬 ${commentDoc.data().text}</p>`;
});

    postsDiv.innerHTML += `
      <div style="border:1px solid #ccc;padding:10px;margin:10px;">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
      
        <button onclick="likePost('${postId}')">❤️ ${post.likes || 0}</button>
        <input type="text" id="comment-${postId}" placeholder="Write a comment">
<button onclick="addComment('${postId}')">💬 Comment</button>

<div>${commentsHTML}</div>
      </div>
    `;
  });
}

loadPosts();
window.likePost = async function(postId) {
  const postRef = doc(db, "posts", postId);

  await updateDoc(postRef, {
    likes: increment(1)
  });

  loadPosts();
}
document.getElementById("logoutBtn").onclick = async () => {
  await signOut(auth);
  document.getElementById("msg").innerText = "Logged Out!";
};
window.addComment = async function(postId) {

  const text =
    document.getElementById(`comment-${postId}`).value;

  if (!text) {
    alert("Comment likho");
    return;
  }

  await addDoc(collection(db, "comments"), {
    postId: postId,
    text: text
  });

  alert("Comment Added!");
}
