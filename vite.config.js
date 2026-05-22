import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/Leave-Prototypes/',
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'manager-portal': resolve(__dirname, 'manager-portal/index.html'),
      },
    },
  },
});
