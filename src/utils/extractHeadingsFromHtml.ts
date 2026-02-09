import { Heading } from '@/types/heading';

const stripTags = (value: string) =>
  value
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const toSlug = (text: string) => {
  const normalized = text
    .toLowerCase()
    .replace(/&[a-z0-9#]+;/gi, '')
    .replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

  return normalized || 'section';
};

const getHeadingClassByLevel = (level: number) => {
  if (level === 2) return 'bg-gray-300 text-gray-700';
  if (level === 3 || level === 4) return 'border-gray-300 text-gray-700';
  return '';
};

const mergeClasses = (current: string, extra: string) => {
  const tokens = `${current} ${extra}`
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
  return Array.from(new Set(tokens)).join(' ');
};

type Options = {
  idCount?: Record<string, number>;
  collectHeadings?: Heading[];
  idPrefix?: string;
};

export const extractHeadingsFromHtml = (html: string, options?: Options) => {
  const headings: Heading[] = options?.collectHeadings ?? [];
  const idCount: Record<string, number> = options?.idCount ?? {};
  const idPrefix = options?.idPrefix;

  const processedHtml = html.replace(
    /<h([1-5])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_match, levelText: string, rawAttrs: string, innerHtml: string) => {
      const level = parseInt(levelText, 10);
      const title = stripTags(innerHtml);
      const currentIdMatch = rawAttrs.match(/\sid=(["'])(.*?)\1/i);
      const currentClassMatch = rawAttrs.match(/\sclass=(["'])(.*?)\1/i);
      const fallbackId = toSlug(title);
      const baseId = currentIdMatch?.[2] || (idPrefix ? `${idPrefix}-${fallbackId}` : fallbackId);
      const count = (idCount[baseId] || 0) + 1;
      idCount[baseId] = count;
      const id = count === 1 ? baseId : `${baseId}-${count}`;

      const attrsWithoutIdClass = rawAttrs
        .replace(/\sid=(["']).*?\1/i, '')
        .replace(/\sclass=(["']).*?\1/i, '')
        .trim();
      const attrs = attrsWithoutIdClass.length > 0 ? ` ${attrsWithoutIdClass}` : '';

      const mergedClassName = mergeClasses(
        currentClassMatch?.[2] || '',
        getHeadingClassByLevel(level),
      );
      const classAttr = mergedClassName ? ` class="${mergedClassName}"` : '';

      headings.push({ id, title, level });
      return `<h${level}${attrs}${classAttr} id="${id}">${innerHtml}</h${level}>`;
    },
  );

  return { headings, processedHtml };
};
