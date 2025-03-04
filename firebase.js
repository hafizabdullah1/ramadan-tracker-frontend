// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAEyydKoAG7mcCmUSwymxl55Pwog5PBae4",
    authDomain: "ramadan-tracker-v0.firebaseapp.com",
    projectId: "ramadan-tracker-v0",
    storageBucket: "ramadan-tracker-v0.firebasestorage.app",
    messagingSenderId: "838257491386",
    appId: "1:838257491386:web:bc8f205d979ce717d43183"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

export { auth };