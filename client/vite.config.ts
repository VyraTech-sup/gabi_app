import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
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
  },
});
