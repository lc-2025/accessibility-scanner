import Language from './Language';
import Menu from './Menu';

/**
 * @description Header component
 * @author Luca Cattide
 * @returns {*}
 */
function Header() {
  return (
    <header className="header flex w-full items-center justify-between rounded-b-2xl px-4 py-4 shadow-md">
      <h6 className="header__title hidden">Header</h6>
      <Menu />
      <Language />
    </header>
  );
}

export default Header;
