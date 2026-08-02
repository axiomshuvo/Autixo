# Autixo 🚗

Autixo is a modern full-stack car rental marketplace built for discovering vehicles, browsing listings, booking rides, and managing rentals from a polished dashboard. The project combines a Next.js frontend with an Express + MongoDB backend to deliver a smooth experience for both visitors and car owners.

## 🌐 Live Demo

[Visit Autixo](https://autixo.vercel.app)

## ✨ What the app offers

- Browse and search a growing collection of car listings
- View detailed car pages and featured random selections
- Add, edit, and manage your own car listings from the dashboard
- Book cars and track your bookings in a dedicated area
- Sign in with Better Auth and Google OAuth support
- Enjoy a responsive experience with light/dark theme support

## 🛠️ Tech stack

### Frontend

- Next.js 16
- React 19
- App Router
- Tailwind CSS 4 + HeroUI
- Swiper and React Icons

### Backend

- Node.js + Express 5
- MongoDB Atlas with the MongoDB Node.js driver
- CORS and dotenv
- Better Auth for authentication flows

## 📁 Project structure

```text
Autixo/
├── autixo_frontend/
│   ├── public/                  # Static assets and images
│   ├── src/
│   │   ├── app/                 # App Router pages and route groups
│   │   │   ├── (auth)/          # Login and registration pages
│   │   │   ├── (dashboard)/     # Dashboard-related routes
│   │   │   ├── about/           # About page
│   │   │   ├── contact/         # Contact page
│   │   │   ├── explore-cars/    # Car browsing and detail pages
│   │   │   └── api/             # Auth and booking API routes
│   │   ├── components/          # Reusable UI components
│   │   └── providers/           # Theme and logo providers
│   └── package.json
├── autixo_backend/
│   ├── index.js                 # Express server and MongoDB routes
│   └── package.json
├── LICENSE
└── README.md
```

## 🚀 Getting started

### Prerequisites

- Node.js 18 or later
- npm 9 or later
- A MongoDB Atlas connection string

### 1) Configure environment variables

Create an environment file in the backend folder:

```env
# autixo_backend/.env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
```

Create a frontend env file:

```env
# autixo_frontend/.env.local
DATA_URI=http://localhost:5001
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 2) Run the backend

```bash
cd autixo_backend
npm install
node index.js
```

For development with auto-restart:

```bash
npx nodemon index.js
```

### 3) Run the frontend

```bash
cd autixo_frontend
npm install
npm run dev
```

The app should be available at http://localhost:3000.

## 🧭 Main routes

- `/` - Home page with hero, featured cars, and stats
- `/explore-cars` - Browse available vehicles
- `/explore-cars/[id]` - Detailed car view
- `/add-car` - Add a new listing
- `/my-added-cars` - Manage listings owned by the signed-in user
- `/my-bookings` - View and manage bookings
- `/profile` - User profile page
- `/about` - Company and platform information
- `/contact` - Contact page
- `/login` and `/register` - Authentication pages

## 🔌 API highlights

| Method   | Route                     | Purpose                        |
| -------- | ------------------------- | ------------------------------ |
| `GET`    | `/`                       | Health check                   |
| `GET`    | `/cars`                   | Fetch paginated car listings   |
| `GET`    | `/cars/random`            | Fetch six random featured cars |
| `GET`    | `/explore-cars/:id`       | Fetch a single car by ID       |
| `POST`   | `/add-car`                | Create a new car listing       |
| `GET`    | `/my-added-cars/:ownerId` | Fetch cars owned by a user     |
| `PUT`    | `/cars/:id`               | Update a car listing           |
| `DELETE` | `/delete-car/:id`         | Delete a car listing           |
| `POST`   | `/bookings`               | Create a booking               |
| `GET`    | `/bookings/user/:userId`  | Fetch bookings for a user      |
| `DELETE` | `/bookings/:id`           | Cancel a booking               |

## 📄 License

This project is licensed under the [MIT License](LICENSE).

Copyright (c) 2026 [Pradipta Sarker](https://github.com/axiomshuvo)
