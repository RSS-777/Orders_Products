import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

export default [
  {
    ignores: ['dist/', 'node_modules/', '.vite/', '.vscode/', '.idea/', '**/*.d.ts']
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    rules: {
      ...js.configs.recommended.rules
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: typescriptParser
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...(typescriptEslintPlugin.configs.recommended?.rules || {}),
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off'
    }
  },
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-self-closing': 'off'
    }
  }
]
