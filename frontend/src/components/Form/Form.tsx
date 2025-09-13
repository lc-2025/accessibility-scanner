import { useState } from 'react';
import { Button as FormButton, Fieldset, Legend } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import Button from '../Layout/Button';
import { BUTTON_TYPE, FORM_ACTION } from '../../utils/constants';
import FormField from './FormField';
import type { Dispatch, SetStateAction } from 'react';

/**
 * @description Form component
 * @author Luca Cattide
 * @param {{ callback: Dispatch<SetStateAction<boolean>> }} { callback }
 * @returns {*}
 */
function Form({ callback }: { callback: Dispatch<SetStateAction<boolean>> }) {
  const { ADD } = FORM_ACTION;
  const { t } = useTranslation();
  const [urls, setUrls] = useState<number>(1);

  const handleSubmit = (e): void => {
    // TODO:
    e.preventDefault();
    // TODO: Only if successful
    callback(true);
  };

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
    <form className="form flex flex-col items-center" onSubmit={handleSubmit}>
      {/* Fieldset Start */}
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
      {/* Fieldset End */}
      {/* Message Start */}
      <p aria-live="polite" className="form__message">
        {/* TODO: */}
      </p>
      {/* Message End */}
    </form>
    // Form End
  );
}

export default Form;
