import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {

  return {
    root: __dirname,
    plugins: [react(), tailwindcss()],
    base: '/', // Changed from './' for Vercel compatibility
    server:
    {
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
        },
      },
    },
    build: {
      outDir: '../dist',
      assetsDir: 'assets',
    }
  }
});