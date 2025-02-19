import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Script from 'next/script';
import type { Viewport } from 'next';
import ScrollTopButton from '@/components/Service/Common/ScrollToTop';
import { Adsense } from '@/components/Common/Adsense/AdsenseScript';

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
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
  const onesignalAppId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
  return (
    <html lang="ja">
      <head>
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
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="afterInteractive"
        />
        <Script id="onesignal-init" strategy="afterInteractive">
          {`
          window.OneSignalDeferred = window.OneSignalDeferred || [];
          OneSignalDeferred.push(async function(OneSignal) {
            await OneSignal.init({
              appId: "${onesignalAppId}",
            });
          });
        `}
        </Script>
        <meta name="format-detection" content="email=no,telephone=no,address=no" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="icon"
          href="/images/icons/favicon/icon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="/images/icons/favicon/icon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="icon"
          href="/images/icons/favicon/icon-48x48.png"
          sizes="48x48"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/images/icons/pwa/icon-512x512.png" />
        <meta name="msapplication-TileImage" content="/images/icons/pwa/icon-512x512.png" />
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
        <ScrollTopButton />
        <Adsense />
      </body>
    </html>
  );
}
