# DnD Backend

Backend API for a Dungeons & Dragons character creation website.  
This application allows users to register, authenticate, and manage characters using a REST API built with **Node.js**, **Express**, and **PostgreSQL**.

---

## Features

- User authentication
- Character creation and management
- Password management
- PostgreSQL database integration
- RESTful API structure

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/mattos-rafael/dnd-backend.git
cd dnd-backend
```

### 2. Install dependencies

```bash
npm install
```

---

## Database Setup

This project uses PostgreSQL as the database.

Before running the application, execute the following command to create the required tables:

```bash
node create-tables.js
```

Make sure PostgreSQL is installed and running correctly.

---

## Running the Project

Start the backend server with:

```bash
npm start
```

Or, if using nodemon:

```bash
npm run dev
```

---

# API Endpoints

## User Endpoints

### Get characters per user

```http
GET /api/user
```

### Create character per user

```http
POST /api/user
```

### Delete character per user

```http
DELETE /api/user/:id
```

---

## Authentication Endpoints

### Login user

```http
POST /api/auth/login
```

### Register user

```http
POST /api/auth/register
```

### Logout user

```http
POST /api/auth/logout
```

### Change user password

```http
PUT /api/auth/changePassword
```

---

## Character Endpoints

### Create character

```http
POST /api/character
```

### Get all characters

```http
GET /api/character
```

### Delete character

```http
DELETE /api/character/:id
```

---

# Example Request

Example of creating a character:

```http
POST /api/character
Content-Type: application/json
```

```json
{
  "name": "Arthas",
  "class": "Paladin",
  "race": "Human",
  "life": 8,
  "hit_die": 8,
  "level": 1
}
```

---

# Project Structure

```bash
dnd-backend/
│
├── routes/
├── controllers/
├── models/
├── middleware/
├── create-tables.js
├── package.json
└── server.js
```

---

# Environment Variables

Create a `.env` file in the root directory and configure your environment variables:

```env
# Mongo
MONGO_URI=

# Postgres
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

# Secret
ACCESS_TOKEN_SECRET=

# URL
FRONTEND_URL=
```

---

# License

This project is licensed under the MIT License.

---

# Author

Developed by Rafael Mattos.