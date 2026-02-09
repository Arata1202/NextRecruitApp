'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  InformationCircleIcon,
  LightBulbIcon,
  LinkIcon,
} from '@heroicons/react/20/solid';
import { ArrowPathIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Blog, ContentBlock, IntroductionBlock, RelatedArticleLink } from '@/types/microcms';
import { Heading } from '@/types/heading';
import { formatDate } from '@/utils/formatDate';
import { extractHeadingsFromHtml } from '@/utils/extractHeadingsFromHtml';
import TableOfContent from '@/components/Common/TableOfContent';
import AdAlert from '@/components/Common/AdAlert';
import AdUnit from '@/components/ThirdParties/GoogleAdSense/Elements/AdUnit';
import WebpImage from '@/components/Common/Elements/WebpImage';
import styles from './index.module.css';

type Props = {
  article: Blog;
};

type ProcessedBlock = (IntroductionBlock | ContentBlock) & {
  processedRichText?: string;
  processedCustomHtml?: string;
};

const isNextDayOrLater = (date1: string, date2: string) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  return d1 > d2;
};

const withLazyImage = (html: string) =>
  html.replace(/<img(?![^>]*loading=)/g, '<img loading="lazy"');

const isRelatedArticleLink = (value: unknown): value is RelatedArticleLink => {
  return typeof value === 'object' && value !== null && 'id' in value;
};

export default function BlogArticleFeature({ article }: Props) {
  const { headings, processedHtml, introBlocks, contentBlocks } = useMemo(() => {
    const extractedHeadings: Heading[] = [];
    const idCount: Record<string, number> = {};

    const prepareHtml = (html: string, prefix: string, collectHeadings = false) => {
      const { processedHtml: nextHtml } = extractHeadingsFromHtml(
        html,
        collectHeadings
          ? {
              collectHeadings: extractedHeadings,
              idCount,
              idPrefix: prefix,
            }
          : { idPrefix: prefix },
      );
      return withLazyImage(nextHtml);
    };

    const processedIntroduction = (article.introduction_blocks || []).map((block, index) => ({
      ...block,
      processedRichText: block.rich_text
        ? prepareHtml(block.rich_text, `intro-${index}`)
        : undefined,
      processedCustomHtml: block.custom_html
        ? prepareHtml(block.custom_html, `intro-custom-${index}`)
        : undefined,
    }));

    const processedContentBlocks = (article.content_blocks || []).map((block, index) => ({
      ...block,
      processedRichText: block.rich_text
        ? prepareHtml(block.rich_text, `content-${index}`, true)
        : undefined,
      processedCustomHtml: block.custom_html
        ? prepareHtml(block.custom_html, `content-custom-${index}`, true)
        : undefined,
    }));

    const fallbackHtml = article.content ? prepareHtml(article.content, 'content', true) : '';

    return {
      headings: extractedHeadings,
      processedHtml: fallbackHtml,
      introBlocks: processedIntroduction,
      contentBlocks: processedContentBlocks,
    };
  }, [article.content, article.content_blocks, article.introduction_blocks]);

  const hasBlockContent = introBlocks.length > 0 || contentBlocks.length > 0;

  const renderBlock = (block: ProcessedBlock) => (
    <>
      {block.bubble_text && block.bubble_image && (
        <div className={styles.speechBubbleWrap}>
          <div
            className={`${styles.speechBubble} ${block.bubble_isRight ? styles.speechBubbleRight : styles.speechBubbleLeft}`}
          >
            <div
              className={`${styles.bubbleImageWrap} ${block.bubble_isRight ? styles.bubbleImageWrapRight : styles.bubbleImageWrapLeft}`}
            >
              <img
                src={block.bubble_image.url}
                alt="吹き出しのイメージ"
                width={75}
                height={75}
                className={styles.bubbleImage}
              />
            </div>
            <div className={styles.bubbleContent}>
              {block.bubble_name && <p className={styles.bubbleName}>{block.bubble_name}</p>}
              <p className={styles.bubbleText}>{block.bubble_text}</p>
            </div>
          </div>
        </div>
      )}

      {block.processedRichText && (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: block.processedRichText }}
        />
      )}

      {block.processedCustomHtml && (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: block.processedCustomHtml }}
        />
      )}

      {'google_adsense' in block && block.google_adsense && <AdUnit slot={block.google_adsense} />}

      {isRelatedArticleLink(block.article_link) && (
        <div className={styles.wantToReadWrap}>
          <div className={styles.wantToReadTitle}>
            <LinkIcon className={styles.wantToReadIcon} />
            <span>あわせて読みたい</span>
          </div>
          <Link href={`/blog/articles/${block.article_link.id}`} className={styles.wantToReadCard}>
            <WebpImage
              item={{
                thumbnail: block.article_link.thumbnail,
                title: block.article_link.title || '関連記事',
              }}
              card={true}
              className={styles.wantToReadImage}
            />
            <div className={styles.wantToReadBody}>
              <p className={styles.wantToReadHeading}>{block.article_link.title || '関連記事'}</p>
              {block.article_link.description && (
                <p className={styles.wantToReadDescription}>{block.article_link.description}</p>
              )}
            </div>
          </Link>
        </div>
      )}

      {block.box_merit && (
        <div className={`${styles.tabBox} ${styles.tabMerit}`}>
          <HandThumbUpIcon className={styles.tabMeritIcon} />
          <div dangerouslySetInnerHTML={{ __html: block.box_merit }} />
        </div>
      )}
      {block.box_demerit && (
        <div className={`${styles.tabBox} ${styles.tabDemerit}`}>
          <HandThumbDownIcon className={styles.tabDemeritIcon} />
          <div dangerouslySetInnerHTML={{ __html: block.box_demerit }} />
        </div>
      )}
      {block.box_point && (
        <div className={`${styles.tabBox} ${styles.tabPoint}`}>
          <LightBulbIcon className={styles.tabPointIcon} />
          <div dangerouslySetInnerHTML={{ __html: block.box_point }} />
        </div>
      )}
      {block.box_common && (
        <div className={`${styles.tabBox} ${styles.tabCommon}`}>
          <InformationCircleIcon className={styles.tabCommonIcon} />
          <div dangerouslySetInnerHTML={{ __html: block.box_common }} />
        </div>
      )}
    </>
  );

  return (
    <article className={styles.article}>
      <h1 className={styles.title}>{article.title}</h1>

      <WebpImage item={article} className={styles.thumbnail} />

      <div className={styles.dateRow}>
        <span className={styles.date}>
          <ClockIcon className={styles.dateIcon} />
          {formatDate(article.publishedAt)}
        </span>
        {article.updatedAt && isNextDayOrLater(article.updatedAt, article.publishedAt) && (
          <span className={`${styles.date} ${styles.updatedDate}`}>
            <ArrowPathIcon className={styles.dateIcon} />
            {formatDate(article.updatedAt)}
          </span>
        )}
      </div>

      <AdAlert />

      {introBlocks.map((block, index) => (
        <div key={`intro-${index}`} className={styles.introBlock}>
          {renderBlock(block)}
        </div>
      ))}

      {headings.length > 0 && (
        <div className={styles.tocWrap}>
          <TableOfContent headings={headings} />
        </div>
      )}

      {hasBlockContent ? (
        <>
          {contentBlocks.map((block, index) => (
            <div key={`content-${index}`} className={styles.contentBlock}>
              {renderBlock(block)}
            </div>
          ))}
        </>
      ) : (
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: processedHtml }} />
      )}
    </article>
  );
}
