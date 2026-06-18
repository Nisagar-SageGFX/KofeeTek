# KofeeTek Website – Complete Setup Guide

> **Stack:** React + Vite + Tailwind + Three.js + Framer Motion (Frontend)  
> Node.js + Express (Backend) | Supabase PostgreSQL + Auth + Storage

---

## 📁 Folder Structure

```
kofeetek/
├── client/                  ← React frontend (Vite)
│   ├── public/
│   │   └── assets/
│   │       ├── logo/        ← kofeetek_logo.png
│   │       ├── machines/    ← machine1–7 photos
│   │       └── consumables/ ← product images
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/      ← Navbar, Footer, Layout
│   │   │   ├── home/        ← Hero, WhyUs, MachineShowcase…
│   │   │   ├── admin/       ← AdminLayout, ProtectedRoute
│   │   │   └── ui/          ← WhatsAppButton, ChatBot
│   │   ├── pages/           ← Home, About, Products, Consumables…
│   │   │   └── admin/       ← Dashboard, Leads, Products…
│   │   ├── lib/
│   │   │   └── supabase.js
│   │   └── styles/
│   │       └── index.css
│   ├── .env                 ← VITE_ keys here
│   └── vite.config.js
├── server/                  ← Node.js Express API
│   ├── routes/
│   │   ├── leads.js
│   │   ├── chat.js
│   │   ├── products.js
│   │   └── inventory.js
│   ├── .env                 ← Server secrets here
│   └── index.js
└── supabase/
    └── schema.sql           ← Run this in Supabase SQL editor
```

---

## ✅ STEP 1 — Install Prerequisites

Make sure you have:
- **Node.js v18+** → https://nodejs.org
- **VS Code** (you already have this)
- **Git** (optional)

Check versions:
```bash
node -v    # should be v18+
npm -v     # should be v9+
```

---

## ✅ STEP 2 — Create Supabase Project

1. Go to → **https://supabase.com** → Sign up / Log in
2. Click **"New Project"**
3. Set:
   - **Project Name:** `kofeetek`
   - **Database Password:** (save it somewhere)
   - **Region:** `Southeast Asia (Singapore)` — closest to Chennai
4. Wait ~2 minutes for project to be ready

### Get your credentials:
- Go to **Settings → API**
- Copy:
  - `Project URL` → e.g. `https://abcxyz.supabase.co`
  - `anon/public key` → starts with `eyJ...`
  - `service_role key` → starts with `eyJ...` (keep this SECRET)

---

## ✅ STEP 3 — Run the Database Schema

1. In Supabase dashboard → click **SQL Editor** → **New Query**
2. Open `kofeetek/supabase/schema.sql` from VS Code
3. Copy the entire content → Paste into the SQL editor
4. Click **Run** (green button)
5. You should see: *"Success. No rows returned"*

This creates all 5 tables: `leads`, `products`, `rentals`, `customers`, `inventory`

### Create Admin User:
1. In Supabase → **Authentication → Users → Add User**
2. Set:
   - Email: `admin@kofeetek.in`
   - Password: (choose a strong password)
   - Click **Create User**

---

## ✅ STEP 4 — Configure Environment Variables

### Client `.env` (file: `kofeetek/client/.env`)

Open it in VS Code and fill in:
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...YOUR_ANON_KEY
VITE_API_URL=http://localhost:5000
```

### Server `.env` (file: `kofeetek/server/.env`)

```env
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...YOUR_SERVICE_KEY
ANTHROPIC_API_KEY=sk-ant-api03-...YOUR_KEY
PORT=5000
CLIENT_URL=http://localhost:3000
```

> **Note:** `ANTHROPIC_API_KEY` is for the AI chatbot (KofeeBot).  
> Get it from → https://console.anthropic.com → API Keys  
> If you don't have one, the chatbot will still work with a fallback message.

---

## ✅ STEP 5 — Install Dependencies

Open **VS Code Terminal** (`Ctrl + ~`) and run:

```bash
# Go to project root
cd kofeetek

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Go back to root
cd ..
```

---

## ✅ STEP 6 — Run the Development Server

You need **two terminals** open:

### Terminal 1 — Start Backend (Express API):
```bash
cd kofeetek/server
npm run dev
```
You should see: `🚀 KofeeTek API running on http://localhost:5000`

### Terminal 2 — Start Frontend (React):
```bash
cd kofeetek/client
npm run dev
```
You should see: `➜  Local: http://localhost:3000/`

---

## ✅ STEP 7 — Open in Browser

Visit: **http://localhost:3000**

You should see the full KofeeTek website with:
- 3D animated hero section
- Real machine photos
- Real consumable product images
- Lead popup (appears after 5 seconds)
- WhatsApp floating button
- AI chatbot (KofeeBot)

### Admin Panel:
Visit: **http://localhost:3000/admin/login**
- Email: `admin@kofeetek.in`
- Password: (what you set in Supabase)

---

## ✅ STEP 8 — Test Lead Capture

1. Open the website → wait 5 seconds for popup
2. Fill in the form and submit
3. Go to Supabase → **Table Editor → leads**
4. You should see your test lead appear ✅

---

## 🚀 DEPLOYMENT (Production)

### Frontend — Deploy to Vercel (Free):
```bash
cd kofeetek/client
npm run build
```
1. Go to → **https://vercel.com** → New Project
2. Import your project / upload the `dist/` folder
3. Add environment variables (same as client `.env` but without `VITE_API_URL`)
4. Set `VITE_API_URL` to your server URL (e.g. `https://api.kofeetek.in`)
5. Deploy!

### Backend — Deploy to Railway (Free tier available):
1. Go to → **https://railway.app** → New Project
2. Deploy from GitHub or upload server folder
3. Add all environment variables from `server/.env`
4. Railway gives you a URL like `https://kofeetek-api.railway.app`
5. Update `VITE_API_URL` in Vercel to this URL

### Domain Setup:
- You have an existing domain → point it to Vercel (follow Vercel DNS guide)
- Add `www.kofeetek.in` as custom domain in Vercel

---

## 📱 WhatsApp Integration

The sticky WhatsApp button is pre-configured with number: **+91 99622 42499**

Pre-filled message: `"Hi KofeeTek, I would like to schedule a demo."`

To change the number, search for `9962242499` in the codebase.

---

## 🗂️ Pages Reference

| URL | File | Description |
|-----|------|-------------|
| `/` | `pages/Home.jsx` | Landing page with 3D hero |
| `/about` | `pages/About.jsx` | Company story, timeline |
| `/products` | `pages/Products.jsx` | All machines with real photos |
| `/consumables` | `pages/Consumables.jsx` | All consumable products |
| `/rental` | `pages/Rental.jsx` | Rental plans & process |
| `/industries` | `pages/Industries.jsx` | Industries served |
| `/clients` | `pages/Clients.jsx` | Real client list + testimonials |
| `/contact` | `pages/Contact.jsx` | Contact form + map |
| `/admin/login` | `pages/admin/AdminLogin.jsx` | Admin login |
| `/admin` | `pages/admin/AdminDashboard.jsx` | Dashboard |
| `/admin/leads` | `pages/admin/AdminLeads.jsx` | Lead management |

---

## 🔧 Customisation Quick Reference

### Change Phone Number:
Search `9962242499` across all files → replace with your number

### Change Email:
Search `sales@kofeetek.in` → replace

### Change Colors:
Edit `client/tailwind.config.js` → `theme.extend.colors.brand`

### Add New Machine:
Edit `client/src/pages/Products.jsx` → add to `allMachines` array  
Place machine image in `client/public/assets/machines/`

### Add New Consumable:
Edit `client/src/pages/Consumables.jsx` → add to `consumables` array  
Place product image in `client/public/assets/consumables/`

---

## ❗ Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| White screen on load | Check browser console — usually missing `.env` values |
| 3D hero not showing | Three.js needs WebGL — use Chrome/Edge, not Safari |
| Lead form not saving | Check Supabase `anon` key in `client/.env` |
| Admin login fails | Make sure user exists in Supabase Auth → Users |
| Popup not showing | It shows once per session (uses `sessionStorage`) |
| Images broken | Make sure all files are in `client/public/assets/` |
| Chat not responding | Check `ANTHROPIC_API_KEY` in `server/.env` |

---

## 📞 Support

**KofeeTek Contact:**
- Phone: +91 99622 42499 / +91 80728 47972
- Email: sales@kofeetek.in
- Web: www.kofeetek.in
- Address: Plot No 10, C-Block, G3, Kalpathru Garden, Priya Nagar, Urapakkam – 603210
