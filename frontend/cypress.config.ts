import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';
import dotenv from 'dotenv';

const env = dotenv.config('./.env').parsed

export default defineConfig({
  e2e: {
    baseUrl: env.VITE_FRONTEND_URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on(
        'file:preprocessor',
        vitePreprocessor({
          configFile: './vite.config.ts',
          mode: 'development',
        }),
      );
    },
  },
});
