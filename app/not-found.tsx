import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.title}>404</div>
        <div className={styles.text}>ページが見つかりませんでした</div>
      </div>
    </div>
  );
}
