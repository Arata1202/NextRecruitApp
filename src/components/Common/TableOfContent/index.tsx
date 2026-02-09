'use client';

import { useEffect, useMemo, useState } from 'react';
import { Heading } from '@/types/heading';
import { formatHeadings } from '@/utils/formatHeadings';
import styles from './index.module.css';

type Props = {
  headings: Heading[];
};

export default function TableOfContent({ headings }: Props) {
  const [activeId, setActiveId] = useState('');
  const formattedHeadings = useMemo(() => formatHeadings(headings), [headings]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    const yOffset = -130;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentId = '';
      headings.forEach((heading, index) => {
        const element = document.getElementById(heading.id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const isLast = index === headings.length - 1;

        if (isLast) {
          if (rect.top <= 131) currentId = heading.id;
          return;
        }

        if (rect.top <= 131 && rect.bottom > 131) {
          currentId = heading.id;
          return;
        }

        const next = headings[index + 1];
        if (rect.top <= 131 && next) {
          const nextElement = document.getElementById(next.id);
          if (nextElement && nextElement.getBoundingClientRect().top > 131) {
            currentId = heading.id;
          }
        }
      });

      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (formattedHeadings.length === 0) return null;

  return (
    <div className={styles.wrap}>
      <div className={styles.toc}>
        <div className={styles.title}>目次</div>
        <ol className={styles.list}>
          {formattedHeadings.map((heading) => (
            <li
              key={heading.id}
              style={{
                marginLeft: heading.marginLeft,
                backgroundColor: activeId === heading.id ? '#eaf4fc' : 'transparent',
                transition: 'background-color 0.3s ease',
              }}
            >
              <a
                href={`#${heading.id}`}
                onClick={(event) => handleClick(event, heading.id)}
                className={styles.link}
              >
                {heading.number} {heading.title}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
