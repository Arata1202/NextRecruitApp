'use client';

import Contact from '@/components/Home/Pages/Contact';
import Header from '@/components/Common/Layouts/Header';
import Footer from '@/components/Common/Layouts/Footer';

export const runtime = 'edge';

export default function DashBoardPage() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '72px' }}>
        <Contact />
      </div>
      <Footer />
    </>
  );
}
