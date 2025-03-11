import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '著作権｜リクビジョン',
  description: '著作権についてを記載しています。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
