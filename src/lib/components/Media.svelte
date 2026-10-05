<script lang="ts">
	import { isVideo, posterOf } from '$lib/data/ecuador';
	import { u } from '$lib/paths';

	let {
		src,
		alt = '',
		poster,
		class: cls = '',
		eager = false
	}: { src: string; alt?: string; poster?: string; class?: string; eager?: boolean } = $props();

	/** Plays only while on screen, and never for viewers who asked for reduced motion. */
	function inViewPlay(video: HTMLVideoElement) {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const io = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) video.play().catch(() => {});
				else video.pause();
			},
			{ threshold: 0.1 }
		);
		io.observe(video);
		return { destroy: () => io.disconnect() };
	}
</script>

{#if isVideo(src)}
	<video
		class={cls}
		src={u(src)}
		poster={u(poster ?? posterOf(src))}
		muted
		loop
		playsinline
		preload={eager ? 'auto' : 'none'}
		aria-label={alt || undefined}
		use:inViewPlay
	></video>
{:else}
	<img class={cls} src={u(src)} {alt} loading={eager ? 'eager' : 'lazy'} />
{/if}
