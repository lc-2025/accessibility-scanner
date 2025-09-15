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
    <aside className="error text-default mt-8 flex h-auto w-full flex-col items-center justify-center bg-white">
      <h2 className="error__title mb-4 text-2xl font-bold">{t('error')}</h2>
      <p className="error__message">{message}</p>
    </aside>
    // Error End
  );
}

export default Error;
