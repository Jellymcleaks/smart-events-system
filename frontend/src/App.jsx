import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EventListing from "./pages/EventListing";
import EventDetail from "./pages/EventDetail";
import CreateEvent from "./pages/CreateEvent";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import UserBookings from "./pages/UserBookings";

/**
 * Protected Route Component
 */
function ProtectedRoute({ children, requiredRole = null }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}

/**
 * App Component
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<EventListing />} />
          <Route path="/events/:id" element={<EventDetail />} />

          {/* User Routes */}
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute requiredRole="user">
                <UserBookings />
              </ProtectedRoute>
            }
          />

          {/* Organizer Routes */}
          <Route
            path="/create-event"
            element={
              <ProtectedRoute requiredRole="organizer">
                <CreateEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="organizer">
                <OrganizerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
