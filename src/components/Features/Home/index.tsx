import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import Hero from './Elements/Hero';
import Suggest from './Elements/Suggest';
import Recommend from './Elements/Recommend';
import Support from './Elements/Support';
import styles from './index.module.css';

export default function HomeFeature() {
  return (
    <div className={styles.home}>
      <div className={styles.decorTop} />
      <div className={styles.decorBottom} />
      <div className={styles.content}>
        <Hero />
        <Recommend />
        <Suggest />
        <Support />
        <div className={styles.adWrap}>
          <AdUnit slot="7998948559" style={{ marginTop: '1.25rem' }} />
        </div>
      </div>
    </div>
  );
}
