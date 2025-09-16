import { Field, Input, Label } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import ButtonIcon from '../Layout/ButtonIcon';
import {
  BUTTON_ICON,
  ERROR,
  FORM_ACTION,
  REGEX,
  TEST,
} from '../../utils/constants';
import type { TFormField } from '../../types/components/Form';

/**
 * @description Form field component
 * @author Luca Cattide
 * @param {TFormField} { callback, index, urls }
 * @returns {*}
 */
function FormField({ callback, index, urls }: TFormField) {
  const { REQUIRED, VALIDATION } = ERROR.FORM;
  const { REMOVE } = FORM_ACTION;
  const { t } = useTranslation();
  const {
    formState: { isSubmitting, errors },
    register,
  } = useFormContext();

  /**
   * @description Field name setter
   * @author Luca Cattide
   * @param {boolean} count
   * @returns {*}  {string}
   */
  const setFieldName = (count?: boolean): string =>
    count ? `${index + 1}` : `url-${index + 1}`;

  /**
   * @description Field deletion handler
   * @author Luca Cattide
   */
  const handleDelete = (): void => {
    callback(REMOVE);
  };

  return (
    // Field Start
    <Field className="fields__field mb-8" key={crypto.randomUUID() + index}>
      <Label
        className="field__label cursor-pointer font-bold"
        htmlFor={setFieldName()}
      >
        URL {urls > 1 ? `#${setFieldName(true)}` : ''}
      </Label>
      <div
        className="field__container mt-4 flex items-center"
        data-testid={TEST.ID.INPUT}
      >
        <Input
          aria-describedby={
            errors[setFieldName() as keyof typeof errors]
              ? `field__error--${setFieldName()}`
              : undefined
          }
          aria-invalid={
            errors[setFieldName() as keyof typeof errors] ? 'true' : 'false'
          }
          aria-required={urls === 1 ? 'true' : 'false'}
          className="field__input border-default focus-visible:outline-primary focus:border-primary w-full rounded-2xl border-2 px-4 py-2 focus-visible:outline"
          id={setFieldName()}
          placeholder={t('scan.form.input.url.placeholder')}
          {...register(setFieldName(), {
            disabled: isSubmitting,
            pattern: {
              value: REGEX.URL,
              message: VALIDATION,
            },
            required: REQUIRED,
          })}
          type="text"
        />
        {/* This solution is more elegant and usable than an usual `textarea` technique (IMHO) */}
        {urls > 1 && index > 0 && (
          <ButtonIcon
            callback={handleDelete}
            label={t('scan.form.delete')}
            variant={BUTTON_ICON.DELETE}
          />
        )}
      </div>
      {errors[setFieldName() as keyof typeof errors] && (
        <p
          aria-live="assertive"
          className={`field__error field__error--${setFieldName()} basis-full pt-4 text-red-500`}
          data-testid={TEST.ID.ERROR}
        >
          {`${errors[setFieldName() as keyof typeof errors]!.message}`}
        </p>
      )}
    </Field>
    // Field End
  );
}

export default FormField;
