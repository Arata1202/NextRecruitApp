'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import FixedContentContainer from '../Layouts/Container/FixedContentContainer';

type Props = {
  content: string;
};

export default function Markdown({ content }: Props) {
  return (
    <FixedContentContainer>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </FixedContentContainer>
  );
}
