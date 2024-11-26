'use client';

import Copyright from '@/components/Home/Pages/Copyright';
import Header from '@/components/Home/Layouts/Header';
import Footer from '@/components/Home/Layouts/Footer';

export default function DashBoardPage() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '80px' }}>
        <Copyright />
      </div>
      <Footer />
    </>
  );
}
