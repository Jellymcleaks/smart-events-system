import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  ArrowRight,
  Zap,
} from "lucide-react";

/**
 * Event Card Component - Professional Modern Design
 */
export default function EventCard({ event }) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const seatsAvailable = Math.max(0, event.capacity - event.attendees);
  const occupancyPercentage = (
    (event.attendees / event.capacity) *
    100
  ).toFixed(0);

  const categoryColors = {
    Technology: "from-blue-500 to-cyan-500",
    Business: "from-purple-500 to-pink-500",
    Entertainment: "from-pink-500 to-red-500",
    Sports: "from-green-500 to-emerald-500",
    Education: "from-indigo-500 to-blue-500",
    Health: "from-red-500 to-orange-500",
    Music: "from-purple-500 to-indigo-500",
    Art: "from-orange-500 to-yellow-500",
    Food: "from-yellow-500 to-orange-500",
    Other: "from-gray-500 to-slate-500",
  };

  const gradientClass = categoryColors[event.category] || categoryColors.Other;

  return (
    <Link to={`/events/${event._id}`}>
      <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition duration-300 transform hover:scale-105 border border-white/10 hover:border-cyan-400/40 h-full flex flex-col hover:bg-white/20">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-md">
          <img
            src={
              event.image || "https://via.placeholder.com/300x200?text=Event"
            }
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent backdrop-blur-sm" />

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <div
              className={`inline-block bg-gradient-to-r ${gradientClass} text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-md bg-opacity-80`}
            >
              {event.category}
            </div>
          </div>

          {/* Occupancy Badge */}
          <div className="absolute top-3 right-3">
            <div
              className={`text-white font-bold text-sm px-3 py-1 rounded-full ${
                occupancyPercentage > 80
                  ? "bg-red-500"
                  : occupancyPercentage > 50
                    ? "bg-yellow-500"
                    : "bg-green-500"
              } shadow-lg`}
            >
              {occupancyPercentage}%
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
            {event.description}
          </p>

          {/* Event Info Grid */}
          <div className="space-y-3 mb-4 text-sm">
            <div className="flex items-center space-x-3 text-gray-300">
              <Calendar size={16} className="text-cyan-400 flex-shrink-0" />
              <span className="group-hover:text-white transition">
                {formattedDate} at {event.time}
              </span>
            </div>

            <div className="flex items-center space-x-3 text-gray-300">
              <MapPin size={16} className="text-cyan-400 flex-shrink-0" />
              <span className="truncate group-hover:text-white transition">
                {event.location}
              </span>
            </div>

            <div className="flex items-center space-x-3 text-gray-300">
              <Users size={16} className="text-cyan-400 flex-shrink-0" />
              <span className="group-hover:text-white transition">
                {event.attendees}/{event.capacity} attending
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <DollarSign
                size={16}
                className="text-emerald-400 flex-shrink-0"
              />
              <span className="font-bold text-emerald-400 text-lg group-hover:text-emerald-300 transition">
                ${event.ticketPrice}
              </span>
            </div>
          </div>

          {/* Capacity Bar */}
          <div className="mb-4">
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-300"
                style={{ width: `${occupancyPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {seatsAvailable} seats available
            </p>
          </div>

          {/* CTA Button */}
          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center space-x-2 transform group-hover:translate-x-1">
            <span>View Details</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Highlight Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/20 group-hover:via-transparent group-hover:to-cyan-500/20 pointer-events-none transition duration-300" />
      </div>
    </Link>
  );
}
