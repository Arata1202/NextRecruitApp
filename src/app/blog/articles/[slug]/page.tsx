import Header from '@/components/Common/Layouts/Header';
import Footer from '@/components/Common/Layouts/Footer';
import BlogArticlePage from '@/components/Pages/Blog/Article';
import { getAllBlogIds, getBlogDetail } from '@/libs/microcms';
import { Blog } from '@/types/microcms';

const EMPTY_BLOG_SLUG = '__empty__';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateStaticParams = async () => {
  try {
    const data = await getAllBlogIds();
    if (data.length === 0) {
      // For static export, dynamic routes require at least one path.
      return [{ slug: EMPTY_BLOG_SLUG }];
    }
    return data.map((item) => ({ slug: item.id }));
  } catch (error) {
    console.error('Failed to fetch blog ids from microCMS:', error);
    return [{ slug: EMPTY_BLOG_SLUG }];
  }
};

export default async function Page(props: Props) {
  const params = await props.params;
  let article: Blog | undefined;
  let errorMessage: string | undefined;

  if (params.slug === EMPTY_BLOG_SLUG) {
    errorMessage = 'ブログ記事がまだ公開されていません。';
  } else {
    try {
      article = await getBlogDetail(params.slug);
    } catch (error) {
      console.error('Failed to fetch blog detail from microCMS:', error);
      errorMessage = 'ブログ記事の取得に失敗しました。microCMSの設定を確認してください。';
    }
  }

  return (
    <>
      <Header />
      <BlogArticlePage article={article} errorMessage={errorMessage} slug={params.slug} />
      <Footer />
    </>
  );
}
