import "./App.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import DashboardPage from "./app/dashboard/page";
import { AuthForm } from "./components/auth components/auth-form";
import { useEffect } from "react";
import { useFirebase, FirebaseProvider } from "./Context/Firebase";

function App() {
  const { isLoggedIn } = useFirebase();
  const navigate = useNavigate();

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<DashboardPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/login" element={<AuthForm view="login" />} />
        <Route path="/signup" element={<AuthForm view="signup" />}/>
      </Routes>
  );
}

export default App;
