# ✨ Wishly

> **Wishes, made personal.**  
> A personalized occasion website generator. Pick an occasion, choose from 35+ handcrafted templates, personalize with memories, photos, and messages, preview in real time, and generate a unique shareable website. Anyone opening the link sees the customized celebration keepsake immediately with zero login required.

---

## 📁 Project Structure

```
Wishly/
├── frontend/                     # React 18 + Vite + React Router (Plain CSS)
│   ├── src/
│   │   ├── components/           # Navbar, Footer, OccasionCard, TemplateCard, TemplateGallery, HowItWorks, UI
│   │   ├── data/                 # Occasions (7 categories) and sample curated photos
│   │   ├── services/             # API Service layer (createWish, getWish, checkHealth)
│   │   ├── templates/            # Central registry & 35 modular template components
│   │   │   ├── birthday/         # 5 Birthday templates
│   │   │   ├── anniversary/      # 5 Anniversary templates
│   │   │   ├── graduation/       # 5 Graduation templates
│   │   │   ├── farewell/         # 5 Farewell templates
│   │   │   ├── valentines/       # 5 Valentine's templates
│   │   │   ├── congratulations/  # 5 Congratulations templates
│   │   │   ├── justBecause/      # 5 Just Because templates
│   │   │   └── templateRegistry.js
│   │   ├── pages/                # Home, Templates, OccasionTemplates, TemplatePreview, Customize, GeneratedWish, NotFound
│   │   ├── styles/               # Plain CSS stylesheets (templates, components, customize)
│   │   ├── App.jsx               # Route configurations
│   │   ├── index.css             # Main stylesheet & design tokens
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── backend/                      # Node.js + Express + MongoDB (Mongoose)
    ├── config/                   # MongoDB connection manager (db.js)
    ├── controllers/              # wishController.js (createWish, getWishByProjectId)
    ├── middleware/               # errorHandler.js
    ├── models/                   # Wish.js (Mongoose Schema)
    ├── routes/                   # healthRoutes.js, wishRoutes.js
    ├── utils/                    # idGenerator.js (Short unique public ID generator)
    ├── .env.example
    ├── .gitignore
    ├── package.json
    └── server.js                 # Express server with CORS & health endpoint
```

---

## 🚀 Quick Start Instructions

### 1. Backend Server Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   # backend/.env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/wishly?retryWrites=true&w=majority
   ```
   *(Note: If `MONGODB_URI` is left empty, the server automatically runs with a built-in development memory fallback store so you can build and test immediately).*
4. Start the backend API server:
   ```bash
   npm start
   ```
   * **API Server:** `http://localhost:5000`
   * **Health Check:** `http://localhost:5000/api/health`

---

### 2. Frontend Application Setup

1. Open a second terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (optional):
   ```bash
   # frontend/.env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   * **Frontend App:** `http://localhost:5173`

---

## 🗄️ MongoDB Setup Guide

To connect a cloud MongoDB Atlas database:
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new free cluster (Shared M0).
3. Under **Database Access**, create a database user with a username and password.
4. Under **Network Access**, add IP address `0.0.0.0/0` (Allow Access from Anywhere).
5. Click **Connect** → **Drivers** (Node.js) and copy the connection string.
6. Paste the connection string into `backend/.env` as `MONGODB_URI`.
7. Restart the backend server (`npm start`). You will see:
   ```
   📦 MongoDB Connected: cluster0-shard-00-00.example.mongodb.net
   ```

---

## 📡 Backend API Endpoints

| Method | Endpoint | Description | Request Body / Params |
|---|---|---|---|
| `GET` | `/api/health` | Server health check | None |
| `POST` | `/api/wishes` | Create & save a new personalized wish | `{ occasion, templateId, recipientName, senderName, message, photos, customData }` |
| `GET` | `/api/wishes/:projectId` | Fetch a personalized wish by its unique ID | URL param `:projectId` (e.g. `7xK29p`) |

### Example API Response (`POST /api/wishes`):
```json
{
  "success": true,
  "projectId": "7xK29p"
}
```

### Example API Response (`GET /api/wishes/7xK29p`):
```json
{
  "success": true,
  "wish": {
    "projectId": "7xK29p",
    "occasion": "birthday",
    "templateId": "birthday-memories",
    "recipientName": "Ananya",
    "senderName": "Alex",
    "message": "Wishing you the brightest year yet! 🎂",
    "photos": ["https://images.unsplash.com/..."],
    "customData": { "date": "September 12" },
    "createdAt": "2026-09-01T18:30:00.000Z"
  }
}
```

---

## 🧭 Routes Overview

* `/` — Landing page with Visual Hero Composition, 7 Occasions, How It Works, and Template Gallery
* `/templates` — Full template catalog with occasion filter tabs and search
* `/templates/:occasion` — Dedicated occasion gallery (e.g. `/templates/birthday`, `/templates/anniversary`)
* `/templates/:templateId/preview` — Dedicated template preview with Desktop/Mobile toggles & "Use This Template" CTA
* `/customize/:templateId` — Customization Studio (form on left, live reactive preview on right)
* `/w/:projectId` — Public recipient website displaying the personalized keepsake without login

---

## 📸 Image Handling & Current Development Limitation

- **In this phase**: The Wish data model supports photo URLs, curated sample photos, and client-side browser previews (`URL.createObjectURL()`).
- **Limitation**: Local file object URLs (`blob:...`) exist in the local browser session.
- **Next Phase**: Cloudinary will be integrated to upload user device images to cloud storage and persist public image URLs permanently across all devices.

---

## 🔮 Future Roadmap

1. **Cloudinary Photo Uploads**: Direct cloud photo uploads from phone and computer.
2. **One-Click WhatsApp & Social Sharing**: Share generated wish links directly with rich OpenGraph preview cards.
3. **Background Melodies**: Optional sweet background music (e.g. birthday song, soft acoustic melody) with interactive play/pause controls.
4. **Confetti & Interactive Surprise Reveals**: Floating confetti cannons and scratch-off cards on recipient view.
