import { NavLink, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ROUTE } from '../../utils/constants';
import type { TBreadcrumbPath } from '../../types/components/Breadcrumb';

/**
 * @description Breadcrumb component
 * @author Luca Cattide
 * @returns {*}
 */
function Breadcrumb() {
  const { HOME, SCAN } = ROUTE;
  const { DETAILS, LIST } = SCAN;
  const { pathname } = useLocation();
  const { t } = useTranslation();

  /**
   * @description Breadcrumb path handler
   * Gets the navigation tree based on current location
   * @author Luca Cattide
   * @returns {*}  {Array<TBreadcrumbPath>}
   */
  const handlePath = (): Array<TBreadcrumbPath> => {
    const pathList = `${HOME.PATH}${SCAN.PATH}/${LIST.PATH}`;
    const pathScan = `${HOME.PATH}${SCAN.PATH}`;
    const currentPath = {
      details: [
        {
          label: t(`menu.scan`),
          path: pathScan,
        },
        {
          label: t(`menu.list`),
          path: pathList,
        },
        {
          label: t(`menu.details`),
          path: `${HOME.PATH}${SCAN.PATH}/${LIST.PATH}/${DETAILS.PATH}`,
        },
      ],
      [pathList]: [
        {
          label: t(`menu.scan`),
          path: pathScan,
        },
        {
          label: t(`menu.list`),
          path: pathList,
        },
      ],
      [pathScan]: [
        {
          label: t(`menu.scan`),
          path: pathScan,
        },
      ],
    };

    return pathname.indexOf(DETAILS.PATH.split('/')[0]) !== -1
      ? currentPath.details
      : currentPath[pathname as keyof typeof currentPath];
  };

  return (
    // Breadcrumb Start
    <nav className="breadcrumb mb-8 w-full px-4 select-none">
      <h6 className="breadcumb__title hidden">Breadcrumb</h6>
      {/* Please note in this case the home reference is willingly disabled to avoid link redundancy
      with the main menu above */}
      Home <span className="breadcrumb__separator ml-4">&gt;</span>
      {handlePath().map(({ label, path }, i) =>
        i === handlePath().length - 1 ? (
          <span className="menu__path px-4 py-4" key={crypto.randomUUID() + i}>
            {label}
          </span>
        ) : (
          <span key={crypto.randomUUID() + i + 1}>
            <NavLink
              className={`menu__link hover:text-primary $ px-4 py-4 transition-colors hover:underline`}
              title={label}
              to={path}
            >
              {label}
            </NavLink>
            <span className="breadcrumb__separator">&gt;</span>
          </span>
        ),
      )}
    </nav>
    // Breadcrumb End
  );
}

export default Breadcrumb;
