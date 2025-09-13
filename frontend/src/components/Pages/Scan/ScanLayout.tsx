import { Outlet } from 'react-router';
import Header from '../../Layout/Header';

/**
 * @description Layout - Scan component
 * @author Luca Cattide
 * @returns {*}  {boolean}
 */
function ScanLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default ScanLayout;
