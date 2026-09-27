# JobNest — MERN Job Placement Platform

A polished full-stack job marketplace built with MongoDB, Express, React + Vite, and Node.js.

## Features
- Email/password signup + login with JWT
- Job discovery by category, background, interest, work mode and location
- Home-address / city input with nearest-job matching using geocoded coordinates when available
- Job detail pages and application flow
- Saved jobs
- User profile/preferences
- Admin dashboard for posting, editing and deleting jobs
- Seeded jobs across frontend, backend, database, BPO/BTO, video editing, receptionist, sales, QA and more
- Animated dashboard with an embedded YouTube background video. The video ID is configurable in `client/src/components/VideoBackdrop.jsx`.
- Responsive, white/light aesthetic with glass cards, gradients and micro-animations

## 1. Requirements
- Node.js LTS
- MongoDB Atlas account or local MongoDB

## 2. Server
```bash
cd server
npm install
copy .env.example .env
# Edit .env and set MONGODB_URI and JWT_SECRET
npm run seed
npm run dev
```

The API runs on `http://localhost:5000`.

## 3. Client
Open a second terminal:
```bash
cd client
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Demo accounts after seeding
- Admin: `admin@jobnest.local` / `Admin@12345`
- User: `demo@jobnest.local` / `Demo@12345`

Change these credentials before any real deployment.

## MongoDB
Put your Atlas connection string in `server/.env`:
`MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/jobnest?retryWrites=true&w=majority`

Never commit `.env`.

## Location
The app stores optional latitude/longitude on jobs and users. The seeded jobs include Dhaka-area coordinates. If a browser permits geolocation, the dashboard can use the user's current coordinates; otherwise the address/city text is used for matching.

For production, connect the address form to a geocoding provider and store only the minimum location information needed for job matching.

## YouTube background
The app uses a YouTube iframe embed rather than downloading the video. You can replace the video ID in `VideoBackdrop.jsx` with a video you have permission to embed. YouTube documents iframe embeds here:
https://developers.google.com/youtube/player_parameters
