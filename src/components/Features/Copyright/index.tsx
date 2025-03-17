import Link from 'next/link';
import styles from './index.module.css';
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import { ClockIcon } from '@heroicons/react/24/outline';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import HomeContainer from '@/components/Common/Layouts/Container/HomeContainer';
import BreadCrumb from '@/components/Common/BreadCrumb';
import HomeTitle from '@/components/Common/HomeTitle';
import FixedMainContainer from '@/components/Common/Layouts/Container/FixedMainContainer';
import FixedContentContainer from '@/components/Common/Layouts/Container/FixedContentContainer';

export default function CopyrightFeature() {
  return (
    <>
      <HomeContainer white={true}>
        <BreadCrumb title="著作権" path="copyright" />
        <FixedMainContainer>
          <FixedContentContainer>
            <HomeTitle title="著作権" Icon={DocumentTextIcon} />
            <span className={`${styles.date} flex justify-end`} style={{ marginTop: '1.25rem' }}>
              <ClockIcon className="h-5 w-5" aria-hidden="true" />
              2024年11月26日
            </span>
            <p>
              リクビジョン（以下、「本サービス」と言います。）のコンテンツ（写真や画像、文章など）の著作権につきましては、
              原則として本サービスに帰属しており、無断転載することを禁止します。
              <br />
              <br />
              本サービスのコンテンツを利用したい場合は、別途お問い合わせください。
              <br />
              <br />
              本サービスは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がございましたら、
              <Link href="/contact">お問い合わせ</Link>
              よりご連絡ください。迅速に対応いたします。
            </p>
          </FixedContentContainer>
          <AdUnit slot="7998948559" style={{ marginTop: '1.25rem' }} />
        </FixedMainContainer>
      </HomeContainer>
    </>
  );
}
