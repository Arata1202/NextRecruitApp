import { useEffect } from 'react';

export const useHeightGuardObserver = () => {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.mut-height-guard');
    const observers: MutationObserver[] = [];

    targets.forEach((target) => {
      const heightChangeObserver = new MutationObserver(() => {
        target.style.height = '';
        target.style.removeProperty('height');
        target.style.minHeight = '';
      });

      heightChangeObserver.observe(target, {
        attributes: true,
        attributeFilter: ['style'],
      });

      observers.push(heightChangeObserver);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);
};
