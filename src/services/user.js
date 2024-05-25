import { useEffect, useState } from "react";

import { auth } from "./init";
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
  if (userCredentials.user) navigate("/");
};

export const signupWithEmail = async (email, password, navigate) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredentials.user) navigate("/");
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
