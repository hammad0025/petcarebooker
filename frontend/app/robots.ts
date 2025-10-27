import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/*',        // Don't index private groomer dashboards
          '/customer/dashboard', // Don't index customer dashboards
          '/api/*',             // Don't index API routes
        ],
      },
      {
        userAgent: 'GPTBot',  // Block OpenAI crawler from training on your content
        disallow: '/',
      },
      {
        userAgent: 'CCBot',   // Block Common Crawl
        disallow: '/',
      },
    ],
    sitemap: 'https://petcarebooker.com/sitemap.xml',
  };
}

