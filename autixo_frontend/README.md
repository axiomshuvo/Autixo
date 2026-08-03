# Autixo Frontend

Autixo frontend is a modern Next.js app for browsing, booking, and managing car listings with a polished dashboard experience.

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
| Data      | MongoDB via backend API and Better Auth     |

## Getting Started

Prerequisites: Node.js 18+ and npm 9+

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start the local development server |
| `npm run build` | Build the app for production       |
| `npm run start` | Start the production build         |
| `npm run lint`  | Run ESLint checks                  |

## Environment Variables

Create a `.env.local` file with values similar to:

```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
DATA_URI=http://localhost:5000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=<app>
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

| Variable                      | Used for                                          |
| ----------------------------- | ------------------------------------------------- |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Client-side Better Auth base URL                  |
| `BETTER_AUTH_SECRET`          | Better Auth signing secret                        |
| `BETTER_AUTH_URL`             | Better Auth server base URL                       |
| `DATA_URI`                    | Backend API base URL for car and booking requests |
| `MONGODB_URI`                 | Better Auth MongoDB adapter connection            |
| `GOOGLE_CLIENT_ID`            | Google OAuth provider setup                       |
| `GOOGLE_CLIENT_SECRET`        | Google OAuth provider setup                       |

## Main Routes

| Path                 | Description                                      | Status      |
| -------------------- | ------------------------------------------------ | ----------- |
| `/`                  | Home page with hero slider and featured sections | Implemented |
| `/explore-cars`      | Browse and view car listings                     | Implemented |
| `/explore-cars/[id]` | Car details page                                 | Implemented |
| `/add-car`           | Create a new car listing                         | Implemented |
| `/my-added-cars`     | View cars added by the current user              | Implemented |
| `/my-bookings`       | View bookings made by the user                   | Implemented |
| `/about`             | About page                                       | Implemented |
| `/contact`           | Contact page                                     | Implemented |
| `/login`             | Login page                                       | Implemented |
| `/register`          | Register page                                    | Implemented |
| `/*`                 | Custom 404 page                                  | Implemented |

## Current Features

- Dark/light theme toggle with persisted preference
- Responsive home page with Swiper hero slider
- Explore cars and detail pages
- Add-car workflow with image and feature metadata
- My Added Cars and My Bookings dashboards
- Better Auth session handling and protected routes
- Shared API helpers for cars, bookings, and profile requests

## Notes

- Route groups like `(auth)` and `(dashboard)` keep the app organized without changing public URLs.
- Data requests are routed through shared helpers so the frontend can work with a consistent backend contract.

## License

MIT © [Pradipta Sarker](https://github.com/axiomshuvo)
