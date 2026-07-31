import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: '.',
  publicDir: 'public',
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // Home, Products, and Cart are now client-routed pages served from a single
        // SPA entry (see js/react/main.jsx). Admin remains its own static page.
        main:  resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'html/admin.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
