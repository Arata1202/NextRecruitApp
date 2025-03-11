import CopyrightPage from '@/components/Pages/Copyright';
import Header from '@/components/Common/Layouts/Header';
import Footer from '@/components/Common/Layouts/Footer';

export default function Page() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '72px' }}>
        <CopyrightPage />
      </div>
      <Footer />
    </>
  );
}
