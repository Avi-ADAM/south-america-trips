<script lang="ts">
	import ContactBlock from '$lib/components/ContactBlock.svelte';
	import { site } from '$lib/config';
	import { u } from '$lib/paths';
</script>

<svelte:head>
	<title>צור קשר | {site.brand}</title>
</svelte:head>

<main>
	<section class="top" style="background-image:url('{u('/img/amazon/canoe-binoculars.jpg')}')">
		<div class="shade"></div>
	</section>
	<section class="wrap block">
		<ContactBlock />
	</section>
</main>

<style>
	.top {
		position: relative;
		height: 42svh;
		background-size: cover;
		background-position: center 40%;
	}
	.shade {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, var(--bg) 3%, rgba(6, 22, 27, 0.3));
	}
	.block {
		margin-top: -90px;
		position: relative;
		padding-bottom: 100px;
	}
</style>
