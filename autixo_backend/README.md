# Autixo Backend

Express backend API for Autixo, connected to MongoDB Atlas and deployed on Vercel.

## Live URL

- API: [https://autixobackend.vercel.app](https://autixobackend.vercel.app)

## Tech Stack

| Layer      | Technology                    |
| ---------- | ----------------------------- |
| Runtime    | Node.js                       |
| Framework  | Express 5                     |
| Database   | MongoDB Atlas (Stable API v1) |
| Auth       | JWT via `jose-cjs`            |
| Utilities  | dotenv, cors                  |
| Deployment | Vercel                        |

## API Endpoints

Base URL: `https://autixobackend.vercel.app`

| Method | Endpoint                  | Description                                               |
| ------ | ------------------------- | --------------------------------------------------------- |
| GET    | `/`                       | Health check                                              |
| GET    | `/cars`                   | Get paginated car listings with optional search / filters |
| GET    | `/cars/random`            | Get 6 random cars                                         |
| GET    | `/explore-cars/:id`       | Get car details by ID                                     |
| POST   | `/add-car`                | Add a new car (requires Bearer JWT auth)                  |
| GET    | `/my-added-cars/:ownerId` | Get cars added by owner (requires Bearer JWT auth)        |
| DELETE | `/delete-car/:id`         | Delete car by ID (requires Bearer JWT auth)               |
| PUT    | `/cars/:id`               | Update car by ID (requires Bearer JWT auth)               |
| GET    | `/user/:id`               | Get user details by ID (requires Bearer JWT auth)         |
| PUT    | `/user/:id`               | Update user details by ID (requires Bearer JWT auth)      |
| POST   | `/bookings`               | Create a booking (requires Bearer JWT auth)               |
| GET    | `/bookings/user/:userId`  | Get bookings for a user (requires Bearer JWT auth)        |
| DELETE | `/bookings/:id`           | Delete booking by ID (requires Bearer JWT auth)           |

## Environment Variables

Create a `.env` file with the following values:

```env
PORT=5001
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=<app>
CLIENT_URL=https://your-frontend-domain.com
```

| Variable      | Description                          |
| ------------- | ------------------------------------ |
| `PORT`        | Local server port                    |
| `MONGODB_URI` | MongoDB connection string            |
| `CLIENT_URL`  | Frontend URL used for JWKS discovery |

## Local Development

```bash
npm install
node index.js
```

Optional hot reload:

```bash
npx nodemon index.js
```

Server runs on `http://localhost:5001` when `PORT=5001`.

## Notes

- JWT-protected endpoints require `Authorization: Bearer <token>`.
- `/cars` supports optional query params: `page`, `limit`, `search`, and `carType`.
- Random car data is served from MongoDB with `$sample` and returns 6 items.

## License

MIT © [Pradipta Sarker](https://github.com/axiomshuvo)
