# Insta-clone Backend

A scalable, containerized backend for an Instagram-style social media app. Built using Node.js microservices, Docker, MongoDB, and RabbitMQ for event-driven architecture.

## 🧱 Microservices
- `auth-service`: Handles user registration, login, JWT auth, and authentication events
- `user-service`: Manages user profiles and account data
- `post-service`: Handles posts and media uploads
- `feed-service`: Aggregates and serves user feeds
- `comment-service`: Manages comments on posts
- `like-service`: Handles likes on posts and comments
- `notification-service`: Sends notifications based on events
- `mongo`: MongoDB database
- `rabbitmq`: Messaging broker for inter-service events

## 🚀 Getting Started

1. Clone the repository
2. (Optional) Copy `.env.example` to each service as `.env` and fill in secrets (see each service's `.env` for details)
3. Build and start all services:
   ```sh
   docker-compose up --build
   ```
   For live reload in development (auto-restart on code changes):
   ```sh
   docker-compose down --volumes --remove-orphans
   docker-compose build --no-cache
   docker-compose up
   ```
   For production (no live reload, best performance):
   ```sh
   docker-compose -f docker-compose.yml up --build
   ```

## 🛠️ Tech Stack
- Node.js + Express
- MongoDB
- RabbitMQ (event-driven messaging)
- Docker & Docker Compose
- Nodemon (live reload in development)

## 📂 Project Structure

```
Insta-clone/
  ├── auth-service/
  ├── user-service/
  ├── post-service/
  ├── feed-service/
  ├── comment-service/
  ├── like-service/
  ├── notification-service/
  ├── utils/           # Shared code (copy into each service for Docker)
  ├── docker-compose.yml
  ├── docker-compose.override.yml
  └── README.md
```

## 🔄 Live Reload (Development)
- Nodemon is used for hot-reloading in all services.
- `docker-compose.override.yml` mounts your code for live editing, but keeps `node_modules` in the container.
- Remove or comment out the `volumes` section in production for best performance and reliability.
- **Production run:**
  ```sh
  docker-compose -f docker-compose.yml up --build
  ```

## 📌 Features
- [x] Auth service with JWT and event publishing
- [x] User profile service
- [x] Post/media service with uploads
- [x] Feed service
- [x] Comment service
- [x] Like service (posts & comments)
- [x] Notification service
- [x] Event-driven messaging with RabbitMQ
- [x] Live reload for development
- [ ] Advanced media storage (cloud)
- [ ] User follow system
- [ ] API gateway


The frontend is a Vite + React app located in `frontend/`.

### Running the Frontend

1. Open a terminal and navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Vite dev server:
   ```sh
   npm run dev
   ```
4. Open your browser to the URL shown in the terminal (usually http://localhost:5173).

### API Integration & CORS

- The frontend expects backend APIs to be available at `http://localhost:<service-port>` (e.g., `auth-service` at `http://localhost:4000`).
- CORS is enabled in all backend services for `http://localhost:5173`.
- If you see CORS errors, ensure the backend is running and CORS is enabled in the service's `server.js`.

### Health Check

- Each service can expose a health check endpoint (e.g., `GET /auth/health` for `auth-service`).
- If you get an empty response or error, check the service logs and ensure the service is running and listening on the correct port.

### Rebuilding & Troubleshooting

To completely rebuild all services and clear volumes:
```sh
docker-compose down --volumes --remove-orphans
docker-compose build --no-cache
docker-compose up -d
```

To view logs for all services:
```sh
docker-compose logs -f
```
Press Ctrl+C to exit logging mode (services keep running).

If you see `net::ERR_EMPTY_RESPONSE` or `socket hangup` errors:
- Make sure the service is running and healthy (check logs)
- Ensure the correct port is exposed and mapped
- Test the endpoint directly with Postman or curl

---
For questions, troubleshooting, or contributions, please open an issue or pull request!
