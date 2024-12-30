import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { FirebaseProvider } from "./Context/Firebase";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </React.StrictMode>
);
