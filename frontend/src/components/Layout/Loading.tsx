import { useTranslation } from 'react-i18next';
import type { TLoading } from '../../types/components/Loading';
import '../../css/components/Loading.css';

/**
 * @description Loading component
 * @author Luca Cattide
 * @param {TLoading} { modal }
 * @returns {*}
 */
function Loading({ modal }: TLoading) {
  const { t } = useTranslation();

  return (
    <aside
      className={`loading flex h-auto w-full flex-col items-center justify-center bg-white ${modal && 'overflow-hiddenfixed top-0 left-0 z-50 max-h-dvh min-h-dvh'}`}
    >
      <h2 className="loading__title text-default text-2xl">
        {t('loading')}...
      </h2>
    </aside>
  );
}

export default Loading;
