
// Placeholder for any future JavaScript interactivity
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDq1hGnqyBw9ZMcbzXTbsJ3XylQt8lsiy8",
  authDomain: "team-10-portfolio.firebaseapp.com",
  projectId: "team-10-portfolio",
  storageBucket: "team-10-portfolio.appspot.com",
  messagingSenderId: "148788923582",
  appId: "1:148788923582:web:f09cda649411145fc6e2ef",
  measurementId: "G-1NQTGBVDVD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);