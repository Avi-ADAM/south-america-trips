<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import Footer from '$lib/components/Footer.svelte';
	import TripNav from '$lib/components/TripNav.svelte';
	import { u } from '$lib/paths';

	let { children } = $props();

	const path = $derived(page.url.pathname.replace(u(''), '') || '/');
	const withNav = $derived(path !== '/' && !path.startsWith('/credits'));
</script>

{#if withNav}<TripNav />{/if}
{@render children()}
<Footer />
