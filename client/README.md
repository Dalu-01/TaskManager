# TaskDuty — Client Application

This directory contains the React + TypeScript client for the TaskDuty Task Manager app. For the full project overview, setup, backend API configuration, and running instructions, please refer to the main [README.md](../README.md) at the root of this repository.

## Technologies Used

- **Framework:** React 19 & Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Neo-Brutalist Theme)
- **Icons:** Lucide React
- **HTTP Client:** Axios (configured with request/response interceptors in `src/config/api.ts` to attach JWT and handle `401 Unauthorized` logouts)

## Available Scripts

In the `client/` directory, you can run:

### `npm run dev`
Runs the app in development mode at `http://localhost:5173` or `http://localhost:5174`.

### `npm run build`
Builds the app for production to the `dist` folder.

### `npm run lint`
Lints the source code using ESLint.

### `npm run preview`
Locally previews the production build.