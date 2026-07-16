import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jcgoulart.github.io',
  base: '/extensao-servico-social-pnas',
  compressHTML: true,
  prefetch: true,
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
