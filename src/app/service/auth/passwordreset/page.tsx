import PasswordResetPage from '@/components/Pages/PasswordReset';
import Header from '@/components/Common/Layouts/Header';
import Footer from '@/components/Common/Layouts/Footer';

export default function Page() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '72px' }}>
        <PasswordResetPage />
      </div>
      <Footer />
    </>
  );
}
