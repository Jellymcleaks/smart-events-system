# 🚀 Quick Start Guide

## 60 Seconds Setup

### 1. Prerequisites Check (30 seconds)

```bash
# Install Node.js from https://nodejs.org/
node --version  # v14+
npm --version   # v6+

# Install MongoDB from https://www.mongodb.com/
mongod --version
```

### 2. Backend Setup (15 seconds)

```bash
cd backend
npm install
# Starts on http://localhost:5000
npm run dev
```

### 3. Frontend Setup (15 seconds)

```bash
# In NEW terminal
cd frontend
npm install
# Starts on http://localhost:5173
npm run dev
```

### 4. Open Browser

Go to: `http://localhost:5173`

---

## 🧪 Test Immediately

### Create Organizer Account

1. Click **Sign Up**
2. Fill:
   - Name: `Test Organizer`
   - Email: `org@test.com`
   - Password: `password123`
   - Role: **Organizer**
3. Click **Sign Up**

### Create Event

1. Click **Create Event**
2. Fill:
   - Title: `Tech Conference 2024`
   - Description: `Annual tech conference`
   - Category: `Technology`
   - Date: `Tomorrow's date`
   - Time: `10:00`
   - Location: `San Francisco`
   - Capacity: `500`
   - Ticket Price: `99`
3. Click **Create Event**

### Create User Account & Book

1. Logout (Click profile → Logout)
2. Click **Sign Up**
3. Fill:
   - Name: `Test User`
   - Email: `user@test.com`
   - Password: `password123`
   - Role: **User**
4. Browse Events → Book Tickets

### View Dashboard

1. Logout
2. Login as organizer again
3. Click **Dashboard**
4. See statistics and charts!

---

## 📁 File Structure Overview

```
📦 smart-events-system
├── 📂 backend/
│   ├── 📄 server.js          ← Start here
│   ├── 📄 .env               ← Database URL
│   └── 📂 controllers/       ← Business logic
│
├── 📂 frontend/
│   ├── 📄 src/App.jsx        ← Main component
│   └── 📄 src/pages/         ← All pages
│
├── 📄 README.md              ← Full docs
└── 📄 SETUP.md               ← Detailed setup
```

---

## 🔑 Key Endpoints

| Method | Endpoint           | Purpose       |
| ------ | ------------------ | ------------- |
| POST   | `/api/auth/signup` | Register user |
| POST   | `/api/auth/login`  | Login         |
| GET    | `/api/events`      | List events   |
| POST   | `/api/events`      | Create event  |
| POST   | `/api/bookings`    | Book ticket   |
| GET    | `/api/bookings`    | My bookings   |

---

## ⚡ Common Issues

| Issue                        | Fix                                          |
| ---------------------------- | -------------------------------------------- |
| MongoDB error                | Run `mongod` in another terminal             |
| Port 5000 in use             | Change PORT in .env                          |
| Blank page on localhost:5173 | Wait for npm to finish, then refresh         |
| Login not working            | Check network tab, ensure backend is running |

---

## 📊 System Architecture

```
┌─────────────────┐         ┌──────────────────┐
│   React App     │◄───────►│  Node.js Server  │
│  localhost:5173 │         │  localhost:5000  │
└─────────────────┘         └──────────────────┘
                                    │
                                    ▼
                            ┌──────────────┐
                            │  MongoDB     │
                            │  Port: 27017 │
                            └──────────────┘
```

---

## 🎯 45% Complete Features

✅ Authentication (User & Organizer)
✅ Event Management (Create, Edit, Delete)
✅ Event Listing & Filtering
✅ Ticket Booking
✅ Dashboard with Charts
✅ Responsive UI

---

## 📱 Page Navigation

```
Landing Page
    ↓
    ├─→ Browse Events (Public)
    ├─→ Login/Signup
    │
    ├─→ [User Path]
    │   ├─→ My Bookings
    │   └─→ Event Detail → Book Ticket
    │
    └─→ [Organizer Path]
        ├─→ Create Event
        ├─→ Dashboard (Stats & Charts)
        └─→ Event Management
```

---

## 💡 Next Steps to Learn

1. **Backend**: Modify `eventController.js` to add new features
2. **Frontend**: Add new page in `src/pages/`
3. **Database**: Update schema in `models/`
4. **Styling**: Customize with Tailwind CSS
5. **Charts**: Modify `DashboardChart.jsx` for more visualizations

---

## 🚀 Deploy Later (When 100% Complete)

### Backend

```bash
# Deploy to Heroku/Railway/Render
npm run build
npm start
```

### Frontend

```bash
# Deploy to Vercel/Netlify
npm run build
# Upload dist/ folder
```

---

## 📞 Need Help?

1. Check **SETUP.md** for detailed guide
2. Check **README.md** for features
3. Run both terminals side by side
4. Check browser console (F12) for errors
5. MongoDB must be running!

---

**You're all set! Happy coding! 🎉**
