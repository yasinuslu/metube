const a11y = require('eslint-plugin-jsx-a11y').rules;

const jsExtensions = ['.js', '.jsx'];
const tsExtensions = ['.ts', '.tsx'];
const allExtensions = jsExtensions.concat(tsExtensions);

const disableA11yRules = () => {
  return Object.keys(a11y).reduce((acc, key) => {
    acc[`jsx-a11y/${key}`] = 'off';
    return acc;
  }, {});
};

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.tsx', '**/__tests__/*.tsx'] },
    ],
    'import/prefer-default-export': 'off', // typescript community doesn't like default exports
    'react/prop-types': 'off', // we pretty much guarantee this with typescript
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'no-unused-expressions': 'off',
    'max-len': ['error', { code: 100 }],
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'max-classes-per-file': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    'react/no-unescaped-entities': 'off',
    ...disableA11yRules(),
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: allExtensions,
      },
    },
  },
  overrides: [
    {
      files: ['**/models/**/*'],
      rules: {
        'no-param-reassign': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
    {
      files: ['**/pages/**/*'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};
