import api from "./api";

/**
 * Get all events with optional filters
 * @param {Object} filters - { category, search, location }
 */
export const getAllEvents = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.category) params.append("category", filters.category);
    if (filters.search) params.append("search", filters.search);
    if (filters.location) params.append("location", filters.location);

    const response = await api.get("/events", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get single event by ID
 * @param {String} eventId
 */
export const getEventById = async (eventId) => {
  try {
    const response = await api.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Create new event (organizer only)
 * @param {Object} eventData
 */
export const createEvent = async (eventData) => {
  try {
    const response = await api.post("/events", eventData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Update event (organizer only)
 * @param {String} eventId
 * @param {Object} eventData
 */
export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await api.put(`/events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Delete event (organizer only)
 * @param {String} eventId
 */
export const deleteEvent = async (eventId) => {
  try {
    const response = await api.delete(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get organizer's events
 */
export const getOrganizerEvents = async () => {
  try {
    const response = await api.get("/events/organizer/my-events");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get event statistics
 * @param {String} eventId
 */
export const getEventStats = async (eventId) => {
  try {
    const response = await api.get(`/events/${eventId}/stats`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
