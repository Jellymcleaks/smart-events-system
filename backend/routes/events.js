const express = require("express");
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getOrganizerEvents,
  getEventStats,
} = require("../controllers/eventController");
const { auth, isOrganizer } = require("../middleware/auth");

const router = express.Router();

/**
 * GET /api/events
 * Get all events (with filters: category, search, location)
 */
router.get("/", getAllEvents);

/**
 * GET /api/events/organizer/my-events
 * Get events created by current organizer
 */
router.get("/organizer/my-events", auth, isOrganizer, getOrganizerEvents);

/**
 * GET /api/events/:id/stats
 * Get event statistics (must be before /:id route)
 */
router.get("/:id/stats", getEventStats);

/**
 * GET /api/events/:id
 * Get single event by ID
 */
router.get("/:id", getEventById);

/**
 * POST /api/events
 * Create new event (organizer only)
 */
router.post("/", auth, isOrganizer, createEvent);

/**
 * PUT /api/events/:id
 * Update event (organizer only)
 */
router.put("/:id", auth, isOrganizer, updateEvent);

/**
 * DELETE /api/events/:id
 * Delete event (organizer only)
 */
router.delete("/:id", auth, isOrganizer, deleteEvent);

module.exports = router;
