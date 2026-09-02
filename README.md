# ✨ Wishly

> **Wishes, made personal.**  
> A personalized occasion website generator. Pick an occasion, choose from 35+ handcrafted templates, personalize with memories, photos, and messages, preview in real time, and generate a unique shareable website. Anyone opening the link sees the customized celebration keepsake immediately with zero login required.

---

## 📁 Project Structure

```
Wishly/
├── frontend/                     # React 18 + Vite + React Router (Plain CSS)
│   ├── src/
│   │   ├── components/           # Navbar, Footer, OccasionCard, TemplateCard, TemplateGallery, HowItWorks, etc.
│   │   ├── data/                 # Occasions (7 categories) and curated sample photos
│   │   ├── services/             # API Service layer (createWish, getWish, uploadImages, deleteImage)
│   │   ├── templates/            # Central registry & 35 modular template components
│   │   │   ├── birthday/         # 5 Birthday templates
│   │   │   ├── anniversary/      # 5 Anniversary templates
│   │   │   ├── graduation/       # 5 Graduation templates
│   │   │   ├── farewell/         # 5 Farewell templates
│   │   │   ├── valentines/       # 5 Valentine's templates
│   │   │   ├── congratulations/  # 5 Congratulations templates
│   │   │   ├── justBecause/      # 5 Just Because templates
│   │   │   └── templateRegistry.js
│   │   ├── pages/                # Home, Templates, OccasionTemplates, TemplatePreview, Customize, GeneratedWish
│   │   ├── styles/               # Plain CSS stylesheets (templates, components, customize)
│   │   ├── utils/                # photoUtils.js
│   │   ├── App.jsx               # Route configurations
│   │   ├── index.css             # Main design system & design tokens
│   │   └── main.jsx
│   ├── .env.example
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── backend/                      # Node.js + Express + MongoDB + Cloudinary
    ├── config/                   # db.js (MongoDB), cloudinary.js (Cloudinary SDK)
    ├── controllers/              # wishController.js, uploadController.js
    ├── middleware/               # uploadMiddleware.js (Multer), errorHandler.js
    ├── models/                   # Wish.js (Mongoose Schema)
    ├── routes/                   # healthRoutes.js, wishRoutes.js, uploadRoutes.js
    ├── utils/                    # idGenerator.js (Short unique public ID generator)
    ├── .env.example
    ├── .env
    ├── .gitignore
    ├── package.json
    └── server.js                 # Express server with CORS & API routing
```

---

## 🚀 Quick Start Instructions

### 1. Backend Server Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `backend/.env`:
   ```bash
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/wishly?retryWrites=true&w=majority

   # Cloudinary Image Storage Credentials
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
   *(Note: If `MONGODB_URI` or Cloudinary credentials are omitted in local development, the backend automatically runs with a built-in fallback store so you can build and test immediately).*
4. Start the backend server:
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
3. Configure environment variables in `frontend/.env`:
   ```bash
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_URL=http://localhost:5173
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   * **Frontend App:** `http://localhost:5173`

---

## ☁️ Cloudinary Image Storage Setup

1. Create a free account at [Cloudinary](https://cloudinary.com).
2. Go to your **Dashboard** and copy your:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
3. Paste these values into `backend/.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=dxyz123abc
   CLOUDINARY_API_KEY=123456789012345
   CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz12345
   ```
4. Restart the backend (`npm start`). You will see:
   ```
   ☁️  Cloudinary configured successfully for image storage.
   ```

---

## 🗄️ MongoDB Database Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Under **Database Access**, create a user with read/write privileges.
3. Under **Network Access**, add IP `0.0.0.0/0` (Allow from anywhere).
4. Copy the connection string and paste into `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/wishly?retryWrites=true&w=majority
   ```

---

## 📡 Backend API Endpoints

| Method | Endpoint | Description | Request Body / Params |
|---|---|---|---|
| `GET` | `/api/health` | Server health check | None |
| `POST` | `/api/uploads/images` | Upload 1-10 images to Cloudinary | `multipart/form-data` with `images` and optional `occasion` |
| `DELETE` | `/api/uploads/images/:publicId` | Delete an image from Cloudinary | URL parameter `:publicId` |
| `POST` | `/api/wishes` | Create & save a new personalized wish | `{ occasion, templateId, recipientName, senderName, message, photos, customData }` |
| `GET` | `/api/wishes/:projectId` | Fetch a personalized wish by unique ID | URL parameter `:projectId` (e.g. `7xK29p`) |

### Example Upload API Response (`POST /api/uploads/images`):
```json
{
  "success": true,
  "images": [
    {
      "url": "https://res.cloudinary.com/demo/image/upload/v1234567890/wishly/birthday/photo1.jpg",
      "publicId": "wishly/birthday/photo1",
      "width": 1200,
      "height": 800,
      "format": "jpg"
    }
  ]
}
```

---

## 📸 Image Storage Architecture

1. **User selects photos** in the Customization Studio (`image/jpeg`, `image/png`, `image/webp` up to 10MB).
2. **Instant Local Preview**: Local object URLs render immediately so the user experiences zero perceived delay.
3. **Background Upload**: Photos stream to `POST /api/uploads/images` using Multer memory storage and Cloudinary's upload stream with automatic optimization (`fetch_format: auto`, `quality: auto`, max width 1400px).
4. **Permanent URL Persistence**: Cloudinary URLs and metadata are returned and stored in MongoDB when the user clicks **✨ Generate Wish**.
5. **Universal Recipient Rendering**: Any device opening `/w/:projectId` displays the optimized Cloudinary images without needing local browser cache or creator session data.

---

## 💬 WhatsApp & Social Sharing

Generated wishes can be shared in multiple ways:
- **One-Click WhatsApp Sharing**: Launches `https://wa.me/?text=...` with a personalized pre-filled message and link.
- **Web Share API**: Native mobile/desktop share sheet (`navigator.share`).
- **One-Click Copy Link**: Instant clipboard copying with feedback.
