import { GoogleAnalytics as GA4 } from '@next/third-parties/google';

export default function GoogleAnalytics() {
  const gaId = process.env.GOOGLE_ANALYTICS_ID;
  return <GA4 gaId={gaId!} />;
}
