import Link from 'next/link';
import styles from './index.module.css';
import { FOOTER_NAVIGATION, PROJECT_IMAGE, COPYRIGHT } from '@/constants/data';

export default function Footer() {
  return (
    <footer className={`${styles.footer} w-full bg-white`}>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className={styles.logo}>
              {PROJECT_IMAGE.map((item) => (
                <img
                  key={item.alt}
                  alt={item.alt}
                  src={item.path}
                  className={`${styles.image} hover:scale-110 transition-transform`}
                />
              ))}
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className={styles.menuItem}>
                <h3 className="text-sm/6 font-semibold ">リクビジョン</h3>
                <ul className="mt-6 space-y-4">
                  {FOOTER_NAVIGATION.about.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm/6  hover:text-blue-500">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${styles.menuItem} mt-10 md:mt-0`}>
                <h3 className="text-sm/6 font-semibold ">デベロッパー</h3>
              </div>
            </div>
            <div className={`${styles.menuItem} md:grid md:grid-cols-2 md:gap-8`}>
              <div>
                <h3 className="text-sm/6 font-semibold ">利用規約</h3>
                <ul className="mt-6 space-y-4">
                  {FOOTER_NAVIGATION.policy.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm/6  hover:text-blue-500">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${styles.menuItem} mt-10 md:mt-0`}>
                <h3 className="text-sm/6 font-semibold ">お問い合わせ</h3>
                <ul className="mt-6 space-y-4">
                  {FOOTER_NAVIGATION.contact.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm/6  hover:text-blue-500">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-300 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs">{COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  );
}
