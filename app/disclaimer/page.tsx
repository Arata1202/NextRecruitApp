'use client';

import Disclaimer from '@/components/Home/Pages/Disclaimer';
import Header from '@/components/Home/Layouts/Header';
import Footer from '@/components/Home/Layouts/Footer';

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
