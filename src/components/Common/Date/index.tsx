import { ClockIcon } from '@heroicons/react/24/outline';
import styles from './index.module.css';

type Props = {
  date: string;
};

export default function Date({ date }: Props) {
  return (
    <span className={`${styles.date} flex justify-end`}>
      <ClockIcon className="h-5 w-5" aria-hidden="true" />
      {date}
    </span>
  );
}
