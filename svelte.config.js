import adapterStatic from '@sveltejs/adapter-static';
import adapterVercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Vercel sets VERCEL=1 on its builds; everywhere else (GitHub Pages, local) stays static.
const adapter = process.env.VERCEL ? adapterVercel() : adapterStatic({ fallback: '404.html' });

// The address link previews (WhatsApp) point to — they need absolute URLs.
const origin = process.env.VERCEL_PROJECT_PRODUCTION_URL
	? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
	: 'https://avi-adam.github.io';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter,
		paths: { base: process.env.BASE_PATH ?? '' },
		prerender: { handleHttpError: 'warn', origin }
	}
};

export default config;
