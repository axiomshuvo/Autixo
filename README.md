# Autixo

A modern car rental platform — browse vehicles, book rentals, and manage listings.

## Stack

|              |                                          |
| ------------ | ---------------------------------------- |
| **Frontend** | Next.js 16, React 19, Tailwind CSS 4     |
| **UI**       | HeroUI v3, Swiper, React Icons           |
| **Auth**     | Better Auth                              |
| **Backend**  | Express 5, MongoDB                       |

## Project Structure

```
autixo/
├── autixo_frontend/    # Next.js 16 App Router
│   └── src/
│       ├── app/        # Route groups: (auth), (dashboard), pages
│       ├── components/ # Navbar, HeroSlider, Footer, Toast
│       ├── providers/  # Theme & logo controllers
│       └── lib/        # Shared data
│
└── autixo_backend/     # Express 5 API server
    └── index.js        # Entry point
```

## Getting Started

**Prerequisites:** Node.js 18+, npm 9+

### Backend

```bash
cd autixo_backend
npm install
npm run dev
```

### Frontend

```bash
cd autixo_frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Path            | Page                   |
| --------------- | ---------------------- |
| `/`             | Home — hero carousel   |
| `/about`        | About Autixo           |
| `/contact`      | Contact                |
| `/login`        | Sign in                |
| `/register`     | Create account         |
| `/add-car`      | List a car for rent    |
| `/my-bookings`  | Booking dashboard      |

## Progress

- ✅ Theming (light/dark mode)
- ✅ Hero carousel (Swiper, fade effect)
- ✅ Navigation shell + custom 404
- ✅ Toast notifications
- 🚧 Authentication flow
- 🚧 Car browsing & booking system
- 🚧 Owner dashboard & car listings
- 🚧 Responsive polish

## License

MIT © [Pradipta Sarker](https://github.com/axiomshuvo)
