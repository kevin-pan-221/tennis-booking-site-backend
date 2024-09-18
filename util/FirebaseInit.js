// In this file we will initialize our firebase database

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWrzsW3GD9V9ULch6xZuw5o1T4JqbxYb8",
  authDomain: "eventregistration-a93d7.firebaseapp.com",
  projectId: "eventregistration-a93d7",
  storageBucket: "eventregistration-a93d7.appspot.com",
  messagingSenderId: "70408265571",
  appId: "1:70408265571:web:1a1ade401da5fda7407d56",
  measurementId: "G-YD6C2DEQ24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
