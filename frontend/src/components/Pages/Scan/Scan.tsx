import { useTranslation } from 'react-i18next';
import Form from '../../Form/Form';
/**
 * @description Scan page component
 * @author Luca Cattide
 * @returns {*}
 */
function Scan() {
  const { t } = useTranslation();

  return (
    // Scan Start
    <section className="scan px-4 py-4 flex-1">
      <h1 className="scan__title text-default mb-4 text-center text-2xl font-bold">
        {t('scan.title')}
      </h1>
      <Form />
    </section>
    // Scan End
  );
}

export default Scan;
