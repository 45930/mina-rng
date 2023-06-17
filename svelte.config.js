import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	build: {
		target: 'esnext'
	},
	csrf: {
		checkOrigin: false,
	},
	kit: {
		adapter: adapter(),
	}
};

export default config;
