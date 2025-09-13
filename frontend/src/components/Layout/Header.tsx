import Menu from './Menu';

/**
 * @description Header component
 * @author Luca Cattide
 * @returns {*}
 */
function Header() {
  return (
    <header className="header w-full rounded-b-2xl px-4 py-4 shadow-md">
      <h6 className="header__title hidden">Header</h6>
      <Menu />
    </header>
  );
}

export default Header;
