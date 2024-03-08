
// --------NAVBAR-------


let humburger = document.getElementById("humburger");

let buttonsDiv = document.querySelector(".buttons")
buttonsDiv && buttonsDiv.classList.add("menuShow")


humburger && humburger.addEventListener("click",()=>{
    buttonsDiv && buttonsDiv.classList.toggle("menuShow")
})

// --------FireBase Initilization-------


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
  import {getFirestore, collection, query, onSnapshot,where ,doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

 
  const firebaseConfig = {
    apiKey: "AIzaSyBqmJ1Uh3wWxWRVOROKqXXyDwuqiYbwnQo",
    authDomain: "saylani-chat-app-ahme.firebaseapp.com",
    projectId: "saylani-chat-app-ahme",
    storageBucket: "saylani-chat-app-ahme.appspot.com",
    messagingSenderId: "609361310049",
    appId: "1:609361310049:web:1ce66754d4563301595520",
    measurementId: "G-HHP7VRJBRY"
  };
  


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let collectData;
let writeBtn = document.getElementById("writeBtn");
let loginBtn = document.getElementById("loginBtn");
let currentPage = window.location.pathname.split('/').pop();

const checkLogin = (e) => {
    e.preventDefault();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            if (currentPage !== "createpost.html") {
                window.location.href = "createpost.html";
            }
        } else {
            window.location.href = "login.html";
            console.log("failed");
        }
    });
};

writeBtn && writeBtn.addEventListener("click", checkLogin);

const blogHead = document.getElementById("postHead");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Nov", "Dec"];

const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + "...";
}
const loadBlog = () => {
    const q = query(collection(db, "Blogs"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let clickPost;
        const Blogs = querySnapshot.docs.map((doc) => {
            const blogEl = doc.data();
            const date = new Date(blogEl.date);
            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();
            const formattedTime = `${day}-${month}-${year}`;
            const truncatedDescription = truncateText(blogEl.description, 100);
            return `
                <div class="post" data-blog-id="${blogEl.id}" id="${doc.id}">
                    <div class="right">
                        <h1>${blogEl.title}</h1>
                        <p id="description-${doc.id}">${truncatedDescription}</p>
                        <button class="read-more">Read More</button>
                        <div class="detail">
                            <p>${blogEl.userName}</p>
                            <p>${formattedTime}</p>
                        </div>
                    </div>
                    <div class="left" style="background-image: url(${blogEl.imageUrl}) "></div>
                </div>`;
        }).join("");
        blogHead.innerHTML = Blogs;

        // Add event listener for each post
        document.querySelectorAll('.post').forEach((post) => {
            post.addEventListener('click', (e) => {
                const clickedBlogID = e.currentTarget.getAttribute('data-blog-id');
                showDetail(clickedBlogID, querySnapshot.docs.map(doc => doc.data()));
            });
        });
    });
};


const showDetail = (clickedBlogID) => {
    const unsub = onSnapshot(doc(db, "Blogs", `${clickedBlogID}`), (doc) => {
        console.log("Current data: ", doc.data());
        // Store clicked blog data in localStorage
        localStorage.setItem('clickedBlogData', JSON.stringify(doc.data()));
        window.location.href = `post.html?id=${clickedBlogID.id}`;
    });
};

const dataCollect = () => {
    // Retrieve stored data from localStorage
    collectData = JSON.parse(localStorage.getItem('clickedBlogData'));
    console.log(collectData);
}
dataCollect();
loadBlog();







let postheading = document.getElementById("post-heading");
postheading.innerHTML=collectData.title;
let postDescription = document.getElementById("post-decription");
postDescription.innerHTML=collectData.description;
let postImage = document.getElementById("post-image");
postImage.src=collectData.imageUrl;
let postType = document.getElementById("post-type");
postType.innerHTML =collectData.typeValue;
let postCategory = document.getElementById("post-category");
postCategory.innerHTML=collectData.option