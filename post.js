let humburger = document.getElementById("humburger");

let buttonsDiv = document.querySelector(".buttons")
buttonsDiv.classList.add("menuShow")

console.log(buttonsDiv)
humburger.addEventListener("click",()=>{
    buttonsDiv.classList.toggle("menuShow")
})



import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {getFirestore, collection, query, onSnapshot,where  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBqmJ1Uh3wWxWRVOROKqXXyDwuqiYbwnQo",
  authDomain: "saylani-chat-app-ahme.firebaseapp.com",
  projectId: "saylani-chat-app-ahme",
  storageBucket: "saylani-chat-app-ahme.appspot.com",
  messagingSenderId: "609361310049",
  appId: "1:609361310049:web:1ce66754d4563301595520",
  measurementId: "G-HHP7VRJBRY"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



let currentPage = window.location.pathname.split('/').pop();









const blogHead = document.getElementById("post-section");
console.log(blogHead)

let months = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Nov","Dec"]



const loadBlog =()=>{
  const q = query(collection(db, "Blogs"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const Blogs = querySnapshot.docs.map( (docs)=>{
    let blogEl = docs.data()
    
    let date= new Date(blogEl.date);
   
    let day = date.getDate();
   
    let month = months[date.getMonth()];
  
    let years = date.getFullYear();
    
    const formattedTime = `${day}-${month}-${years}`;
   
    console.log(blogEl)


  } ).join(",");

 blogHead.innerHTML = Blogs;

  
  });
}
loadBlog()













const checkLogin2 =()=>{

  onAuthStateChanged(auth, (user) => {
    if (user) {
     
      const uid = user.uid;
      loadBlog(user)
   
    //  user = auth.currentUser;
    console.log(auth.currentUser)
      // ...
    } else {
      // User is signed out
      // ...
    
    }

    
  });
}

checkLogin2()
