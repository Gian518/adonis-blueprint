import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config([
	globalIgnores(['dist', '**/styled-system/**/*']),
	{
		plugins: {
			'@stylistic': stylistic,
		},
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		rules: {
			'no-unused-vars': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn',
			'react/react-in-jsx-scope': 'off',
			semi: ['error', 'never'],
			'@stylistic/indent': ['error', 'tab'],
		},
	},
])
