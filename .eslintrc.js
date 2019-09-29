module.exports = {
  plugins: ['import'],
  extends: ['airbnb', 'prettier', 'plugin:import/errors', 'plugin:import/warnings'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  root: true,
  rules: {
    'arrow-parens': [
      'error',
      'as-needed',
      {
        requireForBlockBody: false,
      },
    ],
    'prefer-destructuring': [
      'error',
      {
        object: true,
        array: false,
      },
    ],
  },
  settings: {
    'import/parser': 'babel-eslint',
    'import/resolver': {
      node: {
        paths: ['src/'],
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
