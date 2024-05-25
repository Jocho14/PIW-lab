import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

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
export const auth = getAuth(app);
const analytics = getAnalytics(app);
