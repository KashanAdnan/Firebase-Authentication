import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, updateProfile, sendEmailVerification, signOut, deleteUser, updateEmail } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCoQQVxzkg6UvyzeUZBKeoaMVf6KwZ7Q2E",
    authDomain: "sign-up-auth-41830.firebaseapp.com",
    projectId: "sign-up-auth-41830",
    storageBucket: "sign-up-auth-41830.appspot.com",
    messagingSenderId: "940762740293",
    appId: "1:940762740293:web:f0ac913befe1e1eeb8152c",
    measurementId: "G-9JFJX70STD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("data").innerHTML = `
        <img width="400px" src=${user.photoURL} />
        <h1>${user.displayName}</h1>
        <h3>${user.email}</h3>
        <div class="butons">
        <button id="logout">Logout</button>
        <button id="show">Update Account</button>
            <button id="delete">Delete Account</button>
            </div>
        `
        document.getElementById("show").addEventListener("click", () => {
            document.querySelector(".update-account").style.display = "flex"
        })
        document.getElementById("delete").addEventListener("click", () => {
            const auth = getAuth();
            const user = auth.currentUser;

            deleteUser(user).then(() => {
                // User deleted.
            }).catch((error) => {
                window.location.href = "../index.html"
                // An error ocurred
                // ...
            });
        })
        document.getElementById("logout").addEventListener("click", () => {
            const auth = getAuth();
            signOut(auth).then(() => {
                window.location.href = "../index.html"
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
            });
        })

    } else {
        console.log("user is signout");
    }
});


document.getElementById("update").addEventListener("click", () => {
    const auth = getAuth();
    updateEmail(auth.currentUser, document.getElementById("email").value).then(() => {
        console.log("Email Updated");
        updateProfile(auth.currentUser, {
            displayName: document.getElementById("name").value, photoURL: document.getElementById("photo").value
        }).then(() => {
            console.log("Profile Updated");
            // Profile updated!
            window.location.reload()

            // ...
        }).catch((error) => {
            console.log(error);
            // An error occurred
            // ...
        });
    }).catch((error) => {
        console.log(error);
        // An error occurred
        // ...
    });

})