'use client';

import Login from '@/components/Service/Auth/Login';
import { useAuthAuthCheck } from '@/hooks/Middleware/Auth';
import Header from '@/components/Common/Layouts/Header';
import Footer from '@/components/Common/Layouts/Footer';

export const runtime = 'edge';

export default function LoginPage() {
  const { userChecked } = useAuthAuthCheck();
  if (!userChecked) {
    return null;
  }
  return (
    <>
      <Header />
      <div style={{ marginTop: '72px' }}>
        <Login />
      </div>
      <Footer />
    </>
  );
}
