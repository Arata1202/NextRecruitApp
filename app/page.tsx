'use client';

import Top from '@/components/Home/Pages/Top';
import Header from '@/components/Home/Layouts/Header';
import Footer from '@/components/Home/Layouts/Footer';

export default function DashBoardPage() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '80px' }}>
        <Top />
      </div>
      <Footer />
    </>
  );
}
