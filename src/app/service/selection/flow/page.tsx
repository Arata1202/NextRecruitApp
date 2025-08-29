import FlowPage from '@/components/Pages/Service/Selection/Flow';
import MainLayout from '@/components/Common/Layouts/MainLayout';
import AuthRedirect from '@/components/Common/Auth/AuthRedirect';

export default function Page() {
  return (
    <AuthRedirect requireAuth={true}>
      <MainLayout />
      <FlowPage />
    </AuthRedirect>
  );
}
