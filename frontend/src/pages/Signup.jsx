import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signup } from "../services/authService";

/**
 * Signup Page
 * Allows users to create account
 * Stores user data in localStorage via authService
 */
export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
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
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      console.log("📝 Signup initiated...");
      const response = await signup(formData);
      console.log("✅ Signup successful:", response.user);

      // Update global auth state
      setUser(response.user);
      setToken(response.token);
      setSuccess(true);

      // Show success and redirect
      alert(`✅ Welcome ${response.user.name}! Account created successfully!`);
      navigate("/");
    } catch (err) {
      console.error("❌ Signup failed:", err);
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex items-center justify-center px-4 py-8 relative overflow-hidden">
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
          Join Us
        </h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-4 backdrop-blur-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-purple-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="glass-input w-full"
              placeholder="John Doe"
            />
          </div>

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

          {/* Role */}
          <div>
            <label className="block text-sm font-semibold text-purple-300 mb-2">
              Sign up as *
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="glass-input w-full"
            >
              <option value="user">User (Browse & Book Events)</option>
              <option value="organizer">Organizer (Create Events)</option>
            </select>
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-purple-300 mb-2">
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 hover:text-purple-300 underline font-semibold transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
