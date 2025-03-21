import { EnvelopeIcon } from '@heroicons/react/24/solid';
import ContactFeature from '@/components/Features/Contact';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import HomeContainer from '@/components/Common/Layouts/Container/HomeContainer';
import BreadCrumb from '@/components/Common/BreadCrumb';
import HomeTitle from '@/components/Common/HomeTitle';
import FixedMainContainer from '@/components/Common/Layouts/Container/FixedMainContainer';
import FixedContentContainer from '@/components/Common/Layouts/Container/FixedContentContainer';

export default function ContactPage() {
  return (
    <>
      <HomeContainer white={true}>
        <BreadCrumb title="お問い合わせ" path="contact" />
        <FixedMainContainer>
          <FixedContentContainer>
            <HomeTitle title="お問い合わせ" Icon={EnvelopeIcon} />
            <ContactFeature />
          </FixedContentContainer>
          <AdUnit slot="7998948559" style={{ marginTop: '1.25rem' }} />
        </FixedMainContainer>
      </HomeContainer>
    </>
  );
}
