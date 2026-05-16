# Smart Event Intelligence System 🎯

An AI-powered event management platform that helps organizers plan and optimize events while providing personalized recommendations to users.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)

## ✨ Features (45% Complete)

### ✅ Phase 1 & 2 Implemented

1. **Core Authentication System**
   - User Signup/Login
   - Organizer Login
   - Role-based access (user vs organizer)
   - JWT tokens for security

2. **Event Management (CRUD)**
   - Create events
   - Edit events
   - Delete events
   - View all events with filtering

3. **Event Listing UI**
   - Browse all events
   - Filter by category, date, location
   - Search functionality
   - Responsive design

4. **Ticket Booking System**
   - Book tickets for events
   - View booking history
   - Store bookings in database

5. **Organizer Dashboard**
   - Overview of statistics
   - Event analytics
   - Booking charts
   - Data visualization

6. **Database Design**
   - Users collection
   - Events collection
   - Bookings collection
   - Structured MongoDB schema

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Axios (API calls)
- Tailwind CSS
- Recharts (Charts & Visualization)
- Context API (State Management)

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- bcryptjs (Password hashing)
- CORS

## 📁 Project Structure

```
smart-events-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   └── bookingController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── events.js
│   │   └── bookings.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── EventForm.jsx
│   │   │   ├── BookingModal.jsx
│   │   │   └── DashboardChart.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── EventListing.jsx
│   │   │   ├── EventDetail.jsx
│   │   │   ├── OrganizerDashboard.jsx
│   │   │   ├── UserBookings.jsx
│   │   │   └── CreateEvent.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── eventService.js
│   │   │   └── bookingService.js
│   │   ├── utils/
│   │   │   └── constants.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create .env file**

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/smart-events
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

   If you want to use MongoDB Atlas instead of local MongoDB, replace `MONGODB_URI` with your Atlas connection string.
   Example:

   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/smart-events?retryWrites=true&w=majority
   ```

   Make sure your Atlas cluster has:
   - a database user with password
   - network access whitelisted for your IP or `0.0.0.0/0` during development
   - the database name `smart-events` in the URI

4. **Start MongoDB** (local only)

   ```bash
   mongod
   ```

   If you use Atlas, skip this step.

5. **Run backend server**

   ```bash
   npm run dev
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   App will run on `http://localhost:5173`

## 📡 API Documentation

### Authentication Endpoints

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/organizer-login` - Login organizer

### Event Endpoints

- `GET /api/events` - Get all events
- `POST /api/events` - Create event (organizer only)
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Booking Endpoints

- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/stats` - Get booking statistics

## 🎯 How to Use

### For Users

1. Sign up with email and password
2. Browse events on homepage
3. Filter by category, date, or location
4. Click on event to view details
5. Book tickets
6. View booking history

### For Organizers

1. Login as organizer
2. Navigate to create event
3. Fill event details (name, date, category, capacity, price)
4. Submit to create event
5. View dashboard for analytics
6. Edit or delete events as needed

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes (middleware)
- Role-based access control
- Input validation

## 📊 Database Schema

### Users

```json
{
  "_id": ObjectId,
  "name": String,
  "email": String (unique),
  "password": String (hashed),
  "role": "user" | "organizer",
  "createdAt": Date
}
```

### Events

```json
{
  "_id": ObjectId,
  "title": String,
  "description": String,
  "category": String,
  "date": Date,
  "time": String,
  "location": String,
  "capacity": Number,
  "ticketPrice": Number,
  "organizerId": ObjectId,
  "attendees": Number,
  "createdAt": Date,
  "updatedAt": Date
}
```

### Bookings

```json
{
  "_id": ObjectId,
  "eventId": ObjectId,
  "userId": ObjectId,
  "quantity": Number,
  "totalPrice": Number,
  "status": "confirmed" | "cancelled",
  "bookedAt": Date
}
```

## 📈 Next Steps (Phase 3 & 4)

- AI-based recommendations
- Real-time notifications
- Advanced analytics
- Payment integration
- Performance optimization
- Deployment

## 👨‍💻 Contributing

Feel free to fork and submit pull requests for any improvements.

## 📄 License

MIT License - Feel free to use for personal and commercial projects.

---

**Built with ❤️ for event management lovers**
