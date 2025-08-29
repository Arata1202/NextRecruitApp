import DonePage from '@/components/Pages/Service/Todo/Done';
import MainLayout from '@/components/Common/Layouts/MainLayout';
import AuthRedirect from '@/components/Common/Auth/AuthRedirect';

export default function Page() {
  return (
    <AuthRedirect requireAuth={true}>
      <MainLayout />
      <DonePage />
    </AuthRedirect>
  );
}
