import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const config = [
  ...compat.config({
    extends: ['eslint:recommended', 'next/core-web-vitals', 'next/typescript'],
  }),
  prettier,
];

export default config;
