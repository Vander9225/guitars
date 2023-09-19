import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD9acNdDwMxkXEjCsGlJcNRzbn1ieovmHA",
    authDomain: "marvel-ca054.firebaseapp.com",
    projectId: "marvel-ca054",
    storageBucket: "marvel-ca054.appspot.com",
    messagingSenderId: "251041339247",
    appId: "1:251041339247:web:9f68528977ee4d07457a9a",
    measurementId: "G-9BYD2MLTJ6"
  };

 

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const auth = getAuth(app);

export default db as Firestore;

