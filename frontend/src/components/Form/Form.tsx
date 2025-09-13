import { useState } from 'react';
import { Button as FormButton, Fieldset, Legend } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import Button from '../Layout/Button';
import { BUTTON_TYPE, FORM_ACTION } from '../../utils/constants';
import FormField from './FormField';

/**
 * @description Form component
 * @author Luca Cattide
 * @returns {*}
 */
function Form() {
  const { ADD } = FORM_ACTION;
  const { t } = useTranslation();
  const [urls, setUrls] = useState<number>(1);

  /**
   * @description URLs setter handler
   * @author Luca Cattide
   * @param {string} action
   */
  const handleUrls = (action: string): void => {
    setUrls((state) =>
      action === ADD ? state + 1 : state > 1 ? state - 1 : state,
    );
  };

  return (
    // Form Start
    <form className="form flex flex-col items-center">
      {/* Fields Start */}
      <Fieldset className="form__fields">
        <Legend className="fields__legend text-default mb-4 text-center select-none">
          {t('scan.form.legend')}
        </Legend>
        {Array.from(Array(urls), (_, i) => (
          <FormField
            callback={handleUrls}
            key={crypto.randomUUID() + i}
            index={i}
            urls={urls}
          />
        ))}
        <FormButton
          className="fields__add button bg-accent text-default mb-8 w-full cursor-pointer rounded-2xl px-8 py-4 text-center font-bold uppercase transition-opacity select-none hover:opacity-75"
          onClick={() => handleUrls(ADD)}
          type="button"
        >
          {t('scan.form.add')}
        </FormButton>
        <Button
          ariaLabel={t('scan.form.submit')}
          label={t('scan.form.submit')}
          type="submit"
          variant={BUTTON_TYPE.DEFAULT}
        />
      </Fieldset>
      {/* Fields End */}
    </form>
    // Form End
  );
}

export default Form;
