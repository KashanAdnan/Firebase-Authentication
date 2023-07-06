const sign_in_btn = document.querySelector('#sign-in-btn');
const sign_up_btn = document.querySelector('#sign-up-btn');
const signUp = document.querySelector("#signup");
const login = document.querySelector("#login");
const container = document.querySelector('.container');

sign_up_btn.addEventListener('click', () => {
	container.classList.add('sign-up-mode');
});

sign_in_btn.addEventListener('click', () => {
	container.classList.remove('sign-up-mode');
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, TwitterAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


const firebaseConfig = {
	apiKey: "AIzaSyCoQQVxzkg6UvyzeUZBKeoaMVf6KwZ7Q2E",
	authDomain: "sign-up-auth-41830.firebaseapp.com",
	projectId: "sign-up-auth-41830",
	storageBucket: "sign-up-auth-41830.appspot.com",
	messagingSenderId: "940762740293",
	appId: "1:940762740293:web:f0ac913befe1e1eeb8152c",
	measurementId: "G-9JFJX70STD"
};

let app = initializeApp(firebaseConfig);

signUp.addEventListener("click", () => {
	const email = document.getElementById("email").value
	const password = document.getElementById("password").value
	const auth = getAuth();
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			alert("Sign Up Success Full ! ")
			localStorage.setItem("token", user.accessToken)
		})
		.catch((error) => {
			const errorMessage = error.message;
			if (errorMessage === "Firebase: Error (auth/invalid-email).") {
				alert("Invalid Email !")
			}
			else if (errorMessage === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
				alert("Password should at least 6 character")
			}
			else if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
				alert("Email is Already Taken.")
			}
			else {
				console.log(errorMessage);
			}
		});
})

login.addEventListener("click", () => {
	const email = document.getElementById("lemail").value
	const password = document.getElementById("lpassword").value
	const auth = getAuth();
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			alert("Login Success Full ! ")
			localStorage.setItem("token", user.accessToken)
		})
		.catch((error) => {
			const errorMessage = error.message;
			if (errorMessage === "Firebase: Error (auth/invalid-email).") {
				alert("Invalid Email !")
			} else {
				console.log(errorMessage);
			}
		});
})


const googleBtn = document.getElementsByClassName("google")
for (let i = 0; i < googleBtn.length; i++) {
	const element = googleBtn[i];
	element.addEventListener("click", () => {
		const provider = new GoogleAuthProvider(app);
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((result) => {
				console.log(result.user);
				window.location.href = "./profile/profile.html"
			}).catch((error) => {
				console.log(error);
			});
	})
}
const githubBtn = document.getElementsByClassName("github")
for (let i = 0; i < githubBtn.length; i++) {
	const element = githubBtn[i];
	element.addEventListener("click", () => {

		const provider = new GithubAuthProvider(app);
		provider.setCustomParameters({
			'allow_signup': 'false'
		});
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((result) => {
				console.log(result.user);
				window.location.href = "./profile/profile.html"
			}).catch((error) => {
				console.log(error);
			});
	})
}
const twitterBtn = document.getElementsByClassName("twitter")
for (let i = 0; i < githubBtn.length; i++) {
	const element = twitterBtn[i];
	element.addEventListener("click", () => {
		const provider = new TwitterAuthProvider(app);
		provider.setCustomParameters({
			'lang': 'es'
		});
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((result) => {
				console.log(result.user);
				window.location.href = "./profile/profile.html"
			}).catch((error) => {
				console.log(error);
			});
	})
}
let analytics = getAnalytics(app);
let auth = getAuth(app);
