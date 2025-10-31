import {
  assertHomeSummary,
  assertPresence,
  clickElement,
  getPath,
} from '../../src/utils/testingE2e';
import { ROUTE, TEST } from '../../src/utils/constants';

// Interactions End-to-End Test
describe('Interactions E2E Test', () => {
  const { findAllByTestId, wait } = cy;
  const { HOME } = ROUTE;
  const { ID, DATA, TIMEOUT, TOKEN } = TEST;
  const { INVALID, VALID } = DATA.URL;

  /**
   * @description Form interaction assertion helper
   * @author Luca Cattide
   * @param {string} input
   */
  const assertForm = (input: string, multiple?: boolean): void => {
    assertHomeSummary(true);
    typeData(ID.INPUT, 0, input);

    if (multiple) {
      clickElement(ID.ACTION);
      typeData(ID.INPUT, 1, input);
    }

    clickElement(ID.SUBMIT);
  };

  /**
   * @description Mocked data typing helper
   * @author Luca Cattide
   * @param {string} input
   * @param {number} index
   * @param {string} data
   */
  const typeData = (input: string, index: number, data: string): void => {
    findAllByTestId(input).eq(index).children(TOKEN.INPUT).type(data);
  };

  // Setup
  beforeEach(() => {
    getPath(HOME.PATH);
  });

  // TESTS
  it('Switches language', () => {
    assertHomeSummary(true);
    clickElement(ID.LANGUAGE);
    clickElement(ID.LOCALE, true, 1);
  });
  it('Enters an invalid URL', () => {
    assertForm(INVALID);
    assertPresence(ID.ERROR);
  });
  it('Scans a valid URL', () => {
    assertForm(VALID);
    wait(TIMEOUT).then(() => {
      assertPresence(ID.SCAN_RESULT);
    });
  });
  it('Scans multiple URLs', () => {
    assertForm(VALID, true);
    wait(TIMEOUT).then(() => {
      assertPresence(ID.SCAN_RESULT);
    });
  });
  it('Removes an extra URL', () => {
    assertHomeSummary(true);
    typeData(ID.INPUT, 0, VALID);
    clickElement(ID.ACTION);
    typeData(ID.INPUT, 1, VALID);
    clickElement(ID.ACTION, true, 0);
  });
  it('Selects a new scan', () => {
    assertForm(VALID);
    wait(TIMEOUT).then(() => {
      assertPresence(ID.SCAN_RESULT);
      clickElement(ID.SUBMIT);
      assertPresence(ID.SCAN);
    });
  });
  it('Displays the scan results', () => {
    assertForm(VALID);
    wait(TIMEOUT).then(() => {
      assertPresence(ID.SCAN_RESULT);
      clickElement(ID.CTA.HOME_SUMMARY);
      assertPresence(ID.SCAN_LIST);
    });
  });
  it.skip('Displays the next scan results page', () => {
    assertForm(VALID);
    wait(TIMEOUT).then(() => {
      assertPresence(ID.SCAN_RESULT);
      clickElement(ID.CTA.HOME_SUMMARY);
      assertPresence(ID.SCAN_LIST);
      clickElement(ID.NEXT);
    });
  });
  it.skip('Displays the previous scan results page', () => {
    assertForm(VALID);
    wait(TIMEOUT).then(() => {
      assertPresence(ID.SCAN_RESULT);
      clickElement(ID.CTA.HOME_SUMMARY);
      assertPresence(ID.SCAN_LIST);
      clickElement(ID.NEXT);
      clickElement(ID.PREVIOUS);
    });
  });
  it('Displays the scan result details', () => {
    assertForm(VALID);
    wait(TIMEOUT).then(() => {
      assertPresence(ID.SCAN_RESULT);
      clickElement(ID.CTA.HOME_SUMMARY);
      assertPresence(ID.SCAN_LIST);
      clickElement(ID.ACTION, true, 0);
      assertPresence(ID.SCAN_DETAILS);
    });
  });
  it('Deletes a scan result', () => {
    assertForm(VALID);
    wait(TIMEOUT).then(() => {
      assertPresence(ID.SCAN_RESULT);
      clickElement(ID.CTA.HOME_SUMMARY);
      assertPresence(ID.SCAN_LIST);
      clickElement(ID.ACTION, true, 1);
      clickElement(ID.ACTION_DELETE, true, 0);
    });
  });
  it('Downloads the scan result details into CSV format', () => {
    assertForm(VALID);
    wait(TIMEOUT).then(() => {
      assertPresence(ID.SCAN_RESULT);
      clickElement(ID.CTA.HOME_SUMMARY);
      assertPresence(ID.SCAN_LIST);
      clickElement(ID.ACTION, true, 0);
      assertPresence(ID.SCAN_DETAILS);
      clickElement(ID.SUBMIT);
    });
  });
});
