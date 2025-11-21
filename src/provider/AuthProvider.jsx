import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { AuthContext } from "../provider/AuthContext.jsx";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  const authData = {
    user,
    loading,
    setUser,
    createUser,
    login: (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password).finally(() =>
        setLoading(false)
      );
    },
    logout: async () => {
      setLoading(true);
      try {
        await signOut(auth);
      } finally {
        setLoading(false);
      }
    },
    signInWithGoogle: () => {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider).finally(() => setLoading(false));
    },
    updateUserProfile: (profile) => {
      if (!auth.currentUser)
        return Promise.reject(new Error("No authenticated user"));
      setLoading(true);
      return updateProfile(auth.currentUser, profile)
        .then(() => {
          // Update the user state with the new profile info
          setUser({ ...auth.currentUser });
        })
        .finally(() => setLoading(false));
    },
    resetPassword: (email) => {
      setLoading(true);
      return sendPasswordResetEmail(auth, email).finally(() =>
        setLoading(false)
      );
    },
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
