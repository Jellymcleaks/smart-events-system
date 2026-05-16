import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/authService";

/**
 * Login Page
 * Allows users to login with email and password
 * Stores credentials in localStorage via authService
 */
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { setUser, setToken, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Validation
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      console.log("🔐 Login initiated...");
      const response = await login(formData);
      console.log("✅ Login successful:", response.user);

      // Update global auth state
      setUser(response.user);
      setToken(response.token);
      setSuccess(true);

      // Show success and redirect
      alert("✅ Login successful! Welcome back!");
      navigate("/");
    } catch (err) {
      console.error("❌ Login failed:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full mix-blend-screen filter blur-3xl animate-float" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/15 rounded-full mix-blend-screen filter blur-3xl animate-float"
          style={{ animationDelay: "-2s" }}
        />
      </div>

      <div className="relative glass-card backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-purple-500/20">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 text-center">
          Welcome Back
        </h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-4 backdrop-blur-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-purple-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="glass-input w-full"
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-purple-300 mb-2">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="glass-input w-full"
              placeholder="••••••••"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-glass-primary w-full mt-6"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-400 hover:text-purple-300 underline font-semibold transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
