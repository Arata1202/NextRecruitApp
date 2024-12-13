'use client';

import React from 'react';
import { ChevronDoubleUpIcon } from '@heroicons/react/20/solid';

const ScrollTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed z-50 flex items-center bg-white justify-center text-gray-700 shadow border border-gray-300 hover:text-blue-500"
      aria-label="Scroll to top"
      style={{
        transition: 'opacity 0.3s, visibility 0.3s',
        width: '40px',
        height: '40px',
        bottom: '10px',
        right: '10px',
      }}
    >
      <ChevronDoubleUpIcon aria-hidden="true" style={{ height: '25px', width: '25px' }} />
    </button>
  );
};

export default ScrollTopButton;
