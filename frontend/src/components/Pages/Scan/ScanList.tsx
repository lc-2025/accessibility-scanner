import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../../Layout/Breadcrumb';
import Status from '../../Layout/Status';
import ButtonIcon from '../../Layout/ButtonIcon';
import Pagination from '../../Layout/Pagination';
import { BUTTON_ICON, LANGUAGES } from '../../../utils/constants';

/**
 * @description Scan list component
 * @author Luca Cattide
 * @returns {*}  {boolean}
 */
function ScanList() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const scanResult = {
    headers: [
      'URL',
      t('scan.list.entry.status'),
      t('scan.list.entry.creation'),
      t('scan.list.entry.actions'),
    ],
  };

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
      navigate(`/scan/details/${id}`);
    } else {
      // TODO:
    }
  };

  // TODO: Fetching

  return (
    // Scan List Start
    <section className="scan--list flex w-full flex-col items-center py-4">
      <Breadcrumb />
      <h1 className="scan--list__title text-default mb-8 text-center text-2xl font-bold">
        {t('scan.list.title')}
      </h1>
      {/* Results Start */}
      <div className="scan--list__container w-full flex-1 overflow-x-auto">
        <table className="scan--list__results mb-4 min-w-full table-auto">
          <caption className="results__caption select-none">
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
            {/* Scan Start */}
            {/* TODO: Alternate BG color */}
            <tr className={`body__row table-row ${'bg-gray-50'}`}>
              {/* TODO: Data binding */}
              <th
                className="row__data row__data--url table-cell px-4 py-4 whitespace-nowrap"
                scope="row"
              >
                <Link
                  className="data__link text-primary font-bold transition-opacity hover:opacity-75"
                  target="_blank"
                  title="Visit the tested URL"
                  to="https://lucati.dev"
                  rel="noindex,nofollow"
                >
                  https://lucati.dev
                </Link>
              </th>
              <td className="row__data row__data--status table-cell px-4 py-4 text-center whitespace-nowrap">
                <Status type={'done'} />
              </td>
              <td className="row__data row__data--created table-cell px-4 py-4 text-center whitespace-nowrap">
                {formatDate('01/01/2000')}
              </td>
              <td className="row__data row__data--actions table-cell px-4 py-4 text-center whitespace-nowrap">
                {Object.values(BUTTON_ICON)
                  .reverse()
                  .map((value, i) => (
                    // TODO: Delete confirmation
                    <ButtonIcon
                      callback={() => handleAction(value, '1')}
                      key={crypto.randomUUID() + i}
                      label={t(`scan.list.action.${value}`)}
                      variant={value}
                    />
                  ))}
              </td>
            </tr>
            {/* Scan End */}
          </tbody>
          {/* Body End */}
        </table>
        <Pagination
          callback={() => {
            /* TODO: */
          }}
          pages={1}
        />
        {/* Results End */}
      </div>
    </section>
    // Scan List End
  );
}

export default ScanList;
