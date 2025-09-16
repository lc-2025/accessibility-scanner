import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  keepPreviousData,
  useQueryClient,
  useQuery,
  useMutation,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline';
import Breadcrumb from '../../Layout/Breadcrumb';
import Status from '../../Layout/Status';
import ButtonIcon from '../../Layout/ButtonIcon';
import Pagination from '../../Layout/Pagination';
import Loading from '../../Layout/Loading';
import Error from '../../Layout/Error';
import EmptyState from '../../Layout/EmptyState';
import { getScans, deleteScan } from '../../../utils/api';
import {
  API,
  BUTTON_ICON,
  DEFAULT_STATE,
  LANGUAGES,
  PAGINATION,
  ROUTE,
  TEST,
} from '../../../utils/constants';
import type { TScanState } from '../../../types/components/ScanList';
import { enableCache } from '../../../utils/utilities';

/**
 * @description Scan list component
 * @author Luca Cattide
 * @returns {*}  {boolean}
 */
function ScanList() {
  const { GET_SCANS } = API.TOKEN;
  const { VIEW } = BUTTON_ICON;
  const { NEXT, PAGE, PREVIOUS } = PAGINATION;
  const { HOME, SCAN } = ROUTE;
  const { ID } = TEST;
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
    placeholderData: keepPreviousData,
    staleTime: enableCache(),
  });
  const mutation = useMutation({
    mutationFn: deleteScan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_SCANS, pagination] });
    },
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
    // Query prefetching check - Only for a minimum amount of 2 pages
    if (!isPlaceholderData && data && data.count > 10) {
      queryClient.prefetchQuery({
        queryKey: [
          getScans,
          {
            limit,
            // Next page prefetching by default
            skip: skip + 10,
          },
        ],
        queryFn: () => getScans(limit, skip),
        staleTime: enableCache(),
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

  /**
   * @description Scan action handler
   * Manages performable action with a single scan:
   * - View details
   * - Delete
   * @author Luca Cattide
   * @param {string} action
   * @param {string} id
   */
  const handleAction = (action: string, id: string): void => {
    if (action === VIEW) {
      navigate(`${HOME.PATH}${SCAN.PATH}/details/${id}`);
    } else {
      mutation.mutate(id);
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
    skip >= 10 && skip <= count ? (skip + 10) / 10 : 1;

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
       * Calculation constraints
       * - Next page: lower than the range set until the total records
       * - Page X: Traverse backward or forward based on the range set correspondent to the page
       * - Previous page: Greater than the range set until the first record
       */
      [NEXT]: skip < data!.count + 10 ? skip + 10 : skip,
      [PAGE]:
        range > skip + 10 && range + 10 < data!.count ? range + 10 : range - 10,
      [PREVIOUS]: skip <= data!.count - 10 ? skip - 10 : skip,
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
    <section
      className="scan--list flex w-full flex-col items-center py-4"
      data-testid={ID.SCAN_LIST}
    >
      <Breadcrumb />
      <h1 className="scan--list__title text-default mb-8 text-center text-2xl font-bold">
        {t('scan.list.title')}
      </h1>
      {status === 'pending' || isFetching ? (
        <Loading />
      ) : data && data.data.length > 0 ? (
        // Results Start
        <div className="scan--list__container w-full flex-1 overflow-x-auto lg:w-2/3">
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
                      data-testid={ID.URL}
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
                      .map((value, i) =>
                        value === VIEW ? (
                          <ButtonIcon
                            callback={() => handleAction(value, id)}
                            key={crypto.randomUUID() + i}
                            label={t(`scan.list.action.${value}`)}
                            variant={value}
                          />
                        ) : (
                          <Popover
                            className="data_popover inline-block"
                            key={crypto.randomUUID() + i}
                          >
                            <PopoverButton className="popover__button container__button ml-4 cursor-pointer rounded-2xl bg-red-500 px-4 py-2 text-white transition-opacity hover:opacity-75">
                              <TrashIcon className="button__icon size-6" />
                            </PopoverButton>
                            <PopoverPanel
                              anchor="bottom"
                              className="popover__panel text-default flex rounded-2xl bg-white px-4 py-4 shadow-lg"
                            >
                              {t('scan.list.action.confirm')}
                              <CheckIcon
                                className="panel__icon ml-4 size-6 cursor-pointer text-green-500"
                                onClick={() => handleAction(value, id)}
                              />
                            </PopoverPanel>
                          </Popover>
                        ),
                      )}
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
      <ReactQueryDevtools />
    </section>
  );
  // Scan List End
}

export default ScanList;
