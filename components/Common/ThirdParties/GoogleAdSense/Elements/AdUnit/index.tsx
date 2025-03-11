'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useMutationObserver } from '@/hooks/useMutationObserver';
import styles from './index.module.css';

const publisherId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_PUBLISHER_ID;

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

type Props = {
  slot: string;
  format?: string;
  responsive?: string;
  style?: object;
};

export default function AdUnit({ slot, format = 'rectangle', responsive = 'false', style }: Props) {
  let pathname = usePathname();
  pathname = pathname ? pathname : '';

  useMutationObserver();

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error(err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <div
        key={pathname.replace(/\//g, '-') + '-' + slot}
        className={`${styles.container} mut-guard`}
        style={{ ...style }}
      >
        <p className={`text-center text-gray-700`}>スポンサーリンク</p>
        <ins
          className={`${styles.adUnit} adsbygoogle mut-guard`}
          data-ad-client={`ca-pub-${publisherId}`}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />
      </div>
    </>
  );
}
