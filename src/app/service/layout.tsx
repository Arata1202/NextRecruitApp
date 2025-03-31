import { Metadata } from 'next';
import { TITLE } from '@/constants/data';

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const defaultTitle = TITLE;

  const title = `就活イベント｜${defaultTitle}`;
  const description = `${defaultTitle}の就活イベントページです。`;
  const images = `${defaultUrl}/images/og/1.png`;
  const url = `${defaultUrl}/service`;

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

export default async function ServiceLayout(props: Props) {
  const { children } = props;

  return <>{children}</>;
}
