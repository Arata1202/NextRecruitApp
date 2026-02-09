import { ArrowPathIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Blog } from '@/types/microcms';
import { formatDate } from '@/utils/formatDate';
import WebpImage from '@/components/Common/Elements/WebpImage';
import styles from './index.module.css';

type Props = {
  articles: Blog[];
  errorMessage?: string;
};

const isNextDayOrLater = (date1: string, date2: string) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  return d1 > d2;
};

export default function BlogFeature({ articles, errorMessage }: Props) {
  if (errorMessage) {
    return (
      <div className="overflow-hidden bg-white shadow rounded-lg mb-5">
        <div className="px-4 py-3 sm:px-6">
          <p className="text-sm font-semibold text-red-500">{errorMessage}</p>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="overflow-hidden bg-white shadow rounded-lg mb-5">
        <div className="px-4 py-3 sm:px-6">
          <h2 className="text-base/7 font-semibold text-gray-900">記事はまだありません</h2>
        </div>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {articles.map((article) => (
        <li key={article.id} className={styles.item}>
          <a href={`/blog/articles/${article.id}`} className={styles.link}>
            <WebpImage item={article} card={true} className={styles.image} />
            <div className={styles.content}>
              <h2 className={styles.title}>{article.title}</h2>
              <p className={styles.description}>{article.description || ''}</p>
              <div className={styles.dateRow}>
                <span className={styles.date}>
                  <ClockIcon className={styles.dateIcon} />
                  {formatDate(article.publishedAt)}
                </span>
                {article.updatedAt && isNextDayOrLater(article.updatedAt, article.publishedAt) && (
                  <span className={`${styles.date} ${styles.updatedDate}`}>
                    <ArrowPathIcon className={styles.dateIcon} />
                    {formatDate(article.updatedAt)}
                  </span>
                )}
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
