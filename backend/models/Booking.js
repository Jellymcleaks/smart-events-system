const mongoose = require("mongoose");

/**
 * Booking Schema
 * Stores ticket bookings made by users
 */
const bookingSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please provide quantity"],
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: [true, "Please provide total price"],
      min: 0,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "pending"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentId: {
      type: String,
      default: null,
    },
    orderId: {
      type: String,
      default: null,
    },
    signature: {
      type: String,
      default: null,
    },
    bookedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

/**
 * Index for faster queries
 */
bookingSchema.index({ userId: 1 });
bookingSchema.index({ eventId: 1 });
bookingSchema.index({ bookedAt: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
