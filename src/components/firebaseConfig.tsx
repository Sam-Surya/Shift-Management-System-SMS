// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCf1pfE1hK-qXCWTfnTXYYuLP16azjtyRk",
  authDomain: "esms-ee6b4.firebaseapp.com",
  databaseURL: "https://esms-ee6b4-default-rtdb.firebaseio.com",
  projectId: "esms-ee6b4",
  storageBucket: "esms-ee6b4.appspot.com",
  messagingSenderId: "539123610661",
  appId: "1:539123610661:web:df4df01adf16318306bbcc",
  measurementId: "G-JZXJ1F82Z9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);


export { db, app };