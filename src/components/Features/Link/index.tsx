import styles from './index.module.css';
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import { ClockIcon } from '@heroicons/react/24/outline';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import HomeContainer from '@/components/Common/Layouts/Container/HomeContainer';
import BreadCrumb from '@/components/Common/BreadCrumb';
import HomeTitle from '@/components/Common/HomeTitle';

export default function LinkFeature() {
  return (
    <>
      <HomeContainer>
        <div className=" bg-white">
          <BreadCrumb title="リンク" path="link" />
          <div className="mx-auto max-w-7xl p-6 lg:px-8">
            <div className="bg-white">
              <div className="mx-auto max-w-3xl text-base/7">
                <div className={`${styles.content}`}>
                  <HomeTitle title="リンク" Icon={DocumentTextIcon} />
                  <span
                    className={`${styles.date} flex justify-end`}
                    style={{ marginTop: '1.25rem' }}
                  >
                    <ClockIcon className="h-5 w-5" aria-hidden="true" />
                    2024年11月26日
                  </span>
                  <p>
                    リクビジョン（以下、「本サービス」と言います。）は完全リンクフリーです。リンクを行う場合の本サービスへの許可や連絡は不要です。
                    <br />
                    <br />
                    ただし、インラインフレームの使用や画像の直リンクはご遠慮ください。
                  </p>
                </div>
              </div>
            </div>
            <AdUnit slot="7998948559" style={{ marginTop: '1.25rem' }} />
          </div>
        </div>
      </HomeContainer>
    </>
  );
}
