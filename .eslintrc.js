module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': [2, { 'props': false }],
    'no-plusplus': 'off',
    'arrow-body-style': [2, 'always'],
    'no-else-return': [0],
    'import/newline-after-import': [0],
    'no-console': [0],
  },
};
