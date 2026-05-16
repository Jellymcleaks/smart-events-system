/**
 * Sample Data for Smart Events System
 *
 * Use these for testing without creating events manually
 * Paste in MongoDB directly or use Postman
 */

// ============================================
// USERS COLLECTION - Sample Data
// ============================================

// User 1 (Regular User)
db.users.insertOne({
  _id: ObjectId("64a1b2c3d4e5f6g7h8i9j0k1"),
  name: "John Doe",
  email: "john@example.com",
  password: "$2a$10$...", // hashed "password123"
  role: "user",
  createdAt: new Date("2024-01-15T10:00:00Z"),
  updatedAt: new Date("2024-01-15T10:00:00Z"),
});

// User 2 (Organizer)
db.users.insertOne({
  _id: ObjectId("64a1b2c3d4e5f6g7h8i9j0k2"),
  name: "Jane Smith",
  email: "jane@example.com",
  password: "$2a$10$...", // hashed "password123"
  role: "organizer",
  createdAt: new Date("2024-01-20T10:00:00Z"),
  updatedAt: new Date("2024-01-20T10:00:00Z"),
});

// ============================================
// EVENTS COLLECTION - Sample Data
// ============================================

// Event 1
db.events.insertOne({
  _id: ObjectId("64a2b2c3d4e5f6g7h8i9j0k1"),
  title: "React Conference 2024",
  description:
    "Annual conference for React developers featuring keynotes, workshops, and networking opportunities.",
  category: "Technology",
  date: new Date("2024-06-15T00:00:00Z"),
  time: "09:00",
  location: "San Francisco, CA",
  capacity: 500,
  ticketPrice: 99.99,
  organizerId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k2"),
  attendees: 150,
  image: "https://via.placeholder.com/300x200?text=React+Conference",
  createdAt: new Date("2024-01-20T10:00:00Z"),
  updatedAt: new Date("2024-01-20T10:00:00Z"),
});

// Event 2
db.events.insertOne({
  _id: ObjectId("64a2b2c3d4e5f6g7h8i9j0k2"),
  title: "Startup Pitch Day",
  description:
    "Entrepreneurs pitch their ideas to investors and venture capitalists.",
  category: "Business",
  date: new Date("2024-05-20T00:00:00Z"),
  time: "14:00",
  location: "New York, NY",
  capacity: 200,
  ticketPrice: 49.99,
  organizerId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k2"),
  attendees: 180,
  image: "https://via.placeholder.com/300x200?text=Startup+Pitch",
  createdAt: new Date("2024-01-25T10:00:00Z"),
  updatedAt: new Date("2024-01-25T10:00:00Z"),
});

// Event 3
db.events.insertOne({
  _id: ObjectId("64a2b2c3d4e5f6g7h8i9j0k3"),
  title: "Music Festival 2024",
  description: "Three-day music festival featuring top artists and bands.",
  category: "Music",
  date: new Date("2024-07-10T00:00:00Z"),
  time: "16:00",
  location: "Austin, TX",
  capacity: 5000,
  ticketPrice: 149.99,
  organizerId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k2"),
  attendees: 3200,
  image: "https://via.placeholder.com/300x200?text=Music+Festival",
  createdAt: new Date("2024-02-01T10:00:00Z"),
  updatedAt: new Date("2024-02-01T10:00:00Z"),
});

// Event 4
db.events.insertOne({
  _id: ObjectId("64a2b2c3d4e5f6g7h8i9j0k4"),
  title: "Web Design Workshop",
  description:
    "Learn modern web design principles and tools with industry experts.",
  category: "Education",
  date: new Date("2024-05-10T00:00:00Z"),
  time: "10:00",
  location: "Los Angeles, CA",
  capacity: 100,
  ticketPrice: 79.99,
  organizerId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k2"),
  attendees: 85,
  image: "https://via.placeholder.com/300x200?text=Web+Design+Workshop",
  createdAt: new Date("2024-02-05T10:00:00Z"),
  updatedAt: new Date("2024-02-05T10:00:00Z"),
});

// ============================================
// BOOKINGS COLLECTION - Sample Data
// ============================================

// Booking 1
db.bookings.insertOne({
  _id: ObjectId("64a3b2c3d4e5f6g7h8i9j0k1"),
  eventId: ObjectId("64a2b2c3d4e5f6g7h8i9j0k1"),
  userId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k1"),
  quantity: 2,
  totalPrice: 199.98,
  status: "confirmed",
  bookedAt: new Date("2024-02-10T15:30:00Z"),
  createdAt: new Date("2024-02-10T15:30:00Z"),
  updatedAt: new Date("2024-02-10T15:30:00Z"),
});

// Booking 2
db.bookings.insertOne({
  _id: ObjectId("64a3b2c3d4e5f6g7h8i9j0k2"),
  eventId: ObjectId("64a2b2c3d4e5f6g7h8i9j0k2"),
  userId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k1"),
  quantity: 1,
  totalPrice: 49.99,
  status: "confirmed",
  bookedAt: new Date("2024-02-12T10:15:00Z"),
  createdAt: new Date("2024-02-12T10:15:00Z"),
  updatedAt: new Date("2024-02-12T10:15:00Z"),
});

// ============================================
// CREATE INDEXES FOR PERFORMANCE
// ============================================

// Users
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });

// Events
db.events.createIndex({ category: 1 });
db.events.createIndex({ organizerId: 1 });
db.events.createIndex({ date: 1 });

// Bookings
db.bookings.createIndex({ userId: 1 });
db.bookings.createIndex({ eventId: 1 });
db.bookings.createIndex({ bookedAt: 1 });
