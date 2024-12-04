import {
  BuildingOffice2Icon,
  ChartPieIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  CurrencyYenIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: '一括管理カレンダー',
    description:
      '企業ごとの選考状況や、今後のToDoリストを自動でカレンダーに反映し、一目で予定を把握することができます。',
    icon: CalendarDaysIcon,
  },
  {
    name: '完結自己分析',
    description:
      '初めは戸惑う自己分析。リクビジョンを活用すれば、予め用意された質問に回答していくだけで全て完結します。',
    icon: ChartPieIcon,
  },
  {
    name: '簡単ログイン',
    description: 'GoogleやGitHub、Xアカウントであれば、わずか10秒程度でログインが完了します。',
    icon: ChartPieIcon,
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
        <div className="overflow-hidden bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <p className="TopTitle text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
                    就活をもっとスムーズに
                  </p>
                  <p className="mt-6 text-lg/8 text-gray-600">
                    就活では、ESの提出や面接の日程調整、企業の情報収集など管理すべきことが多くあります。リクビジョンを利用して、就活に関する全てを一元管理してみませんか？
                  </p>
                  <img
                    alt="Product screenshot"
                    src="https://tailwindui.com/plus/img/component-images/dark-project-app-screenshot.png"
                    width={2432}
                    height={1442}
                    className="mobile mt-6 w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                  />
                  <dl className="my-6 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
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
                src="https://tailwindui.com/plus/img/component-images/dark-project-app-screenshot.png"
                width={2432}
                height={1442}
                className="pc w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
