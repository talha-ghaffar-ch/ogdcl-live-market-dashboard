# OGDCL Live Market Dashboard

A secure, autonomous, and real-time internal market dashboard specifically built for the **Oil & Gas Development Company Limited (OGDCL)** to monitor live stock prices from the Pakistan Stock Exchange (PSX).

> **Notice:** This project has been developed with the approval of the Systems Department of OGDCL, and is strictly designed for internal use. All rights reserved.

---

## 🚀 Features
- **Real-Time Web Scraping**: Automatically fetches live PSX market data (Current Price, Open, High, Low, Volume, Percent Change) directly from the official source.
- **Interactive Intraday Charts**: Uses `lightweight-charts` to plot beautiful candlestick and line graphs detailing daily stock performance.
- **Autonomous Uptime Architecture**: Built-in NodeJS RAM caching logic prevents PSX server blocks, ensuring 24/7 uptime without manual intervention.
- **Automated Market Status**: A native time-zone (PKT) algorithm detects local market hours (Mon-Fri) and automatically triggers OPEN/CLOSED visual statuses.
- **Corporate Branding**: Adheres to official OGDCL Deep Blue & Orange design aesthetics with immersive, premium UI/UX micro-animations.

---

## 📂 Project Structure

This project is a full-stack application divided into two primary modules:

### 1. `backend/` (Node.js & Express)
The backend acts as an autonomous proxy server. It utilizes `cheerio` to web-scrape the HTML of the PSX Data Portal, bypassing traditional API blocks. It temporarily caches the data in memory for 10 seconds to protect against rate limits and guarantees smooth frontend delivery.

### 2. `frontend/` (React, Vite, Tailwind CSS)
The frontend is a beautifully designed dashboard utilizing `framer-motion` for animations, `lucide-react` for icons, and `lightweight-charts` for charting. It continuously polls the backend every 15 seconds to fetch live data without ever requiring the user to refresh their browser.

---

## 🛠️ Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Step 1: Install Dependencies
You must install the NPM packages for both the backend and frontend.

Open a terminal and run:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Running the Application

To run the full project, you need to start **both** servers simultaneously in two separate terminal windows.

**Terminal 1 (Backend Server):**
```bash
cd backend
npm run dev
```
*(The backend will start running on `http://localhost:4000`)*

**Terminal 2 (Frontend Dashboard):**
```bash
cd frontend
npm run dev
```
*(The frontend will start running on `http://localhost:5173`)*

### Step 3: View the Dashboard
Open your preferred web browser and navigate to:
**http://localhost:5173**

---

## 📜 License & Ownership
Copyright © 2026 Oil & Gas Development Company Limited (OGDCL). All Rights Reserved.

This software is strictly for internal use by OGDCL. Any unauthorized reproduction, distribution, modification, or public display of this codebase is strictly prohibited. See the `LICENSE` file for more details.
