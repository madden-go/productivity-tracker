# Koa 🌿

> An all-in-one, low-stimulation productivity ecosystem for students.

Most productivity tools are too loud. Most journals are too empty. Koa sits in between — a calm, focused space to track your habits, academics, and coding streaks without the noise.

**[Live Demo](https://koa-productivity-tracker.vercel.app)**

---

## Features

- **Habit Tracking** — Build and monitor daily habits over time
- **Academic Tracker** — Keep tabs on assignments, grades, and coursework
- **Code Streaks** — Stay consistent with your coding practice
- **Low-stimulation UI** — Designed to help you focus, not distract you

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router, Vite |
| Backend | Node.js, Express 5 |
| Database | SQLite (`sqlite3`) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/madden-go/productivity-tracker.git
cd productivity-tracker

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# Add any environment variables here
PORT=3000
```

### Running Locally

```bash
npm run dev
```

This starts both the Vite dev server and the Express backend concurrently.

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
productivity-tracker/
├── api/          # Serverless API functions (Vercel)
├── public/       # Static assets
├── src/          # React frontend source
├── server.js     # Express backend
├── database.js   # SQLite database setup
└── vite.config.js
```

---

## Contributors

- **[madden-go](https://github.com/madden-go)**
- **Akshita**

Built as a course project for Web Programming.

---

## License

This project is open source and available under the [MIT License](LICENSE).
