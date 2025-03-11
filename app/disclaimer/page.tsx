'use client';

import Disclaimer from '@/components/Home/Pages/Disclaimer';
import Header from '@/components/Common/Layouts/Header';
import Footer from '@/components/Common/Layouts/Footer';

export const runtime = 'edge';

export default function DashBoardPage() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '72px' }}>
        <Disclaimer />
      </div>
      <Footer />
    </>
  );
}
