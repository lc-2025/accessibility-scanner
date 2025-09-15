import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button as FormButton, Fieldset, Legend } from '@headlessui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Button from '../Layout/Button';
import { postScan } from '../../utils/api';
import { BUTTON_TYPE, DEFAULT_STATE, FORM_ACTION } from '../../utils/constants';
import FormField from './FormField';
import type { Dispatch, SetStateAction } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { TFormFieldset } from '../../types/components/Form';

/**
 * @description Form component
 * @author Luca Cattide
 * @param {{ callback: Dispatch<SetStateAction<boolean>> }} { callback }
 * @returns {*}
 */
function Form({ callback }: { callback: Dispatch<SetStateAction<boolean>> }) {
  const { ADD } = FORM_ACTION;
  const { t } = useTranslation();
  const [urls, setUrls] = useState<number>(DEFAULT_STATE.FORM.URLS);
  const [message, setMessage] = useState<string>(DEFAULT_STATE.FORM.MESSAGE);
  const methods = useForm<TFormFieldset>();
  const { formState, handleSubmit, reset } = methods;
  const { mutate, error } = useMutation({
    mutationFn: postScan,
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setMessage('');
      reset();
    }
  }, [formState, reset]);

  /**
   * @description Form submission handler
   * @author Luca Cattide
   * @param {*} values
   * @returns {*}  {Promise<void>}
   */
  const onSubmit: SubmitHandler<TFormFieldset> = async (
    values,
  ): Promise<void> => {
    mutate(Object.values(values));

    if (formState.isSubmitting || error) {
      setMessage(
        error ? error.message : formState.isSubmitting ? t('scan.form.loading') : '',
      );
    } else {
      setMessage('');
      callback(true);
    }
  };

  /**
   * @description URLs setter handler
   * Manages the number of URLs
   * @author Luca Cattide
   * @param {string} action
   */
  const handleUrls = (action: string): void => {
    setUrls((state) =>
      // Ensure to leave at least one field
      action === ADD ? state + 1 : state > 1 ? state - 1 : state,
    );
  };

  return (
    // Form Start
    <>
      <FormProvider {...methods}>
        <form
          className="form flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          {formState.isSubmitting ||
            (error && (
              <p
                aria-live="polite"
                className={`form__message mt-8 ${error ? 'text-red-500' : 'text-default'}`}
              >
                {message}
              </p>
            ))}
        </form>
      </FormProvider>
      <ReactQueryDevtools />
    </>
    // Form End
  );
}

export default Form;
