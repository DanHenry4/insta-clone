# Insta-clone Backend

A scalable, containerized backend for an Instagram-style social media app. Built using Node.js microservices, Docker, MongoDB, and RabbitMQ for event-driven architecture.

## 🧱 Microservices
- `auth-service`: Handles user registration, login, JWT auth, and authentication events
- `user-service`: Manages user profiles and account data
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
  ├── utils/           # Shared code (copy into each service for Docker)
  ├── docker-compose.yml
  ├── docker-compose.override.yml
  └── README.md
```

## 🔄 Live Reload (Development)
- Nodemon is used for hot-reloading in both services.
- `docker-compose.override.yml` mounts your code for live editing, but keeps `node_modules` in the container.
- Remove or comment out the `volumes` section in production for best performance and reliability.
- **Production run:**
  ```sh
  docker-compose -f docker-compose.yml up --build
  ```

## 📌 Features
- [x] Auth service with JWT and event publishing
- [x] User profile service
- [x] Event-driven messaging with RabbitMQ
- [x] Live reload for development
- [ ] Media service (coming soon)
- [ ] Feed, comments, likes, notifications, etc.

---

Feel free to contribute or open issues for suggestions!
