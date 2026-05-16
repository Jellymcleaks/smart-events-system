import api from "./api";
import { STORAGE_KEYS } from "../utils/constants";

/**
 * User Signup
 * @param {Object} userData - { name, email, password, confirmPassword, role }
 * Stores token and user info in localStorage
 */
export const signup = async (userData) => {
  try {
    console.log("📝 Attempting signup...", userData.email);
    const response = await api.post("/auth/signup", userData);

    // Store token in localStorage
    localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
    console.log("✅ Token stored in localStorage");

    // Store user info in localStorage
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user));
    console.log("✅ User info stored in localStorage", response.data.user);

    return response.data;
  } catch (error) {
    console.error("❌ Signup error:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * User Login
 * @param {Object} credentials - { email, password }
 * Stores token and user info in localStorage
 */
export const login = async (credentials) => {
  try {
    console.log("🔐 Attempting login...", credentials.email);
    const response = await api.post("/auth/login", credentials);

    // Store token in localStorage
    localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
    console.log("✅ Token stored in localStorage");

    // Store user info in localStorage
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user));
    console.log("✅ User info stored in localStorage", response.data.user);

    return response.data;
  } catch (error) {
    console.error("❌ Login error:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Organizer Login
 * @param {Object} credentials - { email, password }
 * Stores token and user info in localStorage
 */
export const organizerLogin = async (credentials) => {
  try {
    console.log("🏢 Attempting organizer login...", credentials.email);
    const response = await api.post("/auth/organizer-login", credentials);

    // Store token in localStorage
    localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
    console.log("✅ Token stored in localStorage");

    // Store user info in localStorage
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user));
    console.log("✅ Organizer info stored in localStorage", response.data.user);

    return response.data;
  } catch (error) {
    console.error("❌ Organizer login error:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Logout
 * Clears token and user info from localStorage
 */
export const logout = () => {
  console.log("🚪 Clearing localStorage...");
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  console.log("✅ localStorage cleared");
};

/**
 * Get Current User from localStorage
 * @returns {Object|null} User object or null
 */
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if token exists in localStorage
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return !!(token && user);
};

/**
 * Get Auth Token from localStorage
 * @returns {string|null} JWT token or null
 */
export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

/**
 * Update user in localStorage
 * @param {Object} userData - Updated user data
 */
export const updateUserLocal = (userData) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
  console.log("✅ User updated in localStorage");
};
