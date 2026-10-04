<script lang="ts">
	import { u } from '$lib/paths';

	let { images, interval = 6000 }: { images: string[]; interval?: number } = $props();

	let current = $state(0);

	$effect(() => {
		const id = setInterval(() => (current = (current + 1) % images.length), interval);
		return () => clearInterval(id);
	});
</script>

<div class="slides" aria-hidden="true">
	{#each images as src, i}
		<div class="slide" class:on={i === current} style="background-image:url('{u(src)}')"></div>
	{/each}
</div>

<style>
	.slides {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}
	.slide {
		position: absolute;
		inset: -4%;
		background-size: cover;
		background-position: center;
		opacity: 0;
		transform: scale(1.12);
		transition:
			opacity 1.8s ease,
			transform 9s linear;
	}
	.slide.on {
		opacity: 1;
		transform: scale(1);
	}
</style>
