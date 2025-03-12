import { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const defaultTitle = process.env.NEXT_PUBLIC_BASE_TITLE;

  const title = `企業管理｜${defaultTitle}`;
  const description = `${defaultTitle}の企業管理ページです。`;
  const images = `${defaultUrl}/images/og/1.png`;
  const url = `${defaultUrl}/service/selection`;

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

export default async function SelectionLayout(props: Props) {
  const { children } = props;

  return <>{children}</>;
}
