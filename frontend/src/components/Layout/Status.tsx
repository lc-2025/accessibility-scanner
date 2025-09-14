import { useTranslation } from 'react-i18next';
import { STATUS } from '../../utils/constants';
import type { TStatus } from '../../types/components/Status';

/**
 * @description Status component
 * @author Luca Cattide
 * @param {TStatus} { type }
 * @returns {*}
 */
function Status({ type }: TStatus) {
  const { DONE, ERROR, PENDING, RUNNING } = STATUS;
  const { t } = useTranslation();

  /**
   * @description Status style helper
   * Provides a consistent visual proof based on scan status
   * @author Luca Cattide
   * @date 13/09/2025
   * @returns {*}  {string}
   */
  const getStatus = (): string => {
    const condition = {
      [DONE]: 'bg-green-200',
      [ERROR]: 'bg-red-200',
      [PENDING]: 'bg-accent',
      [RUNNING]: 'bg-gray-200',
    };

    return condition[type];
  };

  return (
    <span
      className={`status rounded-2xl px-2 py-2 ${getStatus()} capitalize select-none`}
    >
      {t(`scan.list.status.${type}`)}
    </span>
  );
}

export default Status;
