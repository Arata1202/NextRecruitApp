import SendEmailPage from '@/components/Pages/Service/Auth/SendEmail';
import Header from '@/components/Common/Layouts/Header';
import Footer from '@/components/Common/Layouts/Footer';
import AuthRedirect from '@/components/Common/Auth/AuthRedirect';

export default function Page() {
  return (
    <AuthRedirect requireAuth={false}>
      <Header />
      <SendEmailPage />
      <Footer />
    </AuthRedirect>
  );
}
