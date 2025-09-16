import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

/**
 * @description Localization HOC
 * @author Luca Cattide
 * @param {React.ReactNode} children
 * @returns {*}  {React.ReactNode}
 */
const withLocale = (children: React.ReactNode): React.ReactNode => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

export { withLocale };
