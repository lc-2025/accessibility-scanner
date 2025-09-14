import { useTranslation } from 'react-i18next';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { LANGUAGES } from '../../utils/constants';

/**
 * @description Language component
 * @author Luca Cattide
 * @returns {*}
 */
function Language() {
  const { t, i18n } = useTranslation();

  /**
   * @description Language helper
   * Switches the current language
   * @author Luca Cattide
   * @date 13/09/2025
   * @param {string} language
   */
  const handleLanguage = (language: string): void => {
    i18n.changeLanguage(language);
  };

  return (
    <aside className="language">
      <h6 className="language__title hidden">Language</h6>
      <Menu>
        <MenuButton className="language__button text-primary border-primary cursor-pointer rounded-2xl border-2 px-4 py-2 transition-opacity select-none hover:opacity-75">
          {t('language')}
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className="language__menu w-fit rounded-2xl shadow-lg"
        >
          {LANGUAGES.map((language, i) => (
            <MenuItem key={crypto.randomUUID() + i}>
              <button
                className={`popover__language hover:bg-primary text-defaul w-full cursor-pointer bg-white px-4 py-4 select-none hover:text-white ${i === 0 && 'border-b border-gray-200'} ${i18n.language.indexOf(language) !== -1 && 'font-bold'}`}
                key={crypto.randomUUID() + i}
                onClick={() => handleLanguage(language)}
              >
                {t(language)}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </aside>
  );
}

export default Language;
