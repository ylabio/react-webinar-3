module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    browser: true,
  },
  extends: ['plugin:prettier/recommended', 'plugin:react-hooks/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react-refresh/only-export-components': 'warn',
  },
  plugins: ['prettier', 'react-refresh'],
};
