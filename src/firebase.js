// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //apiKey: "AIzaSyDVjLx-NbCCps-yAU-vUhJUuOAC37I9hm8",
  authDomain: "chatterapex.firebaseapp.com",
  projectId: "chatterapex",
  storageBucket: "chatterapex.appspot.com",
  messagingSenderId: "1053461245384",
  appId: "1:1053461245384:web:9aeb7a070471e4c393e4fd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();
