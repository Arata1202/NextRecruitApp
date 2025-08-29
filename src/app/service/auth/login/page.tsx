import LoginPage from '@/components/Pages/Service/Auth/Login';
import Header from '@/components/Common/Layouts/Header';
import Footer from '@/components/Common/Layouts/Footer';
import AuthRedirect from '@/components/Common/Auth/AuthRedirect';

export default function Page() {
  return (
    <AuthRedirect requireAuth={false}>
      <Header />
      <LoginPage />
      <Footer />
    </AuthRedirect>
  );
}
