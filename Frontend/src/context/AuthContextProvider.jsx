import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

axios.defaults.baseURL = "http://localhost:8002";
axios.defaults.withCredentials = true;

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/profile")
      .then((res) => {
        const userData = res.data;
        if (userData?.role) userData.role = userData.role.toLowerCase();
        setUser(userData);
      })
      .catch(() => setUser(null));
  }, []);

  const loginUser = async (payload) => {
    try {
      const response = await axios.post("/login", payload);
      const user = response.data.user;
      if (user?.role) user.role = user.role.toLowerCase();
      setUser(user);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
