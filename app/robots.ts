import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/'], // Standard practice
    },
    sitemap: 'https://chullin.vercel.app/sitemap.xml',
  };
}
