import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '企業詳細｜リクビジョン',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
