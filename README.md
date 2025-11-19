# Workspace Booking & Pricing System

A full-stack application for booking meeting rooms with dynamic pricing, conflict prevention, and admin analytics.

## 🚀 Live Deployment

- **Frontend**: https://workspace-booking-system-v1.netlify.app
- **Backend API**: https://workspace-booking-api-kukm.onrender.com/api

## 📋 Features

- **Room Management**: Browse available meeting rooms with capacity and pricing
- **Smart Booking**: Create bookings with automatic conflict detection
- **Dynamic Pricing**: Peak hour pricing (1.5×) during Mon–Fri 10:00–13:00 & 16:00–19:00
- **Cancellation Policy**: Cancel bookings up to 2 hours before start time
- **Analytics Dashboard**: View utilization and revenue metrics by date range

## 🛠️ Tech Stack

**Backend**
- Node.js + TypeScript
- Express.js
- In-memory data storage (demo)

**Frontend**
- React 18 (Vite)
- Tailwind CSS
- Lucide Icons

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Backend (development)

```bash
cd backend
npm install
npm run dev
```

The server will start on `http://localhost:3000`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`

The Vite dev server runs typically at `http://localhost:5173/`.

## 🔌 API Documentation

### Base URL
```
https://workspace-booking-api-kukm.onrender.com/api
```

### Endpoints

#### 1. Get All Rooms
```http
GET /api/rooms
```

**Response:**
```json
[
  {
    "id": "101",
    "name": "Cabin 1",
    "baseHourlyRate": 300,
    "capacity": 4
  }
]
```

#### 2. Create Booking
```http
POST /api/bookings
Content-Type: application/json
```

**Request:**
```json
{
  "roomId": "101",
  "userName": "Priya",
  "startTime": "2025-11-20T10:00:00.000Z",
  "endTime": "2025-11-20T12:30:00.000Z"
}
```

## API (examples)

Base URL (example): `https://your-backend.example/api`

Endpoints

1) GET /api/rooms — list rooms

2) POST /api/bookings — create a booking

Request body example
```json
{
  "roomId": "101",
  "userName": "Priya",
  "startTime": "2025-11-20T10:00:00.000Z",
  "endTime": "2025-11-20T12:30:00.000Z"
}
```

Success response
```json
{
  "bookingId": "b123",
  "roomId": "101",
  "userName": "Priya",
  "startTime": "2025-11-20T10:00:00.000Z",
  "endTime": "2025-11-20T12:30:00.000Z",
  "totalPrice": 975,
  "status": "CONFIRMED"
}
```

3) GET /api/bookings — list bookings

4) POST /api/bookings/:id/cancel — cancel booking

5) GET /api/analytics?from=YYYY-MM-DD&to=YYYY-MM-DD — analytics

## Business rules (summary)

- Start must be before end; max duration 12 hours
- No bookings in the past
- No overlapping bookings for the same room
- Peak hours use a 1.5× multiplier (weekday mornings and evenings)

## Example: peak-time booking calculation

- Base rate: ₹300/hr
- Booking 10:00–12:30 (2.5 hours) during peak → 2.5 × 300 × 1.5 = ₹1,125

## Deployment notes

Backend: build and run on your chosen host; set `PORT` env variable.

Frontend: build (`npm run build`) and deploy the static output to your host.

## Testing checklist

- Create overlapping bookings to verify conflict detection
- Book during peak vs off-peak to verify pricing
- Attempt cancellation within and outside the allowed window
- Verify analytics excludes cancelled bookings

## Notes

- Times are handled in IST for display; backend stores ISO timestamps.
- Storage is in-memory for this demo and will reset on restart.

## Author

This project was implemented as part of an assignment; code and docs were reviewed and refined by the author.

## License

MIT