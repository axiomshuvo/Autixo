# Autixo — Modern Car Rental Platform (Frontend)

A responsive car rental web application built with **Next.js 16 App Router** and **React 19**, designed for users to browse available cars, manage bookings, and handle authentication — all wrapped in a clean, dark/light themeable UI.

> **Status:** Early development — core shell, routing, and theming are in place. Pages are scaffolded and ready for feature implementation.

---

## Tech Stack

| Layer          | Technology                                           |
| -------------- | ---------------------------------------------------- |
| **Framework**  | [Next.js 16](https://nextjs.org/) (App Router)        |
| **UI Library** | [HeroUI v3](https://heroui.com/) (formerly NextUI)    |
| **Styling**    | [Tailwind CSS 4](https://tailwindcss.com/)             |
| **Carousel**   | [Swiper 14](https://swiperjs.com/) (fade effect)       |
| **Auth**       | [Better Auth](https://www.better-auth.com/)            |
| **Database**   | MongoDB (via backend API)                             |
| **Icons**      | [React Icons](https://react-icons.github.io/react-icons/) |
| **Font**       | Figtree (Google Fonts, variable weight)                |

---

## Getting Started

### Prerequisites
- **Node.js** 18+ and **npm** 9+

### Setup

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Available Scripts

| Command          | Description                  |
| ---------------- | ---------------------------- |
| `npm run dev`    | Start dev server with HMR    |
| `npm run build`  | Production build             |
| `npm run start`  | Start production server      |
| `npm run lint`   | Run ESLint                   |

---

## Folder Structure

```
autixo_frontend/
├── public/
│   └── assets/                    # Static images
│       ├── autixo_logo_dark.png   # Logo for light mode
│       ├── autixo_logo_white.png  # Logo for dark mode
│       └── slider-image[1-4].jpg # Hero carousel images
│
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/                # Auth route group
│   │   │   ├── login/page.jsx     # User login
│   │   │   └── register/page.jsx  # User registration
│   │   ├── (dashboard)/           # Protected dashboard routes
│   │   │   ├── add-car/page.jsx   # List a car for rent
│   │   │   └── my-bookings/page.jsx # View booking history
│   │   ├── about/page.jsx         # About Autixo
│   │   ├── contact/page.jsx       # Contact page
│   │   ├── layout.js              # Root layout (shell)
│   │   ├── page.js                # Home page
│   │   ├── not-found.js           # Custom 404 page
│   │   ├── favicon.ico
│   │   └── globals.css            # Global styles + HeroUI theme tokens
│   │
│   ├── components/                # Reusable UI components
│   │   ├── Navbar.jsx             # Top nav: logo, links, theme toggle
│   │   ├── HeroSlider.jsx         # Full-width image carousel (Swiper)
│   │   ├── Footer.jsx             # Site footer (WIP)
│   │   └── Toast.jsx              # Toast notification provider
│   │
│   ├── providers/                 # Client-side context providers
│   │   ├── LogoImageController.jsx # Swaps logo based on theme
│   │   └── ThemeController.jsx     # Light/dark mode toggle switch
│   │
│   └── lib/
│       └── data.js                # Slider content & shared data
│
├── package.json
├── next.config.mjs
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

### Where things live

- **Route groups** — `(auth)` and `(dashboard)` use Next.js route grouping to keep URLs clean (`/login`, `/register`, `/add-car`, `/my-bookings`) without folder names appearing in the URL.
- **`providers/`** — Client components that read/write `data-theme` on `<html>` for light/dark mode. The logo and theme switch use a `MutationObserver` and `localStorage` to sync state across components without a React context wrapper.
- **`lib/data.js`** — Single source of truth for slider images and copy. Add new slides here and they automatically render in the hero carousel.

---

## Routes

| Path            | Page                         | Status        |
| --------------- | ---------------------------- | ------------- |
| `/`             | Home — hero carousel         | ✅ Implemented |
| `/add-car`      | Car listing form             | 🧱 Scaffolded  |
| `/my-bookings`  | User booking dashboard       | 🧱 Scaffolded  |
| `/about`        | About Autixo                 | 🧱 Scaffolded  |
| `/contact`      | Contact form / info          | 🧱 Scaffolded  |
| `/login`        | Sign in                      | 🧱 Scaffolded  |
| `/register`     | Create account               | 🧱 Scaffolded  |
| `/*` (catch-all) | Custom 404                  | ✅ Implemented |

---

## Features (Roadmap)

### ✅ Done
- **Theming** — Light/dark mode via `data-theme` attribute, persisted to `localStorage`. Logo switches automatically. Uses HeroUI's CSS variable system with custom accent colors.
- **Hero carousel** — Swiper-based full-width slider with a cross-fade effect, overlay text, and auto-play. Slides are data-driven from `lib/data.js`.
- **Navigation shell** — Persistent navbar across all pages with logo, nav links, auth links, and a theme toggle switch.
- **Custom 404** — Branded not-found page for unmatched routes.
- **Toast provider** — HeroUI `ToastProvider` mounted in the root layout for app-wide notifications.

### 🚧 Planned / In Progress
- **Authentication flow** — Login/register pages with Better Auth integration, session management, and protected route middleware.
- **Car browsing** — Grid/list of available cars with search, filter, and sort capabilities.
- **Car details page** — Individual car listing with images, specs, pricing, and a "Book Now" CTA.
- **Booking system** — Date picker, booking confirmation, and booking history in the dashboard (`/my-bookings`).
- **Car listing** — Authenticated users can list their own cars for rent at `/add-car` with image uploads.
- **Footer** — Site footer with quick links, social icons, and contact info.
- **Responsive design** — Mobile-first breakpoints throughout (Navbar hamburger menu, touch-friendly carousel).
- **SEO & Metadata** — Per-page metadata (Open Graph, Twitter cards) for better sharing.

---

## Design Decisions

### Theme Architecture
Instead of a React context, theming uses a `data-theme` attribute on `<html>`. Components observe it via a `MutationObserver`. This keeps the theme system decoupled — any component (or even vanilla JS) can read the current theme by checking `document.documentElement.getAttribute("data-theme")`.

### Swiper Fade Effect
The hero carousel uses Swiper's `EffectFade` module with `crossFade: true`. Each slide requires `swiper/css/effect-fade` imported alongside the base CSS. Without the module import, the `effect` prop is silently ignored and Swiper falls back to a horizontal slide.

### Route Grouping
`(auth)` and `(dashboard)` are Next.js route groups — the parenthesised folder names are stripped from the URL. This keeps the file tree organised while exposing clean paths like `/login` and `/add-car` instead of `/auth/login` or `/dashboard/add-car`.

---

## Environment Variables

> *No environment variables are required yet for the frontend alone. API keys and database connection strings will be needed once backend integration begins.*
