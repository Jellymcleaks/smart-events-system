import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { getUserBookings, cancelBooking } from "../services/bookingService";
import { useAuth } from "../context/AuthContext";

/**
 * User Bookings Page
 */
export default function UserBookings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role !== "user") {
      navigate("/");
      return;
    }
    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const data = await getUserBookings();
      setBookings(data.bookings || []);
    } catch (err) {
      setError(err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await cancelBooking(bookingId);
        setBookings(
          bookings.map((b) =>
            b._id === bookingId ? { ...b, status: "cancelled" } : b,
          ),
        );
      } catch (err) {
        setError(err.message || "Failed to cancel booking");
      }
    }
  };

  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Bookings</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg mb-6">
              You haven't booked any events yet
            </p>
            <button
              onClick={() => navigate("/events")}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Browse Events
            </button>
          </div>
        ) : (
          <>
            {/* Confirmed Bookings */}
            {confirmedBookings.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Confirmed Bookings ({confirmedBookings.length})
                </h2>
                <div className="space-y-4">
                  {confirmedBookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900">
                            {booking.eventId?.title}
                          </h3>
                          <div className="mt-2 space-y-1 text-gray-600">
                            <p>
                              <span className="font-semibold">Date:</span>{" "}
                              {new Date(
                                booking.eventId?.date,
                              ).toLocaleDateString()}
                            </p>
                            <p>
                              <span className="font-semibold">Time:</span>{" "}
                              {booking.eventId?.time}
                            </p>
                            <p>
                              <span className="font-semibold">Location:</span>{" "}
                              {booking.eventId?.location}
                            </p>
                            <p>
                              <span className="font-semibold">Quantity:</span>{" "}
                              {booking.quantity} ticket(s)
                            </p>
                            <p>
                              <span className="font-semibold">
                                Total Price:
                              </span>{" "}
                              <span className="text-green-600 font-bold">
                                ${booking.totalPrice.toFixed(2)}
                              </span>
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded transition"
                          title="Cancel booking"
                        >
                          <X size={24} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cancelled Bookings */}
            {cancelledBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Cancelled Bookings ({cancelledBookings.length})
                </h2>
                <div className="space-y-4">
                  {cancelledBookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600 opacity-75"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 line-through">
                          {booking.eventId?.title}
                        </h3>
                        <div className="mt-2">
                          <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                            Cancelled
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
