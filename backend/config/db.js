const mongoose = require("mongoose");

/**
 * Connect to MongoDB database
 * Uses MONGODB_URI from environment variables
 */
const connectDB = async () => {
  try {
    const uri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/smart-events";

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
    return true;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
