// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";
// import firebase from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app-compat.js";

const firebaseConfig = {
    apiKey: "AIzaSyACZLH4rZY7GWb3kASvwrFNN2PAjP4f17o",
    authDomain: "todo-25fc7.firebaseapp.com",
    projectId: "todo-25fc7",
    storageBucket: "todo-25fc7.appspot.com",
    messagingSenderId: "469677772259",
    appId: "1:469677772259:web:5cdaa1ca74102b9925e4d6",
    measurementId: "G-MMZVQCSF06"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);