import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '就活イベント｜リクビジョン',
  robots: {
    index: false,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
