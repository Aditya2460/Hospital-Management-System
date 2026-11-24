# ZeeCare Hospital Management System

MERN stack project with a patient-facing website, an admin dashboard, and an Express/MongoDB API.

## Prerequisites
- Node.js 18+ and npm
- MongoDB connection string
- Cloudinary credentials for uploading doctor avatars (doctor registration requires it)

## Configure the backend
1. Open `backend/` and copy `.env.example` to `config.env` (the backend loads `config.env`).
2. Set `MONGO_URI`, a long random `JWT_SECRET_KEY`, and Cloudinary credentials.
3. Ensure `FRONTEND_URL_ONE=http://localhost:5173` and `FRONTEND_URL_TWO=http://localhost:5174` for local development.
4. Run `npm install`, then `npm run dev` from `backend/`.

## Run the patient website
1. In `frontend/`, copy `.env.example` to `.env`.
2. Run `npm install` and `npm run dev` (Vite normally uses port 5173).

## Run the admin dashboard
1. In `dashboard/`, copy `.env.example` to `.env`.
2. Run `npm install` and `npm run dev -- --port 5174` so the backend CORS configuration can allow it.

## Important notes
- The API base URL is configurable through `VITE_API_URL`; it defaults to `http://localhost:5000`.
- The backend loads environment variables from `backend/config.env`; do not commit that file.
- Admin creation is protected and requires an authenticated administrator. A first administrator must be provisioned securely in the database or through a controlled one-time setup.
- Doctor avatar upload depends on valid Cloudinary credentials.
- This repository supports patient appointments, patient registration/login, doctor/admin management, appointment status updates, and contact messages. It does not currently include standalone billing, pharmacy, or medical-record modules.
