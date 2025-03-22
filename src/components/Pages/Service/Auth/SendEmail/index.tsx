import SendEmailFeature from '@/components/Features/Service/Auth/SendEmail';
import HomeContainer from '@/components/Common/Layouts/Container/HomeContainer';
import BreadCrumb from '@/components/Common/BreadCrumb';

export default function SendEmailPage() {
  return (
    <HomeContainer white={true}>
      <BreadCrumb title="パスワードリセット" path="service/auth/sendemail" />
      <SendEmailFeature />
    </HomeContainer>
  );
}
