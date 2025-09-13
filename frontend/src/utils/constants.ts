const BUTTON_TYPE = {
  ANCHOR: 'anchor',
  DEFAULT: 'default',
  LINK: 'link',
};

const FORM_ACTION = {
  ADD: 'add',
  REMOVE: 'remove',
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

export { BUTTON_TYPE, FORM_ACTION, LANGUAGES, ROUTE };
