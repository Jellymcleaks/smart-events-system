import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, LogOut, User, Sparkles } from "lucide-react";

/**
 * Navbar Component - Professional Modern Design
 */
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-r from-slate-900/70 via-blue-900/70 to-slate-900/70 border-b border-cyan-400/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-400 transition">
              ✨
            </div>
            <span className="text-2xl font-bold text-white hidden sm:inline bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
              SmartEvents
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="text-gray-200 hover:text-cyan-400 px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-800/30"
            >
              Home
            </Link>
            <Link
              to="/events"
              className="text-gray-200 hover:text-cyan-400 px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-800/30"
            >
              Browse Events
            </Link>

            {user ? (
              <>
                {user.role === "organizer" && (
                  <>
                    <Link
                      to="/create-event"
                      className="text-gray-200 hover:text-cyan-400 px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-800/30"
                    >
                      Create Event
                    </Link>
                    <Link
                      to="/dashboard"
                      className="text-gray-200 hover:text-cyan-400 px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-800/30"
                    >
                      Dashboard
                    </Link>
                  </>
                )}

                {user.role === "user" && (
                  <Link
                    to="/my-bookings"
                    className="text-gray-200 hover:text-cyan-400 px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-800/30"
                  >
                    My Bookings
                  </Link>
                )}

                <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-blue-700">
                  <div className="flex items-center space-x-2 text-cyan-400">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden sm:inline text-gray-200">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2 shadow-lg"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-200 hover:text-cyan-400 px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-800/30"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              to="/events"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Browse Events
            </Link>

            {user ? (
              <>
                {user.role === "organizer" && (
                  <>
                    <Link
                      to="/create-event"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Create Event
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </>
                )}

                {user.role === "user" && (
                  <Link
                    to="/my-bookings"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    My Bookings
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-blue-600 hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
