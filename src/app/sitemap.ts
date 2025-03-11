import type { MetadataRoute } from 'next';
import { PAGE_ARR } from '@/constants/page';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const lastModified = new Date();
  const changeFrequency = 'daily';
  const priority = 0.7;

  const topPage: MetadataRoute.Sitemap = [
    {
      url: `${url}`,
      lastModified: lastModified,
      changeFrequency: changeFrequency,
      priority: priority,
    },
  ];

  const appPages: MetadataRoute.Sitemap = PAGE_ARR.map((page) => {
    return {
      url: `${url}/${page.path}`,
      lastModified: lastModified,
      changeFrequency: changeFrequency,
      priority: priority,
    };
  });

  return [...topPage, ...appPages];
}
