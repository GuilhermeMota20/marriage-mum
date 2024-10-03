import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebase = initializeApp({
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
  // measurementId: process.env.FIREBASE_MEASUREMENT_ID
  apiKey: "AIzaSyCGcWGxu7k1EJ2d2mX2-ZnSpRjVK48P2YM",
  authDomain: "marriage-mum.firebaseapp.com",
  projectId: "marriage-mum",
  storageBucket: "marriage-mum.appspot.com",
  messagingSenderId: "840604000883",
  appId: "1:840604000883:web:f76fb755113d3094510006",
  measurementId: "G-E2Q0WSSRBY"
});

const db = getFirestore(firebase);

export { db };
