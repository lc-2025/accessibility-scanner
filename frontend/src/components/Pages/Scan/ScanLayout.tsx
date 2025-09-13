import { Outlet } from 'react-router';
import Header from '../../Layout/Header';

/**
 * @description Layout - Scan component
 * @author Luca Cattide
 * @returns {*}  {boolean}
 */
function ScanLayout() {
  return (
    <div className="layout--scan flex flex-col min-h-dvh items-center">
      <Header />
      <Outlet />
    </div>
  );
}

export default ScanLayout;
