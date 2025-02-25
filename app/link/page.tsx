'use client';

import Link from '@/components/Home/Pages/Link';
import Header from '@/components/Home/Layouts/Header';
import Footer from '@/components/Home/Layouts/Footer';

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
