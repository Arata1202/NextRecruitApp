import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '../styles/globals.css';
import { DESCRIPTION } from '@/constants/data';
import ScrollTopButton from '@/components/Common/Layouts/ScrollToTop';
import GoogleAdSense from '@/components/ThirdParties/GoogleAdSense';
import GoogleAnalytics from '@/components/ThirdParties/GoogleAnalytics';
import OneSignal from '@/components/ThirdParties/OneSignal';

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

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const defaultTitle = process.env.NEXT_PUBLIC_BASE_TITLE;

  const title = `${defaultTitle}`;
  const description = DESCRIPTION;
  const images = `${defaultUrl}/images/og/1.png`;
  const url = `${defaultUrl}`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: images,
      url: url,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <head>
        <meta name="format-detection" content="email=no,telephone=no,address=no" />
        <link rel="icon" href="/favicon.ico" />
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
        <meta name="twitter:creator" content="@Aokumoblog" />
        <meta name="twitter:site" content="@Aokumoblog" />
        <meta property="og:site_name" content="リクビジョン" />
        <meta property="og:locale" content="ja_JP" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
        <div className="LightTheme">{children}</div>
        <ScrollTopButton />
        <GoogleAdSense />
        <GoogleAnalytics />
        <OneSignal />
      </body>
    </html>
  );
}
