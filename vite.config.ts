import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		// Extra hosts the dev server answers to, comma separated (ALLOWED_HOSTS=example.com,foo.dev).
		// Needed when the dev server is reached through a proxy/preview domain.
		allowedHosts: process.env.ALLOWED_HOSTS ? process.env.ALLOWED_HOSTS.split(',') : [],
		// The build output is not part of the sources — no need to reload the page for it.
		watch: { ignored: ['**/build/**'] }
	}
});
