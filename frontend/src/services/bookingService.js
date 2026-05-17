import api from "./api";

/**
 * Create new booking
 * @param {Object} bookingData - { eventId, quantity }
 */
export const createBooking = async (bookingData) => {
  try {
    const response = await api.post("/bookings", bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get user's booked event IDs
 */
export const getUserBookedEventIds = async () => {
  try {
    const response = await api.get("/bookings/user/booked-events");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get user's bookings
 */
export const getUserBookings = async () => {
  try {
    const response = await api.get("/bookings");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Cancel booking
 * @param {String} bookingId
 */
export const cancelBooking = async (bookingId) => {
  try {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get booking statistics
 */
export const getBookingStats = async () => {
  try {
    const response = await api.get("/bookings/stats/overview");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get organizer booking statistics
 */
export const getOrganizerBookingStats = async () => {
  try {
    const response = await api.get("/bookings/organizer/stats");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get bookings for specific event (organizer only)
 * @param {String} eventId
 */
export const getEventBookings = async (eventId) => {
  try {
    const response = await api.get(`/bookings/event/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
