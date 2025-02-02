import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー｜リクビジョン',
  description: 'プライバシーポリシーを記載しています。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
