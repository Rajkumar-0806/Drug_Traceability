import axios from "axios";
axios.defaults.baseURL = "http://localhost:8002"; // ✅ Set backend URL here

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContextProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Router>
  </StrictMode>
);
