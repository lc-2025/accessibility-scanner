import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import Home from '../../components/Pages/Home';
import Scan from '../../components/Pages/Scan/Scan';
import ScanList from '../../components/Pages/Scan/ScanList';
import { withQuery, withTranslation } from '../../utils/testing';
import { ROUTE, TEST } from '../../utils/constants';

// Unit Test - Pages
describe('Pages Unit Test', () => {
  const { getByTestId } = screen;
  const { HOME, SCAN } = ROUTE;
  const { ID } = TEST;

  /**
   * @description Component rendering assertion helper
   * @author Luca Cattide
   * @param {string} id
   */
  const assertRender = (id: string): void => {
    // @ts-expect-error Testing Library issue
    expect(getByTestId(id)).toBeInTheDocument();
  };

  /**
   * @description Component stubber helper
   * @author Luca Cattide
   * @param {string} path
   * @param {*} component
   */
  const stubPage = (path: string, component: any): void => {
    const Stub = createRoutesStub([
      {
        path,
        Component: component,
      },
    ]);

    render(<Stub initialEntries={[path]} />);
  };

  // Setup
  beforeEach(() => {
    withTranslation();
  });

  // Tests
  it('Renders the Home page', () => {
    stubPage(HOME.PATH, Home);
    assertRender(ID.HOME);
  });
  it('Renders the Scan page', () => {
    const path = `${HOME.PATH}${SCAN.PATH}/${SCAN.LIST.PATH}`;

    const Stub = createRoutesStub([
      {
        path,
        Component: () => withQuery(<Scan />),
      },
    ]);

    render(<Stub initialEntries={[path]} />);
    assertRender(ID.SCAN);
  });
  it('Renders the Scan resuts page', () => {
    const path = `${HOME.PATH}${SCAN.PATH}/${SCAN.LIST.PATH}`;

    const Stub = createRoutesStub([
      {
        path,
        Component: () => withQuery(<ScanList />),
      },
    ]);

    render(<Stub initialEntries={[path]} />);
    assertRender(ID.SCAN_LIST);
  });
});
