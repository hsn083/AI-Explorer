import { MetadataRoute } from 'next';

async function getProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aiexplorer.website';
    const response = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aiexplorer.website';
    const response = await fetch(`${baseUrl}/api/categories`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.aiexplorer.website';
  const currentDate = new Date();

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Product pages
  const productPages: MetadataRoute.Sitemap = products.map((product: any) => ({
    url: `${baseUrl}/products/${product._id || product.id}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}