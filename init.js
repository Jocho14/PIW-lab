// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUklKOldm89E2QY-E9Xpv6o_20Q6iae6c",
  authDomain: "piw-react-lab4.firebaseapp.com",
  projectId: "piw-react-lab4",
  storageBucket: "piw-react-lab4.appspot.com",
  messagingSenderId: "351236289391",
  appId: "1:351236289391:web:436761f4c96b459650ee9a",
  measurementId: "G-C6TXJVS7SL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
