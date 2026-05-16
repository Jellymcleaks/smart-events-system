import React, { useState } from "react";
import { X } from "lucide-react";
import { createBooking } from "../services/bookingService";

/**
 * Booking Modal Component
 */
export default function BookingModal({ event, isOpen, onClose, onSuccess }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const seatsAvailable = event.capacity - event.attendees;
  const totalPrice = event.ticketPrice * quantity;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createBooking({
        eventId: event._id,
        quantity: parseInt(quantity),
      });

      onSuccess?.();
      handleClose();
    } catch (err) {
      setError(err.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setQuantity(1);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Book Tickets</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Event Title */}
          <div>
            <p className="text-sm text-gray-600">Event</p>
            <p className="font-semibold text-gray-800">{event.title}</p>
          </div>

          {/* Ticket Price */}
          <div>
            <p className="text-sm text-gray-600">Price per Ticket</p>
            <p className="font-semibold text-green-600">${event.ticketPrice}</p>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Number of Tickets
            </label>
            <input
              type="number"
              min="1"
              max={seatsAvailable}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <p className="text-xs text-gray-600 mt-1">
              Available seats: {seatsAvailable}
            </p>
          </div>

          {/* Total Price */}
          <div className="bg-gray-100 p-3 rounded">
            <div className="flex justify-between">
              <span className="text-gray-700">Total Price:</span>
              <span className="font-bold text-lg text-blue-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || seatsAvailable === 0}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold disabled:bg-gray-400"
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
