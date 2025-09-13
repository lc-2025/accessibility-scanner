import { Link } from 'react-router';
import { BUTTON_TYPE } from '../../utils/constants';
import type { TButton } from '../../types/components/Button';

/**
 * @description Button component
 * @author Luca Cattide
 * @param {TButton} { callback, label, link, title, type }
 * @returns {*}
 */
function Button({ callback, label, link, title, type }: TButton) {
  const { ANCHOR, DEFAULT, LINK } = BUTTON_TYPE;

  return type === ANCHOR ? (
    <a
      className="titles__cta text-primary rounded-2xl bg-white px-8 py-4 text-2xl font-bold uppercase transition-opacity select-none hover:opacity-75 sm:text-4xl"
      href="#summary"
      onClick={callback}
      title={title}
    >
      {label}
    </a>
  ) : type === DEFAULT ? (
    <></>
  ) : type === LINK ? (
    <Link
      className="titles__cta bg-primary rounded-2xl px-8 py-4 text-center font-bold text-white uppercase transition-opacity select-none hover:opacity-75"
      title={title}
      to={link!}
    >
      {label}
    </Link>
  ) : (
    <></>
  );
}

export default Button;
