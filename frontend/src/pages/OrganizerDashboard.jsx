import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Edit2, Trash2, Plus } from "lucide-react";
import {
  getOrganizerEvents,
  deleteEvent,
  getEventStats,
} from "../services/eventService";
import { getOrganizerBookingStats } from "../services/bookingService";
import { useAuth } from "../context/AuthContext";

/**
 * Organizer Dashboard
 */
export default function OrganizerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role !== "organizer") {
      navigate("/");
      return;
    }
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      const [eventsData, statsData] = await Promise.all([
        getOrganizerEvents(),
        getOrganizerBookingStats(),
      ]);
      setEvents(eventsData.events || []);
      setStats(statsData.stats);
    } catch (err) {
      setError(err.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(eventId);
        setEvents(events.filter((e) => e._id !== eventId));
      } catch (err) {
        setError(err.message || "Failed to delete event");
      }
    }
  };

  const chartData = stats
    ? [
        { name: "Events Created", value: stats.totalEvents },
        { name: "Total Bookings", value: stats.totalBookings },
      ]
    : [];

  const COLORS = ["#3B82F6", "#8B5CF6"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Organizer Dashboard
          </h1>
          <button
            onClick={() => navigate("/create-event")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Create Event</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <p className="text-gray-600 text-sm">Total Events</p>
                  <p className="text-4xl font-bold text-blue-600 mt-2">
                    {stats.totalEvents}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <p className="text-gray-600 text-sm">Total Bookings</p>
                  <p className="text-4xl font-bold text-purple-600 mt-2">
                    {stats.totalBookings}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <p className="text-gray-600 text-sm">Total Revenue</p>
                  <p className="text-4xl font-bold text-green-600 mt-2">
                    ${stats.totalRevenue?.toFixed(2)}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <p className="text-gray-600 text-sm">Avg Revenue/Event</p>
                  <p className="text-4xl font-bold text-orange-600 mt-2">
                    ${stats.averageRevenuePerEvent}
                  </p>
                </div>
              </div>
            )}

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Bar Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Overview
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              {stats && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Events Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Your Events
              </h2>

              {events.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">
                    You haven't created any events yet
                  </p>
                  <button
                    onClick={() => navigate("/create-event")}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Create Your First Event
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Event Title
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Attendees
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event) => (
                        <tr
                          key={event._id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {event.title}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(event.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {event.attendees}/{event.capacity}
                          </td>
                          <td className="px-6 py-4 text-sm text-green-600 font-semibold">
                            ${event.ticketPrice}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => navigate(`/events/${event._id}`)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteEvent(event._id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
