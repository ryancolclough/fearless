import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub project-pages URL: https://ryancolclough.github.io/fearless/v2/
// V1 stays at the repo root and is not part of this build.
export default defineConfig({
  site: 'https://ryancolclough.github.io',
  base: '/fearless/v2',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/promotions/christmas-gift-cards'),
    }),
  ],
  build: {
    format: 'directory',
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
  image: {
    domains: [],
  },
});
