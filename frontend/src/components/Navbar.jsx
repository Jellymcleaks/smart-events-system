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
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-black/40 via-purple-900/40 to-black/40 border-b border-purple-500/20 shadow-2xl shadow-purple-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition duration-300 animate-pulse-purple">
              ✨
            </div>
            <span className="text-2xl font-bold text-white hidden sm:inline bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-200 transition duration-300">
              SmartEvents
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="text-gray-200 hover:text-purple-300 px-4 py-2 rounded-lg transition duration-300 hover:bg-purple-600/20 hover:border border-purple-400/30"
            >
              Home
            </Link>
            <Link
              to="/events"
              className="text-gray-200 hover:text-purple-300 px-4 py-2 rounded-lg transition duration-300 hover:bg-purple-600/20 hover:border border-purple-400/30"
            >
              Browse Events
            </Link>

            {user ? (
              <>
                {user.role === "organizer" && (
                  <>
                    <Link
                      to="/create-event"
                      className="text-gray-200 hover:text-purple-300 px-4 py-2 rounded-lg transition duration-300 hover:bg-purple-600/20 hover:border border-purple-400/30"
                    >
                      Create Event
                    </Link>
                    <Link
                      to="/dashboard"
                      className="text-gray-200 hover:text-purple-300 px-4 py-2 rounded-lg transition duration-300 hover:bg-purple-600/20 hover:border border-purple-400/30"
                    >
                      Dashboard
                    </Link>
                  </>
                )}

                {user.role === "user" && (
                  <Link
                    to="/my-bookings"
                    className="text-gray-200 hover:text-purple-300 px-4 py-2 rounded-lg transition duration-300 hover:bg-purple-600/20 hover:border border-purple-400/30"
                  >
                    My Bookings
                  </Link>
                )}

                <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-purple-700">
                  <div className="flex items-center space-x-2 text-purple-400">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
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
                    className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2 shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
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
                  className="text-gray-200 hover:text-purple-300 px-4 py-2 rounded-lg transition duration-300 hover:bg-purple-600/20"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-600 transition shadow-lg shadow-purple-500/30"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-200 hover:text-purple-300 transition"
          >
            {isOpen ? (
              <X size={24} className="text-purple-400" />
            ) : (
              <Menu size={24} className="text-purple-400" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-black/30 backdrop-blur-lg rounded-lg border border-purple-500/20">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-200 hover:text-purple-300 hover:bg-purple-600/20 transition rounded-lg"
            >
              Home
            </Link>
            <Link
              to="/events"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-200 hover:text-purple-300 hover:bg-purple-600/20 transition rounded-lg"
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
