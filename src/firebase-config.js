import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwEjFZl5dNi2fXAmzU3dEuqp3a0Y-PS60",
  authDomain: "blogpost-da6eb.firebaseapp.com",
  projectId: "blogpost-da6eb",
  storageBucket: "blogpost-da6eb.appspot.com",
  messagingSenderId: "733422056760",
  appId: "1:733422056760:web:186df7f18c1cf176fb3dcd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
