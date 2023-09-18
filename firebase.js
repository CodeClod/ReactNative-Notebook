// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGq0JczeRseOGXMRiCimHmJNDeRBIxQBg",
  authDomain: "myproject-5b24f.firebaseapp.com",
  projectId: "myproject-5b24f",
  storageBucket: "myproject-5b24f.appspot.com",
  messagingSenderId: "786825162567",
  appId: "1:786825162567:web:86bac42e813ed17ab8a662"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app)
export { app, database }