import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ROUTE } from '../../utils/constants';

/**
 * @description Menu component
 * @author Luca Cattide
 * @returns {*}
 */
function Menu() {
  const { HOME, SCAN } = ROUTE;
  const { t } = useTranslation();

  /**
   * @description Menu label getter
   * Retrieves the actual labe by the location path
   * @author Luca Cattide
   * @param {string} path
   * @returns {*}  {string}
   */
  const getLabel = (path: string): string =>
    path === HOME.PATH ? 'Home' : t('menu.scans');

  return (
    <nav className="menu text-default uppercase">
      <h6 className="menu__title hidden">Main Menu</h6>
      {[HOME, SCAN.LIST].map(({ PATH }, i) => (
        <NavLink
          className={({isActive}) => `menu__link hover:text-primary py-4 transition-colors hover:underline sm:mr-4 sm:ml-4 sm:pr-4 sm:pl-4 ${isActive && 'text-primary pointer-events-none'}`}
          key={crypto.randomUUID() + i}
          title={getLabel(PATH)}
          to={PATH}
        >
          {getLabel(PATH)}
        </NavLink>
      ))}
    </nav>
  );
}

export default Menu;
