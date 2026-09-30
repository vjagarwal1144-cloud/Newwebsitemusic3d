import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig(() => ({
  // In GitHub Pages (GitHub Actions), serve under /Newwebsitemusic3d/
  // In AI Studio preview and Vercel, serve under standard root './' or '/'
  base: process.env.GITHUB_ACTIONS ? '/Newwebsitemusic3d/' : (process.env.VERCEL ? '/' : './'),
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
