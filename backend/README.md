# Accessibility Scanner - Backend

AccessiWay Coding Challenge Backend application

[![Accessibility Scanner CI](https://github.com/lc-2025/accessibility-scanner/actions/workflows/ci.yml/badge.svg)](https://github.com/lc-2025/accessibility-scanner/actions/workflows/ci.yml) [![Accessibility Scanner CD](https://github.com/lc-2025/accessibility-scanner/actions/workflows/cd.yml/badge.svg)](https://github.com/lc-2025/accessibility-scanner/actions/workflows/cd.yml)

## About

Fullstack Take-Home Challenge – Accessibility Scanner - Backend

A server application that provides **REST API** to access and manage the scans data stored on a **NoSQL database** cluster.

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

### Testing

- Backend: test API or scanning logic

## Features

- REST API based on specifications

## Extra (in addition to requirements)

- DB Indexing & Transactions
- SSL management
- Error logging
- Security
  - CORS
  - XSS
  - Data validation & sanitization
- Optimization
  - Requests compression
  - Rate limiting
  - Response data pagination

## Stack

- **Languages**: JavaScript, Typescript
- **Environments**: Node.js
- **Libraries**: Puppeteer, Axe, Joi, Supertest
- **Frameworks**: Express, Jest
- **Pre/Post-Processors**: PostCSS
- **Linters/Plugins**: ESLint, Prettier
- **Compilers**: Babel, TypeScript
- **Testing**: Jest, Supertest
- **Data Storage**: MongoDB Atlas
- **Versioning**: GitHub, Husky
- **Continuous-Integration/Delivery**: GitHub Actions
- **Deployment**: Render

## Getting Started

For any contribution, maintanance and/or trial needs, please refer to the following specifications.

### Environment

In order to manage `development` or `production` versions, please set the proper `.env | .env.*` root file according to the distribution guidelines contained in the `.env.dist` version.
The environment configuration contains the core info required by the server in order to start and communicate with the database. Live data resides on a _MongoDB Atlas_ cluster. For any local test, please provide the expected _MongoDB_ one.

### Server

On terminal, from project root:

- To setup the project

```bash
npm i
```

- To run in `development` mode

```bash
npm run dev
```

- To build the production version

```bash
npm run build
```

- To run in `production` mode

```bash
npm run start
```

### Tests

#### Unit

On terminal, from project root:

- To run the tests in `development` mode

```bash
npm run test
```

- To run the tests in `testing` mode (staging or content-integration/delivery environments)

```bash
npm run test:ci
```

### Using Docker

You may use Docker to build the container and run the image required in the deployment step.

On terminal, from project root:

- Build the image and run the container

```bash
docker-compose up -d --build
```

- Stop the container

```bash
docker-compose stop
```

## Deploy

Accessibility Scanner Backend_ is integrated and delivered to production via _GitHub Actions_ workflows pipeline, where the server is being set up, tested, built and containerized with _Docker_.
Then the _Docker_ image is hosted on _GitHub Container Registry_ and deployed on _Render_ production environment available at [https://accessibility-scanner-backend-lyqi.onrender.com](https://accessibility-scanner-backend-lyqi.onrender.com)

## Contributing

Please read more about required best practices on the specific [contributing reference document](./CONTRIBUTING.md)

## General Info

The project contains extra implementations due to the importance relating common performance and security best-practices.
Here's some details about them:

- Explicit indexing for DB model to reduce query load, improving general performance and reflecting the schema specification
- CRUD operations supported by query transactions to ensure operational batching and better response
- Custom SSL middleware to ensure HTTPS communication on `production` (via redirect)
- Custom error middleware to manage uncovered exceptions and future scalability
- Further peformance and security management via: requests compression, CORS, XSS protection, rate limiting, data sanitization and validation
- Server is defined as 'standalone' to easily allow testing and future scalability (i.e. GraphQL). Same goes for some utility libraries

### Estimated Delivery Time

About 1.5 day(s) | 12 working hours (including extra implementations)

## To Be Improved

- More snippets abstraction into common libraries (i.e. utilities/api) - (DRY)
- Schema 3rd-party typing definitions (i.e. `violations`)
- Responses transormation interceptor/middleware (getting rid of extra fields for security concerns)
- Logging (i.e. `EventEmitter`)
- API documentation (Swagger)
- API versioning and GraphQL implementation for future scalability
- API JWT-based authorization
- Additional (corner-cases) tests
- Continuous-Integration/Delivery & DevOps pipelines (i.e. GitHub Actions, Docker)
