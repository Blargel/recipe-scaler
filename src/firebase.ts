import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfuLnL2IoUoqWyx52xF3b1qwAMEKBzChg",
  authDomain: "henry-s-shady-recipe-scaling.firebaseapp.com",
  projectId: "henry-s-shady-recipe-scaling",
  storageBucket: "henry-s-shady-recipe-scaling.appspot.com",
  messagingSenderId: "414451651487",
  appId: "1:414451651487:web:994193a9a8ff10fbe6e3aa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
