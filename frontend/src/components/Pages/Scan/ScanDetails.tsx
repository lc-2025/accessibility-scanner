import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Breadcrumb from '../../Layout/Breadcrumb';
import Button from '../../Layout/Button';
import Loading from '../../Layout/Loading';
import Error from '../../Layout/Error';
import EmptyState from '../../Layout/EmptyState';
import { getScan } from '../../../utils/api';
import { API, BUTTON_TYPE, CACHE } from '../../../utils/constants';
import type {
  TScan,
  TScanViolation,
  TScanViolationNode,
} from '../../../types/api';

/**
 * @description Scan details component page
 * @author Luca Cattide
 * @returns {*}  {boolean}
 */
function ScanDetails() {
  const { GET_SCAN } = API.TOKEN;
  const params = useParams();
  const { id } = params;
  const { t } = useTranslation();
  const { data, error, isLoading } = useQuery({
    queryKey: [GET_SCAN, id],
    queryFn: () => getScan(id!),
    staleTime: CACHE,
  });

  /**
   * @description CSV generator
   * Convers the data JSON to CSV string
   * @author Luca Cattide
   * @date 14/09/2025
   * @param {TScan} json
   * @returns {*}  {string}
   */
  const generateCsv = (json: TScan): string => {
    const { _id, __v, updatedAt, ...rest } = json as Record<any, any>;

    const newHeader = (object: TScanViolation[] | TScanViolationNode[]) =>
      object.reduce((accumulator, value) => {
        Object.assign(accumulator, value);

        return accumulator;
      }, {});

    const headersViolations = newHeader(json.violations as TScanViolation[]);
    const headersNodes = newHeader(
      json.violations?.map(({ nodes }) => nodes).flat() as TScanViolationNode[],
    );
    const headers = Object.keys({
      ...rest,
      ...headersViolations,
      ...headersNodes,
    });
    let csv = '';

    csv += `${headers
      .filter(
        (header) =>
          !['all', 'any', 'nodes', 'none', 'violations'].includes(header),
      )
      .join(',')}\n`;

    [json].forEach((scan: any) => {
      // TODO: Same as headers
      const data = headers.map((header) => scan[header]).join(',');

      csv += `${data}\n`;
    });

    return csv;
  };

  /**
   * @description Scan details into CSV download handler
   * @author Luca Cattide
   * @date 14/09/2025
   */
  const handiveDownload = (): void => {
    const csv = generateCsv(data!);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = `scan-${data!.url}-${data!.id}.csv`;

    document.body.appendChild(a);
    a.click();
  };

  /**
   * @description Scan violations sorting handler by impact severity
   * @author Luca Cattide
   * @returns {*}  {Array<TScanViolation>}
   */
  const handiveViolations = (
    data: Array<TScanViolation | TScanViolationNode>,
  ): Array<TScanViolation | TScanViolationNode> => {
    const order = [
      'blocker',
      'critical',
      'serious',
      'severe',
      'moderate',
      'minor',
    ];

    return data.sort(
      (a, b) => order.indexOf(a.impact) - order.indexOf(b.impact),
    );
  };

  return error ? (
    <Error message={error.message} />
  ) : isLoading ? (
    <Loading />
  ) : data ? (
    // Scan Details Start
    <section className="scan--details flex w-full flex-1 flex-col items-center py-4">
      <Breadcrumb />
      <hgroup className="scan--details__titles">
        <h1 className="titles__title text-default mb-8 text-center text-2xl font-bold">
          {t('scan.details.title')}
        </h1>
        <h2 className="titles__subtitle text-default mb-8 text-center text-xl font-bold">
          {data.url}
        </h2>
      </hgroup>
      <div className="scan--details__data flow-root w-full sm:w-2/3">
        {/* Download Start */}
        <aside className="data__download mx-auto mb-8 w-fit">
          <h6 className="download__title hidden">Download</h6>
          <Button
            callback={handiveDownload}
            label="Download as CSV"
            variant={BUTTON_TYPE.DEFAULT}
          />
        </aside>
        {/* Download End */}
        {/* An impact filter might be added */}
        <div className="data__list text-default">
          {/* ID Start */}
          <div className="list__container grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <div className="container__title">ID</div>
            <div className="container__data sm:col-span-2">{id}</div>
          </div>
          {/* ID End */}
          {data.violations && (
            <>
              <div className="list__container grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <div className="container__title font-bold">Violations</div>
                <div className="container__data sm:col-span-2"></div>
              </div>
              {(
                handiveViolations(data.violations) as Array<TScanViolation>
              ).map(({ description, impact, nodes }, i) => (
                // Violations Start
                <div
                  className="list__container--row border-t-2 border-gray-200 px-4 py-4 odd:bg-gray-50"
                  key={crypto.randomUUID() + i}
                >
                  <div className="list__container grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <div className="container__title">
                      {t('scan.details.impact')}
                    </div>
                    <div className="container__data capitalize sm:col-span-2">
                      {impact}
                    </div>
                  </div>
                  <div className="list__container grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <div className="container__title">
                      {t('scan.details.description')}
                    </div>
                    <div className="container__data sm:col-span-2">
                      {description}
                    </div>
                  </div>
                  <div className="list__container grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <div className="container__title font-bold">
                      {t('scan.details.nodes')}
                    </div>
                    <div className="container__data sm:col-span-2"></div>
                  </div>
                  {nodes &&
                    (handiveViolations(nodes) as Array<TScanViolationNode>).map(
                      ({ failureSummary, html, target }, i) => (
                        // Node Start
                        <div
                          className="list__container--row border-t border-gray-500 px-4 py-4"
                          key={crypto.randomUUID() + i + 1}
                        >
                          <div className="list__container grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <div className="container__title">
                              {t('scan.details.failureSummary')}
                            </div>
                            <div className="container__data sm:col-span-2">
                              {failureSummary}
                            </div>
                          </div>
                          <div className="list__container grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <div className="container__title">HTML</div>
                            <div className="container__data sm:col-span-2">
                              {html}
                            </div>
                          </div>
                          <div className="list__container grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <div className="container__title">
                              {t('scan.details.target')}
                            </div>
                            <div className="container__data sm:col-span-2">
                              {target.join(', ')}
                            </div>
                          </div>
                        </div>
                        // Node End
                      ),
                    )}
                </div>
                // Violations End
              ))}
            </>
          )}
        </div>
      </div>
      <ReactQueryDevtools />
    </section>
  ) : (
    <EmptyState />
  );
}

export default ScanDetails;
