import styles from './index.module.css';
import { HomeIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import { ClockIcon } from '@heroicons/react/24/outline';
export default function Copyright() {
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
                <a href="/" className="text-gray-500 hover:text-blue-500">
                  <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                  <span className="sr-only">Home</span>
                </a>
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
                <a
                  href="/copyright"
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-blue-500"
                >
                  著作権
                </a>
              </div>
            </li>
          </ol>
        </nav>
        <div className="mx-auto max-w-7xl p-6 lg:px-8">
          <div className="bg-white">
            <div className="mx-auto max-w-3xl text-base/7">
              <div className={`${styles.content} mb-5`}>
                <div className="flex">
                  <DocumentTextIcon className="h-7 w-7 mr-2" aria-hidden="true" />
                  <h1 className="">著作権</h1>
                </div>
                <span className={`${styles.date} flex justify-end`}>
                  <ClockIcon className="h-5 w-5" aria-hidden="true" />
                  2024年11月26日
                </span>
                <p>
                  「アプリ名」（以下、「本サービス」と言います。）のコンテンツ（写真や画像、文章など）の著作権につきましては、
                  原則として本サービスに帰属しており、無断転載することを禁止します。
                  <br />
                  <br />
                  本サービスのコンテンツを利用したい場合は、別途お問い合わせください。
                  <br />
                  <br />
                  本サービスは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がございましたら、
                  <a href="/contact">お問い合わせ</a>
                  よりご連絡ください。迅速に対応いたします。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
