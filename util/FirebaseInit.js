// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTOaFgSUMxkE4osJ6_cOABbdWm0jNW7QE",
  authDomain: "fsab-tennis-booking.firebaseapp.com",
  projectId: "fsab-tennis-booking",
  storageBucket: "fsab-tennis-booking.appspot.com",
  messagingSenderId: "726581489803",
  appId: "1:726581489803:web:0abf0dfa6b65daec4fa48e",
  measurementId: "G-TD8F15ED5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);