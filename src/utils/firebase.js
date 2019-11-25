import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjq6DJFuz5VLu3zE_jf0w1WaKKhlZ5py8",
  authDomain: "bright-ideas-app.firebaseapp.com",
  databaseURL: "https://bright-ideas-app.firebaseio.com",
  projectId: "bright-ideas-app",
  storageBucket: "bright-ideas-app.appspot.com",
  messagingSenderId: "546114857701",
  appId: "1:546114857701:web:4cece9a04278e600af020c",
  measurementId: "G-G2SS0NLCMW"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;