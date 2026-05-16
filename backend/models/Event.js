const mongoose = require("mongoose");

/**
 * Event Schema
 * Stores event information created by organizers
 */
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide an event title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide an event description"],
    },
    category: {
      type: String,
      enum: [
        "Technology",
        "Business",
        "Entertainment",
        "Sports",
        "Education",
        "Health",
        "Music",
        "Art",
        "Food",
        "Other",
      ],
      required: [true, "Please select a category"],
    },
    date: {
      type: Date,
      required: [true, "Please provide an event date"],
    },
    time: {
      type: String,
      required: [true, "Please provide an event time"],
    },
    location: {
      type: String,
      required: [true, "Please provide an event location"],
    },
    capacity: {
      type: Number,
      required: [true, "Please provide event capacity"],
      min: 1,
    },
    ticketPrice: {
      type: Number,
      required: [true, "Please provide ticket price"],
      min: 0,
    },
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attendees: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/300x200?text=Event",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

/**
 * Index for faster queries
 */
eventSchema.index({ category: 1 });
eventSchema.index({ organizerId: 1 });
eventSchema.index({ date: 1 });

module.exports = mongoose.model("Event", eventSchema);
