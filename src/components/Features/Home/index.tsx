import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import Hero from './Elements/Hero';
import Suggest from './Elements/Suggest';
import Recommend from './Elements/Recommend';
// import Support from './Elements/Support';

export default function HomeFeature() {
  return (
    <>
      <div style={{ padding: '24px 0' }} className="overflow-hidden bg-white">
        <Hero />
        <Recommend />
        <Suggest />
        {/* <Support /> */}
        <AdUnit slot="7998948559" style={{ marginTop: '1.25rem' }} />
      </div>
    </>
  );
}
