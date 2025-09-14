import { useTranslation } from 'react-i18next';
import type { TPagination } from '../../types/components/Pagination';

/**
 * @description Pagination component
 * @author Luca Cattide
 * @param {TPagination} { pages }
 * @returns {*}
 */
function Pagination({ callback, pages }: TPagination) {
  const { t } = useTranslation();

  return (
    // Pagination Start
    <ul className="pagination text-default flex flex-wrap justify-center gap-1 select-none">
      <li className="pagination__prev mt-4 mb-4 pl-4 sm:mb-0">
        <a
          aria-label={t('scan.pagination.previous')}
          className="prev__link border-primary text-primary mx-4 grid place-content-center rounded-2xl border px-4 py-2 transition-opacity hover:opacity-75 rtl:rotate-180"
          href="#"
          onClick={() => callback(-1)}
          rel="noindex,nofollow"
          title={t('scan.pagination.previous')}
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
          {/* TODO: On more than 5 pages, shortcut - i.e. `...` */}
          <a
            aria-label={`${t('scan.pagination.page')} ${i + 1}`}
            className="page__link border-primary text-primary mx-4 block rounded-2xl border px-4 py-2 text-center transition-opacity hover:opacity-75"
            href="#"
            onClick={() => callback(i + 1, true)}
            rel="noindex,nofollow"
            title={`${t('scan.pagination.page')} ${i + 1}`}
          >
            {i + 1}
          </a>
        </li>
        // Page End
      ))}
      <li className="pagination__next mt-4 mb-4 pr-4 sm:mb-0">
        <a
          aria-label={t('scan.pagination.next')}
          className="next__link border-primary text-primary mx-4 grid place-content-center rounded-2xl border px-4 py-2 transition-opacity hover:opacity-75 rtl:rotate-180"
          href="#"
          onClick={() => callback(-1)}
          rel="noindex,nofollow"
          title={t('scan.pagination.next')}
        >
          &gt;
        </a>
      </li>
    </ul>
  );
}

export default Pagination;
