# Task Manager

Task Manager is a full-stack web app for creating, viewing, editing, deleting, filtering, and completing tasks. The client is built with React, TypeScript, Vite, and Tailwind CSS. The server is built with Express, TypeScript, and MongoDB/Mongoose.

## Setup

### Prerequisites

- Node.js installed
- npm installed
- MongoDB Atlas account or another MongoDB connection string

### Install dependencies

From the project root, install both packages:

```bash
cd server
npm install

cd ../client
npm install
```

### Configure the server

Create or update `server/.env` with your MongoDB connection string. The `.env` file is ignored by Git, so it should stay local.

```env
PORT=9000
MONGO_URI=your_mongodb_connection_string
```

### Run the app

Start the API server:

```bash
cd server
npm run dev
```

In a new terminal, start the client:

```bash
cd client
npm run dev
```

Open the client URL shown in the Vite terminal output, usually `http://localhost:5173`.

## Available Scripts

### Server

```bash
npm run dev
npm run build
npm start
```

### Client

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Known Issues

- The server requires a valid `MONGO_URI` in `server/.env` before it can connect to MongoDB.
- The client API calls are hardcoded to `http://localhost:9000`, so the app must be updated before running on a different host or port.
- Editing a task fetches all tasks from the API and then finds the matching task locally, instead of using a dedicated `GET /tasks/:id` endpoint.
- The edit form does not show a loading state while saving.
- The server returns raw error details in some API responses, which should be cleaned up before production use.