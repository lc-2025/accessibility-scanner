import { Field, Input, Label } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { BUTTON_ICON, FORM_ACTION } from '../../utils/constants';
import type { TFormField } from '../../types/components/Form';
import ButtonIcon from '../Layout/ButtonIcon';

/**
 * @description Form field component
 * @author Luca Cattide
 * @param {TFormField} { callback, index, urls }
 * @returns {*}
 */
function FormField({ callback, index, urls }: TFormField) {
  const { REMOVE } = FORM_ACTION;
  const { t } = useTranslation();

  /**
   * @description Field name setter
   * @author Luca Cattide
   * @param {boolean} count
   * @returns {*}  {string}
   */
  const setFieldName = (count?: boolean): string =>
    count ? `${index + 1}` : `url-${index + 1}`;

  const handleDelete = (): void => {
    callback(REMOVE);
  }

  return (
    // Field Start
    <Field className="fields__field mb-8" key={crypto.randomUUID() + index}>
      <Label
        className="field__label cursor-pointer font-bold"
        htmlFor={setFieldName()}
      >
        URL {urls > 1 ? `#${setFieldName(true)}` : ''}
      </Label>
      <div className="field__container mt-4 flex items-center">
        <Input
          aria-required={urls === 1 ? 'true' : 'false'}
          className="field__input border-default focus-visible:outline-primary focus:border-primary w-full rounded-2xl border-2 px-4 py-2 focus-visible:outline"
          id={`url-${setFieldName()}`}
          name={`url-${setFieldName()}`}
          placeholder={t('scan.form.input.url.placeholder')}
          required={true}
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
    </Field>
    // Field End
  );
}

export default FormField;
