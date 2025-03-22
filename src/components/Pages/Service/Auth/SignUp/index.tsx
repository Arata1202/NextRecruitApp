import SignUpFeature from '@/components/Features/Service/Auth/SignUp';
import HomeContainer from '@/components/Common/Layouts/Container/HomeContainer';
import BreadCrumb from '@/components/Common/BreadCrumb';

export default function SignUpPage() {
  return (
    <HomeContainer white={true}>
      <BreadCrumb title="アカウント登録" path="service/auth/signup" />
      <SignUpFeature />
    </HomeContainer>
  );
}
