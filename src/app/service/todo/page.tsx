import TodoPage from '@/components/Pages/Service/Todo';
import MainLayout from '@/components/Common/Layouts/MainLayout';
import AuthRedirect from '@/components/Common/Auth/AuthRedirect';

export default function Page() {
  return (
    <AuthRedirect requireAuth={true}>
      <MainLayout />
      <TodoPage />
    </AuthRedirect>
  );
}
