'use client';

import Contact from '@/components/Home/Pages/Contact';
import Header from '@/components/Home/Layouts/Header';
import Footer from '@/components/Home/Layouts/Footer';

export default function DashBoardPage() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '80px' }}>
        <Contact />
      </div>
      <Footer />
    </>
  );
}
