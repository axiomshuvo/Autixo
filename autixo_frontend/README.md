# Autixo Frontend

Autixo frontend is built with Next.js App Router and React 19 to deliver a fast, responsive car rental experience.

## Live URL

- Main App: [https://autixo.vercel.app](https://autixo.vercel.app)

## Tech Stack

| Layer     | Technology                                  |
| --------- | ------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org/)           |
| UI        | [HeroUI v3](https://heroui.com/)            |
| Styling   | [Tailwind CSS 4](https://tailwindcss.com/)  |
| Auth      | [Better Auth](https://www.better-auth.com/) |
| Carousel  | [Swiper 14](https://swiperjs.com/)          |
| Database  | MongoDB (via backend API and Better Auth)   |

## Getting Started

Prerequisites: Node.js 18+ and npm 9+

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Environment Variables

Create a `.env.local` file:

```env
DATA_URI=http://localhost:5001
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=<app>
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

| Variable               | Used for                                  |
| ---------------------- | ----------------------------------------- |
| `DATA_URI`             | Backend API base URL for car data fetches |
| `MONGODB_URI`          | Better Auth MongoDB adapter connection    |
| `BETTER_AUTH_SECRET`   | Better Auth signing secret                |
| `BETTER_AUTH_URL`      | Better Auth base URL                      |
| `GOOGLE_CLIENT_ID`     | Google OAuth provider setup               |
| `GOOGLE_CLIENT_SECRET` | Google OAuth provider setup               |

## Routes

| Path            | Description                   | Status      |
| --------------- | ----------------------------- | ----------- |
| `/`             | Home with slider and sections | Implemented |
| `/explore-cars` | Explore cars                  | Scaffolded  |
| `/add-car`      | Add car                       | Scaffolded  |
| `/my-bookings`  | Booking dashboard             | Scaffolded  |
| `/about`        | About page                    | Implemented |
| `/contact`      | Contact page                  | Scaffolded  |
| `/login`        | Login page                    | Scaffolded  |
| `/register`     | Register page                 | Scaffolded  |
| `/*`            | Custom 404 page               | Implemented |

## Current Features

- Light and dark theme toggle with persisted state
- Hero carousel using Swiper fade effect
- Home page sections: hero, available cars, car stats
- Global navigation and footer across the app
- Better Auth API route wired at `/api/auth/[...all]`

## Notes

- Route groups `(auth)` and `(dashboard)` keep file organization clean without affecting public URLs.
- Data fetching helpers call `${process.env.DATA_URI}/cars` and `${process.env.DATA_URI}/cars/random`.

## License

MIT © [Pradipta Sarker](https://github.com/axiomshuvo)
