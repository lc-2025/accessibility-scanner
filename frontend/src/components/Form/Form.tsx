import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button as FormButton, Fieldset, Legend } from '@headlessui/react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Button from '../Layout/Button';
import { postScan } from '../../utils/api';
import {
  BUTTON_TYPE,
  DEFAULT_STATE,
  FORM_ACTION,
  TEST,
} from '../../utils/constants';
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
  const { ACTION, MESSAGE } = TEST.ID;
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
    setMessage(t('scan.form.loading'));

    return await new Promise((resolve, reject) => {
      mutate(Object.values(values), {
        onError: (error) => {
          setMessage(error.message);
          reject();
        },
        onSuccess: () => {
          callback(true);
          resolve();
        },
      });
    });
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
              className="fields__add button bg-accent text-default mb-8 w-full cursor-pointer rounded-2xl px-8 py-4 text-center font-bold uppercase transition-opacity select-none hover:opacity-75 disabled:opacity-50"
              data-testid={ACTION}
              disabled={formState.isSubmitting}
              onClick={() => handleUrls(ADD)}
              type="button"
            >
              {t('scan.form.add')}
            </FormButton>
            <Button
              ariaLabel={t('scan.form.submit')}
              disabled={formState.isSubmitting}
              label={t('scan.form.submit')}
              type="submit"
              variant={BUTTON_TYPE.DEFAULT}
            />
          </Fieldset>
          {/* Fieldset End */}
          {(formState.isSubmitting || error) && (
            <p
              aria-live="polite"
              className={`form__message mt-8 flex flex-col items-center ${error ? 'text-red-500' : 'text-default'}`}
              data-testid={MESSAGE}
            >
              {message}
              {formState.isSubmitting && (
                <span className="message__icon text-primary mt-4 size-12 animate-spin select-none">
                  <ArrowPathIcon />
                </span>
              )}
            </p>
          )}
        </form>
      </FormProvider>
      <ReactQueryDevtools />
    </>
    // Form End
  );
}

export default Form;
