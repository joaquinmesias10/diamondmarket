import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCp9bY5frzAhf4FQzRs_gPhrWAloOVEqLU",
    authDomain: "user-f06f7.firebaseapp.com",
    databaseURL: "https://user-f06f7.firebaseio.com",
    projectId: "user-f06f7",
    storageBucket: "user-f06f7.appspot.com",
    messagingSenderId: "231489865339",
    appId: "1:231489865339:web:9a12041dc136f7801744de",
    measurementId: "G-ZYJ5FF95WF"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
export const auth = firebase.auth();
export const fb_auth = firebase.auth;
export const storage = app.storage();
export const serverTime = firebase.firestore.FieldValue.serverTimestamp();
export const fieldValue = firebase.firestore.FieldValue