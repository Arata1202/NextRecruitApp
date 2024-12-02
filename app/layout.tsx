import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Script from 'next/script';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'リクビジョン',
  description:
    '就活における日程管理や自己分析、選考状況などを一括で管理することのできるサービスです。',
  openGraph: {
    title: 'リクビジョン',
    description:
      '就活における日程管理や自己分析、選考状況などを一括で管理することのできるサービスです。',
    images: '/images/og/1.png',
    url: 'https://rikuvision.realunivlog.com',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="robots" content="noindex" />

        <Script async strategy="lazyOnload" src={process.env.GOOGLE_ANALYTICS_ID} />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VGGHGRNHTM', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <meta name="format-detection" content="email=no,telephone=no,address=no" />
        {/* <link rel="icon" href="/images/icons/16.jpg" sizes="16x16" type="image/jpeg" />
        <link rel="icon" href="/images/icons/32.jpg" sizes="32x32" type="image/jpeg" />
        <link rel="icon" href="/images/icons/48.jpg" sizes="48x48" type="image/jpeg" /> */}
        <link rel="apple-touch-icon" href="/images/icons/apple-touch-icon.jpg" />
        <meta name="msapplication-TileImage" content="/images/icons/apple-touch-icon.jpg" />
        <meta name="msapplication-TileColor" content="#E0CBBA" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta name="twitter:creator" content="" /> */}
        {/* <meta name="twitter:site" content="" /> */}
        <meta property="og:site_name" content="リクビジョン" />
        <meta property="og:locale" content="ja_JP" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
        <div className="LightTheme">{children}</div>
      </body>
    </html>
  );
}
