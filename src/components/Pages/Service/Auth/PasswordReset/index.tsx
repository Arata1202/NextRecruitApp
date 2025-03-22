import PasswordResetFeature from '@/components/Features/Service/Auth/PasswordReset';
import HomeContainer from '@/components/Common/Layouts/Container/HomeContainer';
import BreadCrumb from '@/components/Common/BreadCrumb';

export default function PasswordResetPage() {
  return (
    <HomeContainer white={true}>
      <BreadCrumb title="パスワードリセット" path="service/auth/sendemail" />
      <PasswordResetFeature />
    </HomeContainer>
  );
}
