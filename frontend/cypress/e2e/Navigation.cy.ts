/// <reference types="@testing-library/cypress" />
import { clickElement, getPath } from '../../src/utils/testingE2e';
import { ROUTE, TEST } from '../../src/utils/constants';

// Navigation End-to-End Test
describe('Navigation E2E Test', () => {
  const { findAllByTestId, location } = cy;
  const { HOME, SCAN } = ROUTE;
  const { ID } = TEST;

  /**
   * @description Navigation assertion helper
   * @author Luca Cattide
   * @param {string} id
   * @param {string} path
   */
  const assertNavigation = (id: string, path: string): void => {
    findAllByTestId(id).should('exist');
    location('pathname').should('equal', path);
  };

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
      findAllByTestId(ID.MENU).eq(0).click();
      assertNavigation(ID.HOME, HOME.PATH);
    }
  };

  /**
   * @description Scan list navigation assertion helper
   * @author Luca Cattide
   */
  const assertScanList = (): void => {
    findAllByTestId(ID.MENU).eq(1).click();
    assertNavigation(ID.SCAN_LIST, `/${SCAN.PATH}/${SCAN.LIST.PATH}`);
  };

  // Setup
  beforeEach(() => {
    getPath(HOME.PATH);
  });

  // Tests
  it('Navigates to the Home page', () => {
    assertNavigation(ID.HOME, HOME.PATH);
  });
  it('Navigates to the Home page summary section', () => {
    assertHomeSummary();
  });
  it('Navigates to the Scan page via Home page summary', () => {
    assertHomeSummary(true);
  });
  it('Navigates to the Home page via main menu', () => {
    assertHomeSummary(true, true);
  });
  it('Navigates to the Scan list page via main menu', () => {
    assertHomeSummary(true);
    assertScanList();
  });
  it('Navigates to the Scan page via breadcrumb', () => {
    assertHomeSummary(true);
    assertScanList();
    findAllByTestId(ID.BREADCRUMB).eq(0).click();
  });
});
