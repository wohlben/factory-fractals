import { mdsvex } from 'mdsvex';
//import adapter from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex()],

	kit: {
		paths: {
			base: '/factory-fractals'
		},
		adapter: adapter({
			fallback: 'index.html' // may differ from host to host
		})
		//adapter: adapter()
	},

	extensions: ['.svelte', '.svx']
};

export default config;
