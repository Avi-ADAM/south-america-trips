<script lang="ts">
	import { isVideo, posterOf } from '$lib/data/ecuador';
	import { u } from '$lib/paths';

	/** `index` is the open item, or null when closed. */
	let { items, index = $bindable() }: { items: string[]; index: number | null } = $props();

	const close = () => (index = null);
	const step = (d: number) => {
		if (index !== null) index = (index + d + items.length) % items.length;
	};

	function onKey(e: KeyboardEvent) {
		if (index === null) return;
		// Stop the day page's own arrow-key navigation while the lightbox is open.
		e.stopImmediatePropagation();
		if (e.key === 'Escape') close();
		// RTL: the left arrow moves forward.
		if (e.key === 'ArrowLeft') step(1);
		if (e.key === 'ArrowRight') step(-1);
	}
</script>

<svelte:window onkeydowncapture={onKey} />

{#if index !== null}
	{@const src = items[index]}
	<div class="lb" role="dialog" aria-modal="true" aria-label="תמונה מוגדלת">
		<button class="backdrop" onclick={close} aria-label="סגירה"></button>
		{#key src}
			{#if isVideo(src)}
				<video class="media" src={u(src)} poster={u(posterOf(src))} autoplay muted loop playsinline></video>
			{:else}
				<img class="media" src={u(src)} alt="" />
			{/if}
		{/key}
		<button class="x" onclick={close} aria-label="סגירה">✕</button>
		{#if items.length > 1}
			<button class="nav prev" onclick={() => step(-1)} aria-label="הקודמת">›</button>
			<button class="nav next" onclick={() => step(1)} aria-label="הבאה">‹</button>
			<span class="count">{index + 1} / {items.length}</span>
		{/if}
	</div>
{/if}

<style>
	.lb {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: grid;
		place-items: center;
		animation: fade 0.3s ease;
	}
	.backdrop {
		position: absolute;
		inset: 0;
		border: 0;
		background: rgba(3, 12, 15, 0.92);
		backdrop-filter: blur(6px);
		cursor: zoom-out;
	}
	.media {
		position: relative;
		max-width: min(92vw, 1400px);
		max-height: 86svh;
		border-radius: 16px;
		box-shadow: 0 30px 80px -20px #000;
		animation: pop 0.45s var(--ease);
	}
	button:not(.backdrop) {
		position: absolute;
		border: 1px solid var(--line);
		background: rgba(6, 22, 27, 0.7);
		color: var(--text);
		border-radius: 50%;
		width: 48px;
		height: 48px;
		font-size: 1.5rem;
		cursor: pointer;
		transition: background 0.2s;
	}
	button:not(.backdrop):hover {
		background: rgba(255, 255, 255, 0.16);
	}
	.x {
		top: 18px;
		inset-inline-start: 18px;
		font-size: 1.1rem;
	}
	.nav {
		top: 50%;
		translate: 0 -50%;
		font-size: 2rem !important;
		line-height: 1;
	}
	.prev {
		inset-inline-start: 18px;
	}
	.next {
		inset-inline-end: 18px;
	}
	.count {
		position: absolute;
		bottom: 18px;
		direction: ltr;
		font-size: 0.9rem;
		color: var(--muted);
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
	}
	@keyframes pop {
		from {
			opacity: 0;
			transform: scale(0.94);
		}
	}
</style>
