import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";

const FirebaseContext = createContext(null);

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOXj0pdOKZzN-wjTxyweETtyABciAqYUs",
  authDomain: "taskflow-369c8.firebaseapp.com",
  projectId: "taskflow-369c8",
  storageBucket: "taskflow-369c8.appspot.com",
  messagingSenderId: "498355777253",
  appId: "1:498355777253:web:03882d4fd04319d6a42e0c",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
      console.log("User", user);
    });
  }, []);

  const signupWithEmailandPassword = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
        name
      );
      setUser(userCredential.user);
    } catch (error) {
      // Handle any errors here
      console.error("Error signing up:", error.message);
    }
  };

  const signinWithEmailandPassword = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    setUser(userCredential.user);
  }

  const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const signOut = () => {
    firebaseAuth.signOut();
  }

  const isLoggedIn = user ? true : false;

  const putData = (key, data) => set(ref(database, key), data); 

  const getTasks = async (key) => {
    try {
      // Ensure key is defined before accessing the database
      if (!key) {
        console.error("Invalid database key:", key);
        throw new Error("Invalid database key");
      }
  
      const snapshot = await get(child(ref(database), key));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.warn("No tasks found for key:", key);
        return []; // Return an empty array if no tasks found
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };
  

  return (
    <FirebaseContext.Provider
      value={{ signupWithEmailandPassword, user, tasks, isLoggedIn, signinWithEmailandPassword, signInWithGoogle, signOut, putData, getTasks}}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
