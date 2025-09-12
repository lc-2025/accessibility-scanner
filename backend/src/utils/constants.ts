import 'dotenv/config';
import { Result } from 'axe-core';
import Joi from 'joi';
import { Status } from '../types/models/Scan';

// Constants
/**
 * Getting Environment variables via `dotenv`
 * Using environmental-config for per-project generic settings
 * as best-practice
 */
const { NODE_ENV, BASE_URL, PORT, DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } =
  process.env;
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
  RUN: 'URL scans completed successfully.',
};
const EVENT = {
  ERROR: 'error',
};
const ROUTES = {
  BASE_URL,
  BASE_PATHNAME: '/',
  API: {
    BASE_PATHNAME: '/scan',
    DATABASE: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.${DB_HOST}/?retryWrites=true&w=majority&appName=${DB_NAME}`,
    SCAN: {
      GET_ALL: '/list',
      GET: '/:id',
    },
  },
};
const DATA_VALIDATION = {
  id: Joi.string().pattern(new RegExp('^[0-9]|[a-z]|\-$')),
};
const SCAN = {
  url: '',
  status: Status.Done,
  timestamp: '',
  violations: [] as Result[],
};
const TEST = {
  TIMEOUT: 60000,
  ID: '',
  SCAN: {
    id: '',
    status: '',
    createdAt: '',
    deletedAt: '',
    violations: [],
  },
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
  DATA_VALIDATION,
  SCAN,
  TEST,
};
