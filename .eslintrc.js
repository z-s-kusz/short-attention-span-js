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
    'arrow-body-style': [0], // fuck this rule, needs to play better with column limits
    'no-else-return': [0],
    'import/newline-after-import': [0],
    'no-console': [0],
    'lines-between-class-members': [0],
    'padded-blocks': [0],
    '@typescript-eslint/no-explicit-any': [0],
    'class-methods-use-this': [1],
    'func-names': [0],
    'global-require': [0],
    'consistent-return': [0], // typescript handles this for us
    'spaced-comment': [0], // fuck this rule, needs better exception options
  },
};
