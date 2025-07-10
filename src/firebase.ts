import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const VITE_PUBLIC_FIREBASE_CONFIG = import.meta.env.VITE_PUBLIC_FIREBASE_CONFIG;

let firebaseConfig = {}
if(VITE_PUBLIC_FIREBASE_CONFIG) {
    firebaseConfig = JSON.parse(VITE_PUBLIC_FIREBASE_CONFIG);
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, GoogleAuthProvider, signInWithPopup };