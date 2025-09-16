import { assertHomeSummary, assertNavigation, clickElement, getPath } from '../../src/utils/testingE2e';
import { ROUTE, TEST } from '../../src/utils/constants';

// Navigation End-to-End Test
describe('Navigation E2E Test', () => {
  const { HOME, SCAN } = ROUTE;
  const { ID } = TEST;

  /**
   * @description Scan list navigation assertion helper
   * @author Luca Cattide
   */
  const assertScanList = (): void => {
    clickElement(ID.MENU, true, 1);
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
    clickElement(ID.BREADCRUMB, true);
  });
  it('Navigates to a Scan URL', () => {
    assertHomeSummary(true);
    assertScanList();
    clickElement(ID.URL, true);
  })
  it('Navigates to a Scan details page', () => {
    assertHomeSummary(true);
    assertScanList();
    clickElement(ID.ACTION, true);
  });
});
