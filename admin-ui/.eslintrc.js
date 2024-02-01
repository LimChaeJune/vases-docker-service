module.exports = {
  env: {
    browser: true,
    node: true,
  },
  plugins: [
    '@typescript-eslint',
    'react-hooks',
    'jest',
    'prettier',
    'react',
    'prettier',
    'import',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    'react/prop-types': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    // eslint rule 입력
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      { 'ts-ignore': 'allow-with-description' },
    ],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'sibling', 'parent', 'index'],
      },
    ],
    'padding-line-between-statements': 'off',
    '@typescript-eslint/padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['interface', 'type'],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['interface', 'type'],
      },
      { blankLine: 'always', prev: '*', next: 'block' },
      { blankLine: 'always', prev: 'block', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'never', prev: 'import', next: 'import' },
      { blankLine: 'always', prev: 'export', next: '*' },
      { blankLine: 'always', prev: '*', next: 'export' },
      { blankLine: 'always', prev: '*', next: 'return' },
      {
        blankLine: 'always',
        prev: ['multiline-const', 'multiline-let'],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['multiline-const', 'multiline-let'],
      },
      {
        blankLine: 'always',
        prev: 'multiline-expression',
        next: ['const', 'let', 'var'],
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: 'multiline-expression',
      },
    ],
  },
};
