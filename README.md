# WCAG Accessibility Scanner

Automated web accessibility auditing platform built with **React 19**, **TypeScript**, **Node.js**, **Puppeteer**, and **axe-core** in an NPM Workspaces monorepo.

[![Accessibility Scanner CI](https://github.com/lc-2025/accessibility-scanner/actions/workflows/ci.yml/badge.svg)](https://github.com/lc-2025/accessibility-scanner/actions/workflows/ci.yml)
[![Accessibility Scanner CD](https://github.com/lc-2025/accessibility-scanner/actions/workflows/cd.yml/badge.svg)](https://github.com/lc-2025/accessibility-scanner/actions/workflows/cd.yml)

**Live Demo:** [accessibility-scanner-demo.vercel.app](https://accessibility-scanner-demo.vercel.app)
> Please note that the backend services are subject to cold starts. You might experience a little delay on a first run.

![Accessibility Scanner Preview](./docs/preview.gif "Accessibility Scanner Preview")

---

## Overview

**WCAG Accessibility Scanner** enables engineering and product teams to audit single or multiple URLs in batch, inspect live DOM trees in a headless browser against WCAG standards, and export structured compliance reports.

### Core Capabilities

- **Batch URL Auditing & Lifecycle Tracking:** Submit one or more URLs simultaneously and monitor asynchronous scan states (`pending`, `running`, `done`, `error`) persisted in **MongoDB Atlas**.
- **Headless DOM Inspection:** Uses **Puppeteer Core** and **@axe-core/puppeteer** to evaluate client-rendered pages, grouping violations by severity impact with affected DOM nodes.
- **Reporting & Localization:** Supports paginated scan history, one-click **CSV report export** (`@json2csv`), and multi-language UI (**EN / IT**) via `i18next`.
- **Production-Hardened API:** Built with Mongoose schema indexing and transactions, Gzip/Brotli compression, rate limiting, Joi schema validation, Helmet/CORS/NoSQL-injection protection, and HTTPS enforcement.

---

## Architecture & Tech Stack

The repository is structured as an **NPM Workspaces monorepo** decoupling the client SPA from the containerized auditing engine:

```text
accessibility-scanner/
├── frontend/          # React 19, TypeScript 5.8, Vite 7, Tailwind CSS v4, TanStack Query v5, Vitest, Cypress
├── backend/           # Node.js, Express, TypeScript 5.9, Puppeteer Core, axe-core, Mongoose 8, Jest, Docker
├── docs/              # Documentation assets and preview media
└── .github/workflows/ # Automated CI (lint, unit/E2E tests, build) & CD (Docker -> GHCR -> Render / Vercel)
```

### Engineering Trade-offs

- **Headless Browser Context (`puppeteer-core` + `axe-core`) vs. Static HTML Parsing:** Static parsers miss regressions introduced by client-side hydration, computed CSS visibility, or dynamic ARIA attributes. Injecting `axe-core` into a live headless browser session validates actual user-facing DOM states while keeping container images lean via `puppeteer-core`.
- **Asynchronous Execution & Transactional Persistence:** Headless audits execute asynchronously in the background to prevent HTTP timeouts during multi-URL batch runs, while MongoDB indexes and query transactions ensure data consistency and fast paginated lookups.
- **Unified Monorepo Governance & CI/CD:** Root workspace scripts (`setup`, `lint`, `test`, `build`) combined with Husky hooks and GitHub Actions enforce automated quality gates before shipping Docker images via **GitHub Container Registry (GHCR)** to **Render** and deploying the frontend to **Vercel**.

---

## Documentation

For workspace-specific environment setup (`.env.dist`), API specifications, Docker commands, and testing workflows, refer to the dedicated guides:

- **[Frontend Documentation](./frontend/README.md)** — React 19 / Vite 7 SPA, TanStack Query caching, i18n, CSV export, Vitest & Cypress E2E.
- **[Backend Documentation](./backend/README.md)** — Express REST API, Puppeteer/axe-core runner, MongoDB Atlas, Docker & Render deployment.

---

## Getting Started

Run all workspace commands from the repository root:

- **Install dependencies across all workspaces:**

```bash
npm run setup
```

- **Run linter and formatting checks across all workspaces:**

```bash
npm run lint
```

- **Execute CI test suites across all workspaces:**

```bash
npm run test
```

- **Build production bundles for all workspaces:**

```bash
npm run build
```

---

## Copyright & Disclaimer

**All Rights Reserved (`UNLICENSED`).** The source code in this repository is the original work of the author and is published solely for portfolio demonstration and technical evaluation purposes. No license is granted for commercial use, redistribution, or derivative works.

All third-party trademarks, logos, brand assets, and external website references displayed in the application or preview media belong to their respective owners. The author claims no ownership or affiliation with those entities.
