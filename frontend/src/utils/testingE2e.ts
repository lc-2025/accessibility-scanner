const { findByTestId, findAllByTestId, visit } = cy;

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

export { clickElement, getPath };
