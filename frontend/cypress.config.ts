import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';
import { config } from 'dotenv';

config();

export default defineConfig({
  e2e: {
    baseUrl: process.env.FRONTEND_URL,
    setupNodeEvents(on) {
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
