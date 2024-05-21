import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAbSluBBmWgIO-YHTlrjs1HdRni0Dlwuqo",
    authDomain: "e-commerce-86151.firebaseapp.com",
    projectId: "e-commerce-86151",
    storageBucket: "e-commerce-86151.appspot.com",
    messagingSenderId: "316898078466",
    appId: "1:316898078466:web:30202ef6b7666cabe6dc1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
