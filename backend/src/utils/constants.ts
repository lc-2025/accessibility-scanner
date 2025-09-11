import 'dotenv/config';
import Joi from 'joi';

// Constants
/**
 * Getting Environment variables via `dotenv`
 * Using environmental-config for per-project generic settings
 * as best-practice
 */
const { NODE_ENV, BASE_URL, PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
// Listen to all interfaces
const HOST = '0.0.0.0';
const HEADER = {
  XFP: 'x-forwarded-proto',
};
const PROTOCOL = {
  HTTPS: 'https',
};
const PORT_DEFAULT = 4000;
const RATE_LIMIT = {
  WINDOW: 15 * 60 * 1000,
  MAX_REQUESTS: 100,
};
const MESSAGE = {
  LISTEN: 'Server started and listening in',
  MISSING: 'Missing data: ',
  INVALID: 'Invalid input: ',
  EMPTY: 'No existing data',
  CONNECTION: 'DB connected.',
  CONNECTION_CLOSE: 'DB disconnected.',
  CONNECTION_ERROR: 'Cannot connect to DB.',
  INPUT: 'BAD_USER_INPUT',
  VALIDATION: 'Invalid query string',
  SERVER: 'Internal server error',
};
const EVENT = {
  ERROR: 'error',
};
const ROUTES = {
  BASE_URL,
  BASE_PATHNAME: '/',
  API: {
    BASE_PATHNAME: '/scan',
    DATABASE: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.qofijkg.mongodb.net/?retryWrites=true&w=majority&appName=${DB_NAME}`,
    SCAN: {
      GET_ALL: '/list',
      GET: '/:id',
    },
  },
};
const QUERY_VALIDATION = {
  id: Joi.string().alphanum(),
  scan: Joi.object({
    status: Joi.string().required(),
    violations: Joi.array(),
  }),
};

export {
  NODE_ENV,
  HOST,
  HEADER,
  PROTOCOL,
  PORT_DEFAULT,
  PORT,
  RATE_LIMIT,
  MESSAGE,
  EVENT,
  ROUTES,
  QUERY_VALIDATION,
};
