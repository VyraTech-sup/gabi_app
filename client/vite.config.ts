import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/',
  root: __dirname,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, '..', 'shared'),
      '@assets': path.resolve(__dirname, '..', 'attached_assets'),
    },
  },
  server: {
    fs: {
      // allow serving files from the repo root (shared folder)
      allow: [path.resolve(__dirname, '..')],
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: [
        // Exclude server-side modules from client bundle
        /^node:.*/,
        '@aws-sdk/client-s3',
        '@aws-sdk/s3-request-presigner',
      ],
    },
  },
  optimizeDeps: {
    exclude: [
      // Prevent server code from being pre-bundled
      '@aws-sdk/client-s3',
      '@aws-sdk/s3-request-presigner',
    ],
  },
});
