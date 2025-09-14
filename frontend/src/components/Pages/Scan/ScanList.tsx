import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import Breadcrumb from '../../Layout/Breadcrumb';
import Status from '../../Layout/Status';
import ButtonIcon from '../../Layout/ButtonIcon';
import Pagination from '../../Layout/Pagination';
import Loading from '../../Layout/Loading';
import Error from '../../Layout/Error';
import { getScans } from '../../../utils/api';
import {
  API,
  BUTTON_ICON,
  DEFAULT_STATE,
  LANGUAGES,
  PAGINATION,
  ROUTE,
} from '../../../utils/constants';
import type { TScanState } from '../../../types/components/ScanList';
import EmptyState from '../../Layout/EmptyState';

/**
 * @description Scan list component
 * @author Luca Cattide
 * @returns {*}  {boolean}
 */
function ScanList() {
  const { GET_SCANS } = API.TOKEN;
  const { NEXT, PAGE, PREVIOUS } = PAGINATION;
  const { HOME, SCAN } = ROUTE;
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<TScanState>(
    DEFAULT_STATE.PAGINATION,
  );
  const { limit, skip } = pagination;
  const queryClient = useQueryClient();
  const { data, error, isFetching, isPlaceholderData, status } = useQuery({
    queryKey: [GET_SCANS, pagination],
    queryFn: () => getScans(limit, skip),
  });
  const scanResult = {
    headers: [
      'URL',
      t('scan.list.entry.status'),
      t('scan.list.entry.creation'),
      t('scan.list.entry.actions'),
    ],
  };

  useEffect(() => {
    // Query prefetching check
    if (!isPlaceholderData && data) {
      queryClient.prefetchQuery({
        queryKey: [getScans, pagination],
        queryFn: () => getScans(limit, skip),
      });
    }
  }, [data, isPlaceholderData, pagination, queryClient]);

  /**
   * @description Localized date helper
   * Formats the date to the current locae ISO version
   * @author Luca Cattide
   * @param {string} date
   * @returns {*}  {string}
   */
  const formatDate = (date: string): string =>
    new Date(date)
      .toLocaleString(LANGUAGES[i18n.language === LANGUAGES[0] ? 0 : 1])
      .split(',')[0];

  const handleAction = (action: string, id: string): void => {
    if (action === BUTTON_ICON.VIEW) {
      navigate(`${HOME.PATH}${SCAN.PATH}/details/${id}`);
    } else {
      // TODO: Deletion
    }
  };

  /**
   * @description Current page handler
   * @author Luca Cattide
   * @returns {*}  {number}
   */
  const handlePage = (count: number): number =>
    /**
     * Ensure to not exceed limits
     * Greater than zero and lower than total records
     */
    skip >= 10 && skip <= count ? skip / 10 : 1;

  /**
   * @description Total pages handler
   * @author Luca Cattide
   * @param {number} count
   * @returns {*}  {number}
   */
  const handlePages = (count: number): number => Math.ceil(count / 10);

  /**
   * @description Pagination hadler
   * @author Luca Cattide
   * @date 14/09/2025
   * @param {string} action
   * @param {number} [page]
   */
  const handlePagination = (action: string, page?: number): void => {
    const range = page ? page * 10 : 0;
    const change = {
      /**
       * Calculation constraints:
       * - Next page: lower than the set range until the total records
       * - Page X: Traverse backward or forward based on the range correspondent to the page
       * - Previous page: Greater than the set range until the first record
       */
      [NEXT]: skip < data!.count + 10 ? skip + 10 : skip,
      // FIXME: Jumps over +/-10
      [PAGE]: range > skip + 10 ? range + 10 : range - 10,
      [PREVIOUS]: skip > data!.count - 10 ? skip - 10 : skip,
    };

    setPagination((state) => ({
      ...state,
      skip: change[action],
    }));
  };

  return error ? (
    <Error message={error.message} />
  ) : (
    // Scan List Start
    <section className="scan--list flex w-full flex-col items-center py-4">
      <Breadcrumb />
      <h1 className="scan--list__title text-default mb-8 text-center text-2xl font-bold">
        {t('scan.list.title')}
      </h1>
      {status === 'pending' || isFetching ? (
        <Loading />
      ) : data ? (
        // Results Start
        <div className="scan--list__container w-full flex-1 overflow-x-auto">
          <table className="scan--list__results mb-4 min-w-full table-auto">
            <caption className="results__caption sr-only select-none">
              {t('scan.list.caption')}
            </caption>
            {/* Header Start */}
            <thead className="results__header table-header-group">
              <tr className="header__row table-row">
                {scanResult.headers.map((header, i) => (
                  <th
                    className="row__title text-default table-cell px-4 py-4 font-bold whitespace-nowrap select-none"
                    key={crypto.randomUUID() + i}
                    scope="col"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Header End */}
            {/* Body Start */}
            <tbody className="results__body table-row-group">
              {data.data.map(({ createdAt, id, status, url }, i) => (
                // Scan Start
                <tr
                  className="body__row table-row even:bg-gray-50"
                  key={crypto.randomUUID() + id + i}
                >
                  <th
                    className="row__data row__data--url table-cell px-4 py-4 text-left whitespace-nowrap"
                    scope="row"
                  >
                    <Link
                      className="data__link text-primary font-bold transition-opacity hover:opacity-75"
                      target="_blank"
                      title="Visit the tested URL"
                      to={url}
                      rel="noindex,nofollow"
                    >
                      {url}
                    </Link>
                  </th>
                  <td className="row__data row__data--status table-cell px-4 py-4 text-center whitespace-nowrap">
                    <Status type={status} />
                  </td>
                  <td className="row__data row__data--created table-cell px-4 py-4 text-center whitespace-nowrap">
                    {formatDate(createdAt)}
                  </td>
                  <td className="row__data row__data--actions table-cell px-4 py-4 text-center whitespace-nowrap">
                    {Object.values(BUTTON_ICON)
                      .reverse()
                      .map((value, i) => (
                        <ButtonIcon
                          callback={() => handleAction(value, id)}
                          key={crypto.randomUUID() + i}
                          label={t(`scan.list.action.${value}`)}
                          variant={value}
                        />
                      ))}
                  </td>
                </tr>
                // Scan End
              ))}
            </tbody>
            {/* Body End */}
          </table>
          <Pagination
            callback={handlePagination}
            page={handlePage(data.count)}
            pages={handlePages(data.count)}
          />
          {/* Results End */}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
  // Scan List End
}

export default ScanList;
