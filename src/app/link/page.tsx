'use client';

import Link from '@/components/Home/Pages/Link';
import Header from '@/components/Common/Layouts/Header';
import Footer from '@/components/Common/Layouts/Footer';

export const runtime = 'edge';

export default function DashBoardPage() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '72px' }}>
        <Link />
      </div>
      <Footer />
    </>
  );
}
