import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import Status from '../../Layout/Status';
import ButtonIcon from '../../Layout/ButtonIcon';
import { BUTTON_ICON, LANGUAGES } from '../../../utils/constants';

function ScanList() {
  const { t, i18n } = useTranslation();
  const SCAN_RESULT = {
    HEADERS: [
      'URL',
      t('scan.list.entry.status'),
      t('scan.list.entry.creation'),
      t('scan.list.entry.actions'),
    ],
  };

  /**
   * @description Localized date helper
   * @author Luca Cattide
   * @param {string} date
   * @returns {*}  {string}
   */
  const setDate = (date: string): string => {
    const localizedDate = {
      [LANGUAGES[0]]: new Date(date).toLocaleString(LANGUAGES[0]),
      [LANGUAGES[1]]: new Date(date).toLocaleString(LANGUAGES[1]),
    };

    return localizedDate[i18n.language].split(',')[0];
  };

  return (
    // Scan List Start
    <section className="scan--list flex-1 px-4 py-4 w-full flex flex-col items-center">
      <h1 className="scan--list__title text-default mb-4 text-center text-2xl font-bold">
        {t('scan.list.title')}
      </h1>
      {/* Results Start */}
      {/* TODO: Responsive */}
      <table className="scan--list__results table-auto">
        <caption className="results__caption select-none">
          {t('scan.list.caption')}
        </caption>
        {/* Header Start */}
        <thead className="results__header">
          <tr className="header__row">
            {SCAN_RESULT.HEADERS.map((header, i) => (
              <th
                className="row__title text-default px-4 py-4 font-bold select-none"
                key={crypto.randomUUID() + i}
                scope="col"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        {/* Header End */}
        <tbody className="results__body">
          <tr className="body__row">
            {/* TODO: Data binding */}
            <th className="row__data row__data--url px-4 py-4" scope="row">
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
            <td className="row__data row__data--status px-4 py-4 text-center">
              <Status type="done" />
            </td>
            <td className="row__data row__data--created px-4 py-4 text-center">
              {setDate('01/01/2000')}
            </td>
            <td className="row__data row__data--actions px-4 py-4 text-center">
              {Object.values(BUTTON_ICON)
                .reverse()
                .map((value, i) => (
                  <ButtonIcon
                    callback={() => {
                      /* TODO: */
                    }}
                    key={crypto.randomUUID() + i}
                    label={t(`scan.list.action.${value}`)}
                    variant={value}
                  />
                ))}
            </td>
          </tr>
        </tbody>
      </table>
      {/* Results End */}
    </section>
    // Scan List End
  );
}

export default ScanList;
