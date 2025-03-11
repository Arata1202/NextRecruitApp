import Script from 'next/script';

export const Adsense = () => {
  return (
    <Script
      async
      src={process.env.GOOGLE_ADSENSE_ID}
      crossOrigin="anonymous"
      strategy="afterInteractive"
      data-full-width-responsive="false"
    />
  );
};
