import {
  ChartPieIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import Display from '@/components/Common/Adsense/Display';

const features = [
  {
    name: '一括管理カレンダー',
    description:
      '企業ごとの選考状況や、今後のToDoリストを自動でカレンダーに反映し、一目で予定を把握することができます。',
    icon: CalendarDaysIcon,
  },
  {
    name: '簡単自己分析',
    description:
      '初めは戸惑う自己分析。リクビジョンを活用すれば、予め用意された質問に回答していくだけで、自己理解を深められます。',
    icon: ChartPieIcon,
  },
  {
    name: 'ESテンプレート',
    description:
      '文字数カウンターを活用して、ガクチカや自己PRなどの定型文を保存しておくことができます。',
    icon: ClipboardDocumentListIcon,
  },
];
const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/top/recommend/1.png',
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/top/recommend/2.png',
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/top/recommend/3.png',
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 4,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/top/recommend/4.png',
    imageAlt: "Front of men's Basic Tee in black.",
  },
];

export default function Top() {
  return (
    <>
      <div style={{ padding: '24px 0' }} className="overflow-hidden bg-white">
        <div className="MobileMargin-0 overflow-hidden bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <p className="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
                    就活をもっとスムーズに
                  </p>
                  <p className="mt-6 text-lg/8">
                    就活では、ESの提出や面接の日程調整、企業の情報収集など管理すべきことが多くあります。リクビジョンを利用して、就活に関する全てを一元管理してみませんか？
                  </p>
                  <img
                    alt="Product screenshot"
                    src="/images/top/large/2.png"
                    width={2432}
                    height={1442}
                    className="mobile mt-6 w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                  />
                  <dl className="mt-6 max-w-xl space-y-8 text-base/7 lg:max-w-none">
                    {features.map((feature) => (
                      <div key={feature.name} className="relative pl-9">
                        <dt className="inline font-semibold">
                          <feature.icon
                            aria-hidden="true"
                            className="absolute left-1 top-1 size-5 text-blue-500"
                          />
                          {feature.name}
                        </dt>{' '}
                        <br />
                        <dd className="inline">{feature.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <img
                alt="Product screenshot"
                src="/images/top/large/2.png"
                width={2432}
                height={1442}
                className="pc w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              />
            </div>
          </div>
        </div>

        <div className="TopTitle overflow-hidden bg-white">
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
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-10 w-10 mx-5">
                      <path
                        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                        fill="#EA4335"
                      />
                      <path
                        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                        fill="#34A853"
                      />
                    </svg>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="h-10 w-10 fill-[#24292F] mx-5"
                    >
                      <path
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      />
                    </svg>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="h-10 w-10 mx-5 text-black"
                    >
                      <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                    </svg>
                  </div>
                  <div className="mt-10">
                    <p className="text-center">＼ ソーシャルアカウントの場合はこちら ／</p>
                    <a
                      href="/service/auth/login"
                      className="mt-1 w-full justify-center inline-flex rounded-md bg-blue-500 px-3.5 py-3.5 text-xl font-semibold text-white shadow-sm hover:bg-blue-600"
                    >
                      ログイン
                    </a>
                    <a
                      href="/service/auth/signup"
                      className="mt-5 border w-full justify-center inline-flex rounded-md px-3.5 py-3.5 text-xl font-semibold shadow-sm border-blue-500 text-blue-500 hover:border-blue-600 hover:text-blue-600"
                    >
                      アカウント登録
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-end lg:order-first">
                <img
                  alt="Product screenshot"
                  src="/images/top/large/1.png"
                  width={2432}
                  height={1442}
                  className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="TopTitle overflow-hidden mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none">
            <p className="BetterText text-pretty text-4xl font-semibold tracking-tight sm:text-5xl text-center">
              こんな方におすすめ
            </p>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <div key={product.id} className="group relative">
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    className="w-full rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="MobileMarginBottom-0 TopTitle overflow-hidden bg-white">
          <div className="overflow-hidden mx-auto max-w-7xl px-6 lg:px-8">
            <div className="BetterText mx-auto max-w-2xl text-center">
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
                より良いサービスに
              </p>
              <p className="mt-6 text-lg/8">
                リクビジョンは、現役の大学生が実際に感じた就活の課題を解決するために、個人で開発を行っているサービスです。ご意見やご要望がございましたら、ぜひお気軽にお問い合わせください。
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/contact"
                  className="border w-full justify-center inline-flex rounded-md px-3.5 py-3.5 text-xl font-semibold shadow-sm border-blue-500 text-blue-500 hover:border-blue-600 hover:text-blue-600"
                >
                  お問い合わせ
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="TopTitle FirstAd overflow-hidden mx-auto mb-5 max-w-7xl px-6 lg:px-8">
          <Display slot="7998948559" />
        </div>
      </div>
    </>
  );
}
