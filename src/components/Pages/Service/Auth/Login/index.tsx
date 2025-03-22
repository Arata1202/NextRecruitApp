import LoginFeature from '@/components/Features/Service/Auth/Login';
import HomeContainer from '@/components/Common/Layouts/Container/HomeContainer';
import BreadCrumb from '@/components/Common/BreadCrumb';

export default function LoginPage() {
  return (
    <HomeContainer white={true}>
      <BreadCrumb title="ログイン" path="service/auth/login" />
      <LoginFeature />
    </HomeContainer>
  );
}
