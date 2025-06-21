# Task Management System

A full-stack task management application with user authentication and task management features.

## Features

- User authentication (register, login, profile management)
- Task management (CRUD operations)
- Task filtering and sorting
- Task statistics
- RESTful API with JWT authentication
- API documentation with Swagger

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger
- **Frontend**: Vite + React (to be implemented)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd task-management
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Environment Setup

1. Copy `.env.example` to `.env`
2. Update the environment variables in `.env`

```bash
cp .env.example .env
```

### 4. Start the development server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000` by default.

## API Documentation

Once the server is running, you can access the API documentation at:

- **Swagger UI**: `http://localhost:5000/api-docs`

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot-reload
- `npm test` - Run tests

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Tasks

- `GET /api/tasks` - Get all tasks (with filtering, sorting, and pagination)
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a single task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/stats` - Get task statistics

## Environment Variables

```
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/task_management

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# CORS
FRONTEND_URL=http://localhost:5173
```

## Testing

To run tests:

```bash
npm test
```

## License

This project is licensed under the MIT License.
