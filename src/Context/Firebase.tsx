import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOXj0pdOKZzN-wjTxyweETtyABciAqYUs",
  authDomain: "taskflow-369c8.firebaseapp.com",
  projectId: "taskflow-369c8",
  storageBucket: "taskflow-369c8.appspot.com",
  messagingSenderId: "498355777253",
  appId: "1:498355777253:web:03882d4fd04319d6a42e0c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// Define context type
interface FirebaseContextType {
  user: User | null;
  signupWithEmailandPassword: (email: string, password: string, name: string) => Promise<void>;
  signinWithEmailandPassword: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
  isLoggedIn: boolean;
  putData: (key: string, data: any) => void;
  getTasks: (key: string) => Promise<any>;
}

// Create Firebase context
const FirebaseContext = createContext<FirebaseContextType | null>(null);

// Custom hook for using Firebase context
export const useFirebase = (): FirebaseContextType => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};

// FirebaseProvider component
export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const signupWithEmailandPassword = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      setUser(userCredential.user);
    } catch (error: any) {
      console.error("Error signing up:", error.message);
    }
  };

  const signinWithEmailandPassword = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      setUser(userCredential.user);
    } catch (error: any) {
      console.error("Error signing in:", error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(firebaseAuth, googleProvider);
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const signOut = () => {
    firebaseAuth.signOut();
    setUser(null);
  };

  const isLoggedIn = Boolean(user);

  const putData = (key: string, data: any) => {
    set(ref(database, key), data);
  };

  const getTasks = async (key: string): Promise<any> => {
    try {
      const snapshot = await get(child(ref(database), key));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.warn("No tasks found for key:", key);
        return [];
      }
    } catch (error: any) {
      console.error("Error fetching tasks:", error.message);
      throw error;
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        signupWithEmailandPassword,
        signinWithEmailandPassword,
        signInWithGoogle,
        signOut,
        isLoggedIn,
        putData,
        getTasks,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
