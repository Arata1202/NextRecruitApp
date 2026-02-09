import { BellAlertIcon } from '@heroicons/react/24/solid';
import { Blog } from '@/types/microcms';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import HomeContainer from '@/components/Common/Layouts/Container/HomeContainer';
import BreadCrumb from '@/components/Common/BreadCrumb';
import HomeTitle from '@/components/Common/HomeTitle';
import FixedMainContainer from '@/components/Common/Layouts/Container/FixedMainContainer';
import BlogFeature from '@/components/Features/Blog';
import FixedContentContainer from '@/components/Common/Layouts/Container/FixedContentContainer';

type Props = {
  articles: Blog[];
  errorMessage?: string;
};

export default function BlogPage({ articles, errorMessage }: Props) {
  return (
    <HomeContainer white={true}>
      <BreadCrumb title="ブログ" path="blog" />
      <FixedMainContainer>
        <FixedContentContainer>
          <HomeTitle title="ブログ" Icon={BellAlertIcon} />
          <BlogFeature articles={articles} errorMessage={errorMessage} />
        </FixedContentContainer>
        <AdUnit slot="7998948559" style={{ marginTop: '1.25rem' }} />
      </FixedMainContainer>
    </HomeContainer>
  );
}
