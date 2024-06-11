import { useEffect, useState } from "react";

import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { auth, firestore } from "./init";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async (navigate) => {
  const userCredentials = await signInWithPopup(auth, googleProvider);
  if (userCredentials.user) {
    const userDocRef = doc(firestore, "users", userCredentials.user.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
        displayName: userCredentials.user.displayName || "Anonymous",
      });
    }
    navigate("/");
  }
};

export const signupWithEmail = async (email, password, navigate) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredentials.user) {
      await setDoc(doc(firestore, "users", userCredentials.user.uid), {
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
        displayName: userCredentials.user.displayName || "Anonymous",
      });
    }
    navigate("/");
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

export const loginWithEmail = async (email, password, navigate) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredentials.user) navigate("/");
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

export const logout = async () => {
  await signOut(auth);
};

export const useUser = () => {
  const [user, setUser] = useState(auth?.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((u) => setUser(u));
  }, []);

  return user;
};
