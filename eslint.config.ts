import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'backend', 'coverage']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    rules: {
      'prefer-const': 'error',
      'no-duplicate-imports': 'warn',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['variable', 'typeProperty'],
          format: ['camelCase'],
        },
        {
          selector: ['variable', 'parameter'],
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: ['function'],
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: ['typeLike'],
          format: ['PascalCase'],
        },
        {
          selector: ['variable'],
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'should', 'has', 'can', 'did', 'will', 'show'],
        },
        {
          selector: ['variable'],
          filter: 'Context$|Component$',
          format: ['PascalCase'],
        },
      ],
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
      },
    },
  },
]);
