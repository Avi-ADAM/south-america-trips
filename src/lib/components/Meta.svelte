<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/config';
	import { u } from '$lib/paths';

	interface Props {
		title: string;
		description?: string;
		/** תמונה לתצוגה בשיתוף (וואטסאפ, פייסבוק). בלי — הלוגו */
		image?: string;
		noindex?: boolean;
	}
	let { title, description = site.tagline, image, noindex = false }: Props = $props();

	// Link previews need absolute URLs and a small landscape image: a page photo is shared as the
	// 1200×630 copy that scripts/og-images.py makes in /img/og (run it after `npm run build`).
	const ogImage = $derived(image ? `/img/og/${image.slice(1).replaceAll('/', '__')}` : '/img/brand/og.jpg');
	// u() is relative to the page while prerendering, so resolve it against the page's own address.
	const abs = (path: string) => new URL(u(path), page.url.href).href;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if noindex}<meta name="robots" content="noindex" />{/if}
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="he_IL" />
	<meta property="og:site_name" content={site.brand} />
	<meta property="og:url" content={page.url.origin + page.url.pathname} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={abs(ogImage)} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
