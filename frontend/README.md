# SafeHer - Full-Stack Women Safety Web Application

SafeHer is a responsive, full-stack safety prep and emergency SOS platform designed to safeguard women in physical, digital, and transit environments.

## 🚀 Key Features

1. **User Authentication (Supabase Auth + Mock Session Fallback)**:
   - Secure login, registration, and Google OAuth.
   - Built-in LocalStorage **Mock Auth Fallback** if Supabase coordinates are not configured in your `.env` file, allowing direct local testing without any external setups!
2. **Emergency SOS Trigger (Web Audio API Siren)**:
   - High-decibel audio siren synthesized directly inside browser audio nodes (zero external download dependencies).
   - Prominent, pulsating dashboard SOS button with concentric ripple animations.
3. **Live Geolocation Mapping (Google Maps API + Local Radar Fallback)**:
   - Integrated with HTML5 Geolocation API for GPS location tracking.
   - Includes a custom **Safety Radar Scan UI** with rotating sweeping grid animations that lists nearest emergency hubs (police checkpoints, hospitals) if Google Maps key is omitted.
4. **Guardians Circle (Emergency Contacts CRUD)**:
   - CRUD database managing trusted contacts (Name, Relationship, Phone number).
   - One-click instant calling hook and emergency location SMS template broadcaster.
5. **Incident Reporting Desk**:
   - Secure form to log street harassment, stalking, or unsafe areas.
   - Supports anonymous logging and image evidence attachment (uploads directly to **Supabase Storage** with a Local FileReader base64 preview fallback).
6. **Multi-language Support (i18n)**:
   - Switch the entire website interface dynamically between **English** and **Hindi (हिन्दी)**.
7. **Dark / Light Mode**:
   - Custom styled toggle utilizing Tailwind CSS theme switches.

---

## 📂 Project Structure

```
src/
├── components/          # Reusable modules (SOSButton, Radar Map, Profile widgets)
├── context/             # AuthContext, Language translation hooks, Theme providers
├── supabaseClient.js    # Supabase SDK configuration
├── i18n/                # English & Hindi translation dictionaries
├── pages/               # Routing targets (Home, Emergency, Dashboard, Log Report, Tips)
└── index.css            # Tailwind directives and custom animation layers
```

---

## 🛠️ Setup and Launch

### 1. Install Dependencies
Run from the root directory:
```bash
npm install
```

### 2. Configure Environment Variables
Rename the template `.env.example` to `.env` and enter your credentials:
```bash
cp .env.example .env
```
Open `.env` and fill in your Supabase and Google Maps details:
```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_BACKEND_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 3. Run Dev Server
Launch Vite's development environment locally:
```bash
npm run dev
```
Open your browser and navigate to the address shown (usually `http://localhost:5173`).

---

## 📦 Production Build & Vercel Deploy-Ready

To compile assets for deployment (e.g. Vercel, Netlify):
```bash
npm run build
```
This outputs compiled assets into a `dist/` directory.

---

## 🐙 Git Pushing

To link this repository to your own GitHub remote and push the codebase:
```bash
git remote add origin <your_github_repo_url>
git push -u origin main
```
