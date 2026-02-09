import Link from 'next/link';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { HOME_HEROES } from '@/constants/data';
import styles from './index.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={styles.grid}>
          <div className={styles.copy}>
            <span className={styles.badge}>
              <SparklesIcon className={styles.badgeIcon} />
              現役大学生の就活体験から作られた就活管理ツール
            </span>
            <h1 className={styles.title}>
              締切と面接を、
              <span className={styles.titleAccent}>追われる側から先回りする側へ。</span>
            </h1>
            <p className={styles.description}>
              ES提出、面接日程、企業ごとの進捗を1画面で見える化。リクビジョンなら、情報を探す時間を減らして、準備に集中できます。
            </p>
            <div className={styles.actions}>
              <Link href="/service/auth/signup" className={styles.primaryAction}>
                無料で始める
              </Link>
              <Link href="/service/auth/login" className={styles.secondaryAction}>
                すでにアカウントをお持ちの方
              </Link>
            </div>
          </div>

          <div className={styles.visualArea}>
            <div className={styles.visualCard}>
              <img
                alt="サービスイメージ"
                src="/images/top/large/2.png"
                width={2432}
                height={1442}
                className={styles.visualImage}
              />
            </div>
          </div>

          <div className={styles.featureList}>
            {HOME_HEROES.map((item) => (
              <article key={item.name} className={styles.featureCard}>
                <item.icon className={styles.featureIcon} />
                <div>
                  <h2 className={styles.featureTitle}>{item.name}</h2>
                  <p className={styles.featureDescription}>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
