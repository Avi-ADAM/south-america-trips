<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import ContactBlock from '$lib/components/ContactBlock.svelte';
	import { site } from '$lib/config';
	import { u } from '$lib/paths';
</script>

<Meta title="צור קשר | {site.brand}" image="/img/amazon/canoe-binoculars.jpg" />

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
