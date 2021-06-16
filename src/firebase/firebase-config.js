import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBF9pDkEiXFUm-h8hDDmQyg1VL0oqIKHP0",
  authDomain: "react-app-curso-ar.firebaseapp.com",
  projectId: "react-app-curso-ar",
  storageBucket: "react-app-curso-ar.appspot.com",
  messagingSenderId: "62715933500",
  appId: "1:62715933500:web:77fd6325c1eb5676f7e439"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };