import { useTranslation } from 'react-i18next';

/**
 * @description Footer component
 * @author Luca Cattide
 * @returns {*}
 */
function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer bg-primary mt-12 flex w-full rounded-t-2xl px-4 py-12 sm:px-12">
      <small className="footer__credits w-full text-center text-white">
        {t('footer')}
      </small>
    </footer>
  );
}

export default Footer;
