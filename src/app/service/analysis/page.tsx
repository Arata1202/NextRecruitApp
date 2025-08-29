import AnalysisPage from '@/components/Pages/Service/Analysis';
import MainLayout from '@/components/Common/Layouts/MainLayout';
import AuthRedirect from '@/components/Common/Auth/AuthRedirect';

export default function Page() {
  return (
    <AuthRedirect requireAuth={true}>
      <MainLayout />
      <AnalysisPage />
    </AuthRedirect>
  );
}
