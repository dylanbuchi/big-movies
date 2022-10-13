module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],

  parser: '@typescript-eslint/parser',

  plugins: ['react', '@typescript-eslint'],

  rules: {
    'no-fallthrough': 0,
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/ban-ts-comment': 0,
  },
};
