import { Metadata } from 'next';
import { TITLE } from '@/constants/data';

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const defaultTitle = TITLE;

  const title = `プライバシーポリシー｜${defaultTitle}`;
  const description = `プライバシーポリシーを記載しています。`;
  const images = `${defaultUrl}/images/og/1.png`;
  const url = `${defaultUrl}/privacy`;

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

export default async function PrivacyLayout(props: Props) {
  const { children } = props;

  return <>{children}</>;
}
