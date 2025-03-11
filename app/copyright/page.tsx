'use client';

import Copyright from '@/components/Home/Pages/Copyright';
import Header from '@/components/Common/Layouts/Header';
import Footer from '@/components/Common/Layouts/Footer';

export const runtime = 'edge';

export default function DashBoardPage() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '72px' }}>
        <Copyright />
      </div>
      <Footer />
    </>
  );
}
