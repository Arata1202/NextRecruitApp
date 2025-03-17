import { DocumentTextIcon } from '@heroicons/react/24/solid';
import { COPYRIGHT_CONTENT } from '@/contents/copyright';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import HomeContainer from '@/components/Common/Layouts/Container/HomeContainer';
import BreadCrumb from '@/components/Common/BreadCrumb';
import HomeTitle from '@/components/Common/HomeTitle';
import Date from '@/components/Common/Date';
import Markdown from '@/components/Common/Markdown';
import FixedMainContainer from '@/components/Common/Layouts/Container/FixedMainContainer';
import FixedContentContainer from '@/components/Common/Layouts/Container/FixedContentContainer';

export default function CopyrightPage() {
  return (
    <HomeContainer white={true}>
      <BreadCrumb title="著作権" path="copyright" />
      <FixedMainContainer>
        <FixedContentContainer>
          <HomeTitle title="著作権" Icon={DocumentTextIcon} />
          <Date date="2024年11月26日" />
          <Markdown content={COPYRIGHT_CONTENT} />
        </FixedContentContainer>
        <AdUnit slot="7998948559" style={{ marginTop: '1.25rem' }} />
      </FixedMainContainer>
    </HomeContainer>
  );
}
