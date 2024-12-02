import React from 'react';
import type { Metadata } from 'next';
import { OneSignalInitial } from '@/libs/OneSignalInitial';

export const metadata: Metadata = {
  title: '就活イベント｜リクビジョン',
  robots: {
    index: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <OneSignalInitial />
      {children}
    </>
  );
}
