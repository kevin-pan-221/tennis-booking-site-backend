// In this file we will initialize our firebase database

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: copy-paste the config variables found in your Firebase Project Settings!
const firebaseConfig = {
	apiKey: "AIzaSyD1E7KXJh11ZZGtbhSLZtxvJZxeheeBS8g",
	authDomain: "my-app-45293.firebaseapp.com",
	projectId: "my-app-45293",
	storageBucket: "my-app-45293.appspot.com",
	messagingSenderId: "970470178876",
	appId: "1:970470178876:web:468921bed7a8acc76bc339",
	measurementId: "G-B3BR3NGELF"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
