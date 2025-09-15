const { findByTestId, visit } = cy;

/**
 * @description Element click helper
 * @author Luca Cattide
 * @param {string} element
 */
const clickElement = (element: string): void => {
  findByTestId(element).click();
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

export { clickElement, getPath };
