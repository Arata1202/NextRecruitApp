import Link from 'next/link';
import styles from './index.module.css';

export default function Support() {
  return (
    <section className={styles.section}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={styles.banner}>
          <p className={styles.eyebrow}>Built From Real Voices</p>
          <h2 className={styles.title}>就活のリアルな悩みから、機能を増やし続けています</h2>
          <p className={styles.description}>
            リクビジョンは、現役大学生が「本当に欲しかった管理体験」を形にするために開発中です。改善要望はすべて次のアップデート候補として検討します。
          </p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.primaryAction}>
              要望を送る
            </Link>
            <Link href="/service/auth/signup" className={styles.secondaryAction}>
              まず無料で試す
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
