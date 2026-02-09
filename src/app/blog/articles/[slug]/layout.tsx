import type { Metadata } from 'next';
import { TITLE } from '@/constants/data';
import { getAllBlogIds, getBlogDetail } from '@/libs/microcms';

type Props = {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const data = await getAllBlogIds();
    return data.map((item) => ({ slug: item.id }));
  } catch (error) {
    console.error('Failed to fetch blog ids from microCMS:', error);
    return [];
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const defaultTitle = TITLE;
  const fallbackUrl = `${defaultUrl}/blog/articles/${params.slug}`;

  try {
    const data = await getBlogDetail(params.slug, {
      fields: 'id,title,description,thumbnail',
    });
    const title = `${data.title}｜${defaultTitle}`;

    return {
      title: title,
      description: data.description || 'ブログ記事',
      openGraph: {
        title: title,
        description: data.description || 'ブログ記事',
        images: data.thumbnail?.url || `${defaultUrl}/images/og/1.png`,
        url: `${defaultUrl}/blog/articles/${data.id}`,
      },
      alternates: {
        canonical: `${defaultUrl}/blog/articles/${data.id}`,
      },
    };
  } catch (error) {
    console.error('Failed to generate metadata for blog article:', error);
    return {
      title: `ブログ記事｜${defaultTitle}`,
      description: 'ブログ記事',
      openGraph: {
        title: `ブログ記事｜${defaultTitle}`,
        description: 'ブログ記事',
        images: `${defaultUrl}/images/og/1.png`,
        url: fallbackUrl,
      },
      alternates: {
        canonical: fallbackUrl,
      },
    };
  }
}

export default async function BlogArticleLayout(props: Props) {
  const { children } = props;
  return <>{children}</>;
}
