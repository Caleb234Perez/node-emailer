// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_0p6rxOnRFKA96p_9xQAAfTSuuOUKraM",
  authDomain: "peliculassegurasproyecto.firebaseapp.com",
  projectId: "peliculassegurasproyecto",
  storageBucket: "peliculassegurasproyecto.appspot.com",
  messagingSenderId: "867992649311",
  appId: "1:867992649311:web:29e5e7d7d40cfa959765ea",
  measurementId: "G-QFX1CJ5GLV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);