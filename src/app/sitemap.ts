import type { MetadataRoute } from 'next';

import { projects } from '@/data/projects';
import { services } from '@/data/services';
import { siteUrl } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/realisations', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/tarifs', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/a-propos', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/devis', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/mentions-legales', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/confidentialite', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/cookies', priority: 0.2, changeFrequency: 'yearly' },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.path === '/' ? '' : route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/realisations/${project.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
