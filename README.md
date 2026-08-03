# Autixo 🚗

Autixo is a polished full-stack car rental marketplace built for discovering vehicles, browsing listings, booking rides, and managing rentals from a centralized dashboard. It pairs a Next.js frontend with an Express + MongoDB backend to deliver a smooth experience for both renters and vehicle owners.

## 🌐 Live Demo

[Visit Autixo](https://autixo.vercel.app)

## ✨ What Autixo can do

- Browse and search a curated collection of car listings
- View detailed car pages with features, specs, and owner info
- Add, edit, and manage your own car listings from the dashboard
- Book vehicles and manage active reservations
- Sign in using Better Auth and Google OAuth
- Enjoy responsive layouts with light/dark theme support

## 🧩 Tech stack

### Frontend

- Next.js 16
- React 19
- App Router
- Tailwind CSS 4 + HeroUI
- Swiper and React Icons

### Backend

- Node.js + Express 5
- MongoDB Atlas with the official Node.js driver
- CORS and dotenv
- Better Auth authentication

## 📁 Project structure

```text
Autixo/
├── autixo_frontend/
│   ├── public/                  # Static assets and images
│   ├── src/
│   │   ├── app/                 # App Router pages and route groups
│   │   │   ├── (auth)/          # Login and registration flows
│   │   │   ├── (dashboard)/     # User dashboard pages
│   │   │   ├── about/           # About page
│   │   │   ├── contact/         # Contact page
│   │   │   ├── explore-cars/    # Car browsing and detail pages
│   │   │   └── api/             # Client-side API routes
│   │   ├── components/          # Reusable UI components
│   │   └── providers/           # Theme and logo providers
│   └── package.json
├── autixo_backend/
│   ├── index.js                 # Express server and database routes
│   └── package.json
├── LICENSE
└── README.md
```

## 🚀 Quick start

### Prerequisites

- Node.js 18 or later
- npm 9 or later
- MongoDB Atlas connection string

### 1) Configure backend environment

Create `autixo_backend/.env`:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
```

### 2) Configure frontend environment

Create `autixo_frontend/.env.local`:

```env
DATA_URI=http://localhost:5001
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3) Start the backend

```bash
cd autixo_backend
npm install
node index.js
```

For automatic reloads during development:

```bash
npx nodemon index.js
```

### 4) Start the frontend

```bash
cd autixo_frontend
npm install
npm run dev
```

Open http://localhost:3000 to use the app.

## 🧭 Main routes

- `/` - Home page with hero section and featured cars
- `/explore-cars` - Browse available vehicles
- `/explore-cars/[id]` - Detailed car page
- `/add-car` - Add a new listing
- `/my-added-cars` - View and manage your owned cars
- `/my-bookings` - Track and cancel bookings
- `/profile` - User profile management
- `/about` - Platform overview
- `/contact` - Contact form
- `/login` / `/register` - Authentication pages

## 🔌 API highlights

| Method   | Route                     | Purpose                      |
| -------- | ------------------------- | ---------------------------- |
| `GET`    | `/`                       | Health check                 |
| `GET`    | `/cars`                   | Fetch paginated car listings |
| `GET`    | `/cars/random`            | Fetch featured cars          |
| `GET`    | `/explore-cars/:id`       | Fetch a single car by ID     |
| `POST`   | `/add-car`                | Create a new car listing     |
| `GET`    | `/my-added-cars/:ownerId` | Fetch cars owned by a user   |
| `PUT`    | `/cars/:id`               | Update a car listing         |
| `DELETE` | `/delete-car/:id`         | Delete a car listing         |
| `POST`   | `/bookings`               | Create a booking             |
| `GET`    | `/bookings/user/:userId`  | Fetch user bookings          |
| `DELETE` | `/bookings/:id`           | Cancel a booking             |

## 📄 License

This project is licensed under the [MIT License](LICENSE).

Built and maintained by [Pradipta Sarker](https://github.com/axiomshuvo)
