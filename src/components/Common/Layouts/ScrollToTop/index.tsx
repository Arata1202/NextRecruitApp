'use client';

import { ChevronDoubleUpIcon } from '@heroicons/react/20/solid';
import styles from './index.module.css';

export default function ScrollTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${styles.button} fixed z-50 flex items-center bg-white justify-center text-gray-700 shadow border border-gray-300 hover:text-blue-500`}
    >
      <ChevronDoubleUpIcon className={styles.icon} />
    </button>
  );
}
