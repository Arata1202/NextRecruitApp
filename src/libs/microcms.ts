import { Blog, MicroCMSListResponse } from '@/types/microcms';

type QueryValue = string | number | boolean | undefined;
type MicroCMSQueries = Record<string, QueryValue>;

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

const buildSearchParams = (queries?: MicroCMSQueries) => {
  if (!queries) return '';

  const params = new URLSearchParams();
  Object.entries(queries).forEach(([key, value]) => {
    if (value === undefined) return;
    params.set(key, String(value));
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
};

const fetchFromMicroCMS = async <T>(endpoint: string, queries?: MicroCMSQueries): Promise<T> => {
  if (!serviceDomain || !apiKey) {
    throw new Error('microCMSの環境変数が未設定です。MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY');
  }

  const query = buildSearchParams(queries);
  const url = `https://${serviceDomain}.microcms.io/api/v1/${endpoint}${query}`;
  const response = await fetch(url, {
    headers: {
      'X-MICROCMS-API-KEY': apiKey,
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`microCMS API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const getBlogList = async (queries?: MicroCMSQueries) => {
  return fetchFromMicroCMS<MicroCMSListResponse<Blog>>('blog', queries);
};

export const getBlogDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  // Keep reference fields expanded so article blocks (e.g. article_link) can render rich UI.
  const mergedQueries: MicroCMSQueries = {
    depth: 2,
    ...queries,
  };

  return fetchFromMicroCMS<Blog>(`blog/${contentId}`, mergedQueries);
};

export const getAllBlogIds = async () => {
  const ids: { id: string }[] = [];
  const limit = 100;
  let offset = 0;
  let totalCount = 0;

  do {
    const data = await getBlogList({
      fields: 'id',
      limit,
      offset,
    });
    totalCount = data.totalCount;
    ids.push(...data.contents.map((content) => ({ id: content.id })));
    offset += limit;
  } while (offset < totalCount);

  return ids;
};
