# Accessibility Scanner

AccessiWay Coding Challenge

![Accessibility Scanner](./docs/preview.gif "Accessibility Scanner Preview")

[![Accessibility Scanner CI](https://github.com/lc-2025/accessibility-scanner/actions/workflows/ci.yml/badge.svg)](https://github.com/lc-2025/accessibility-scanner/actions/workflows/ci.yml) [![Accessibility Scanner CD](https://github.com/lc-2025/accessibility-scanner/actions/workflows/cd.yml/badge.svg)](https://github.com/lc-2025/accessibility-scanner/actions/workflows/cd.yml)

## About

Fullstack Take-Home Challenge – Accessibility Scanner.

All trademarks, logos, images, and references belong to their legitimate owners.
The author holds no ownership or exclusive rights to use this application, except for demonstration purposes.

### Objective

Build a fullstack web application that allows users to:

- Submit one or more URLs to analyze
- Launch an automated scan for accessibility issues
- View the status of the scan
- Explore the results in a clear and user-friendly interface

### Required Technologies

- Node.js + Express
- Puppeteer
- Axe-core
- MongoDB (you can use Atlas or local)
- TypeScript or modern JavaScript (ES6+)
- Testing with Jest or similar

### Required Features

Create a REST API with the following routes:

- `POST` /scan
  - Launch one or more scans (pass an array of URLs)
- `GET` /scan/:id
  - Retrieve the status and results of a scan
- `GET` /scan/list
  - Return the list of all scans performed
- `PUT` /scan/:id
  - (Optional) Update a scan
- `DELETE` /scan/:id
  - Delete a scan

### Scan Logic

- Use **Puppeteer** to open the page
- Run **axe-core** in the page context to collect accessibility violations
- Store the results in MongoDB (can be async/background)

Each scan should include:

- id
- status (pending, running, done, error)
- createdAt, updatedAt
- List of violations

## Submission

- Deliver a .zip file containing:
  - `/backend` and `/frontend` folders
  - `.git` history if possible
  - A complete README.md (see below)

- README - Must include:
  - How to install and run both backend and frontend
  - How to run the tests
  - Architecture and technology choices
  - Time actually spent on the project
  - What you would have improved with more time

## Time Estimate

- 6–8 hours max for the base version
  - Partial delivery is acceptable as long as it’s well documented in the README.

## Getting Started

For any contribution, maintanance and/or trial needs, please refer to these specifications and side-ones:

- [Frontend](./frontend/README.md)
- [Backend](./backend/README.md)

## Repository

The project reflects a monolithic setting - monorepo - using _NPM Workspaces_ to organize both frontend than backend sides.
Workspaces may be globally managed accordingly to the following specifications.

## Setting Up

On terminal, from project root:

- To install dependencies for all the workspaces:

```bash
npm run setup
```

- To lint the sources for the `Frontend` workspace:

```bash
npm run lint
```

- To build the production version of all the workspaces:

```bash
npm run build
```

- To run the tests in `testing` mode (staging or content-integration/delivery environments) on all the workspaces:

```bash
npm run test
```
