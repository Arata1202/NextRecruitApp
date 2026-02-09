import Link from 'next/link';
import { GoogleIcon, XIcon, GitHubIcon } from '@/components/Common/Elements/SocialIcon';
import styles from './index.module.css';

const START_STEPS = [
  {
    title: 'ソーシャルアカウントを選ぶ',
    description: 'Google / X / GitHub のどれかを選ぶだけ。パスワード管理は不要です。',
  },
  {
    title: '10秒でログイン完了',
    description: '面倒な初期登録を省いて、すぐにダッシュボードへ移動できます。',
  },
  {
    title: 'そのまま就活管理を開始',
    description: '企業情報、面接日程、ES下書きをすぐに保存して運用できます。',
  },
];

export default function Recommend() {
  return (
    <section className={styles.section}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={styles.panel}>
          <div className={styles.topRow}>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>Quick Start</p>
              <h2 className={styles.title}>無料で簡単ログイン</h2>
              <p className={styles.description}>
                必要なのはソーシャルアカウントだけ。登録のストレスを減らして、就活の準備そのものに時間を使える設計です。
              </p>

              <div className={styles.socials}>
                <GoogleIcon className={styles.socialIcon} />
                <XIcon className={`${styles.socialIcon} fill-[#111111]`} />
                <GitHubIcon className={`${styles.socialIcon} text-[#111111]`} />
              </div>

              <div className={styles.actions}>
                <Link href="/service/auth/login" className={styles.primaryAction}>
                  ログイン
                </Link>
                <Link href="/service/auth/signup" className={styles.secondaryAction}>
                  アカウント登録
                </Link>
              </div>
            </div>

            <div className={styles.visualArea}>
              <div className={styles.visualCard}>
                <img
                  alt="ログイン画面イメージ"
                  src="/images/top/large/1.png"
                  width={2432}
                  height={1442}
                  className={styles.visualImage}
                />
              </div>
            </div>
          </div>

          <div className={styles.stepList}>
            {START_STEPS.map((step, index) => (
              <article key={step.title} className={styles.stepCard}>
                <p className={styles.stepIndex}>{`0${index + 1}`}</p>
                <div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
