/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    clearMocks: true,
    coverage: {
      enabled: true,
      include: ['./src/**/*.ts'],
    },
    environment: 'happy-dom',
    globals: true,
    setupFiles: './vite.setup.ts',
  },
});
