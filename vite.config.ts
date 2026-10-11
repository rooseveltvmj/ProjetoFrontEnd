// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'path';

export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  resolve: {
    alias: {
      // Usa import.meta.dirname para evitar o aviso de depreciação do Vite
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    // Força o uso do esbuild para minificar o CSS, contornando problemas com lightningcss
    cssMinify: 'esbuild',
  },
});