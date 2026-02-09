import { Heading } from '@/types/heading';

export const formatHeadings = (headings: Heading[]): Heading[] => {
  const headingNumbers: { [level: number]: number } = {};

  return headings.map((heading) => {
    if (!headingNumbers[heading.level]) {
      headingNumbers[heading.level] = 1;
    } else {
      headingNumbers[heading.level]++;
    }

    const headingNumber = Object.keys(headingNumbers)
      .filter((level) => parseInt(level, 10) <= heading.level)
      .map((level) => headingNumbers[parseInt(level, 10)])
      .join('.');

    for (let i = heading.level + 1; i <= 5; i++) {
      headingNumbers[i] = 0;
    }

    return {
      id: heading.id,
      title: heading.title,
      level: heading.level,
      number: headingNumber,
      marginLeft: `${(heading.level - 1) * 20}px`,
    };
  });
};
