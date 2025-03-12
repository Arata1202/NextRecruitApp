import Script from 'next/script';

export default function OneSignal() {
  const onesignalAppId = process.env.ONESIGNAL_APP_ID;
  return (
    <>
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
    </>
  );
}
