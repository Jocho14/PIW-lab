import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUklKOldm89E2QY-E9Xpv6o_20Q6iae6c",
  authDomain: "piw-react-lab4.firebaseapp.com",
  projectId: "piw-react-lab4",
  storageBucket: "piw-react-lab4.appspot.com",
  messagingSenderId: "351236289391",
  appId: "1:351236289391:web:436761f4c96b459650ee9a",
  measurementId: "G-C6TXJVS7SL",
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
