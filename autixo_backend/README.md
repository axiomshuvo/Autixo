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
| Utilities  | dotenv, cors                  |
| Deployment | Vercel                        |

## API Endpoints

Base URL: `https://autixobackend.vercel.app`

| Method | Endpoint       | Description                   |
| ------ | -------------- | ----------------------------- |
| GET    | `/`            | Health check (`Hello World!`) |
| GET    | `/cars`        | Return all cars               |
| GET    | `/cars/random` | Return 6 random cars          |

## Environment Variables

Create a `.env` file:

```env
PORT=5001
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=<app>
```

| Variable      | Description               |
| ------------- | ------------------------- |
| `PORT`        | Local server port         |
| `MONGODB_URI` | MongoDB connection string |

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

## Architecture

```text
index.js
|- Setup: dotenv + express + cors
|- GET /            -> health check
|- GET /cars        -> all cars from MongoDB
`- GET /cars/random -> random 6 cars via $sample
```

## License

MIT © [Pradipta Sarker](https://github.com/axiomshuvo)
