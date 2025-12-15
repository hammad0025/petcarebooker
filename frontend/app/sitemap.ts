import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.petcarebooker.com';
  
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
    // New cities added
    'denver',
    'atlanta',
    'houston',
    'detroit',
    'sacramento',
    'philadelphia',
    'indianapolis',
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
    'how-much-does-dog-grooming-cost',
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

  // New SEO pages (HIGH PRIORITY)
  const seoPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/mobile-dog-grooming`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cat-grooming`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cat-grooming-supplies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/poodle-grooming`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/yorkie-grooming`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shih-tzu-grooming`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dog-grooming-school`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...cityPages, ...blogPages, ...seoPages];
}

