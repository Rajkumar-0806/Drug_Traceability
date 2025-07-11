//AuthContext.jsx
// AuthContext.jsx
import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  loginUser: async () => {},
  registerUser: async () => {},
  logoutUser: () => {},
  isLoggedIn: false,
  role: null,
  uniqueId: null,
});

export const useAuth = () => useContext(AuthContext);
