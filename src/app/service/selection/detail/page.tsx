import DetailPage from '@/components/Pages/Service/Selection/Detail';
import MainLayout from '@/components/Common/Layouts/MainLayout';
import AuthRedirect from '@/components/Common/Auth/AuthRedirect';

export default function Page() {
  return (
    <AuthRedirect requireAuth={true}>
      <MainLayout />
      <DetailPage />
    </AuthRedirect>
  );
}
