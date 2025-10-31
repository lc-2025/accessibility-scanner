# Accessibility Scanner - Frontend

AccessiWay Coding Challenge Frontend application

![Accessibility Scanner](../docs/preview.gif "Accessibility Scanner Preview")

## About

Fullstack Take-Home Challenge – Accessibility Scanner - Frontend

A front-end application based on _Vite_ consisting of an online service to scan remote resources and validate their accessibility support, providing a detailed report consultable via website or in CSV format. All the collected data is stored on a related database, accessible through a dedicated back-end application.

All trademarks, logos, images, and references belong to their legitimate owners.
The author holds no ownership or exclusive rights to use this application, except for demonstration purposes.

### Objective

Build a fullstack web application that allows users to:

- Submit one or more URLs to analyze
- Launch an automated scan for accessibility issues
- View the status of the scan
- Explore the results in a clear and user-friendly interface

### Required Technologies

- React (preferably with TypeScript)
- React Router
- React Query (or fetch + state management)
- UI library: Tailwind, MUI, Chakra, or similar
- Form validation: Zod, React Hook Form, or similar
- Testing: at least basic unit tests (e.g., Jest + Testing Library)

### Required Features

#### Home Page

- Welcome message or landing section
- Button to start a new scan

#### New Scan

- Form to submit one or more URLs
- Button "Start Scan"
- Display submission status, errors, and loading state

#### Scan List

- Show list with:
  - URL(s)
  - Status (pending, done, error)
  - Creation date

- Actions:
  - View scan details
  - Delete scan

#### Scan Details

- Show axe-core results (at least id, impact, description, nodes)
- Group by severity (e.g., "Severe", "Moderate")
- Clean and readable UI

### Extra Bonus (Optional)

- Authentication (JWT or auth flow)
- Export scan results to CSV
- i18n-ready (even just EN/IT)

### Tests

- Test at least 1–2 React components
- (Bonus) e2e testing (e.g., with Playwright or Cypress)

## Features

- SPA based on standard specifications plus CSV export, localization, E2E testing

## Extra (in addition to suggested bonuses)

- Usability and UX based on current front-end best-practices (i.e. Layouting and templating according to company branding, transitions, loading and empty states management, visual errors and notifications handling)
- Navigation components (Menu, Breadcrumb)
- Scan results outbound linking (scanned URLs)
- Scan results pagination
- Responsiveness
- Security
  - Data validation
  - Request timing-out
- Optimization
  - Components memoization
  - Data fetching caching

## Stack

- **Languages**: HTML, CSS, JavaScript, Typescript
- **Environments**: DOM
- **Libraries**: Headless UI, Hero Patterns, Hero Icons, React Router, React i18n, React Hook Form, React Query
- **Frameworks**: React, Vite, TailwindCSS, Vitest, Cypress
- **Pre/Post-Processors**: PostCSS
- **Linters/Plugins**: ESLint, Prettier
- **Compilers**: TypeScript
- **Testing**: Vitest, Cypress
- **Versioning**: GitHub, Husky
- **Continuous-Integration/Delivery**: GitHub Actions
- **Deployment**: Vercel

## Getting Started

For any contribution, maintanance and/or trial needs, please refer to the following specifications.

### Environment

In order to manage `development` or `production` versions, please set the proper `.env | .env.*` root file according to the distribution guidelines contained in the `.env.dist` version.
The environment configuration contains the core info required by the server in order to start and communicate with the database. Live data resides on a _MongoDB Atlas_ cluster managed by the back-end application. For any local test, please provide the expected _MongoDB_ one.

> Please note that the API cache is disabled in `development`

### Client

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
npm run preview
```

### Test Running

#### Unit/End-To-End

On terminal, from project root:

- To run the tests in `development` mode

```bash
npm run test
```

- To run the end-to-end tests in `development` mode

```bash
npm run cypress:open
```

- To run the tests in `testing` mode (staging or content-integration/delivery environments)

```bash
npm run test:ci
```

## Contributing

Please read more about required best practices on the specific [contributing reference document](./CONTRIBUTING.md)

## General Info

The project contains extra implementations due to the importance relating common performance and security best-practices.
Here's some details about them:

- Layouting and templating rensembling the company branding to provide consistency across resources. Ensuring usability by aligning to current web-design best-practices and web-accessibility (i.e. Adaptive layout, high-contrast template, alternative texts, titles, `aria` attributes, etc.)
- Microinteractions to underline the content by priorities via notifications on interactive states (i.e. successful actions, errors, data, etc.)
- Responsive design for both desktop/mobile support
- Essential navigational interfaces to improve the application usability with a main menu and breadcrumb
- Linking to scanned resources for a live monitoring
- Scanning results data management via pagination to improve performance and readability
- User data input validation and REST timing-out for security concerns
- Components memoization where needed and caching of fetched data to improve overall performance

### Estimated Delivery Time

About 3.5 days | 30 working hours (including extra implementations)

## To Be Improved

- Additional UX and microinteractions in general (i.e. via Motion, GSAP)
- Cookie consent (privacy and cookies management)
- JWT-based authentication
- REST API security improvement (i.e. vs XSFR)
- REST API response transformation (getting rid of unnecessary data fields)
- Content Security Policy definition
- Logging (i.e. _Axios_ interceptors)
- Scan results pagination custom setting (i.e. set custom displayed results per page)
- Scan results pagination truncation (i.e. over 5 pages display a shortcut button)
- Scan results actions batching (i.e. delete multiple results at once)
- Scan result details filtering by impact level
- Progressive Web Apps features (i.e. offline mode, assets caching)
- Additional (corner-cases) tests
- Continuous-Integration/Delivery & DevOps pipelines (i.e. GitHub Actions, Docker)
