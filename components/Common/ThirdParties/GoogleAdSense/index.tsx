import Script from 'next/script';

export default function GoogleAdSense() {
  const publisherId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_PUBLISHER_ID;
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${publisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
