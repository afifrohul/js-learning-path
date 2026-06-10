import globals from 'globals';
import { fixupPluginRules } from '@eslint/compat';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginHooks from 'eslint-plugin-react-hooks';
import daStyle from 'eslint-config-dicodingacademy';
import prettier from 'eslint-config-prettier';
import pluginCypress from 'eslint-plugin-cypress/flat';

export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginCypress.configs.recommended,
  {
    plugins: {
      'react-hooks': fixupPluginRules(pluginHooks),
    },
    rules: pluginHooks.configs.recommended.rules,
  },
  {
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  daStyle,
  prettier,
];
