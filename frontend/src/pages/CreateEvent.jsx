import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";
import { createEvent } from "../services/eventService";
import { useAuth } from "../context/AuthContext";

/**
 * Create Event Page
 */
export default function CreateEvent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if not organizer
  if (user && user.role !== "organizer") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex items-center justify-center">
        <div className="glass-card backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 max-w-md text-center shadow-2xl shadow-purple-500/20">
          <p className="text-gray-300 mb-4">
            Only organizers can create events
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn-glass-primary w-full"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError("");

    try {
      await createEvent(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm">
            {error}
          </div>
        )}

        <EventForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}
