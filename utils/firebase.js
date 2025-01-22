import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA7VoPGz0GnMUMP9vdn3kvKOC12IHf3O0",
  authDomain: "mzito-bet.firebaseapp.com",
  databaseURL: "https://mzito-bet-default-rtdb.firebaseio.com",
  projectId: "mzito-bet",
  storageBucket: "mzito-bet.firebasestorage.app",
  messagingSenderId: "746818195882",
  appId: "1:746818195882:web:1af1609498d57d6500dbd3",
  measurementId: "G-3CZ9YQWLFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { app, analytics, firestore };