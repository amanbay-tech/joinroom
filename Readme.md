# Join Room LMS Platform

Join Room is a Learning Management System (LMS) platform that includes a backend service, frontend service, an expert bot, and a client bot. Each component runs in a Docker container, making it easy to deploy and manage.

Client Bot: Helps users subscribe to courses and access lessons.
Expert Bot: Empowers educators to add and manage their courses efficiently.


# Access the bots directly:

https://t.me/JoinRoomExpertBot
https://t.me/JoinRoomBot


## Prerequisites

- Docker
- Docker Compose

## Environment Variables

Before starting the containers, you need to set up the environment variables for each component. Create a `.env` file in the root directory of your project with the following variables.

### Backend Environment Variables

```env
# Backend Configuration
DATABASE_URL=your_database_url_here
PORT=4000
JWT_SECRET=your_jwt_secret_key
```

### Frontend Environment Variables

```env
# Frontend Configuration
NEXT_PUBLIC_API_URL=your_backend_api_url_here
SERVER_JWT=your_jwt_secret_key
```

# Expert Bot Configuration

EXPERT_BOT_TOKEN=your_expert_bot_telegram_token
EXPERT_BOT_API_URL=your_backend_api_url_here

# Client Bot Configuration

CLIENT_BOT_TOKEN=your_client_bot_telegram_token
CLIENT_BOT_API_URL=your_backend_api_url_here

# Project Structure

/join-room
├── backend
├── expert-bot
├── client-bot
├── frontend
├── docker-compose.yml

# To run all Docker containers

`docker compose up -d`

# Generate Prisma Client

`docker compose exec joinroom-backend npx prisma generate`
