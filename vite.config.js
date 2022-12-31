import { sveltekit } from '@sveltejs/kit/vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$components: resolve(__dirname, './src/lib/components'),
			$utils: resolve(__dirname, './src/lib/utils'),
		},
	},
	envPrefix: ['VITE_', 'SVELTEKIT_STARTER_'],
};

export default config;
