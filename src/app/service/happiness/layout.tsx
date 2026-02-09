import { Metadata } from 'next';
import { TITLE } from '@/constants/data';

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const defaultTitle = TITLE;

  const title = `幸福度｜${defaultTitle}`;
  const description = `${defaultTitle}の幸福度ページです。`;
  const images = `${defaultUrl}/images/og/1.png`;
  const url = `${defaultUrl}/service/happiness`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: images,
      url: url,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function HappinessLayout(props: Props) {
  const { children } = props;

  return <>{children}</>;
}
