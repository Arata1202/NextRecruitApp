'use client';

import PasswordReset from '@/components/Service/Auth/PasswordReset';
import Header from '@/components/Home/Layouts/Header';
import Footer from '@/components/Home/Layouts/Footer';

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
