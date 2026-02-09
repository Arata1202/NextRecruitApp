import { MicroCMSImage } from '@/types/microcms';
import styles from './index.module.css';

type ThumbnailLike = {
  thumbnail?: MicroCMSImage;
  title?: string;
};

type Props = {
  item: ThumbnailLike;
  card?: boolean;
  recent?: boolean;
  className?: string;
  fallbackSrc?: string;
};

const getDimension = (card: boolean, recent: boolean) => {
  if (recent) return { width: 320, height: 180 };
  if (card) return { width: 240, height: 126 };
  return { width: 960, height: 504 };
};

const getClassName = (card: boolean, recent: boolean, className?: string) => {
  if (className) return className;
  if (card) return styles.image;
  if (recent) return styles.recent;
  return styles.thumbnail;
};

export default function WebpImage({
  item,
  card = false,
  recent = false,
  className,
  fallbackSrc = '/images/og/1.png',
}: Props) {
  const finalClassName = getClassName(card, recent, className);
  const alt = item.title || 'サムネイル';

  if (!item.thumbnail?.url) {
    return <img src={fallbackSrc} alt={alt} className={finalClassName} loading="lazy" />;
  }

  const { width, height } = getDimension(card, recent);
  const src1x = `${item.thumbnail.url}?fm=webp&q=60&fit=crop&w=${width}&h=${height}`;
  const src2x = `${src1x}&dpr=2`;
  const srcSet = `${src1x} 1x, ${src2x} 2x`;

  return (
    <picture>
      <source type="image/webp" media="(max-width: 640px)" srcSet={srcSet} />
      <source type="image/webp" srcSet={srcSet} />
      <img
        src={src1x}
        alt={alt}
        className={finalClassName}
        width={item.thumbnail.width}
        height={item.thumbnail.height}
        loading="lazy"
      />
    </picture>
  );
}
