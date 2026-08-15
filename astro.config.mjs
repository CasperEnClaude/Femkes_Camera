import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Pas 'site' aan naar de definitieve Netlify-URL (of eigen domein) zodra bekend.
// Dit wordt gebruikt voor de sitemap en SEO-links.
export default defineConfig({
  site: 'https://femkescamera.netlify.app',
  integrations: [sitemap()],
  image: {
    // Astro optimaliseert automatisch naar webp/avif met lazy loading.
    responsiveStyles: true,
  },
  build: {
    format: 'directory',
  },
});
