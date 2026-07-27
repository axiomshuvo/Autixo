# Autixo

**Autixo** is a full-stack car rental platform for discovering vehicles, exploring available options, and managing rental journeys through a polished, responsive interface.

## Live Application

[Visit Autixo](https://autixo.vercel.app)

## Overview

The project is organized as a separate Next.js frontend and Express API backend. The frontend provides the public experience, authentication pages, dashboard routes, theming, and reusable interface components. The backend serves car data from MongoDB Atlas.

## Combined Tech Stack

| Area                    | Technologies                          |
| ----------------------- | ------------------------------------- |
| Frontend framework      | Next.js 16, React 19, App Router      |
| Styling and UI          | Tailwind CSS 4, HeroUI v3             |
| Interaction and visuals | Swiper, React Icons, Figtree font     |
| Authentication          | Better Auth, Google OAuth support     |
| Backend                 | Node.js, Express 5                    |
| Database                | MongoDB Atlas, MongoDB Node.js driver |
| Server utilities        | dotenv, CORS, Nodemon                 |
| Deployment              | Vercel                                |

## Features

- Responsive home page with a Swiper-powered hero carousel
- Available-car and car-stat sections powered by API data helpers
- Light and dark themes with persisted user preference
- Global navigation, footer, toast notifications, and custom 404 page
- Authentication routes with Better Auth integration
- Dedicated pages for exploring cars, adding cars, bookings, contact, and company information
- REST API endpoints for all vehicles and a random six-car selection

## Project Structure

```text
Autixo/
|- autixo_frontend/
|  |- public/                         # Public static assets
|  |- src/
|  |  |- app/
|  |  |  |- (auth)/                   # Login and registration routes
|  |  |  |- (dashboard)/              # Add-car and booking routes
|  |  |  |- about/                    # About page
|  |  |  |- api/auth/[...all]/        # Better Auth route handler
|  |  |  |- contact/                  # Contact page
|  |  |  |- explore-cars/             # Vehicle discovery page
|  |  |  `- lib/                      # Auth, data, and fetch helpers
|  |  |- assets/images/               # Brand images
|  |  |- components/                  # Navbar, footer, carousel, cards, toast
|  |  `- providers/                   # Theme and logo controllers
|  |- package.json
|  `- README.md
|- autixo_backend/
|  |- index.js                        # Express server and MongoDB routes
|  |- package.json
|  `- README.md
|- LICENSE
`- README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later
- A MongoDB Atlas connection string

### 1. Configure Environment Variables

Create environment files in each application directory.

`autixo_backend/.env`

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
```

`autixo_frontend/.env.local`

```env
DATA_URI=your_backend_api_url
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=your_frontend_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 2. Run the Backend

```bash
cd autixo_backend
npm install
node index.js
```

For development with automatic restart:

```bash
npx nodemon index.js
```

### 3. Run the Frontend

```bash
cd autixo_frontend
npm install
npm run dev
```

## Application Routes

| Route           | Purpose                                             |
| --------------- | --------------------------------------------------- |
| `/`             | Home page with hero, available cars, and statistics |
| `/explore-cars` | Car discovery page                                  |
| `/add-car`      | Car listing page                                    |
| `/my-bookings`  | Booking management page                             |
| `/about`        | Company and platform information                    |
| `/contact`      | Contact page                                        |
| `/login`        | User sign-in page                                   |
| `/register`     | User registration page                              |

## API Surface

| Method | Route          | Purpose                          |
| ------ | -------------- | -------------------------------- |
| `GET`  | `/`            | Health check                     |
| `GET`  | `/cars`        | Retrieve all car listings        |
| `GET`  | `/cars/random` | Retrieve six random car listings |

## License

This project is licensed under the [MIT License](LICENSE).

Copyright (c) 2026 [Pradipta Sarker](https://github.com/axiomshuvo)
