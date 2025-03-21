import styles from './index.module.css';
import { HOME_RECOMMENDS } from '@/constants/data';

export default function Suggest() {
  return (
    <div className={`${styles.space} overflow-hidden mx-auto max-w-7xl px-6 lg:px-8`}>
      <div className="mx-auto max-w-2xl gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none">
        <p
          className={`${styles.textLeft} text-pretty text-4xl font-semibold tracking-tight sm:text-5xl text-center`}
        >
          こんな方におすすめ
        </p>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {HOME_RECOMMENDS.map((item) => (
            <div key={item.path} className="group relative">
              <img alt="おすすめイメージ" src={item.path} className="w-full rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
