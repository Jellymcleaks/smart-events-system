const Booking = require("../models/Booking");
const Event = require("../models/Event");
const crypto = require("crypto");

/**
 * Get User Booked Event IDs
 * GET /api/bookings/user/booked-events
 */
exports.getUserBookedEventIds = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id,
      status: "confirmed",
    }).select("eventId");

    const bookedEventIds = bookings.map((b) => b.eventId.toString());

    res.status(200).json({
      bookedEventIds,
    });
  } catch (error) {
    console.error("Error fetching booked events:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching booked events" });
  }
};

/**
 * Get User Booked Event IDs
 * GET /api/bookings/user/booked-events
 */
exports.getUserBookedEventIds = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id,
      status: "confirmed",
      paymentStatus: "completed",
    }).select("eventId");

    const bookedEventIds = bookings.map((b) => b.eventId.toString());

    res.status(200).json({
      bookedEventIds,
    });
  } catch (error) {
    console.error("Error fetching booked events:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching booked events" });
  }
};

/**
 * Create Booking (Legacy - without payment)
 * POST /api/bookings
 */
exports.createBooking = async (req, res) => {
  try {
    const { eventId, quantity } = req.body;

    // Validate input
    if (!eventId || !quantity) {
      return res
        .status(400)
        .json({ message: "Please provide event ID and quantity" });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // Find event
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check capacity
    const existingBookings = await Booking.find({ eventId });
    const totalBooked = existingBookings.reduce(
      (sum, booking) => sum + booking.quantity,
      0,
    );

    if (totalBooked + quantity > event.capacity) {
      return res.status(400).json({
        message: `Not enough seats available. Available: ${event.capacity - totalBooked}`,
      });
    }

    // Check if user already booked this event
    const existingBooking = await Booking.findOne({
      eventId,
      userId: req.user.id,
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "You have already booked this event" });
    }

    // Calculate total price
    const totalPrice = event.ticketPrice * quantity;

    // Create booking
    const booking = new Booking({
      eventId,
      userId: req.user.id,
      quantity,
      totalPrice,
    });

    await booking.save();

    // Update event attendees count
    event.attendees = totalBooked + quantity;
    await event.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error while creating booking" });
  }
};

/**
 * Get User Bookings
 * GET /api/bookings
 */
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("eventId")
      .sort({ bookedAt: -1 });

    res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error while fetching bookings" });
  }
};

/**
 * Cancel Booking
 * DELETE /api/bookings/:id
 */
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if user owns this booking
    if (booking.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this booking" });
    }

    // Update booking status
    booking.status = "cancelled";
    await booking.save();

    // Update event attendees
    const event = await Event.findById(booking.eventId);
    event.attendees = Math.max(0, event.attendees - booking.quantity);
    await event.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Server error while cancelling booking" });
  }
};

/**
 * Get Booking Statistics
 * GET /api/bookings/stats/overview
 */
exports.getBookingStats = async (req, res) => {
  try {
    const allBookings = await Booking.find({ status: "confirmed" });

    const totalRevenue = allBookings.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0,
    );
    const totalBookings = allBookings.length;

    // Get revenue by category
    const eventIds = [...new Set(allBookings.map((b) => b.eventId.toString()))];
    const events = await Event.find({ _id: { $in: eventIds } });

    const revenueByCategory = {};
    events.forEach((event) => {
      if (!revenueByCategory[event.category]) {
        revenueByCategory[event.category] = 0;
      }
      const categoryBookings = allBookings.filter(
        (b) => b.eventId.toString() === event._id.toString(),
      );
      revenueByCategory[event.category] += categoryBookings.reduce(
        (sum, booking) => sum + booking.totalPrice,
        0,
      );
    });

    res.status(200).json({
      stats: {
        totalBookings,
        totalRevenue,
        averageBookingValue:
          totalBookings > 0 ? (totalRevenue / totalBookings).toFixed(2) : 0,
        revenueByCategory,
      },
    });
  } catch (error) {
    console.error("Error fetching booking stats:", error);
    res.status(500).json({ message: "Server error while fetching statistics" });
  }
};

/**
 * Get Organizer Booking Stats
 * GET /api/bookings/organizer/stats
 */
exports.getOrganizerBookingStats = async (req, res) => {
  try {
    // Get organizer's events
    const events = await Event.find({ organizerId: req.user.id });
    const eventIds = events.map((e) => e._id);

    // Get bookings for these events
    const bookings = await Booking.find({
      eventId: { $in: eventIds },
      status: "confirmed",
    });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0,
    );

    res.status(200).json({
      stats: {
        totalEvents: events.length,
        totalBookings,
        totalRevenue,
        averageRevenuePerEvent:
          events.length > 0 ? (totalRevenue / events.length).toFixed(2) : 0,
      },
    });
  } catch (error) {
    console.error("Error fetching organizer stats:", error);
    res.status(500).json({ message: "Server error while fetching statistics" });
  }
};

/**
 * Get Event Bookings (Organizer only)
 * GET /api/bookings/event/:eventId
 */
exports.getEventBookings = async (req, res) => {
  try {
    // Verify organizer ownership
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.organizerId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to view these bookings" });
    }

    const bookings = await Booking.find({ eventId: req.params.eventId })
      .populate("userId", "name email")
      .sort({ bookedAt: -1 });

    res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching event bookings:", error);
    res.status(500).json({ message: "Server error while fetching bookings" });
  }
};
