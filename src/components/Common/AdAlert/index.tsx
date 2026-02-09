import { BellIcon } from '@heroicons/react/24/outline';
import styles from './index.module.css';

export default function AdAlert() {
  return (
    <div
      className={`${styles.alert} flex items-center justify-center border border-gray-300 p-3 text-center text-gray-700`}
    >
      <BellIcon className="mr-2 h-7 w-7 shrink-0" />
      記事内に広告が含まれています。
    </div>
  );
}
