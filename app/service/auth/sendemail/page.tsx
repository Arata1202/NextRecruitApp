'use client';

import SendEmail from '@/components/Service/Auth/SendEmail';
import Header from '@/components/Home/Layouts/Header';
import Footer from '@/components/Home/Layouts/Footer';

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
