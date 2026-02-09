import { HOME_RECOMMENDS } from '@/constants/data';
import styles from './index.module.css';

export default function Suggest() {
  return (
    <section className={styles.section}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={styles.header}>
          <p className={styles.eyebrow}>For You</p>
          <h2 className={styles.title}>こんな就活生におすすめ</h2>
          <p className={styles.description}>
            今の悩みが1つでも当てはまるなら、リクビジョンで「管理の迷い」を先に減らせます。
          </p>
        </div>

        <div className={styles.grid}>
          {HOME_RECOMMENDS.map((item) => (
            <article key={item.path} className={styles.card}>
              <img alt="おすすめイメージ" src={item.path} className={styles.cardImage} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
