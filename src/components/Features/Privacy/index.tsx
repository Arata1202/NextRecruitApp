import { LockClosedIcon } from '@heroicons/react/24/solid';
import { PRIVACY_CONTENT } from '@/contents/privacy';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import HomeContainer from '@/components/Common/Layouts/Container/HomeContainer';
import BreadCrumb from '@/components/Common/BreadCrumb';
import HomeTitle from '@/components/Common/HomeTitle';
import Date from '@/components/Common/Date';
import Markdown from '@/components/Common/Markdown';
import FixedMainContainer from '@/components/Common/Layouts/Container/FixedMainContainer';
import FixedContentContainer from '@/components/Common/Layouts/Container/FixedContentContainer';

export default function PrivacyFeature() {
  return (
    <HomeContainer white={true}>
      <BreadCrumb title="プライバシーポリシー" path="privacy" />
      <FixedMainContainer>
        <FixedContentContainer>
          <HomeTitle title="プライバシーポリシー" Icon={LockClosedIcon} />
          <Date date="2024年11月26日" />
          <Markdown content={PRIVACY_CONTENT} />
        </FixedContentContainer>
        <AdUnit slot="7998948559" style={{ marginTop: '1.25rem' }} />
      </FixedMainContainer>
    </HomeContainer>
  );
}
