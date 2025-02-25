'use client';

import SignUp from '@/components/Service/Auth/SignUp';
import { useAuthAuthCheck } from '@/hooks/Middleware/Auth';
import Header from '@/components/Home/Layouts/Header';
import Footer from '@/components/Home/Layouts/Footer';

export const runtime = 'edge';

export default function SignUpPage() {
  const { userChecked } = useAuthAuthCheck();
  if (!userChecked) {
    return null;
  }
  return (
    <>
      <Header />
      <div style={{ marginTop: '72px' }}>
        <SignUp />
      </div>
      <Footer />
    </>
  );
}
