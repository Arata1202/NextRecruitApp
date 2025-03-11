import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ｜リクビジョン',
  description: 'お問い合わせのフォームを記載しています。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
