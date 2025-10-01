// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import reactRefresh from 'eslint-plugin-react-refresh'
export default [
  // какие пути игнорировать
  {
    ignores: ['dist/', 'node_modules/'],
  },
  // базовые рекомендации JS
  {
    ...js.configs.recommended,
  },
  // правила для файлов JS/JSX (React без TypeScript)
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      'react-refresh': reactRefresh,
    },
    settings: {
      // автоматически подхватывать версию React
      react: { version: 'detect' },
    },
    rules: {
      // React + JSX
      ...react.configs.recommended.rules,
      // если используете новый JSX-трансформ (React 17+)
      ...(react.configs['jsx-runtime']?.rules ?? {}),
      // Хуки
      ...reactHooks.configs.recommended.rules,
      // Доступность
      ...jsxA11y.configs.recommended.rules,
      // Порядок импортов (удобно в рефакторинге)
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      // Полезно для Vite React Fast Refresh:
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Немного «шумоподавления»
      'no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // Часто отключают, если не используете PropTypes (в JS-проектах многие их не пишут)
      'react/prop-types': 'off',
    },
  },
]
