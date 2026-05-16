import React, { createContext, useState, useEffect } from "react";
import {
  getCurrentUser,
  isAuthenticated,
  logout as logoutService,
  getToken,
} from "../services/authService";

/**
 * Auth Context - Manages global authentication state
 * Stores user data and token in localStorage
 */
export const AuthContext = createContext();

/**
 * Auth Provider Component
 * Wraps entire app to provide authentication context
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    try {
      const currentUser = getCurrentUser();
      const authToken = getToken();

      if (currentUser && authToken && isAuthenticated()) {
        setUser(currentUser);
        setToken(authToken);
        setIsLoggedIn(true);
        console.log(
          "✅ Auto-login: User restored from localStorage",
          currentUser,
        );
      } else {
        setUser(null);
        setToken(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error loading auth state:", error);
      setUser(null);
      setToken(null);
      setIsLoggedIn(false);
    }
    setLoading(false);
  }, []);

  // Handle logout - clears all auth data from localStorage and state
  const logout = () => {
    console.log("🚪 Logging out user...");
    logoutService();
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    console.log("✅ User logged out successfully");
  };

  // Handle user update - syncs with localStorage
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const value = {
    user,
    setUser,
    token,
    setToken,
    loading,
    logout,
    updateUser,
    isAuthenticated: isLoggedIn,
    isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use Auth Context
 * Usage: const { user, logout, isLoggedIn } = useAuth();
 */
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
