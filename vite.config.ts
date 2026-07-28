import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { aiDevMiddleware } from './vite-plugins/aiDevMiddleware';

export default defineConfig(({ mode }) => {
  // .env faylidagi GEMINI_API_KEY kabi o'zgaruvchilarni process.env'ga yuklaydi,
  // shunda dev-server middleware'i (server tomonidagi kod) ularni o'qiy oladi.
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      aiDevMiddleware(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'robots.txt'],
        manifest: {
          name: 'EduKids - Bolalar ta’lim platformasi',
          short_name: 'EduKids',
          description: 'Bolalar uchun xavfsizlik va ekologiya mavzularida interaktiv ta’lim platformasi',
          theme_color: '#f59e0b',
          background_color: '#fff7e6',
          display: 'standalone',
          start_url: '.',
          scope: './',
          lang: 'uz',
          icons: [
            { src: 'icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
            { src: 'icons/icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any' },
            { src: 'icons/icon-maskable.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'maskable' },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,ico}'],
          navigateFallback: 'index.html',
          cleanupOutdatedCaches: true,
        },
        devOptions: {
          enabled: false,
        },
      }),
    ],
    base: './',
    server: {
      port: 5173,
      open: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
  };
});
