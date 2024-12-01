import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'リンク｜リクビジョン',
  description: 'リンクについてを記載しています。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
