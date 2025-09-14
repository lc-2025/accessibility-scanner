import { useTranslation } from 'react-i18next';
import { PAGINATION } from '../../utils/constants';
import type { TPagination } from '../../types/components/Pagination';

/**
 * @description Pagination component
 * @author Luca Cattide
 * @param {TPagination} { pages }
 * @returns {*}
 */
function Pagination({ callback, page, pages }: TPagination) {
  const { NEXT, PAGE, PREVIOUS } = PAGINATION;
  const { t } = useTranslation();

  /**
   * @description Current page helper
   * @author Luca Cattide
   * @date 14/09/2025
   * @param {number} index
   * @returns {*}  {boolean}
   */
  const isCurrentPage = (index: number): boolean => page === index + 1;

  /**
   * @description Navigation handler
   * @author Luca Cattide
   * @date 14/09/2025
   * @param {React.MouseEvent<HTMLAnchorElement, MouseEvent>} e
   * @param {string} action
   * @param {number} [number]
   */
  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    action: string,
    number?: number,
  ): void => {
    e.preventDefault();

    callback(action, number);
  };

  return (
    // Pagination Start
    <ul className="pagination text-default flex flex-wrap justify-center gap-1 select-none">
      <li className="pagination__prev mt-4 mb-4 pl-4 sm:mb-0">
        <a
          aria-label={t('scan.list.pagination.previous')}
          className={`prev__link border-primary text-primary mx-4 grid min-h-12 min-w-12 flex-col place-content-center items-center justify-center rounded-2xl border px-4 py-2 transition-opacity hover:opacity-75 rtl:rotate-180 ${page === 1 && 'pointer-events-none'}`}
          href="#"
          onClick={(e) => handleNavigation(e, PREVIOUS)}
          rel="noindex,nofollow"
          title={t('scan.list.pagination.previous')}
        >
          &lt;
        </a>
      </li>
      {Array.from(Array(pages)).map((_, i) => (
        // Page Start
        <li
          className="pagination__page mt-4 mb-4 sm:mb-0"
          key={crypto.randomUUID() + i}
        >
          {/* May be shortened - i.e on more than 5 pages, shortcut - i.e. `...` */}
          <a
            aria-label={`${t('scan.list.pagination.page')} ${i + 1}`}
            className={`page__link border-primary mx-4 flex min-h-12 min-w-12 flex-col items-center justify-center rounded-2xl border px-4 py-2 text-center transition-opacity hover:opacity-75 ${isCurrentPage(i) ? 'bg-primary pointer-events-none text-white' : 'text-primary bg-none'}`}
            href="#"
            onClick={(e) => handleNavigation(e, PAGE, i + 1)}
            rel="noindex,nofollow"
            title={`${t('scan.list.pagination.page')} ${i + 1}`}
          >
            {i + 1}
          </a>
        </li>
        // Page End
      ))}
      <li className="pagination__next mt-4 mb-4 ml-4 pr-4 sm:mb-0">
        <a
          aria-label={t('scan.list.pagination.next')}
          className={`next__link border-primary text-primary justify-centermx-4 grid min-h-12 min-w-12 flex-col place-content-center items-center rounded-2xl border px-4 py-2 transition-opacity hover:opacity-75 rtl:rotate-180 ${page === pages && 'pointer-events-none'}`}
          href="#"
          onClick={(e) => handleNavigation(e, NEXT)}
          rel="noindex,nofollow"
          title={t('scan.list.pagination.next')}
        >
          &gt;
        </a>
      </li>
    </ul>
  );
}

export default Pagination;
