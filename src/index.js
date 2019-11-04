import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App'

const firebase = require('firebase');
require('firebase/firestore');

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
// Firebase Initialization
firebase.initializeApp(firebaseConfig);
firebase.analytics();


ReactDOM.render(<App/>, document.getElementById('root'));

serviceWorker.unregister();
