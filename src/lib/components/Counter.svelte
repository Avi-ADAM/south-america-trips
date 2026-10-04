<script lang="ts">
	let { value, duration = 1600 }: { value: number; duration?: number } = $props();

	let shown = $state(0);
	let el: HTMLSpanElement;

	$effect(() => {
		const io = new IntersectionObserver(([e]) => {
			if (!e.isIntersecting) return;
			io.disconnect();
			const t0 = performance.now();
			const tick = (t: number) => {
				const k = Math.min(1, (t - t0) / duration);
				shown = Math.round(value * (1 - Math.pow(1 - k, 3)));
				if (k < 1) requestAnimationFrame(tick);
			};
			requestAnimationFrame(tick);
		});
		io.observe(el);
		return () => io.disconnect();
	});
</script>

<span bind:this={el}>{shown}</span>
