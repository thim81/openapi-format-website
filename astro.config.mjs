import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://openapi-format.com',
  trailingSlash: 'always',
  integrations: [react(), sitemap()],
  server: {
    port: 7070,
  },
});
