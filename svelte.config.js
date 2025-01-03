import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$src: './src',
			$components: './src/lib/components',
			$utils: './src/lib/utils.ts',
			$types: './src/lib/types.ts',
		},
	},
};
export default config;
