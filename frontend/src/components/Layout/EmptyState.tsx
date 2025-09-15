import { TableCellsIcon } from '@heroicons/react/24/outline';
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
    <aside className="empty-state mt-8 flex h-auto w-full flex-col items-center justify-center bg-white select-none">
      <TableCellsIcon className="empty-state__icon text-accent mb-4 size-24" />
      <h2 className="empty-state__title text-primary mb-4 text-2xl font-bold">
        {t('emptyState.title')}
      </h2>
      <p className="empty-state__message text-default">
        {t('emptyState.message')}
      </p>
    </aside>
    // Empty State End
  );
}

export default EmptyState;
