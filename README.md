# Accessibility Scanner

AccessiWay Coding Challenge

![Accessibility Scanner](../docs/preview.gif "Accessibility Scanner Preview")

## About

Fullstack Take-Home Challenge – Accessibility Scanner

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
