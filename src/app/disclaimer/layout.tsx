import type { Metadata } from 'next';
import { TITLE } from '@/constants/data';

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const defaultTitle = TITLE;

  const title = `免責事項｜${defaultTitle}`;
  const description = `免責事項を記載しています。`;
  const images = `${defaultUrl}/images/og/1.png`;
  const url = `${defaultUrl}/disclaimer`;

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

export default async function DisclaimerLayout(props: Props) {
  const { children } = props;

  return <>{children}</>;
}
