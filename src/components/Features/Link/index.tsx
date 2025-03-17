import { DocumentTextIcon } from '@heroicons/react/24/solid';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import HomeContainer from '@/components/Common/Layouts/Container/HomeContainer';
import BreadCrumb from '@/components/Common/BreadCrumb';
import HomeTitle from '@/components/Common/HomeTitle';
import Date from '@/components/Common/Date';
import FixedMainContainer from '@/components/Common/Layouts/Container/FixedMainContainer';
import FixedContentContainer from '@/components/Common/Layouts/Container/FixedContentContainer';

export default function LinkFeature() {
  return (
    <>
      <HomeContainer white={true}>
        <BreadCrumb title="リンク" path="link" />
        <FixedMainContainer>
          <FixedContentContainer>
            <HomeTitle title="リンク" Icon={DocumentTextIcon} />
            <Date date="2024年11月26日" />
            <p>
              リクビジョン（以下、「本サービス」と言います。）は完全リンクフリーです。リンクを行う場合の本サービスへの許可や連絡は不要です。
              <br />
              <br />
              ただし、インラインフレームの使用や画像の直リンクはご遠慮ください。
            </p>
          </FixedContentContainer>
          <AdUnit slot="7998948559" style={{ marginTop: '1.25rem' }} />
        </FixedMainContainer>
      </HomeContainer>
    </>
  );
}
