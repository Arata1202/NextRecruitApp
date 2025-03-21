import styles from './index.module.css';
import { HOME_HEROES } from '@/constants/data';

export default function Hero() {
  return (
    <div className={`${styles.hero} overflow-hidden bg-white`}>
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
                alt="サービスイメージ"
                src="/images/top/large/2.png"
                width={2432}
                height={1442}
                className={`${styles.mobile} mt-6 w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0`}
              />
              <dl className="mt-6 max-w-xl space-y-8 text-base/7 lg:max-w-none">
                {HOME_HEROES.map((item) => (
                  <div key={item.name} className="relative pl-9">
                    <dt className="inline font-semibold">
                      <item.icon className="absolute left-1 top-1 size-5 text-blue-500" />
                      {item.name}
                    </dt>
                    <br />
                    <dd className="inline">{item.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="サービスイメージ"
            src="/images/top/large/2.png"
            width={2432}
            height={1442}
            className={`${styles.pc} w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0`}
          />
        </div>
      </div>
    </div>
  );
}
