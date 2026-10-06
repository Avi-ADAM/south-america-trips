<script lang="ts">
	import { u } from '$lib/paths';
	import Media from './Media.svelte';

	let {
		images,
		phoneImages,
		interval = 6000,
		video
	}: {
		/** A photo, or a photo with its own focus point (CSS background-position) on wide screens. */
		images: (string | { src: string; pos?: string })[];
		/** One per image: what that slide shows on phones, where a wide photo is cut to a narrow sliver.
		 *  `framed` shows the whole photo in a card above the text, over a blurred copy of itself. */
		phoneImages?: { src: string; pos?: string; framed?: boolean }[];
		interval?: number;
		/** Vertical clip of the first photo, played instead of it on phones. */
		video?: string;
	} = $props();

	let current = $state(0);
	let phone = $state(false);

	$effect(() => {
		const m = matchMedia('(max-width: 760px)');
		phone = m.matches;
		const on = (e: MediaQueryListEvent) => (phone = e.matches);
		m.addEventListener('change', on);
		return () => m.removeEventListener('change', on);
	});

	// The clip runs 10 seconds, so its slide stays up that long.
	$effect(() => {
		const wait = current === 0 && phone && video ? 10000 : interval;
		const id = setTimeout(() => (current = (current + 1) % images.length), wait);
		return () => clearTimeout(id);
	});
</script>

<div class="slides" aria-hidden="true">
	{#each images as img, i}
		{@const src = typeof img === 'string' ? img : img.src}
		{@const pos = typeof img === 'string' ? undefined : img.pos}
		{@const p = phoneImages?.[i]}
		<div
			class="slide"
			class:on={i === current}
			class:framed={p?.framed}
			style="--img:url('{u(src)}');{pos ? `--pos:${pos};` : ''}{p ? `--phone-img:url('${u(p.src)}');--phone-pos:${p.pos ?? 'center'}` : ''}"
		>
			{#if i === 0 && phone && video}<Media src={video} class="clip" eager />{/if}
			{#if phone && p?.framed}<img class="frame" src={u(p.src)} alt="" />{/if}
		</div>
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
		background-image: var(--img);
		background-size: cover;
		background-position: var(--pos, center);
		opacity: 0;
		transform: scale(1.12);
		transition:
			opacity 1.4s ease,
			transform 8s cubic-bezier(0.2, 0.6, 0.3, 1);
	}
	/* Each photo arrives with its own move: zoom out, glide from one side, glide from the other. */
	.slide:nth-child(3n + 2) {
		transform: translateX(7%) scale(1.18);
	}
	.slide:nth-child(3n) {
		transform: translateX(-7%) scale(1.18) rotate(-1.5deg);
	}
	.slide :global(.clip) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.slide.on {
		opacity: 1;
		transform: none;
	}
	/* Only the image that applies is downloaded. */
	@media (max-width: 760px) {
		.slide {
			background-image: var(--phone-img, var(--img));
			background-position: var(--phone-pos, center);
		}
		/* The whole photo, sharp, in a card under the header; a blurred copy fills the screen behind it. */
		.slide.framed {
			inset: 0;
			background: none;
		}
		.slide.framed::before {
			content: '';
			position: absolute;
			inset: -40px;
			background: var(--phone-img) center / cover;
			filter: blur(26px) brightness(0.75);
		}
		.frame {
			position: absolute;
			top: calc(var(--nav-top) + 14px);
			left: 12px;
			width: calc(100% - 24px);
			height: auto;
			border-radius: 18px;
			box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.9);
		}
	}
</style>
