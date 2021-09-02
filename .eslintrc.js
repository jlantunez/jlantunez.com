module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'space-before-function-paren': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
  },
};
