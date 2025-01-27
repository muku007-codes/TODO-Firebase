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

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

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

// Firestore configuration
const firestore = getFirestore(firebaseApp);

// Define context type
interface FirebaseContextType {
  user: User | null;
  signupWithEmailandPassword: (
    email: string,
    password: string,
    name: string
  ) => Promise<void>;
  signinWithEmailandPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
  isLoggedIn: boolean;
  putData: (key: string, data: any) => void;
  getTask: (key: string) => Promise<any>;
  addTask: (
    userId: string,
    taskData: {
      title: string;
      status: string;
      isRunning?: boolean;
      timeSpent?: number;
      lastUpdatedAt?: {
        seconds: number;
        nanoseconds: number;
      };
      createdAt: Date;
    }
  ) => Promise<void>;
  addHabit: (
    userId: string,
    habitData: {
      name: string;
      goal: number;
      achieved: number;
      completedDates: string[];
      color: string;
      createdAt: Date;
      lastUpdatedAt?: { seconds: number; nanoseconds: number };
    }
  ) => Promise<void>;
  getTasks: (userId: string) => Promise<any[]>;
  getHabit: (userId: string) => Promise<any[]>;
  updateTask: (
    userId: string,
    taskId: string,
    updatedData: Partial<{
      title: string;
      status: string;
      timeSpent: number;
      isRunning: boolean;
      lastUpdatedAt: { seconds: number; nanoseconds: number };
    }>
  ) => Promise<void>;
  deleteTask: (userId: string, taskId: string) => Promise<void>;
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
export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const signupWithEmailandPassword = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error: any) {
      console.error("Error signing up:", error.message);
    }
  };

  const signinWithEmailandPassword = async (
    email: string,
    password: string
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
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

  const getTask = async (key: string): Promise<any> => {
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
      // throw error;
    }
  };

  // Add a task
  const addTask = async (
    userId: string,
    taskData: {
      title: string;
      status: string;
      createdAt: Date;
      isRunning?: boolean;
      timeSpent?: number;
      lastUpdatedAt?: { seconds: number; nanoseconds: number };
    }
  ) => {
    try {
      const tasksCollection = collection(firestore, "users", userId, "tasks");
      const docRef = await addDoc(tasksCollection, taskData);
      return docRef.id;
    } catch (error: any) {
      console.error("Error adding task:", error.message);
    }
  };

  // Get tasks
  const getTasks = async (userId: string): Promise<any[]> => {
    try {
      const tasksCollection = collection(firestore, "users", userId, "tasks");
      const querySnapshot = await getDocs(tasksCollection);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error: any) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  // Update a task
  const updateTask = async (
    userId: string,
    taskId: string,
    updatedData: Partial<{
      title: string;
      status: string;
      isRunning: boolean;
      timeSpent: number;
      lastUpdatedAt: { seconds: number; nanoseconds: number };
    }>
  ) => {
    try {
      const taskDoc = doc(firestore, "users", userId, "tasks", taskId);
      await updateDoc(taskDoc, updatedData);
      console.log("Task updated successfully!", updatedData);
    } catch (error: any) {
      console.error("Error updating task:", error.message);
    }
  };

  // Delete a task
  const deleteTask = async (userId: string, taskId: string) => {
    try {
      const taskDoc = doc(firestore, "users", userId, "tasks", taskId);
      await deleteDoc(taskDoc);
      console.log("Task deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting task:", error.message);
    }
  };

  // Delete all tasks
  const deleteAllTasks = async (userId: string, taskIds: string[]) => {
    try {
      const batch = writeBatch(firestore);

      taskIds.forEach((taskId) => {
        const taskDoc = doc(firestore, "users", userId, "tasks", taskId);
        batch.delete(taskDoc);
      });

      await batch.commit();
      console.log("Tasks deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting tasks:", error.message);
    }
  };

  const addHabit = async (
    userId: string,
    habitData: {
      name: string;
      goal: number;
      achieved: number;
      completedDates: string[];
      color: string;
      createdAt: Date;
      lastUpdatedAt?: { seconds: number; nanoseconds: number };
    }
  ) => {
    try {
      const habitsCollection = collection(firestore, "users", userId, "habits");
      const docRef = await addDoc(habitsCollection, habitData);
      console.log("Habit added successfully!", docRef.id);
      return docRef.id;
    } catch (error: any) {
      console.error("Error adding habit:", error.message);
    }
  };

  // Get tasks
  const getHabit = async (userId: string): Promise<any[]> => {
    try {
      const habitCollection = collection(firestore, "users", userId, "habits");
      const querySnapshot = await getDocs(habitCollection);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error: any) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  // Update a task
  const updateHabit = async (
    userId: string,
    habitId: string,
    updatedData: Partial<{
      name: string;
      goal: number;
      achieved: number;
      completedDates: string[];
      color: string;
      createdAt: Date;
      lastUpdatedAt?: { seconds: number; nanoseconds: number };
    }>
  ) => {
    try {
      const taskDoc = doc(firestore, "users", userId, "habits", habitId);
      await updateDoc(taskDoc, updatedData);
    } catch (error: any) {
      console.error("Error updating Habit:", error.message);
    }
  };

  // Delete a task
  const deleteHabit = async (userId: string, taskId: string) => {
    try {
      const taskDoc = doc(firestore, "users", userId, "tasks", taskId);
      await deleteDoc(taskDoc);
      console.log("Task deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting task:", error.message);
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
        addTask,
        getTasks,
        updateTask,
        deleteTask,
        getTask,
        deleteAllTasks,
        addHabit,
        getHabit,
        updateHabit
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
