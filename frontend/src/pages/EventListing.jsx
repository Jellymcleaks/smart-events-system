import React, { useState, useEffect } from "react";
import { Search, Sliders } from "lucide-react";
import EventCard from "../components/EventCard";
import { getAllEvents } from "../services/eventService";
import { getUserBookedEventIds } from "../services/bookingService";
import { useAuth } from "../context/AuthContext";
import { EVENT_CATEGORIES } from "../utils/constants";

/**
 * Event Listing Page - Professional Modern Design
 */
export default function EventListing() {
  const [events, setEvents] = useState([]);
  const [bookedEventIds, setBookedEventIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    location: "",
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
    if (user) {
      fetchBookedEvents();
    }
  }, [filters, user]);

  const fetchEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllEvents(filters);
      setEvents(data.events || []);
    } catch (err) {
      setError(err.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookedEvents = async () => {
    try {
      const data = await getUserBookedEventIds();
      setBookedEventIds(data.bookedEventIds || []);
    } catch (err) {
      console.error("Error fetching booked events:", err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter out booked events
  const availableEvents = events.filter(
    (event) => !bookedEventIds.includes(event._id),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 animate-float-in">
          <div className="flex items-center space-x-3 mb-4">
            <Search className="text-purple-400 animate-pulse" size={32} />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Discover Events
            </h1>
          </div>
          <p className="text-xl text-gray-300 hover:text-gray-200 transition">
            Find and book amazing events happening near you
          </p>
        </div>

        {/* Filters Section */}
        <div className="glass-card hover:glass-card-hover backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-xl shadow-purple-500/10 p-8 mb-12 transition">
          <div className="flex items-center space-x-3 mb-6">
            <Sliders className="text-purple-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-purple-300 mb-3">
                Search Event
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Event name..."
                  className="glass-input w-full pl-10"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-purple-300 mb-3">
                Category
              </label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="glass-input w-full"
              >
                <option value="">All Categories</option>
                {EVENT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-purple-300 mb-3">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="City, venue..."
                className="glass-input w-full"
              />
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() =>
                  setFilters({ category: "", search: "", location: "" })
                }
                className="btn-glass-secondary w-full"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8">
          <div className="glass-card hover:glass-card-hover backdrop-blur-md border border-purple-500/30 rounded-lg px-6 py-4 transition">
            <p className="text-gray-300">
              <span className="text-purple-400 font-bold">
                {availableEvents.length}
              </span>{" "}
              events available for booking
              {filters.search && ` matching "${filters.search}"`}
              {filters.category && ` in ${filters.category}`}
              {filters.location && ` near ${filters.location}`}
              {user && bookedEventIds.length > 0 && (
                <span className="text-green-400 ml-2">
                  ({bookedEventIds.length} already booked)
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-600 border-t-cyan-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 backdrop-blur-md border border-red-500/30 rounded-lg px-6 py-4 mb-8">
            <p className="text-red-400 font-semibold">{error}</p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && availableEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {availableEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

        {/* No Results State */}
        {!loading && availableEvents.length === 0 && !error && (
          <div className="text-center py-20">
            <Search className="mx-auto text-gray-600 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-gray-300 mb-2">
              {events.length > 0
                ? "You have booked all available events!"
                : "No events found"}
            </h3>
            <p className="text-gray-400 mb-8">
              {events.length > 0
                ? "Check out your bookings in your profile or wait for new events"
                : "Try adjusting your filters to find more events"}
            </p>
            <button
              onClick={() =>
                setFilters({ category: "", search: "", location: "" })
              }
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              {events.length > 0 ? "View Bookings" : "View All Events"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
