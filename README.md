🧭 Smart Campus Navigation System
📌 Overview

The Smart Campus Navigation System is a full-stack web application designed to provide seamless navigation within a campus environment. It enables students, visitors, and faculty to locate buildings, departments, and facilities with real-time directions and optimized routing.

🚀 Key Features
📍 Accurate Real-Time Location Tracking
Integrates GPS-based positioning to detect user location across campus
Ensures precise outdoor navigation experience
🗺️ Interactive & User-Friendly Navigation
Interactive map interface for searching buildings and facilities
Step-by-step route guidance with visual path display
⚡ Smart Route Optimization
Uses efficient path-finding algorithms to compute shortest and safest routes
Handles multiple navigation scenarios dynamically
🔄 Seamless Integration & Scalability
Easily extendable to include new buildings and updated routes
Supports dynamic updates like events or temporary closures
🧭 Manual Location Entry
Allows users to manually enter their location if GPS fails
Ensures uninterrupted navigation in low-signal areas

🛠️ Tech Stack
🎨 Frontend
React.js – Interactive UI development
Leaflet.js – Map rendering and route visualization
Tailwind CSS / Material UI – Responsive design
⚙️ Backend
Node.js – Runtime environment
Express.js – REST API development
🗄️ Database
PostgreSQL – Data storage
PostGIS – Geospatial queries and shortest-path calculations

📂 Project Structure
campus-navigation-system/
│── client/              # React frontend
│── server/              # Node.js backend
│── routes/              # API routes
│── controllers/         # Business logic
│── models/              # Database models
│── public/
│── README.md

⚙️ How to Run the Project
1️⃣ Clone the repository
git clone https://github.com/bonthushalini/campus-navigation-system.git
2️⃣ Navigate to project folder
cd campus-navigation-system
3️⃣ Install dependencies

Frontend

cd client
npm install

Backend

cd ../server
npm install
4️⃣ Start the application

Backend

npm start

Frontend

cd ../client
npm start

📊 Use Cases
Helps new students navigate large campuses easily
Assists visitors in locating departments and facilities
Reduces time spent searching for locations
