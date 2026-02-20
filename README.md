# Talentrix

Talentrix is a modern full-stack freelance marketplace platform built using JavaScript, React, TailwindCSS, and Node.js.

🌍 **Live Demo:client** https://talentrix-inky.vercel.app/
   **Live Demo:server** https://talentrix-jeqv.onrender.com/

---

## 📌 Overview

Talentrix is designed to simplify hiring for distributed teams.  
The platform allows users to browse categorized services, manage profiles, and interact with a structured backend system.

---

## ✨ Features

### 🔐 User Management
- Secure authentication system
- Role-based access (Client / Seller)
- Profile management

### 📂 Marketplace System
- Category-based service browsing
- Gig listings
- Dynamic UI components

### 📊 Dashboard Interface
- Hiring performance indicators
- Project tracking interface
- Clean SaaS-style layout

### 🔌 API Integration
- RESTful backend structure
- Modular routing
- Scalable architecture

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- JavaScript (ES6+)
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (if applicable)
- REST API Architecture

---

## 📁 Project Structure

Talentrix/
│
├── client/ # React + Tailwind Frontend
│ ├── src/
│ ├── assets/
│ └── components/
│
├── server/ # Node.js + Express Backend
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ └── config/
│
└── README.md

---

## ⚙️ Installation

### 1️⃣ Clone Repository

git clone https://github.com/jaispritam/talentrix.git
cd talentrix

shell
Copy code

### 2️⃣ Install Backend Dependencies

cd server
npm install
npm start

shell
Copy code

### 3️⃣ Install Frontend Dependencies

cd client
npm install
npm run dev


Frontend runs at:

http://localhost:5173

---

## 🔐 Environment Configuration

Create a `.env` file inside the `server` directory:

PORT=5000
MONGO_URL=your_database_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173

---

## 🔎 Example API Routes

GET /api/gigs
POST /api/gigs
GET /api/users
POST /api/auth/login
POST /api/auth/register


---

## 🚀 Future Enhancements

- Real-time messaging system
- AI-based talent matching
- Advanced filtering system
- Payment gateway integration
- Admin dashboard

---

## 📜 License

This project is built for educational and development purposes.

---

## 👨‍💻 Author

Pritam  
GitHub: https://github.com/jaispritam
