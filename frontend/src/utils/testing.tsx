import { QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { queryClient } from '../client';

/**
 * @description REST mocking
 * @author Luca Cattide
 * @param {React.ReactElement} children
 * @returns {*}  {React.ReactNode}
 */
const withQuery = (children: React.ReactElement): React.ReactNode => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

/**
 * @description Translation mocking
 * @author Luca Cattide
 */
const withTranslation = (): void => {
  vi.mock('react-i18next', () => ({
    initReactI18next: {
      type: '3rdParty',
      init: () => {},
    },
    useTranslation: () => ({
      t: (i18nKey: string) => i18nKey,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }),
  }));
};

export { withQuery, withTranslation };
