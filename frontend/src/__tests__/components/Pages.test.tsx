import { render } from '@testing-library/react';
import Home from '../../components/Pages/Home';
import Scan from '../../components/Pages/Scan/Scan';
import ScanList from '../../components/Pages/Scan/ScanList';
import ScanDetails from '../../components/Pages/Scan/ScanDetails';
import { withLocale } from '../../utils/testing';

// Unit Test - Pages
describe('Pages Unit Test', () => {
  it('Renders the Home page', () => {
    render(withLocale(<Home />));
  });
  it('Renders the Scan page', () => {
    render(withLocale(<Scan />));
  });
  it('Renders the Scan resuts page', () => {
    render(withLocale(<ScanList />));
  });
  it('Renders the Scan resut details page', () => {
    render(withLocale(<ScanDetails />));
  });
});
