'use client';

import SendEmail from '@/components/Service/Auth/SendEmail';
import Header from '@/components/Common/Layouts/Header';
import Footer from '@/components/Common/Layouts/Footer';

export const runtime = 'edge';

export default function SendEmailPage() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '72px' }}>
        <SendEmail />
      </div>
      <Footer />
    </>
  );
}
