export type MicroCMSImage = {
  url: string;
  width?: number;
  height?: number;
};

export type RelatedArticleLink = {
  id: string;
  title?: string;
  description?: string;
  thumbnail?: MicroCMSImage;
  publishedAt?: string;
  updatedAt?: string;
};

export type IntroductionBlock = {
  rich_text?: string;
  custom_html?: string;
  article_link?: string | RelatedArticleLink;
  bubble_image?: MicroCMSImage;
  bubble_name?: string;
  bubble_text?: string;
  bubble_isRight?: boolean;
  box_merit?: string;
  box_demerit?: string;
  box_point?: string;
  box_common?: string;
};

export type ContentBlock = {
  google_adsense?: string;
  rich_text?: string;
  custom_html?: string;
  article_link?: string | RelatedArticleLink;
  bubble_image?: MicroCMSImage;
  bubble_name?: string;
  bubble_text?: string;
  bubble_isRight?: boolean;
  box_merit?: string;
  box_demerit?: string;
  box_point?: string;
  box_common?: string;
};

export type Blog = {
  id: string;
  title: string;
  description?: string;
  content?: string;
  thumbnail?: MicroCMSImage;
  introduction_blocks?: IntroductionBlock[];
  content_blocks?: ContentBlock[];
  publishedAt: string;
  updatedAt: string;
};

export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
