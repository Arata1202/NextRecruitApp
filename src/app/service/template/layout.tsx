import { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const defaultTitle = process.env.NEXT_PUBLIC_BASE_TITLE;

  const title = `ESテンプレート｜${defaultTitle}`;
  const description = `${defaultTitle}のESテンプレートページです。`;
  const images = `${defaultUrl}/images/og/1.png`;
  const url = `${defaultUrl}/service/template`;

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

export default async function TemplateLayout(props: Props) {
  const { children } = props;

  return <>{children}</>;
}
