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
        userAgent: 'GPTBot',  // Allow OpenAI crawler for ChatGPT visibility
        allow: '/',
      },
      {
        userAgent: 'CCBot',   // Allow Common Crawl for AI training
        allow: '/',
      },
    ],
    sitemap: 'https://petcarebooker.com/sitemap.xml',
  };
}

