import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ToDoリスト｜リクビジョン',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
