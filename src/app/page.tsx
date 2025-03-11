import HomePage from '@/components/Pages/Home';
import Header from '@/components/Common/Layouts/Header';
import Footer from '@/components/Common/Layouts/Footer';

export default function Page() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '72px' }}>
        <HomePage />
      </div>
      <Footer />
    </>
  );
}
