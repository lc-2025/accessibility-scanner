const API = {
  TOKEN: {
    GET_SCANS: 'getScans',
  },
};

const BUTTON_ICON = {
  DELETE: 'delete',
  VIEW: 'view',
};

const BUTTON_TYPE = {
  ANCHOR: 'anchor',
  DEFAULT: 'default',
  LINK: 'link',
};

const DEFAULT_STATE = {
  PAGINATION: {
    limit: 10,
    skip: 0,
  },
};

const FORM_ACTION = {
  ADD: 'add',
  REMOVE: 'remove',
};

const LANGUAGES = ['en', 'it'];

const PAGINATION = {
  NEXT: 'next',
  PAGE: 'page',
  PREVIOUS: 'previous',
};

const RATE_LIMIT = {
  WINDOW: 15 * 60 * 1000,
};

const ROUTE = {
  HOME: {
    PATH: '/',
  },
  SCAN: {
    DETAILS: {
      PATH: 'details/:id',
    },
    LIST: {
      PATH: 'list',
    },
    PATH: 'scan',
  },
};

const STATUS = {
  DONE: 'done',
  ERROR: 'error',
  PENDING: 'pending',
  RUNNING: 'running',
};

export {
  API,
  BUTTON_ICON,
  BUTTON_TYPE,
  DEFAULT_STATE,
  FORM_ACTION,
  LANGUAGES,
  PAGINATION,
  RATE_LIMIT,
  ROUTE,
  STATUS,
};
