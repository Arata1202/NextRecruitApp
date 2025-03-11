import ContactPage from '@/components/Pages/Contact';
import Header from '@/components/Common/Layouts/Header';
import Footer from '@/components/Common/Layouts/Footer';

export const runtime = 'edge';

export default function Page() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '72px' }}>
        <ContactPage />
      </div>
      <Footer />
    </>
  );
}
