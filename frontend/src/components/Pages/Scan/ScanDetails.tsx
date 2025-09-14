import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../../Layout/Breadcrumb';
import Button from '../../Layout/Button';
import { BUTTON_TYPE } from '../../../utils/constants';

/**
 * @description Scan details component page
 * @author Luca Cattide
 * @returns {*}  {boolean}
 */
function ScanDetails() {
  const params = useParams();
  const { id } = params;
  const { t } = useTranslation();

  // TODO: Fetching

  // TODO: Change any
  const generateCsv = (json: any): any => {
    const headers = Object.keys(json);
    let csv = '';

    csv += `${headers.join(',')}\n`;

    [json].forEach((scan: any) => {
      const data = headers
        .map((header) => scan[header])
        .join(',');

      csv += `${data}\n`;
    });

    return csv;
  };

  /**
   * @description Scan details into CSV download handler
   * @author Luca Cattide
   * @date 14/09/2025
   */
  const handleDownload = (): void => {
    // TODO: Pass actual data
    const csv = generateCsv({ foo: 'bar', yoo: 'looolo' });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    // TODO: Update name
    a.download = 'scan.csv';

    document.body.appendChild(a);
    a.click();
  };

  return (
    // Scan Details Start
    <section className="scan--details flex w-full flex-1 flex-col items-center py-4">
      <Breadcrumb />
      <h1 className="scan--details__title text-default mb-8 text-center text-2xl font-bold">
        {t('scan.details.title')} {/* TODO: URL */}
      </h1>
      <div className="scan--details__data flow-root w-full sm:w-2/3">
        <aside className="data__download mx-auto mb-8 w-fit">
          <h6 className="download__title hidden">Download</h6>
          <Button
            callback={handleDownload}
            label="Download as CSV"
            variant={BUTTON_TYPE.DEFAULT}
          />
        </aside>
        {/* TODO: Data binding - Group by impact (severe/moderate) */}
        {/* TODO: Add impact filter */}
        <dl className="data__list text-default -my-3 *:even:bg-gray-50">
          <div className="list__container grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="">ID</dt>
            <dd className="sm:col-span-2">{id}</dd>
          </div>

          <div className="list__container grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="">{t('scan.details.impact')}</dt>
            <dd className="sm:col-span-2">foo</dd>
          </div>

          <div className="list__container grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="">{t('scan.details.description')}</dt>
            <dd className="sm:col-span-2">foo</dd>
          </div>
          <div className="list__container grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="">{t('scan.details.nodes')}</dt>
            <dd className="sm:col-span-2">foo</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export default ScanDetails;
