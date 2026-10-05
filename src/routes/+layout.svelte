<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import Footer from '$lib/components/Footer.svelte';
	import TripNav from '$lib/components/TripNav.svelte';
	import { site } from '$lib/config';
	import { u } from '$lib/paths';

	let { children } = $props();

	const path = $derived(page.url.pathname.replace(u(''), '') || '/');
	const withNav = $derived(path !== '/' && !path.startsWith('/credits'));
</script>

<svelte:head>
	<meta property="og:site_name" content={site.brand} />
	<meta property="og:image" content="{site.url}/img/brand/og.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
</svelte:head>

{#if withNav}<TripNav />{/if}
{@render children()}
<Footer />
