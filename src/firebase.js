// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCDDKwSE6pMPDJABZ0RKxFX1BxaWT7gBTs",
	authDomain: "keybored-mu.firebaseapp.com",
	projectId: "keybored-mu",
	storageBucket: "keybored-mu.appspot.com",
	messagingSenderId: "600487496004",
	appId: "1:600487496004:web:2b206e47cbe9487167af11",
	measurementId: "G-SRVNMD9PTN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account ",
});
export const auth = getAuth(app);
export const signInWithGooglePopUp = () => {
	signInWithPopup(auth, provider);
};
export const db = getFirestore(app);
