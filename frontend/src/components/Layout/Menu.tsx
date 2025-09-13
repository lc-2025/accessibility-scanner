import { NavLink } from 'react-router';
import { ROUTE } from '../../utils/constants';

/**
 * @description Menu component
 * @author Luca Cattide
 * @returns {*}
 */
function Menu() {
  const { HOME } = ROUTE;

  return (
    <nav className="menu text-default uppercase">
      <h6 className="menu__title hidden">Main Menu</h6>
      <NavLink
        className="menu__link hover:text-primary py-4 transition-colors hover:underline sm:mr-4 sm:ml-4 sm:pr-4 sm:pl-4"
        to={HOME.PATH}
      >
        Home
      </NavLink>
    </nav>
  );
}

export default Menu;
