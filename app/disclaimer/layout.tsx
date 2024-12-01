import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '免責事項｜リクビジョン',
  description: '免責事項を記載しています。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
