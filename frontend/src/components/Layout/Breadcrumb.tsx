import { NavLink } from 'react-router';
import { ROUTE } from '../../utils/constants';

function Breadcrumb() {
  const { HOME } = ROUTE;

  // TODO: Extract levels via current path

  return (
    <nav className="breadcrumb mb-8 w-full">
      <h6 className="breadcumb__title hidden">Breadcrumb</h6>
      Home <span className='breadcrumb__separator ml-4'>&gt;</span>
      <NavLink
        className="menu__link hover:text-primary py-4 transition-colors hover:underline px-4 text-primary"
        title="Home"
        to={HOME.PATH}
      >
        Foo
      </NavLink>
    </nav>
  );
}

export default Breadcrumb;
