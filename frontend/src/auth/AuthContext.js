// src/auth/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import * as authService from "./authService"; // Assuming authService is correctly located

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(authService.isAuthenticated());

  useEffect(() => {
    const handleAuthChange = () => setIsAuth(authService.isAuthenticated());
    // Add any event listeners if needed, for example, to listen to changes on localStorage

    return () => {
      // Clean up event listeners if added
    };
  }, []);

  const login = (token) => {
    authService.saveToken(token);
    setIsAuth(true);
  };

  const logout = () => {
    authService.removeToken();
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
