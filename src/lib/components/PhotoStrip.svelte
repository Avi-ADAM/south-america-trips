<script lang="ts">
	import Media from './Media.svelte';
	import { isVideo } from '$lib/data/ecuador';

	let {
		items,
		label,
		reverse = false,
		seconds = 70
	}: { items: { src: string; label: string }[]; label: string; reverse?: boolean; seconds?: number } = $props();
</script>

<!-- Endless strip: the list is rendered twice and slid by half its width, so the loop is seamless. -->
<div class="strip" class:reverse aria-label={label} style="--s:{seconds}s">
	<div class="track">
		{#each [0, 1] as copy}
			{#each items as it}
				<figure aria-hidden={copy === 1 ? 'true' : undefined}>
					<Media src={it.src} alt={it.label} eager={!isVideo(it.src)} />
					<figcaption>{it.label}</figcaption>
				</figure>
			{/each}
		{/each}
	</div>
</div>

<style>
	.strip {
		/* LTR so the track overflows rightwards and the -50% loop lines up. */
		direction: ltr;
		overflow: hidden;
		padding: 26px 0 6px;
		mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
	}
	.track {
		display: flex;
		gap: 16px;
		width: max-content;
		animation: drift var(--s) linear infinite;
	}
	.reverse .track {
		animation-direction: reverse;
	}
	.strip:hover .track {
		animation-play-state: paused;
	}
	@keyframes drift {
		to {
			transform: translateX(calc(-50% - 8px));
		}
	}
	figure {
		position: relative;
		margin: 0;
		width: 260px;
		aspect-ratio: 4/3;
		border-radius: 20px;
		overflow: hidden;
		flex: none;
		box-shadow: 0 20px 40px -24px rgba(0, 0, 0, 0.9);
	}
	figure :global(img),
	figure :global(video) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition:
			transform 1.2s var(--ease),
			filter 0.4s;
	}
	figure:hover :global(img),
	figure:hover :global(video) {
		transform: scale(1.1);
		filter: saturate(1.25);
	}
	figcaption {
		position: absolute;
		inset: auto 0 0;
		padding: 26px 14px 10px;
		direction: rtl;
		font-weight: 700;
		background: linear-gradient(to top, rgba(6, 22, 27, 0.85), transparent);
	}
	@media (max-width: 520px) {
		figure {
			width: 200px;
		}
	}
</style>
