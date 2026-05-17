const express = require("express");
const {
  createBooking,
  getUserBookings,
  cancelBooking,
  getBookingStats,
  getOrganizerBookingStats,
  getEventBookings,
  getUserBookedEventIds,
} = require("../controllers/bookingController");
const { auth, isOrganizer } = require("../middleware/auth");

const router = express.Router();

/**
 * GET /api/bookings/user/booked-events
 * Get list of booked event IDs for current user
 */
router.get("/user/booked-events", auth, getUserBookedEventIds);

/**
 * POST /api/bookings
 * Create new booking (user)
 */
router.post("/", auth, createBooking);

/**
 * GET /api/bookings
 * Get user's bookings
 */
router.get("/", auth, getUserBookings);

/**
 * DELETE /api/bookings/:id
 * Cancel booking (user)
 */
router.delete("/:id", auth, cancelBooking);

/**
 * GET /api/bookings/stats/overview
 * Get overall booking statistics
 */
router.get("/stats/overview", getBookingStats);

/**
 * GET /api/bookings/organizer/stats
 * Get organizer booking statistics
 */
router.get("/organizer/stats", auth, isOrganizer, getOrganizerBookingStats);

/**
 * GET /api/bookings/event/:eventId
 * Get bookings for specific event (organizer only)
 */
router.get("/event/:eventId", auth, isOrganizer, getEventBookings);

module.exports = router;
