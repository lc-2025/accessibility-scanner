import { useTranslation } from 'react-i18next';
import '../../css/components/Loading.css';

/**
 * @description Loading component
 * @author Luca Cattide
 * @returns {*}
 */
function Loading() {
  const { t } = useTranslation();

  return (
    <aside className="loading fixed top-0 left-0 z-50 flex h-auto max-h-dvh min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-white">
      <h2 className="loading__title text-default text-2xl">
        {t('loading')}...
      </h2>
    </aside>
  );
}

export default Loading;
