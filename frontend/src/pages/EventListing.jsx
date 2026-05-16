import React, { useState, useEffect } from "react";
import { Search, Filter, Sliders } from "lucide-react";
import EventCard from "../components/EventCard";
import { getAllEvents } from "../services/eventService";
import { EVENT_CATEGORIES } from "../utils/constants";

/**
 * Event Listing Page - Professional Modern Design
 */
export default function EventListing() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    location: "",
  });

  useEffect(() => {
    fetchEvents();
  }, [filters]);

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <Search className="text-cyan-400" size={32} />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Discover Events
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Find and book amazing events happening near you
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 mb-12 hover:from-white/10 hover:to-white/15 transition">
          <div className="flex items-center space-x-3 mb-6">
            <Sliders className="text-cyan-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-3">
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
                  className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/30 transition hover:bg-white/10 hover:border-white/20"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-3">
                Category
              </label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/30 transition appearance-none hover:bg-white/10 hover:border-white/20"
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
              <label className="block text-sm font-semibold text-cyan-400 mb-3">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="City, venue..."
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/30 transition hover:bg-white/10 hover:border-white/20"
              />
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() =>
                  setFilters({ category: "", search: "", location: "" })
                }
                className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition duration-300"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8">
          <div className="bg-white/5 backdrop-blur-md border border-cyan-400/30 rounded-lg px-6 py-4 hover:bg-white/10 hover:border-cyan-400/50 transition">
            <p className="text-gray-300">
              <span className="text-cyan-400 font-bold">{events.length}</span>{" "}
              events found
              {filters.search && ` matching "${filters.search}"`}
              {filters.category && ` in ${filters.category}`}
              {filters.location && ` near ${filters.location}`}
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
        {!loading && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

        {/* No Results State */}
        {!loading && events.length === 0 && !error && (
          <div className="text-center py-20">
            <Search className="mx-auto text-gray-600 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-gray-300 mb-2">
              No events found
            </h3>
            <p className="text-gray-400 mb-8">
              Try adjusting your filters to find more events
            </p>
            <button
              onClick={() =>
                setFilters({ category: "", search: "", location: "" })
              }
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              View All Events
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
