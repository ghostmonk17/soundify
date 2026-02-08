
# 🎵 Soundify – Full Stack Music Streaming App

  

Soundify is a full-stack music streaming web application built using **React, TypeScript, Node.js, Express, and MongoDB**.

It integrates the **Jamendo API** for free and legal music streaming and supports user authentication, favorites, playlists, and playback controls.

  

This project follows **clean architecture principles** with clear separation between UI, logic, state, and API layers.

  

---

  

## 🚀 Features

  

### 🔐 Authentication

- User signup & login

- JWT-based authentication (Access + Refresh tokens)

- Protected backend APIs

- Token-based session handling

  

### 🎶 Music Streaming

- Fetch real songs from **Jamendo API**

- Music playback with custom player

- Play / Pause

- Next / Previous

- Seek bar (progress slider)

- Volume control

- Mute / Unmute

- Auto-play next song

  

### ❤️ Favorites

- Like / Unlike songs

- Favorites stored in MongoDB

- Persisted across sessions

- Synced with backend

  

### 🕘 History & Personalization

- Recently played songs

- Listening history tracking

- User profile data

  

### 🎨 UI / UX

- Responsive design (Mobile + Desktop)

- Dark / Light mode

- Active song highlighting

- Loading skeletons

- Reusable UI components

  

---

  

## 🧱 Architecture

  

### Frontend

- React + TypeScript

- Context API for global state

- Custom hooks for logic

- Service layer for API calls

- No business logic inside UI components

  

### Backend

- Node.js + Express + TypeScript

- MongoDB (Atlas)

- REST APIs

- JWT authentication

- Middleware-based route protection

  

### Data Flow

Frontend (React)

↓

Backend (Express API)

↓

Jamendo API (Music)

↓

MongoDB (Users, Favorites, Playlists)

  
  

---

  

## 📁 Project Structure

  

soundify/

│ ├── src/

│ │ ├── components/

│ │ ├── pages/

│ │ ├── context/

│ │ ├── hooks/

│ │ ├── services/

│ │ ├── routes/

│ │ └── utils/

│ └── package.json

│

├── backend/

│ ├── src/

│ │ ├── config/

│ │ ├── modules/

│ │ ├── models/

│ │ ├── utils/

│ │ ├── middlewares/

│ │ ├── routes.ts

│ │ ├── app.ts

│ │ └── server.ts

│ └── package.json

│

├── .gitignore

├── README.md

  
  

---

  

## ⚙️ Environment Variables

  

### Backend (`backend/.env`)

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

# Imagekit credentials
# get from https://imagekit.io/dashboard/developer/api-keys
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=

#jwt
JWT_SECRET=
JWT_EXPIRES_IN=

#Mailtrap
# get from https://mailtrap.io/inboxes
MAILTRAP_HOST=
MAILTRAP_PORT=
MAILTRAP_USER=
MAILTRAP_PASS=

FRONTEND_URL=http://localhost:5173

# get from https://devportal.jamendo.com/admin/applications
JAMENDO_CLIENT_ID=

```

  

## 📌 Tech Stack

- Frontend: React, TypeScript, Tailwind CSS, Context API, Vite

- Backend: Node.js, Express, TypeScript

- Database: MongoDB Atlas

- Auth: JWT (Access + Refresh)

- Music API: Jamendo API

  

## ⚙️ Installation & Setup

  

1️⃣ Clone Repository

```bash
git  clone  https://github.com/ghostmonk17/soundify.git
cd  soundify

```

  

2️⃣ Frontend Setup

```bash
npm  install
npm  run  dev
```
Runs at: `http://localhost:8080`



3️⃣ Backend Setup

```bash
cd  backend
npm  install
npm  run  dev
```

Runs at: ` http://localhost:5000`


  
  

## 🤝 Contributing

Contributions are welcome.
-	Fork this repository
-	Create a feature branch
-	Commit your changes
-	Push to your fork
-	Open a Pull Request

  

## 📄 License

This project is licensed under the MIT License.

  

## 👨‍💻 Authors

**Prathmesh Alkute**<br>
GitHub: https://github.com/ghostmonk17
LinkedIn: https://linkedin.com/in/prathmeshalkute

**Sachin Vishakarma**<br>
GitHub: https://github.com/itzsv413
LinkedIn: https://linkedin.com/in/sachin-vishwakarma413/

**Pravin Patil**<br>
GitHub: https://github.com/pravinpatil05
LinkedIn: www.linkedin.com/in/patilpravin6846
