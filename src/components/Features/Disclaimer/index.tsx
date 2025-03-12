import Link from 'next/link';
import styles from './index.module.css';
import { HomeIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { ClockIcon } from '@heroicons/react/24/outline';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';

export default function DisclaimerFeature() {
  return (
    <>
      <div className=" bg-white">
        <nav aria-label="Breadcrumb" className="flex border-b border-gray-200 bg-white">
          <ol
            role="list"
            className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8"
          >
            <li className="flex">
              <div className="flex items-center">
                <Link href="/" className="text-gray-500 hover:text-blue-500">
                  <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                  <span className="sr-only">Home</span>
                </Link>
              </div>
            </li>
            <li className="flex">
              <div className="flex items-center">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="h-full w-6 shrink-0 text-gray-200"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <Link
                  href="/disclaimer"
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-blue-500"
                >
                  免責事項
                </Link>
              </div>
            </li>
          </ol>
        </nav>
        <div className="mx-auto max-w-7xl p-6 lg:px-8">
          <div className="bg-white">
            <div className="mx-auto max-w-3xl text-base/7">
              <div className={`${styles.content}`}>
                <div className="flex">
                  <ExclamationCircleIcon className="h-7 w-7 mr-2" aria-hidden="true" />
                  <h1 className="">免責事項</h1>
                </div>
                <span
                  className={`${styles.date} flex justify-end`}
                  style={{ marginTop: '1.25rem' }}
                >
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
              </div>
            </div>
          </div>
          <AdUnit slot="7998948559" style={{ marginTop: '1.25rem' }} />
        </div>
      </div>
    </>
  );
}
