# TaskDuty — Neo-Brutalist Task Manager

TaskDuty is a full-stack, secure task management web application built with a modern Neo-Brutalist design language. It allows users to create, view, edit, delete, and filter tasks in a highly responsive and styled workspace.

## Key Features

- **JWT Authentication:** Complete user registration, login, and secure session management. JWTs are persisted in `localStorage` and synchronized across tabs.
- **Security & Data Isolation:** Passwords are securely hashed on the server using `bcryptjs`. API endpoints and client routes are fully protected, ensuring that users can only view, edit, or delete their own tasks.
- **Extra Feature — Profile Management:** A dedicated user profile page where users can update their display name (synchronized globally in real-time) and update their password with secure verification of their current password.
- **Centralized UI Components:** Features a custom, highly reusable Neo-Brutalist `<Button>` component that centralizes layout classes, hover transitions, and dark mode styling, keeping pages clean and neat.
- **Theme Support:** Dark mode and light mode toggles with immediate theme persistence.

---

## Tech Stack

- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS, React Router DOM (v6), Axios, Lucide React
- **Backend:** Node.js, Express (ES Modules), TypeScript, JSON Web Tokens (JWT), BcryptJS
- **Database:** MongoDB, Mongoose

---

## Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB connection string (local instance or MongoDB Atlas)

### Install Dependencies
Clone the repository and install dependencies in both the `server` and `client` folders from the root directory:

```bash
# Install Server dependencies
cd server
npm install

# Install Client dependencies
cd ../client
npm install
```

### Environment Variables
Configure the server environment by creating a `.env` file inside the `server/` directory:

```env
PORT=9000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
```

---

## Running the Application

### 1. Start the Backend API Server
Navigate to the `server/` folder and run:
```bash
npm run dev
```
The server will start on `http://localhost:9000`.

### 2. Start the Frontend Dev Server
In a new terminal window, navigate to the `client/` folder and run:
```bash
npm run dev
```
The client app will launch (typically at `http://localhost:5173` or `http://localhost:5174`). Open the URL in your browser.

---

## UI Components & Design System

The application uses a **Neo-Brutalist** design theme characterized by flat primary colors, thick borders (`border-3`), retro drop-shadows (`shadow-neo`), and translation effects on hover/active states.

To maintain clean code and avoid lengthy class lists, a reusable `<Button>` component is provided in `client/src/components/Button.tsx`:

```tsx
import Button from '../components/Button';

// Primary Action
<Button type="submit">Done</Button>

// Secondary Action
<Button variant="secondary" onClick={handleCancel}>Cancel</Button>

// Small button with Icon
<Button variant="primary" size="sm">
  <Save size={16} /> Save Name
</Button>
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` — Register a new user (returns user data and JWT token).
- `POST /api/auth/login` — Authenticate an existing user (returns user data and JWT token).

### Profile
- `GET /api/profile` — Fetch current user details (requires JWT).
- `PUT /api/profile` — Update user name or change password (requires JWT).

### Tasks
- `GET /api/tasks` — Get all tasks for the authenticated user (requires JWT).
- `GET /api/tasks/:id` — Get a specific task details (requires JWT).
- `POST /api/tasks` — Create a new task (requires JWT).
- `PUT /api/tasks/:id` — Update an existing task (requires JWT).
- `DELETE /api/tasks/:id` — Delete a task (requires JWT).
