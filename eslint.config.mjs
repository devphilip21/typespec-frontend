import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tsEslint.config(
  {
    ignores: ['**/dist/**/*'],
  },
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // 인자 이름이 _로 시작하는 경우 무시
          varsIgnorePattern: '^_', // 변수 이름이 _로 시작하는 경우 무시
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  prettierConfig,
);
