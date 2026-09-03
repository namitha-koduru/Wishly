# ✨ Wishly

> **Wishes, made personal.**  
> A personalized occasion celebration website generator. Pick an occasion, choose from 35+ handcrafted templates, personalize with memories, photos, and messages, preview in real time, and generate a unique shareable mini-website. Anyone opening the link sees the customized celebration keepsake with zero login or signup required.

---

## 🌟 Key Features

- **7 Occasion Categories**: Birthday, Anniversary, Graduation, Farewell, Valentine's, Congratulations, and Just Because.
- **35 Handcrafted Templates**: Genuinely distinct editorial, scrapbook, timeline, polaroid, and vintage letter layouts.
- **Story Editor Studio**: 4-chapter creation flow with character counters, milestone timeline builder, reasons list editor, and dual-device preview (Desktop & Mobile).
- **Cloudinary Image Storage**: Permanent cloud photo uploads with automatic compression and metadata persistence.
- **MongoDB Atlas Persistence**: Fast retrieval by short 7-character project IDs (e.g., `/w/7xK29p`).
- **Cinematic Unboxing Ceremony**: Ambient floating dust particles, glowing wax seal, and smooth reveal animation.
- **Full-Featured Photo Lightbox**: Multi-photo gallery lightbox with previous/next controls, keyboard navigation (Escape, ArrowLeft, ArrowRight), image counter, and captions.
- **One-Click Viral Sharing**: Occasion-aware WhatsApp messages, native Web Share API, and copy-link with toast notification.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 6, React Router DOM 6, Plain CSS Design System (no heavy utility dependencies).
- **Backend**: Node.js, Express 4, Mongoose 8, Multer, Cloudinary SDK.
- **Database**: MongoDB / MongoDB Atlas.
- **Image Cloud**: Cloudinary.
- **Target Hosting**: Vercel (Frontend) + Render (Backend).

---

## 📁 Project Structure

```
Wishly/
├── frontend/                     # React 18 + Vite + React Router (Plain CSS)
│   ├── src/
│   │   ├── components/           # Navbar, Footer, TimelineEditor, ReasonsEditor, PhotoUploader, PhotoLightbox, etc.
│   │   ├── data/                 # Occasions (7 categories) and curated sample photos
│   │   ├── services/             # API Service layer (createWish, getWish, uploadImages, deleteImage)
│   │   ├── templates/            # Central registry & 35 modular template components across 7 occasions
│   │   ├── pages/                # Home, Templates, OccasionTemplates, TemplatePreview, Customize, GeneratedWish
│   │   ├── styles/               # Plain CSS stylesheets (templates, components, customize)
│   │   ├── App.jsx               # Route configurations & layout wrappers
│   │   ├── index.css             # Design system tokens, variables & base rules
│   │   └── main.jsx
│   ├── .env.example              # Frontend environment variables example
│   ├── index.html                # SEO, OG tags, theme-color
│   ├── package.json              # Scripts & dependencies (node >=18.0.0)
│   ├── vercel.json               # Vercel SPA routing configuration
│   └── vite.config.js
├── backend/                      # Node.js + Express + MongoDB + Cloudinary
│   ├── config/                   # db.js (MongoDB), cloudinary.js (Cloudinary SDK)
│   ├── controllers/              # wishController.js, uploadController.js
│   ├── middleware/               # uploadMiddleware.js (Multer), errorHandler.js
│   ├── models/                   # Wish.js (Mongoose Schema)
│   ├── routes/                   # healthRoutes.js, wishRoutes.js, uploadRoutes.js
│   ├── utils/                    # idGenerator.js (Short unique public ID generator)
│   ├── .env.example              # Backend environment variables example
│   ├── package.json              # Scripts & dependencies (node >=18.0.0)
│   └── server.js                 # Express server with security headers, CORS & API routing
├── .gitignore                    # Root gitignore protecting secrets & dependencies
└── README.md
```

---

## 🚀 Local Development Setup

### 1. Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment template:
   ```bash
   cp .env.example .env
   ```
4. Configure `backend/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/wishly?retryWrites=true&w=majority

   # Cloudinary Image Storage Credentials
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Allowed Frontend Origin
   FRONTEND_URL=http://localhost:5173
   ```
   *(Note: If `MONGODB_URI` or Cloudinary credentials are not set locally, the backend automatically runs with an in-memory development fallback so you can build and test immediately).*
5. Start the backend server:
   ```bash
   npm start
   ```
   - **API Server:** `http://localhost:5000`
   - **Health Check:** `http://localhost:5000/api/health`

---

### 2. Frontend Setup

1. Open a second terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment template:
   ```bash
   cp .env.example .env
   ```
4. Configure `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_URL=http://localhost:5173
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
   - **Frontend App:** `http://localhost:5173`

---

## 🌐 Production Deployment Guide

### Architecture Overview

```
┌─────────────────────────┐          ┌─────────────────────────┐
│     Frontend (Vercel)   │ ───────> │     Backend (Render)    │
│  https://wishly.app     │  HTTPS   │ https://api.wishly.app  │
└─────────────────────────┘          └─────────────────────────┘
                                                  │
                                                  ├──> MongoDB Atlas (Wish documents)
                                                  │
                                                  └──> Cloudinary (Permanent photo assets)
```

---

### Step 1: Set Up MongoDB Atlas

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Under **Database Access**, create a user with read/write privileges.
3. Under **Network Access**, add IP `0.0.0.0/0` (Allow access from anywhere).
4. Click **Connect** → **Drivers** (Node.js) and copy the connection URI:
   ```
   mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/wishly?retryWrites=true&w=majority
   ```

---

### Step 2: Set Up Cloudinary

1. Create a free account at [Cloudinary](https://cloudinary.com).
2. In your **Dashboard**, copy:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

---

### Step 3: Deploy Backend to Render

1. Create an account on [Render](https://render.com).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Set the following build and run settings:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:
   - `PORT`: `5000` (Render will automatically assign its internal port)
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: `<your-mongodb-atlas-uri>`
   - `CLOUDINARY_CLOUD_NAME`: `<your-cloudinary-cloud-name>`
   - `CLOUDINARY_API_KEY`: `<your-cloudinary-api-key>`
   - `CLOUDINARY_API_SECRET`: `<your-cloudinary-api-secret>`
   - `FRONTEND_URL`: `https://your-frontend-subdomain.vercel.app` *(update once frontend is created)*
6. Click **Create Web Service**.
7. Note your Render service URL (e.g., `https://wishly-backend.onrender.com`).
8. Verify health endpoint: `https://wishly-backend.onrender.com/api/health` → `{"success":true,"status":"healthy","message":"Wishly API is running"}`.

---

### Step 4: Deploy Frontend to Vercel

1. Create an account on [Vercel](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Import your GitHub repository.
4. In the project configuration:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, configure:
   - `VITE_API_URL`: `https://wishly-backend.onrender.com/api`
   - `VITE_APP_URL`: `https://your-frontend-subdomain.vercel.app`
6. Click **Deploy**.
7. Once deployed, update the `FRONTEND_URL` environment variable on Render with your Vercel production domain.

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description | Request Body / Parameters |
|---|---|---|---|
| `GET` | `/api/health` | Service health check | None |
| `POST` | `/api/uploads/images` | Stream images to Cloudinary | `multipart/form-data` with `images` and optional `occasion` |
| `DELETE` | `/api/uploads/images/:publicId` | Delete image from Cloudinary | URL parameter `:publicId` |
| `POST` | `/api/wishes` | Create & save customized wish | `{ occasion, templateId, recipientName, senderName, message, photos, customData }` |
| `GET` | `/api/wishes/:projectId` | Retrieve wish by unique 7-char ID | URL parameter `:projectId` (e.g. `7xK29p`) |

---

## 🛡️ Security Best Practices Implemented

- **Safe HTML & Content Rendering**: 0 `dangerouslySetInnerHTML`, 0 `eval()`, all user inputs rendered safely.
- **Production Error Masking**: Internal server errors and database stack traces are masked in production mode (`NODE_ENV=production`).
- **Controlled CORS Policy**: Configurable allowlist restricting cross-origin requests to your production frontend domain.
- **Security Headers**: Standard production headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`).
- **No Transient Base64 in Database**: Only permanent Cloudinary HTTPS URLs and metadata are stored.

---

## ❓ Troubleshooting

- **CORS Error**: Ensure `FRONTEND_URL` on Render matches your exact Vercel domain without trailing slashes.
- **404 on Page Refresh on Vercel**: Verify `frontend/vercel.json` exists with SPA rewrites to `/index.html`.
- **Uploads Failing**: Verify Cloudinary credentials in Render environment variables. Ensure images are JPEG/PNG/WebP under 10MB.
