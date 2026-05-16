import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, DollarSign, ArrowLeft } from "lucide-react";
import { getEventById } from "../services/eventService";
import { useAuth } from "../context/AuthContext";
import BookingModal from "../components/BookingModal";

/**
 * Event Detail Page
 */
export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const data = await getEventById(id);
      setEvent(data.event);
    } catch (err) {
      setError(err.message || "Failed to fetch event");
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSuccess = () => {
    // Refresh event data to update attendees
    fetchEvent();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
          <p className="text-red-600 mb-4">{error || "Event not found"}</p>
          <button
            onClick={() => navigate("/events")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const seatsAvailable = event.capacity - event.attendees;
  const occupancyPercentage = (
    (event.attendees / event.capacity) *
    100
  ).toFixed(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate("/events")}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to Events</span>
        </button>

        {/* Event Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Event Image */}
          <img
            src={
              event.image || "https://via.placeholder.com/800x400?text=Event"
            }
            alt={event.title}
            className="w-full h-96 object-cover"
          />

          {/* Event Details */}
          <div className="p-8">
            {/* Category */}
            <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {event.category}
            </span>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {event.title}
            </h1>

            {/* Description */}
            <p className="text-gray-700 text-lg mb-8">{event.description}</p>

            {/* Event Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b">
              {/* Date & Time */}
              <div className="flex items-start space-x-4">
                <Calendar
                  className="text-blue-600 mt-1 flex-shrink-0"
                  size={24}
                />
                <div>
                  <p className="text-gray-600 text-sm">Date & Time</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formattedDate} at {event.time}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4">
                <MapPin
                  className="text-blue-600 mt-1 flex-shrink-0"
                  size={24}
                />
                <div>
                  <p className="text-gray-600 text-sm">Location</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {event.location}
                  </p>
                </div>
              </div>

              {/* Capacity */}
              <div className="flex items-start space-x-4">
                <Users className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="text-gray-600 text-sm">Attendees</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {event.attendees}/{event.capacity}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-start space-x-4">
                <DollarSign
                  className="text-green-600 mt-1 flex-shrink-0"
                  size={24}
                />
                <div>
                  <p className="text-gray-600 text-sm">Ticket Price</p>
                  <p className="text-lg font-semibold text-green-600">
                    ${event.ticketPrice}
                  </p>
                </div>
              </div>
            </div>

            {/* Capacity Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Seats Availability</span>
                <span>{occupancyPercentage}% filled</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${occupancyPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {seatsAvailable} seats available
              </p>
            </div>

            {/* Organizer Info */}
            <div className="bg-gray-100 p-4 rounded-lg mb-8">
              <p className="text-gray-600 text-sm">Organized by</p>
              <p className="font-semibold text-gray-900">
                {event.organizerId?.name || "Unknown Organizer"}
              </p>
            </div>

            {/* Book Button */}
            {user && user.role === "user" && seatsAvailable > 0 ? (
              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
              >
                Book Tickets Now
              </button>
            ) : user && user.role === "user" ? (
              <button
                disabled
                className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold text-lg cursor-not-allowed"
              >
                Event is Full
              </button>
            ) : !user ? (
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
              >
                Login to Book
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {event && (
        <BookingModal
          event={event}
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}
