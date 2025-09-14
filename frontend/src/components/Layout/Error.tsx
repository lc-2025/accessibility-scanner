import { useTranslation } from 'react-i18next';
import type { TError } from '../../types/components/Error';

/**
 * @description Error component
 * @author Luca Cattide
 * @param {TError} { message }
 * @returns {*}
 */
function Error({ message }: TError) {
  const { t } = useTranslation();

  return (
    // Error Start
    <aside className="error flex h-auto w-full flex-col items-center mt-8 justify-center bg-white">
      <h2 className="error__title text-default text-2xl mb-4">{t('error')}</h2>
      <p className="error__message">{message}</p>
    </aside>
    // Error End
  );
}

export default Error;
