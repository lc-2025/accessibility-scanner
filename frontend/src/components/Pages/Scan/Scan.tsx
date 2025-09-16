import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Form from '../../Form/Form';
import {
  BUTTON_TYPE,
  DEFAULT_STATE,
  ROUTE,
  TEST,
} from '../../../utils/constants';
import Button from '../../Layout/Button';
import Breadcrumb from '../../Layout/Breadcrumb';
/**
 * @description Scan page component
 * @author Luca Cattide
 * @returns {*}
 */
function Scan() {
  const { SCAN, SCAN_RESULT } = TEST.ID;
  const { t } = useTranslation();
  const [result, setResult] = useState<boolean>(DEFAULT_STATE.SCAN.RESULT);

  return (
    // Scan Start
    <section className="scan w-full flex-1 px-4 py-4" data-testid={SCAN}>
      <Breadcrumb />
      <h1 className="scan__title text-default mb-4 text-center text-2xl font-bold">
        {t('scan.title')}
      </h1>
      {result ? (
        // Result Start
        <div
          className="scan__result mx-auto mt-8 flex w-fit flex-col items-center"
          data-testid={SCAN_RESULT}
        >
          <p className="result__message text-default mb-4 text-center">
            {t('scan.result.message')}
          </p>
          <Button
            label={t('scan.result.label')}
            link={ROUTE.SCAN.LIST.PATH}
            variant={BUTTON_TYPE.LINK}
          />
          <div className="mt-4">
            <Button
              callback={() => setResult(false)}
              label={t('scan.result.new')}
              variant={BUTTON_TYPE.DEFAULT}
            />
          </div>
        </div>
      ) : (
        // Result End
        <Form callback={setResult} />
      )}
    </section>
    // Scan End
  );
}

export default Scan;
