# WCAG Accessibility Scanner — Backend API

RESTful backend service for the **WCAG Accessibility Scanner** platform. Built with Node.js, Express, TypeScript, and Puppeteer + `axe-core`, it executes headless browser accessibility audits on target web pages, validates payloads, persists scan history in MongoDB, and enforces security hardening.

- **Production Deployment:** [https://accessibility-scanner-backend-lyqi.onrender.com](https://accessibility-scanner-backend-lyqi.onrender.com) (Docker image published via GitHub Container Registry)
- **Root Documentation:** [`../README.md`](../README.md)
> Please note that the backend services are subject to cold starts. You might experience a little delay on a first run.
---

## Tech Stack

- **Runtime & Framework:** Node.js, Express 4.21, TypeScript 5.9
- **Accessibility Auditing Engine:** `puppeteer-core` 24.27, `axe-core` 4.10, `@axe-core/puppeteer` 4.10
- **Database & ODM:** MongoDB Atlas, Mongoose 8.18
- **Validation & Security:** Joi 18.0, Helmet 8.1, `express-rate-limit` 8.1, `express-mongo-sanitize` 2.2, CORS, Compression
- **Testing:** Jest 30.1, Supertest 7.1
- **Containerization & CI/CD:** Docker, GitHub Container Registry (GHCR), Render

---

## Project Structure

```text
backend/
└── src/
    ├── __tests__/        # API integration and unit tests (Jest & Supertest)
    ├── controllers/      # Request handlers and audit orchestration logic
    ├── middlewares/      # Validation, rate-limiting, sanitization, error handling
    ├── models/           # Mongoose schemas and models
    ├── routes/           # Express API route definitions
    ├── types/            # Shared TypeScript types and request/response contracts
    ├── utils/            # Headless browser runner, axe-core helpers, utilities
    ├── database.ts       # MongoDB connection lifecycle management
    └── index.ts          # Express server initialization and middleware setup
```

---

## Getting Started

### Prerequisites

- **Node.js** (LTS recommended)
- **MongoDB** instance (local or MongoDB Atlas URI)
- **Chromium / Chrome executable** available in the environment for `puppeteer-core`

### Environment Variables

Create a `.env` file inside the `backend/` directory based on `.env.dist` and configure your runtime variables (server port, MongoDB connection URI, allowed CORS origin, and Chromium executable path):

```bash
cp .env.dist .env
```

### Installation & Development

From the **repository root**:

```bash
npm install
npm run dev --workspace=backend
```

Or directly inside `backend/`:

```bash
npm run dev
```

### Production Build

```bash
npm run build --workspace=backend
npm run start --workspace=backend
```

---

## Docker

The backend is containerized for reproducible headless Chromium execution and deployed to Render via GHCR:

```bash
docker build -t accessibility-scanner-backend ./backend
docker run --env-file ./backend/.env -p 5000:5000 accessibility-scanner-backend
```

---

## Testing & Quality

- **Code Formatting (`Prettier`):**
  ```bash
  npm run lint --workspace=backend
  ```
- **Unit & API Integration Tests (`Jest` & `Supertest`):**
  ```bash
  # Watch mode
  npm run test --workspace=backend

  # CI single-run mode
  npm run test:ci --workspace=backend
  ```

---

## License & Legal Notice

**All Rights Reserved (`UNLICENSED`).**

This codebase and its documentation are proprietary and provided strictly for portfolio review and technical evaluation. Unauthorized copying, modification, distribution, or commercial use of this software, via any medium, is strictly prohibited without explicit written permission from the author.

All product names, logos, and brands (including WCAG, W3C, Axe, Puppeteer, MongoDB, and related technologies) are the property of their respective owners and are used for identification purposes only.
