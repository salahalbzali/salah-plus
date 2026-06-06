import { MetadataRoute } from 'next';
import { articles } from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://salah-plus-l7lb.vercel.app';

  const staticPages = [
    { url: baseUrl, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/#services`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/#portfolio`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/#contact`, changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  const blogPages = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
