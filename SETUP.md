# 🚀 Smart Event Intelligence System - Setup Guide

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Running the Application](#running-the-application)
6. [API Endpoints](#api-endpoints)
7. [Testing the System](#testing-the-system)
8. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** (local or Atlas cloud) - [Download](https://www.mongodb.com/try/download/community)
- **Git** (optional) - [Download](https://git-scm.com/)
- **Visual Studio Code** or any code editor

### Verify Installation

```bash
node --version      # Should be v14+
npm --version       # Should be v6+
mongod --version    # Should show version
```

---

## 📁 Project Structure

```
smart-events-system/
│
├── backend/                          # Node.js + Express backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic
│   │   ├── eventController.js       # Event management
│   │   └── bookingController.js     # Booking management
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   ├── Event.js                 # Event schema
│   │   └── Booking.js               # Booking schema
│   ├── routes/
│   │   ├── auth.js                  # Auth endpoints
│   │   ├── events.js                # Event endpoints
│   │   └── bookings.js              # Booking endpoints
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication
│   ├── .env                         # Environment variables
│   ├── package.json                 # Dependencies
│   └── server.js                    # Main server file
│
├── frontend/                         # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── EventCard.jsx        # Event display card
│   │   │   ├── EventForm.jsx        # Create/Edit event form
│   │   │   ├── BookingModal.jsx     # Booking modal
│   │   │   └── DashboardChart.jsx   # Dashboard charts
│   │   ├── pages/
│   │   │   ├── Landing.jsx          # Home page
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Signup.jsx           # Signup page
│   │   │   ├── EventListing.jsx     # Browse events
│   │   │   ├── EventDetail.jsx      # Event details
│   │   │   ├── CreateEvent.jsx      # Create event
│   │   │   ├── OrganizerDashboard.jsx # Organizer dashboard
│   │   │   └── UserBookings.jsx     # User bookings
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Auth context
│   │   ├── services/
│   │   │   ├── api.js               # API configuration
│   │   │   ├── authService.js       # Auth API calls
│   │   │   ├── eventService.js      # Event API calls
│   │   │   └── bookingService.js    # Booking API calls
│   │   ├── utils/
│   │   │   └── constants.js         # Constants
│   │   ├── App.jsx                  # Main App component
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles
│   ├── index.html                   # HTML template
│   ├── package.json                 # Dependencies
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind config
│   └── postcss.config.js            # PostCSS config
│
└── README.md                         # Project documentation
```

---

## 🔧 Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variables
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `cors` - Cross-origin requests
- `express-validator` - Input validation
- `nodemon` - Auto-reload during development

### Step 3: Setup Environment Variables

Create a `.env` file in the `backend` directory with:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/smart-events

# JWT
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

**For MongoDB Atlas Cloud:**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-events?retryWrites=true&w=majority
```

### Step 4: Start MongoDB

**On Windows (if installed locally):**

```bash
mongod
```

**Or use MongoDB Atlas:**

- Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get connection string and add to `.env`

### Step 5: Run Backend Server

```bash
npm run dev
```

**Expected Output:**

```
╔════════════════════════════════════════════════╗
║  Smart Event Intelligence System - Backend     ║
║  Server running on http://localhost:5000       ║
║  Environment: development                      ║
╚════════════════════════════════════════════════╝
```

✅ **Backend is ready!** You can test it at `http://localhost:5000/health`

---

## ⚛️ Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:

- `react` & `react-dom` - React framework
- `react-router-dom` - Routing
- `axios` - HTTP client
- `recharts` - Charts & visualization
- `lucide-react` - Icons
- `tailwindcss` - CSS framework
- `vite` - Build tool

### Step 3: Start Development Server

```bash
npm run dev
```

**Expected Output:**

```
  VITE v4.4.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ **Frontend is ready!** Open browser at `http://localhost:5173`

---

## 🏃 Running the Application

### Terminal 1 - Backend

```bash
cd smart-events-system/backend
npm run dev
```

### Terminal 2 - Frontend

```bash
cd smart-events-system/frontend
npm run dev
```

Then open browser and go to: `http://localhost:5173`

---

## 📡 API Endpoints

### Authentication Endpoints

#### 1. User Signup

```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "user"  // or "organizer"
}
```

#### 2. User Login

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### 3. Organizer Login

```
POST /api/auth/organizer-login
Content-Type: application/json

{
  "email": "organizer@example.com",
  "password": "password123"
}
```

#### 4. Get Current User

```
GET /api/auth/me
Authorization: Bearer {token}
```

### Event Endpoints

#### 1. Get All Events (with filters)

```
GET /api/events?category=Technology&search=react&location=NewYork
```

#### 2. Get Event by ID

```
GET /api/events/{eventId}
```

#### 3. Create Event (Organizer Only)

```
POST /api/events
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "React Workshop",
  "description": "Learn React from basics",
  "category": "Technology",
  "date": "2024-06-15",
  "time": "10:00",
  "location": "San Francisco",
  "capacity": 100,
  "ticketPrice": 49.99
}
```

#### 4. Update Event (Organizer Only)

```
PUT /api/events/{eventId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "capacity": 150
  // ... other fields
}
```

#### 5. Delete Event (Organizer Only)

```
DELETE /api/events/{eventId}
Authorization: Bearer {token}
```

#### 6. Get Organizer Events

```
GET /api/events/organizer/my-events
Authorization: Bearer {token}
```

#### 7. Get Event Statistics

```
GET /api/events/{eventId}/stats
```

### Booking Endpoints

#### 1. Create Booking

```
POST /api/bookings
Authorization: Bearer {token}
Content-Type: application/json

{
  "eventId": "64a1b2c3d4e5f6g7h8i9j0k1",
  "quantity": 2
}
```

#### 2. Get User Bookings

```
GET /api/bookings
Authorization: Bearer {token}
```

#### 3. Cancel Booking

```
DELETE /api/bookings/{bookingId}
Authorization: Bearer {token}
```

#### 4. Get Booking Statistics

```
GET /api/bookings/stats/overview
```

#### 5. Get Organizer Booking Statistics

```
GET /api/bookings/organizer/stats
Authorization: Bearer {token}
```

#### 6. Get Event Bookings (Organizer Only)

```
GET /api/bookings/event/{eventId}
Authorization: Bearer {token}
```

---

## 🧪 Testing the System

### Step 1: Test User Registration

1. Go to `http://localhost:5173/signup`
2. Fill in form:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
   - Role: User
3. Click Sign Up

### Step 2: Test Organizer Registration

1. Go to `http://localhost:5173/signup`
2. Fill in form:
   - Name: Jane Smith
   - Email: jane@example.com
   - Password: password123
   - Role: Organizer
3. Click Sign Up

### Step 3: Create Events (as Organizer)

1. Login as organizer
2. Click "Create Event" button
3. Fill event details:
   - Title: React Conference 2024
   - Description: Annual React conference
   - Category: Technology
   - Date: Select future date
   - Time: 09:00
   - Location: San Francisco
   - Capacity: 500
   - Ticket Price: $99
4. Click "Create Event"

### Step 4: Browse Events (as User)

1. Login as user
2. Go to "Browse Events"
3. Filter by category or search
4. Click on event card

### Step 5: Book Tickets

1. Click "View Details" on event
2. Click "Book Tickets Now"
3. Select quantity: 2
4. Confirm booking

### Step 6: View Bookings

1. Click "My Bookings" in navbar
2. See confirmed bookings with details

### Step 7: View Dashboard (as Organizer)

1. Login as organizer
2. Click "Dashboard"
3. See statistics and charts
4. See list of events created

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error:** `MongooseError: Cannot connect to MongoDB`

**Solution:**

1. Ensure MongoDB is running: `mongod`
2. Check `MONGODB_URI` in `.env` file
3. If using MongoDB Atlas, ensure IP whitelist includes your IP

### Port Already in Use

**Error:** `listen EADDRINUSE :::5000`

**Solution:**

```bash
# Find process using port 5000
lsof -i :5000

# Kill process (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS Error

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**

- Backend already has CORS enabled
- Ensure frontend and backend URLs are correct
- Check `vite.config.js` proxy settings

### Dependencies Installation Issues

**Error:** `npm ERR! peer dep missing`

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm install

# Or use npm@latest
npm install -npm@latest -g
```

### Token Expiration

**Issue:** Getting logged out unexpectedly

**Solution:**

- Token expires in 7 days (set in authController.js)
- Login again to get new token
- Can extend expiry by modifying JWT_SIGN

### Vite Not Starting

**Error:** `Error: listen EADDRINUSE :::5173`

**Solution:**

```bash
# Use different port
npm run dev -- --port 3000
```

---

## 📚 Key Features Implemented (45%)

✅ **Phase 1 - Foundation**

- User/Organizer Authentication
- Role-based access control
- JWT token management

✅ **Phase 2 - Core Features**

- Event CRUD operations
- Event filtering and search
- Ticket booking system
- Organizer dashboard
- Analytics and charts

🚀 **Future Phases (Remaining 55%)**

- AI-based recommendations
- Real-time notifications
- Advanced analytics
- Payment integration
- Performance optimization

---

## 💡 Best Practices Implemented

✅ **Code Organization**

- Modular structure
- Separation of concerns
- Reusable components

✅ **Security**

- Password hashing (bcryptjs)
- JWT authentication
- Protected routes
- Input validation

✅ **Performance**

- Indexed database queries
- Optimized components
- Lazy loading routes

✅ **UI/UX**

- Responsive design
- Clear error messages
- Loading states
- Intuitive navigation

---

## 📝 Environment Variables Reference

### Backend (.env)

```env
PORT=5000                                           # Server port
MONGODB_URI=mongodb://localhost:27017/smart-events # MongoDB connection
JWT_SECRET=your_secret_key_here                    # JWT secret
NODE_ENV=development                               # Environment
```

### Frontend (vite.config.js)

```javascript
server: {
  port: 5173,
  proxy: {
    '/api': 'http://localhost:5000'  // Backend URL
  }
}
```

---

## 🎓 Learning Outcomes

After completing this project, you'll understand:

1. **Full-Stack Development**
   - Frontend with React
   - Backend with Node.js/Express
   - Database design with MongoDB

2. **Authentication & Security**
   - JWT tokens
   - Password hashing
   - Protected routes

3. **Database Design**
   - Schema creation
   - Relationships
   - Indexing

4. **API Design**
   - RESTful principles
   - Proper HTTP methods
   - Error handling

5. **Frontend Development**
   - Component architecture
   - State management
   - Form handling
   - Charts & visualization

---

## 🤝 Support

For issues or questions:

1. Check the Troubleshooting section
2. Review the README.md file
3. Check browser console for errors
4. Verify MongoDB connection
5. Ensure both servers are running

---

## 📄 License

MIT License - Feel free to use for personal and commercial projects.

---

**Happy Coding! 🚀**
