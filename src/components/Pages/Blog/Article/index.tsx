import { Blog } from '@/types/microcms';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import HomeContainer from '@/components/Common/Layouts/Container/HomeContainer';
import BreadCrumb from '@/components/Common/BreadCrumb';
import FixedMainContainer from '@/components/Common/Layouts/Container/FixedMainContainer';
import BlogArticleFeature from '@/components/Features/Blog/Article';
import FixedContentContainer from '@/components/Common/Layouts/Container/FixedContentContainer';

type Props = {
  article?: Blog;
  errorMessage?: string;
  slug?: string;
};

export default function BlogArticlePage({ article, errorMessage, slug }: Props) {
  const breadcrumbTitle = article?.title || 'ブログ記事';
  const breadcrumbPath = article?.id
    ? `blog/articles/${article.id}`
    : `blog/articles/${slug || ''}`;

  return (
    <HomeContainer white={true}>
      <BreadCrumb
        title={breadcrumbTitle}
        path={breadcrumbPath}
        parentTitle="ブログ"
        parentPath="blog"
      />
      <FixedMainContainer>
        <FixedContentContainer>
          {errorMessage ? (
            <div className="overflow-hidden bg-white shadow rounded-lg mb-5 mt-5">
              <div className="px-4 py-3 sm:px-6">
                <p className="text-sm font-semibold text-red-500">{errorMessage}</p>
              </div>
            </div>
          ) : (
            article && <BlogArticleFeature article={article} />
          )}
        </FixedContentContainer>
        <AdUnit slot="7998948559" style={{ marginTop: '1.25rem' }} />
      </FixedMainContainer>
    </HomeContainer>
  );
}
