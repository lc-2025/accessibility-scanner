import { Link } from 'react-router';
import { BUTTON_TYPE, TEST } from '../../utils/constants';
import type { TButton } from '../../types/components/Button';

/**
 * @description Button component
 * @author Luca Cattide
 * @param {TButton} { ariaLabel, callback, disabled, label, link, title, type, variant }
 * @returns {*}
 */
function Button({
  ariaLabel,
  callback,
  disabled,
  label,
  link,
  title,
  type,
  variant,
}: TButton) {
  const { ANCHOR, DEFAULT, LINK } = BUTTON_TYPE;
  const { ID } = TEST;
  const { CTA, SUBMIT } = ID;
  const { HOME, HOME_SUMMARY } = CTA;

  return variant === ANCHOR ? (
    <a
      aria-label={ariaLabel}
      className="button text-primary rounded-2xl bg-white px-8 py-4 text-2xl font-bold uppercase transition-opacity select-none hover:opacity-75 sm:text-4xl"
      data-testid={HOME}
      href="#summary"
      onClick={callback}
      title={title}
    >
      {label}
    </a>
  ) : variant === DEFAULT ? (
    <button
      aria-label={ariaLabel}
      className={`button bg-primary w-full cursor-pointer rounded-2xl px-8 py-4 text-center font-bold text-white uppercase transition-opacity select-none hover:opacity-75 ${disabled && 'opacity-50'}`}
      data-testid={SUBMIT}
      onClick={callback}
      type={type as 'button' | 'submit'}
    >
      {label}
    </button>
  ) : variant === LINK ? (
    <Link
      aria-label={ariaLabel}
      className="button bg-primary rounded-2xl px-8 py-4 text-center font-bold text-white uppercase transition-opacity select-none hover:opacity-75"
      data-testid={HOME_SUMMARY}
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
