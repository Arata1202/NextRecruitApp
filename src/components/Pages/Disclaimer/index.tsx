import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { DISCLAIMER_CONTENT } from '@/contents/disclaimer';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import HomeContainer from '@/components/Common/Layouts/Container/HomeContainer';
import BreadCrumb from '@/components/Common/BreadCrumb';
import HomeTitle from '@/components/Common/HomeTitle';
import Date from '@/components/Common/Date';
import Markdown from '@/components/Common/Markdown';
import FixedMainContainer from '@/components/Common/Layouts/Container/FixedMainContainer';
import FixedContentContainer from '@/components/Common/Layouts/Container/FixedContentContainer';

export default function DisclaimerPage() {
  return (
    <HomeContainer white={true}>
      <BreadCrumb title="免責事項" path="disclaimer" />
      <FixedMainContainer>
        <FixedContentContainer>
          <HomeTitle title="免責事項" Icon={ExclamationCircleIcon} />
          <Date date="2024年11月26日" />
          <Markdown content={DISCLAIMER_CONTENT} />
        </FixedContentContainer>
        <AdUnit slot="7998948559" style={{ marginTop: '1.25rem' }} />
      </FixedMainContainer>
    </HomeContainer>
  );
}
