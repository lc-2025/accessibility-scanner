import { ROUTE, TEST } from './constants';

const { findByTestId, findAllByTestId, location, visit } = cy;
const { HOME, SCAN } = ROUTE;
const { ID, TOKEN } = TEST;
const { EQUAL, EXIST } = TOKEN;

/**
 * @description Home summary navigation assertion helper
 * @author Luca Cattide
 * @param {boolean} [cta]
 * @param {boolean} [menu]
 */
const assertHomeSummary = (cta?: boolean, menu?: boolean): void => {
  assertNavigation(ID.HOME, HOME.PATH);
  clickElement(ID.CTA.HOME);

  if (cta) {
    clickElement(ID.CTA.HOME_SUMMARY);
    assertNavigation(ID.SCAN, `/${SCAN.PATH}`);
  }

  if (menu) {
    clickElement(ID.MENU, true);
    assertNavigation(ID.HOME, HOME.PATH);
  }
};

/**
 * @description Navigation assertion helper
 * @author Luca Cattide
 * @param {string} id
 * @param {string} path
 */
const assertNavigation = (id: string, path: string): void => {
  assertPresence(id);
  location('pathname').should(EQUAL, path);
};

/**
 * @description Existing element assertion helper
 * @author Luca Cattide
 * @param {string} element
 */
const assertPresence = (element: string, multiple?: boolean): void => {
  if (multiple) {
    findAllByTestId(element).should(EXIST);
  } else {
    findByTestId(element).should(EXIST);
  }
};

/**
 * @description Element click helper
 * @author Luca Cattide
 * @param {string} element
 * @param {boolean} [multiple]
 * @param {number} [index]
 */
const clickElement = (
  element: string,
  multiple?: boolean,
  index?: number,
): void => {
  if (multiple) {
    findAllByTestId(element)
      .eq(index ?? 0)
      .click();
  } else {
    findByTestId(element).click();
  }
};

/**
 * @description Path helper
 * Navigates to the provided path
 * @author Luca Cattide
 * @param {string} path
 */
const getPath = (path: string): void => {
  visit(path);
};

export {
  assertHomeSummary,
  assertNavigation,
  assertPresence,
  clickElement,
  getPath,
};
