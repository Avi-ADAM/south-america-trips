<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import Lightbox from '$lib/components/Lightbox.svelte';
	import Media from '$lib/components/Media.svelte';
	import { u } from '$lib/paths';

	let { data } = $props();
	const d = $derived(data.dest);
	let zoomed = $state<number | null>(null);
</script>

<svelte:head>
	<title>{d.name} · גלריה</title>
</svelte:head>

{#key d.slug}
	<main class="wrap">
		<header class="head">
			<a class="back" href={u('/gallery/')}>→ כל היעדים</a>
			<h1>{d.name}</h1>
			{#if d.note}<p>{d.note}</p>{/if}
		</header>

		<div class="masonry">
			{#each d.items as src, i}
				<button class="shot reveal-zoom" use:reveal style="--delay:{(i % 3) * 90}ms" onclick={() => (zoomed = i)} aria-label="הגדלה">
					<Media {src} />
				</button>
			{/each}
		</div>

		<a class="next panel" href={u(`/gallery/${data.next.slug}/`)}>
			<span>הגלריה הבאה ←</span>
			<strong>{data.next.name}</strong>
		</a>
	</main>
	<Lightbox items={d.items} bind:index={zoomed} />
{/key}

<style>
	main {
		padding: 120px 0 90px;
	}
	.head {
		text-align: center;
		margin-bottom: 30px;
	}
	.back {
		color: var(--accent);
		text-decoration: none;
		font-weight: 700;
	}
	h1 {
		font-size: clamp(2.6rem, 8vw, 5rem);
		font-weight: 900;
		margin: 10px 0 4px;
	}
	.head p {
		color: var(--muted);
	}
	.masonry {
		columns: 3;
		column-gap: 12px;
	}
	.shot {
		display: block;
		width: 100%;
		margin: 0 0 12px;
		padding: 0;
		border: 0;
		background: none;
		border-radius: 18px;
		overflow: hidden;
		break-inside: avoid;
		cursor: zoom-in;
		box-shadow: 0 18px 40px -24px rgba(0, 0, 0, 0.9);
	}
	.shot :global(img),
	.shot :global(video) {
		display: block;
		width: 100%;
		height: auto;
		transition:
			transform 1.2s var(--ease),
			filter 0.4s;
	}
	.shot:hover :global(img),
	.shot:hover :global(video) {
		transform: scale(1.06);
		filter: saturate(1.2);
	}
	.next {
		display: block;
		max-width: 420px;
		margin: 40px auto 0;
		padding: 22px 26px;
		border-radius: var(--radius);
		text-align: center;
		text-decoration: none;
		transition: transform 0.4s var(--ease);
	}
	.next:hover {
		transform: translateY(-4px);
	}
	.next span {
		display: block;
		color: var(--panel-muted);
		font-weight: 700;
	}
	.next strong {
		font: 800 1.5rem var(--display);
	}
	@media (max-width: 900px) {
		.masonry {
			columns: 2;
			column-gap: 8px;
		}
		.shot {
			margin-bottom: 8px;
			border-radius: 12px;
		}
		main {
			padding-top: 84px;
		}
	}
</style>
