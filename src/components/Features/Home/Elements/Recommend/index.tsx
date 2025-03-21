import Link from 'next/link';
import styles from './index.module.css';
import { GoogleIcon, XIcon, GitHubIcon } from '@/components/Common/Elements/SocialIcon';

export default function Recommend() {
  return (
    <div className={`${styles.space} overflow-hidden bg-white`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
                無料で簡単ログイン
              </p>
              <p className="mt-6 text-lg/8">
                必要なのはソーシャルアカウントだけ。GoogleやGitHub、Xアカウントであれば、わずか10秒程度でログインが完了します。
              </p>
              <div className="flex justify-center mt-10">
                <GoogleIcon className="h-10 w-10 mx-5" />
                <XIcon className="h-10 w-10 mx-5  fill-[#000000]" />
                <GitHubIcon className="h-10 w-10 mx-5 text-black" />
              </div>
              <div className="mt-10">
                <p className="text-center">＼ ソーシャルアカウントの場合はこちら ／</p>
                <Link
                  href="/service/auth/login"
                  className="mt-1 w-full justify-center inline-flex rounded-md bg-blue-500 px-3.5 py-3.5 text-xl font-semibold text-white shadow-sm hover:bg-blue-600"
                >
                  ログイン
                </Link>
                <Link
                  href="/service/auth/signup"
                  className="mt-5 border w-full justify-center inline-flex rounded-md px-3.5 py-3.5 text-xl font-semibold shadow-sm border-blue-500 text-blue-500 hover:border-blue-600 hover:text-blue-600"
                >
                  アカウント登録
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-start justify-end lg:order-first">
            <img
              alt="サービスイメージ"
              src="/images/top/large/1.png"
              width={2432}
              height={1442}
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
