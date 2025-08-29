import SignUpPage from '@/components/Pages/Service/Auth/SignUp';
import Header from '@/components/Common/Layouts/Header';
import Footer from '@/components/Common/Layouts/Footer';
import AuthRedirect from '@/components/Common/Auth/AuthRedirect';

export default function Page() {
  return (
    <AuthRedirect requireAuth={false}>
      <Header />
      <SignUpPage />
      <Footer />
    </AuthRedirect>
  );
}
