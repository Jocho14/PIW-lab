import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHevTK9JR459UgDhBlBCDwYuBO5j7ZDfw",
  authDomain: "piw-react-lab5.firebaseapp.com",
  projectId: "piw-react-lab5",
  storageBucket: "piw-react-lab5.appspot.com",
  messagingSenderId: "260881513301",
  appId: "1:260881513301:web:42375243acf5f1bce34ddc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
