import React, { useState } from "react";
import { X } from "lucide-react";
import { EVENT_CATEGORIES } from "../utils/constants";

/**
 * Event Form Component
 * Used for creating and editing events
 */
export default function EventForm({
  initialData = null,
  onSubmit,
  loading = false,
}) {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      description: "",
      category: "Technology",
      date: "",
      time: "10:00",
      location: "",
      capacity: "",
      ticketPrice: "",
    },
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.capacity || formData.capacity < 1)
      newErrors.capacity = "Capacity must be at least 1";
    if (!formData.ticketPrice || formData.ticketPrice < 0)
      newErrors.ticketPrice = "Ticket price must be valid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {initialData ? "Edit Event" : "Create New Event"}
      </h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Event Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter event title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Describe your event"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Category *
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {EVENT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.date ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Time *
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Location *
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.location ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Event location"
        />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location}</p>
        )}
      </div>

      {/* Capacity and Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Capacity *
          </label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            min="1"
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.capacity ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Number of seats"
          />
          {errors.capacity && (
            <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ticket Price ($) *
          </label>
          <input
            type="number"
            name="ticketPrice"
            value={formData.ticketPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.ticketPrice ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Price per ticket"
          />
          {errors.ticketPrice && (
            <p className="text-red-500 text-sm mt-1">{errors.ticketPrice}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex space-x-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold disabled:bg-gray-400"
        >
          {loading
            ? "Processing..."
            : initialData
              ? "Update Event"
              : "Create Event"}
        </button>
      </div>
    </form>
  );
}
