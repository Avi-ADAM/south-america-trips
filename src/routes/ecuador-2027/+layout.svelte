<script lang="ts">
	import TripNav from '$lib/components/TripNav.svelte';

	let { children } = $props();
</script>

<TripNav />
<main>
	{@render children()}
</main>
