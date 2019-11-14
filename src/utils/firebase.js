import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALTvRAm-tUvTGE5rDWOYs2bLfArDW8WcU",
  authDomain: "note-taking-app-18952.firebaseapp.com",
  databaseURL: "https://note-taking-app-18952.firebaseio.com",
  projectId: "note-taking-app-18952",
  storageBucket: "note-taking-app-18952.appspot.com",
  messagingSenderId: "547358686113",
  appId: "1:547358686113:web:0b92acfceb87816f2329e0",
  measurementId: "G-J0W3WN4WXP"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;