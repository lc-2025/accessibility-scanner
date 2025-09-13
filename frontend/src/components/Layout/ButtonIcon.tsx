import { Button } from '@headlessui/react';
import {
  DocumentMagnifyingGlassIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { BUTTON_ICON } from '../../utils/constants';
import type { TButtonIcon } from '../../types/components/ButtonIcon';

/**
 * @description Icon button component
 * @author Luca Cattide
 * @param {TButtonIcon} { callback, label, variant }
 * @returns {*}
 */
function ButtonIcon({ callback, label, variant }: TButtonIcon) {
  const { DELETE } = BUTTON_ICON;

  return (
    <Button
      aria-label={label}
      className={`container__button ml-4 cursor-pointer rounded-2xl px-4 py-2 transition-opacity hover:opacity-75 ${variant === DELETE ? 'bg-red-500 text-white' : 'bg-accent'}`}
      onClick={callback}
    >
      {variant === DELETE ? (
        <TrashIcon className="button__icon size-6" />
      ) : (
        <DocumentMagnifyingGlassIcon className="button__icon size-6" />
      )}
    </Button>
  );
}

export default ButtonIcon;
