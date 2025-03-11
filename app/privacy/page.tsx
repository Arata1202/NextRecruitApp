'use client';

import Privacy from '@/components/Home/Pages/Privacy';
import Header from '@/components/Common/Layouts/Header';
import Footer from '@/components/Common/Layouts/Footer';

export const runtime = 'edge';

export default function DashBoardPage() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '72px' }}>
        <Privacy />
      </div>
      <Footer />
    </>
  );
}
