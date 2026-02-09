import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic'
    })
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // 👈 ISSO RESOLVE O ERRO
    }
  },

  build: {
    target: 'es2019',
    cssTarget: 'chrome61',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },

  esbuild: {
    target: 'es2019'
  },

  define: {
    'process.env': {}
  }
})
