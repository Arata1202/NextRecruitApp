import styles from './index.module.css';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { ClockIcon } from '@heroicons/react/24/outline';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import HomeContainer from '@/components/Common/Layouts/Container/HomeContainer';
import BreadCrumb from '@/components/Common/BreadCrumb';
import HomeTitle from '@/components/Common/HomeTitle';
import FixedMainContainer from '@/components/Common/Layouts/Container/FixedMainContainer';
import FixedContentContainer from '@/components/Common/Layouts/Container/FixedContentContainer';

export default function DisclaimerFeature() {
  return (
    <>
      <HomeContainer white={true}>
        <BreadCrumb title="免責事項" path="disclaimer" />
        <FixedMainContainer>
          <FixedContentContainer>
            <HomeTitle title="免責事項" Icon={ExclamationCircleIcon} />
            <span className={`${styles.date} flex justify-end`} style={{ marginTop: '1.25rem' }}>
              <ClockIcon className="h-5 w-5" aria-hidden="true" />
              2024年11月26日
            </span>
            <p>
              リクビジョン（以下、「本サービス」と言います。）からのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。
              <br />
              <br />
              また本サービスのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。
              <br />
              <br />
              本サービスに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
            </p>
          </FixedContentContainer>
          <AdUnit slot="7998948559" style={{ marginTop: '1.25rem' }} />
        </FixedMainContainer>
      </HomeContainer>
    </>
  );
}
