const API = {
  TOKEN: {
    GET_SCAN: 'getScan',
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
  FORM: {
    MESSAGE: '',
    URLS: 1,
  },
  PAGINATION: {
    limit: 10,
    skip: 0,
  },
  SCAN: {
    RESULT: false,
  },
};

const ERROR = {
  FORM: {
    REQUIRED: 'Please enter a valid URL',
    VALIDATION: 'Invalid URL',
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

const REGEX = {
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/g,
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
  ERROR,
  FORM_ACTION,
  LANGUAGES,
  PAGINATION,
  RATE_LIMIT,
  REGEX,
  ROUTE,
  STATUS,
};
