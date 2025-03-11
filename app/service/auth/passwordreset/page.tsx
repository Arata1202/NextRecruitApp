'use client';

import PasswordReset from '@/components/Service/Auth/PasswordReset';
import Header from '@/components/Common/Layouts/Header';
import Footer from '@/components/Common/Layouts/Footer';

export const runtime = 'edge';

export default function PasswordResetPage() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '72px' }}>
        <PasswordReset />
      </div>
      <Footer />
    </>
  );
}
