import { useTranslation } from 'react-i18next';

/**
 * @description Empty State component
 * @author Luca Cattide
 * @param {TEmptyState} { message }
 * @returns {*}
 */
function EmptyState() {
  const { t } = useTranslation();

  return (
    // Empty State Start
    <aside className="empty__state flex h-auto w-full flex-col items-center mt-8 justify-center bg-white">
      <h2 className="empty__state__title text-default text-2xl mb-4">{t('emptyState.title')}</h2>
      <p className="empty__state__message">{t('emptyState.message')}</p>
    </aside>
    // Empty State End
  );
}

export default EmptyState;
