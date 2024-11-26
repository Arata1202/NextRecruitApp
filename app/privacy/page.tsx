'use client';

import Privacy from '@/components/Home/Pages/Privacy';
import Header from '@/components/Home/Layouts/Header';
import Footer from '@/components/Home/Layouts/Footer';

export default function DashBoardPage() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '80px' }}>
        <Privacy />
      </div>
      <Footer />
    </>
  );
}
