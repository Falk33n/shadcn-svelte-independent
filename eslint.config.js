import { configs as jsConfigs } from '@eslint/js';
import prettierRules from 'eslint-config-prettier';
import { configs as svelteConfigs } from 'eslint-plugin-svelte';
import { browser as globalsBrowser, node as globalsNode } from 'globals';
import { fileURLToPath } from 'node:url';
import {
	config as createConfig,
	configs as tsConfigs,
	parser as tsParser,
} from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

const config = createConfig(
	includeIgnoreFile(gitignorePath),
	jsConfigs.recommended,
	...tsConfigs.recommended,
	...svelteConfigs['flat/recommended'],
	prettierRules,
	...svelteConfigs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globalsBrowser,
				...globalsNode,
			},
		},
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: tsParser,
			},
		},
	},
);
export default config;
