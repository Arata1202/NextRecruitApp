import {
  BuildingOffice2Icon,
  ChartPieIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  CurrencyYenIcon,
  LinkIcon,
} from '@heroicons/react/24/solid';

const features = [
  {
    name: 'ダッシュボード',
    description: '本日と明日の予定を一目で確認する事ができ、予定を忘れる事がありません。',
    icon: ChartPieIcon,
  },
  {
    name: '予定カレンダー',
    description: '今週の就活状況は？来月の予定は？カレンダーを見れば一目瞭然です。',
    icon: CalendarDaysIcon,
  },
  {
    name: '企業情報メモ',
    description: '企業ごとに企業理念や福利厚生などを記録でき、企業情報を管理する事が可能です。',
    icon: DocumentTextIcon,
  },
  {
    name: '選考状況',
    description: '企業ごとに選考状況を記録でき、カレンダーやダッシュボードにも反映されます。',
    icon: BuildingOffice2Icon,
  },
  {
    name: '自己分析',
    description: '予め用意してある質問に答えるだけで、簡単に自己分析を行う事が可能です。',
    icon: ChartBarIcon,
  },
  {
    name: 'テンプレート',
    description:
      '自己紹介やガクチカ、長所などを記録する事ができます。便利な文字数カウンター付きです。',
    icon: ClipboardDocumentListIcon,
  },
];
const features2 = [
  {
    name: '完全無料',
    description: 'アカウント登録やサービスの利用に、一切料金がかかりません。',
    icon: CurrencyYenIcon,
  },
  {
    name: 'ソーシャルログイン',
    description:
      'GoogleアカウントやAppleアカウント、GitHubアカウント、X（旧Twitter）アカウントでログインできます。',
    icon: LinkIcon,
  },
];

export default function Top() {
  return (
    <>
      <div style={{ padding: '24px 0' }} className="MobilePadding-0 overflow-hidden bg-white">
        <div className="lg:flex mx-auto max-w-7xl p-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 lg:pt-8">
            <h1 className="DialogButton mt-10 text-pretty text-4xl font-semibold tracking-tight sm:text-7xl">
              就活をもっとスムーズに
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium sm:text-xl/8">
              就活では、ESの提出や面接の日程調整、企業の情報収集など管理すべきことが多くあります。「アプリ名」を利用して、就活に関する全てを一元管理してみませんか？
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="/service/auth/signup"
                target="_blank"
                className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                無料で利用を開始する
              </a>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  alt="App screenshot"
                  src="https://tailwindui.com/plus/img/component-images/project-app-screenshot.png"
                  width={2432}
                  height={1442}
                  className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden bg-white mt-20 mb-5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:ml-auto lg:pl-4 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h1 className="DialogButton mt-10 text-pretty text-4xl font-semibold tracking-tight sm:text-7xl">
                    無料で簡単登録
                  </h1>
                  <p className="mt-8 text-pretty text-lg font-medium sm:text-xl/8">
                    アカウント登録が面倒？いいえ、ソーシャルログインを使えば、わずか数秒で登録が完了します。
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base/7 lg:max-w-none">
                    {features2.map((feature) => (
                      <div key={feature.name} className="relative pl-9">
                        <dt className="inline font-semibold text-gray-900">
                          <feature.icon
                            aria-hidden="true"
                            className="absolute left-1 top-1 size-5"
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
              <div className="flex items-start justify-end lg:order-first">
                <img
                  alt="Product screenshot"
                  src="https://tailwindui.com/plus/img/component-images/dark-project-app-screenshot.png"
                  width={2432}
                  height={1442}
                  className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white mt-20 mb-5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto">
              <h1 className="DialogButton mt-10 text-pretty text-4xl font-semibold tracking-tight sm:text-7xl">
                便利な機能がたくさん
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium sm:text-xl/8">
                ESの締切いつだっけ？メモどこに書いたっけ？明日の面接の準備は大丈夫？「アプリ名」を使えば、そんな悩みを解決できます。
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden pt-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <img
                alt="App screenshot"
                src="https://tailwindui.com/plus/img/component-images/project-app-screenshot.png"
                width={2432}
                height={1442}
                className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
              />
              <div aria-hidden="true" className="relative">
                <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
              </div>
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
            <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold">
                    <feature.icon aria-hidden="true" className="absolute left-1 top-1 size-5" />
                    {feature.name}
                  </dt>{' '}
                  <br />
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
