# WCAG Accessibility Scanner — Frontend

Single-page application (SPA) client for the **WCAG Accessibility Scanner** platform. Built with React 19, TypeScript, Vite, and TailwindCSS, it provides a responsive, accessible user interface to submit URLs for automated WCAG auditing, inspect violation reports by severity, filter results, and export audit data.

- **Live Demo:** [https://accessibility-scanner-demo.vercel.app](https://accessibility-scanner-demo.vercel.app)
- **Root Documentation:** [`../README.md`](../README.md)

---

## Tech Stack

- **Core:** React 19.1, TypeScript 5.8, Vite 7.1
- **Styling & UI:** TailwindCSS 4.1, daisyUI 5.1, Headless UI, Heroicons
- **Data Fetching & Routing:** TanStack Query v5, Axios, React Router v7
- **Forms & Validation:** React Hook Form v7
- **Internationalization (i18n):** `i18next`, `react-i18next` (English & Italian)
- **Data Export:** `@json2csv/plainjs` (CSV report export)
- **Testing:** Vitest 3.2 (Unit/Component), Cypress 15.2 (End-to-End)

---

## Project Structure

```text
frontend/
├── cypress/              # End-to-end test specs and fixtures
├── public/               # Static public assets and localization files
└── src/
    ├── __tests__/        # Unit and component tests (Vitest)
    │   └── components/
    ├── assets/
    │   └── img/          # Static visual assets
    ├── components/       # Reusable UI and domain components
    ├── css/              # TailwindCSS entrypoints and custom styles
    ├── types/            # TypeScript interfaces and API response types
    ├── utils/            # Helper functions (formatting, CSV export, etc.)
    ├── client.ts         # Configured Axios HTTP client
    ├── i18n.ts           # i18next initialization and language configuration
    └── main.tsx          # Application entry point
```

---

## Getting Started

### Prerequisites

- **Node.js** (LTS recommended)
- **npm** (managed via the root NPM Workspaces setup)
- Running instance of the [Backend API](../backend/README.md)

### Environment Variables

Create a `.env` file inside the `frontend/` directory based on `.env.example` (if present) and configure the backend API base URL (e.g., `VITE_API_URL` or your configured Vite environment prefix).

### Installation & Development

From the **repository root** (recommended for workspace dependency resolution):

```bash
npm install
npm run dev --workspace=frontend
```

Or directly inside `frontend/`:

```bash
npm run dev
```

### Build & Preview

```bash
npm run build --workspace=frontend
npm run preview --workspace=frontend
```

---

## Testing & Quality

- **Unit & Component Tests (Vitest):**
  ```bash
  npm run test --workspace=frontend
  ```
- **End-to-End Tests (Cypress):**
  ```bash
  npm run cypress:open --workspace=frontend
  # or headless execution
  npm run cypress:run --workspace=frontend
  ```

---

## License & Legal Notice

**All Rights Reserved (`UNLICENSED`).**

This codebase and its documentation are proprietary and provided strictly for portfolio review and technical evaluation. Unauthorized copying, modification, distribution, or commercial use of this software, via any medium, is strictly prohibited without explicit written permission from the author.

All product names, logos, and brands (including WCAG, W3C, Axe, React, and related technologies) are the property of their respective owners and are used for identification purposes only.
