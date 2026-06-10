# SafeHer - Deployment Guide for Render

This guide explains how to deploy the **SafeHer** full-stack application (Backend Node.js server + Frontend React static site) on **[Render](https://render.com/)**.

---

## 🛠️ Step 1: Deploy the Backend (Web Service)

The backend is a Node.js Express API server. On Render, it will be deployed as a **Web Service**.

1. Go to your **[Render Dashboard](https://dashboard.render.com/)** and click **New+** -> **Web Service**.
2. Connect your GitHub repository (`women-safety`).
3. Configure the service with the following settings:
   - **Name**: `women-safety-backend`
   - **Environment**: `Node`
   - **Region**: Select a region close to your database (e.g., Singapore or Oregon).
   - **Branch**: `main`
   - **Root Directory**: `backend` *(CRITICAL: This points Render to the backend subdirectory)*
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Scroll down and click **Advanced** -> **Add Environment Variable**. Add the following:
   - `SUPABASE_URL` = `your_supabase_project_url`
   - `SUPABASE_ANON_KEY` = `your_supabase_anon_key`
   - `SUPABASE_SERVICE_ROLE_KEY` = `your_supabase_service_role_key`
5. Click **Create Web Service**.
6. **Note your Service URL**: Once deployed, Render will generate a URL for your backend (e.g., `https://women-safety-backend.onrender.com`). **Copy this URL** for the frontend step.

---

## 💻 Step 2: Deploy the Frontend (Static Site)

The frontend is a React SPA built with Vite. It compiles down to static HTML/JS/CSS assets. On Render, it will be deployed as a **Static Site** (which is 100% free!).

1. In your Render Dashboard, click **New+** -> **Static Site**.
2. Connect your GitHub repository (`women-safety`).
3. Configure the site with the following settings:
   - **Name**: `women-safety`
   - **Branch**: `main`
   - **Root Directory**: `frontend` *(CRITICAL: This points Render to the frontend subdirectory)*
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Click **Advanced** -> **Add Environment Variable**. Add the following:
   - `VITE_SUPABASE_URL` = `your_supabase_project_url`
   - `VITE_SUPABASE_ANON_KEY` = `your_supabase_anon_key`
   - `VITE_BACKEND_URL` = *[Paste your Render Backend Service URL from Step 1]* (e.g., `https://women-safety-backend.onrender.com`)
5. Click **Create Static Site**.

---

## 🔒 Step 3: Configure Redirects for Single-Page Routing (React Router)

Since the frontend uses client-side routing (`react-router-dom`), you must configure Render to redirect all paths to the index shell so routing doesn't throw 404 errors on refresh:

1. In your Render Frontend Static Site dashboard, click on **Redirects/Rewrites** in the left menu.
2. Click **Add Rule**.
3. Set the following:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
4. Save the rule.
