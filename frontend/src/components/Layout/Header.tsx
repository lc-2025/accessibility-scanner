import Language from './Language';
import Logo from './Logo';
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
      <div className="header__container w-fit flex items-center">
        <Logo />
        <Menu />
      </div>
      <Language />
    </header>
  );
}

export default Header;
