import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import browserGlobals from 'globals';
import vueParser from 'vue-eslint-parser';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['dist/', 'node_modules/', '.vite/', '.vscode/', '.idea/', '**/*.d.ts'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: { ecmaVersion: 2021, sourceType: 'module' },
      globals: browserGlobals.browser,
    },
    plugins: { '@typescript-eslint': typescriptEslintPlugin },
    rules: {
      ...js.configs.recommended.rules,
      ...(typescriptEslintPlugin.configs.recommended?.rules || {}),
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: typescriptParser, ecmaVersion: 2021, sourceType: 'module' },
      globals: browserGlobals.browser,
    },
    plugins: { vue: pluginVue, prettier: pluginPrettier },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-self-closing': 'off',
      'prettier/prettier': 'error',
    },
  },
];
