const { FlatCompat } = require('@eslint/eslintrc');
const { fixupConfigRules } = require('@eslint/compat');
const prettier = require('eslint-config-prettier');

const flatCompat = new FlatCompat();

module.exports = [
  ...fixupConfigRules(
    flatCompat.extends('next/core-web-vitals'),
    flatCompat.extends('next/typescript'),
  ),
  {
    rules: {
      '@next/next/no-img-element': 'off',
      'jsx-a11y/alt-text': 'off',
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
  prettier,
  {
    ignores: ['.next/', 'public/*', '/*.*'],
  },
];
