const BUTTON_TYPE = {
  ANCHOR: 'anchor',
  DEFAULT: 'default',
  LINK: 'link',
};

const LANGUAGES = ['en', 'it'];

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

export { BUTTON_TYPE, LANGUAGES, ROUTE };
