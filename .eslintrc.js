module.exports = {
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
      'modules': true,
      'experimentalObjectRestSpread': true
    }
  },
  'plugins': [
    'react'
  ],
  'extends': ['plugin:react/recommended'],
  'rules': {
    'comma-dangle': 0,
    'react/jsx-uses-vars': 1,
    'no-unused-vars': 'warn',
    // 'no-console': 1,
    'no-unexpected-multiline': 'warn',
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],

    // override configuration set by extending "eslint:recommended"
    'no-empty': 'warn',
    'no-cond-assign': ['error', 'always'],

    // disable rules from base configurations
    'for-direction': 'off',
  },
  'settings': {
    'react': {
      'pragma': 'React',
      'version': '15.6.1'
    }
  }
};