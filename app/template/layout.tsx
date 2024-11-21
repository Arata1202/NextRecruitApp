import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'テンプレート',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
