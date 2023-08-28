import { app } from "./firebase.js";

const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

function googlesignin() {
    auth.signInWithPopup(provider).then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
}

document.getElementById("google").addEventListener("click", googlesignin);