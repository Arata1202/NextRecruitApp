import Header from '@/components/Common/Layouts/Header';
import Footer from '@/components/Common/Layouts/Footer';
import BlogPage from '@/components/Pages/Blog';
import { getBlogList } from '@/libs/microcms';
import { Blog } from '@/types/microcms';

export default async function Page() {
  let articles: Blog[] = [];
  let errorMessage: string | undefined;

  try {
    const data = await getBlogList({
      fields: 'id,title,description,thumbnail,publishedAt,updatedAt',
      orders: '-publishedAt',
      limit: 20,
    });
    articles = data.contents;
  } catch (error) {
    console.error('Failed to fetch blog list from microCMS:', error);
    errorMessage = 'ブログ記事の取得に失敗しました。microCMSの設定を確認してください。';
  }

  return (
    <>
      <Header />
      <BlogPage articles={articles} errorMessage={errorMessage} />
      <Footer />
    </>
  );
}
