import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://petcarebooker.com';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/browse`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/for-businesses`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/customer/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/customer/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // City pages (HIGH PRIORITY for SEO)
  const cities = [
    // New York
    'new-york-city',
    'brooklyn',
    'queens',
    'buffalo',
    'rochester',
    'syracuse',
    'albany',
    'yonkers',
    // Florida
    'miami',
    'tampa',
    'orlando',
    'west-palm-beach',
    'fort-lauderdale',
    'jacksonville',
    'st-petersburg',
    'tallahassee',
    'gainesville',
    'clearwater',
    'naples',
    'sarasota',
    'fort-myers',
    'boca-raton',
    'pensacola',
    'lakeland',
    // Other major cities
    'los-angeles',
    'chicago',
  ];

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/cities/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.95, // Very high priority for local SEO
  }));

  // Blog posts (HIGH PRIORITY for SEO)
  const blogSlugs = [
    'best-dog-groomers-nyc',
    'best-pet-groomers-west-palm-beach',
    'tampa-pet-grooming-guide',
    'orlando-dog-grooming-2025',
    'fort-lauderdale-pet-grooming',
    'cat-grooming-los-angeles',
    'mobile-pet-grooming-miami',
    'how-often-groom-dog',
    'cat-grooming-costs-guide',
    'chicago-dog-wash-services',
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...cityPages, ...blogPages];
}

