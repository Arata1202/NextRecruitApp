import '@testing-library/jest-dom';

global.ResizeObserver =
  global.ResizeObserver ||
  class {
    disconnect() {}
    observe() {}
    unobserve() {}
  };
