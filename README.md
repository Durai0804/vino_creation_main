# Vino's Creation 🎨

**Crafting Tradition into Timeless Kolam Designs**

A premium brand showcase web application for Vino's Creation — a kolam stencil brand. This app elegantly displays kolam stencil products with a cultural and artistic feel.

---

## ✨ Features

- 🎨 **Beautiful Landing Page** — Hero section, about section, product showcase, and CTA
- 🖼️ **Product Gallery** — Responsive grid with search and size filtering
- 📄 **Product Detail** — Full-screen image with zoom, detailed descriptions
- 🔐 **Admin Dashboard** — Protected CRUD interface for managing products
- 🌗 **Dark/Light Mode** — Elegant theme toggle with persistence
- 📱 **Fully Responsive** — Mobile, tablet, and desktop optimized
- ✨ **Smooth Animations** — Framer Motion powered transitions and hover effects
- 🔍 **Search & Filter** — Find products by name or filter by size

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, TailwindCSS v4, Framer Motion |
| Backend | Node.js, Express.js |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage |
| Auth | Firebase Authentication |
| Analytics | Firebase Analytics |
| Icons | Lucide React |

## 📁 Project Structure

```
VINO CREATION/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/        # Navbar, Footer
│   │   │   └── ui/            # ProductCard, SkeletonCard, ProtectedRoute
│   │   ├── config/            # Firebase, Supabase clients
│   │   ├── context/           # ThemeContext, AuthContext
│   │   ├── hooks/             # useProducts custom hook
│   │   ├── pages/
│   │   │   ├── Landing/       # Landing page
│   │   │   ├── Product/       # Product detail page
│   │   │   ├── Login/         # Admin login page
│   │   │   └── Admin/         # Admin dashboard
│   │   ├── services/          # API service layer
│   │   └── types/             # TypeScript interfaces
│   ├── .env.example
│   └── vite.config.ts
├── server/                    # Express Backend
│   ├── config/                # Firebase Admin, Supabase
│   ├── controllers/           # Product CRUD logic
│   ├── middleware/             # Auth middleware
│   ├── routes/                # API routes
│   ├── .env.example
│   └── index.js
└── supabase_schema.sql        # Database schema
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- Firebase project (with Auth & Storage enabled)
- Supabase project

### 1. Clone & Install

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### 2. Configure Environment

**Frontend** — Copy `client/.env.example` to `client/.env` and fill in:
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_SUPABASE_URL=https://your_project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_ADMIN_EMAILS=pvino4898@gmail.com,chairmadurai0804@gmail.com
```

**Backend** — Copy `server/.env.example` to `server/.env` and fill in:
```env
PORT=5000
CLIENT_URL=http://localhost:5173
SUPABASE_URL=https://your_project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
ADMIN_EMAILS=pvino4898@gmail.com,chairmadurai0804@gmail.com
```

### 3. Set Up Database

Run the SQL in `supabase_schema.sql` in your Supabase SQL Editor.

### 4. Set Up Firebase

1. Enable **Google** authentication in the Firebase Console.
2. Ensure you have added the authorized domain for your app.
3. Create a **Storage** bucket (or use the default one) and set up security rules.

### 5. Run Development Servers

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

Visit `http://localhost:5173` 🎉

## 🔒 Security

- Admin-only access enforced on both frontend and backend
- Firebase ID token verification on protected routes
- Input validation on all API endpoints
- CORS restricted to frontend origin
- Helmet.js security headers

## 📱 Responsive Breakpoints

| Device | Layout |
|--------|--------|
| Mobile | Single column |
| Tablet (sm) | 2 column grid |
| Desktop (lg) | 3 column grid |
| Large Desktop (xl) | 4 column grid |

## 🎨 Design System

- **Fonts**: Playfair Display (headings), Inter (body)
- **Light Mode**: Cream, beige, soft gold, terracotta
- **Dark Mode**: Charcoal, muted gold, soft brown
- **Effects**: Glassmorphism navbar, hover lifts, gradient text, shimmer skeletons

---

Made with ❤️ for tradition
