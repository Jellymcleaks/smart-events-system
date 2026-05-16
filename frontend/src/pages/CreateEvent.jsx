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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <p className="text-gray-700 mb-4">
            Only organizers can create events
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <EventForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}
