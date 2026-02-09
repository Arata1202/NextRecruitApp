import Header from '@/components/Common/Layouts/Header';
import Footer from '@/components/Common/Layouts/Footer';
import BlogArticlePage from '@/components/Pages/Blog/Article';
import { getAllBlogIds, getBlogDetail } from '@/libs/microcms';
import { Blog } from '@/types/microcms';

type Props = {
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

export default async function Page(props: Props) {
  const params = await props.params;
  let article: Blog | undefined;
  let errorMessage: string | undefined;

  try {
    article = await getBlogDetail(params.slug);
  } catch (error) {
    console.error('Failed to fetch blog detail from microCMS:', error);
    errorMessage = 'ブログ記事の取得に失敗しました。microCMSの設定を確認してください。';
  }

  return (
    <>
      <Header />
      <BlogArticlePage article={article} errorMessage={errorMessage} slug={params.slug} />
      <Footer />
    </>
  );
}
