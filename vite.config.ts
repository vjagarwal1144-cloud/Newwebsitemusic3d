import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig(() => ({
  // GitHub Pages serves this project under /Newwebsitemusic3d/,
  // while Vercel serves it from the domain root.
  base: process.env.VERCEL ? '/' : '/Newwebsitemusic3d/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': import.meta.dirname,
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
}));
