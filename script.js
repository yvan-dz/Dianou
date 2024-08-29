// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDf4LJ5Zcv6vE3PC-ntJ7nXjrtXXyhFSy4",
    authDomain: "dianou-8f8f8.firebaseapp.com",
    projectId: "dianou-8f8f8",
    storageBucket: "dianou-8f8f8.appspot.com",
    messagingSenderId: "263519631758",
    appId: "1:263519631758:web:e1b10d57c6f1eeb84dccdf",
    measurementId: "G-9DNC98DW0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function () {
    const commentForm = document.getElementById('newCommentForm');
    const commentList = document.getElementById('commentList');

    // Load comments from Firestore
    async function loadComments() {
        try {
            const querySnapshot = await getDocs(collection(db, "comments"));
            commentList.innerHTML = ''; // Clear existing comments
            querySnapshot.forEach((doc) => {
                displayComment(doc.data());
            });
        } catch (error) {
            console.error("Error loading comments: ", error);
        }
    }

    // Display a comment on the page
    function displayComment(comment) {
        const commentItem = document.createElement('div');
        commentItem.classList.add('comment-item', 'bg-white', 'p-4', 'mb-3', 'rounded', 'shadow-sm');

        let stars = '';
        for (let i = 0; i < comment.rating; i++) {
            stars += '⭐';
        }

        commentItem.innerHTML = `
            <h5>${comment.name}</h5>
            <p>${comment.comment}</p>
            <p class="text-warning">${stars}</p>
        `;

        commentList.appendChild(commentItem);
    }

    // Save a new comment to Firestore
    commentForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const newComment = {
            name: document.getElementById('name').value,
            comment: document.getElementById('comment').value,
            rating: parseInt(document.getElementById('rating').value)
        };

        try {
            await addDoc(collection(db, "comments"), newComment);
            displayComment(newComment); // Display the newly added comment
            commentForm.reset();
        } catch (e) {
            console.error("Error adding comment: ", e);
        }
    });

    // Load comments on page load
    loadComments();
});
