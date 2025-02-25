'use client';

import Top from '@/components/Home/Pages/Top';
import Header from '@/components/Home/Layouts/Header';
import Footer from '@/components/Home/Layouts/Footer';

export const runtime = 'edge';

export default function DashBoardPage() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '72px' }}>
        <Top />
      </div>
      <Footer />
    </>
  );
}
