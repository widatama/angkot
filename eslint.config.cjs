const fs = require('fs');
const path = require('path');

const { includeIgnoreFile } = require('@eslint/compat');
const eslintJS = require('@eslint/js');
const stylistic = require('@stylistic/eslint-plugin');
const eslintReact = require('eslint-plugin-react');
const globals = require('globals');
const eslintTS = require('typescript-eslint');

const gitignoreFilePath = path.resolve(__dirname, '.gitignore');

// styling related rules, so code formatter is not needed
const styleConfig = {
  jsx: false, semi: true, arrowParens: true, braceStyle: '1tbs',
};
const eslintStyleJS = stylistic.configs.customize({ ...styleConfig, ts: false });
const eslintStyleTS = stylistic.configs.customize(styleConfig);

const pluginsJS = { ...eslintStyleJS.plugins };
const pluginsTS = {
  '@typescript-eslint': eslintTS.plugin,
  ...eslintStyleJS.plugins,
  ...eslintStyleTS.plugins,
};
const rulesJS = { ...eslintJS.configs.recommended.rules, ...eslintStyleJS.rules };
const rulesTS = {
  ...eslintJS.configs.recommended.rules,
  ...eslintStyleJS.rules,
  ...eslintTS.configs.recommended[1].rules,
  ...eslintTS.configs.recommended[2].rules,
  ...eslintStyleTS.rules,
};

module.exports = [
  {
    // for config files
    files: ['**/*.config.{ts|cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    plugins: pluginsJS,
    rules: rulesJS,
  },
  {
    // for typescript files
    files: ['**/*.ts', '**/*.cts', '**/*.mts'],
    ignores: ['**/*.config.*'],
    languageOptions: {
      ecmaVersion: 'latest',
      parser: eslintTS.parser,
      parserOptions: {
        projectService: true,
      },
      sourceType: 'module',
    },
    plugins: pluginsTS,
    rules: rulesTS,
  },
  {
    // for react files
    ...eslintReact.configs.flat.recommended,
    files: ['**/*.tsx'],
    languageOptions: {
      ...eslintReact.configs.flat.recommended.languageOptions,
      ecmaVersion: 'latest',
      parser: eslintTS.parser,
      parserOptions: {
        ...eslintReact.configs.flat.recommended.languageOptions.parserOptions,
        projectService: true,
      },
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // ignore everything inside .gitignore
  fs.existsSync(gitignoreFilePath) ? includeIgnoreFile(gitignoreFilePath) : {},
];
