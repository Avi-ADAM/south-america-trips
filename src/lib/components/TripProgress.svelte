<script lang="ts">
	import { days, regions } from '$lib/data/ecuador';

	/** Progress through the days of the presentation: a rail of dots on desktop, story-style segments on phones. */
	let current = $state(0);
	let visible = $state(false);

	const day = $derived(days[Math.max(0, current - 1)]);

	function measure() {
		const mid = window.innerHeight * 0.5;
		let n = 0;
		for (const d of days) {
			const el = document.getElementById(`day-${d.n}`);
			if (el && el.getBoundingClientRect().top <= mid) n = d.n;
		}
		const first = document.getElementById(`day-1`)?.getBoundingClientRect();
		const last = document.getElementById(`day-${days.length}`)?.getBoundingClientRect();
		visible = !!first && !!last && first.top < window.innerHeight * 0.7 && last.bottom > window.innerHeight * 0.3;
		current = n;
	}

	let raf = 0;
	function onScroll() {
		cancelAnimationFrame(raf);
		raf = requestAnimationFrame(measure);
	}
	$effect(() => {
		measure();
		return () => cancelAnimationFrame(raf);
	});

	function go(n: number) {
		document.getElementById(`day-${n}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<svelte:window onscroll={onScroll} onresize={onScroll} />

<nav class="rail" class:show={visible} aria-label="התקדמות במסע">
	{#each days as d, i}
		<button
			class:done={d.n < current}
			class:on={d.n === current}
			class:gap={i > 0 && days[i - 1].region !== d.region}
			style="--c:{regions[d.region].color}"
			onclick={() => go(d.n)}
			title="יום {d.n}: {d.title}"
			aria-label="יום {d.n}: {d.title}"
			aria-current={d.n === current ? 'step' : undefined}
		>
			{#if d.n === current}
				<span class="tip">יום {d.n} <em>{regions[d.region].short}</em></span>
			{/if}
		</button>
	{/each}
</nav>

<div class="bars" class:show={visible} aria-hidden="true">
	<div class="segs">
		{#each days as d}
			<i class:done={d.n < current} class:on={d.n === current} style="--c:{regions[d.region].color}"></i>
		{/each}
	</div>
	{#if current}
		{#key current}
			<span class="count" style="--c:{regions[day.region].color}">יום {current}/{days.length} · {regions[day.region].short}</span>
		{/key}
	{/if}
</div>

<style>
	.rail {
		position: fixed;
		z-index: 40;
		left: 22px;
		top: 50%;
		display: grid;
		gap: 7px;
		translate: -60px -50%;
		opacity: 0;
		transition:
			translate 0.6s var(--ease),
			opacity 0.4s;
	}
	.rail.show {
		translate: 0 -50%;
		opacity: 1;
	}
	.rail button {
		position: relative;
		width: 10px;
		height: 10px;
		padding: 0;
		border: 1.5px solid color-mix(in srgb, var(--c) 70%, transparent);
		border-radius: 999px;
		background: transparent;
		cursor: pointer;
		transition:
			height 0.5s var(--ease),
			background 0.3s,
			transform 0.3s var(--ease);
	}
	.rail button:hover {
		transform: scale(1.35);
	}
	.rail button.gap {
		margin-top: 9px;
	}
	.rail button.done {
		background: color-mix(in srgb, var(--c) 75%, transparent);
	}
	.rail button.on {
		height: 30px;
		background: var(--c);
		box-shadow: 0 0 14px var(--c);
	}
	.tip {
		position: absolute;
		left: 20px;
		top: 50%;
		translate: 0 -50%;
		white-space: nowrap;
		padding: 4px 12px;
		border-radius: 999px;
		background: rgba(6, 22, 27, 0.85);
		border: 1px solid color-mix(in srgb, var(--c) 60%, transparent);
		color: var(--text);
		font: 700 0.85rem var(--display);
		animation: tipIn 0.5s var(--ease);
	}
	.tip em {
		font-style: normal;
		font-weight: 500;
		color: var(--c);
		margin-inline-start: 4px;
	}
	@keyframes tipIn {
		from {
			opacity: 0;
			translate: -10px -50%;
		}
	}

	.bars {
		display: none;
	}
	@media (max-width: 900px) {
		.rail {
			display: none;
		}
		.bars {
			display: block;
			position: fixed;
			z-index: 49;
			top: var(--nav-top);
			inset-inline: 0;
			padding: 6px 10px 0;
			pointer-events: none;
			opacity: 0;
			translate: 0 -10px;
			transition:
				opacity 0.4s,
				translate 0.5s var(--ease);
		}
		.bars.show {
			opacity: 1;
			translate: 0 0;
		}
		.segs {
			display: flex;
			gap: 3px;
		}
		.segs i {
			flex: 1;
			height: 3px;
			border-radius: 3px;
			background: rgba(255, 255, 255, 0.22);
			overflow: hidden;
			position: relative;
		}
		.segs i::after {
			content: '';
			position: absolute;
			inset: 0;
			background: var(--c);
			transform: scaleX(0);
			transform-origin: right;
			transition: transform 0.6s var(--ease);
		}
		.segs i.done::after,
		.segs i.on::after {
			transform: scaleX(1);
		}
		.segs i.on {
			box-shadow: 0 0 8px var(--c);
		}
		.count {
			display: inline-block;
			margin-top: 7px;
			padding: 2px 10px;
			border-radius: 999px;
			font: 700 0.75rem var(--display);
			background: rgba(6, 22, 27, 0.7);
			border: 1px solid color-mix(in srgb, var(--c) 55%, transparent);
			backdrop-filter: blur(8px);
			animation: pop 0.45s var(--ease);
		}
		@keyframes pop {
			from {
				opacity: 0;
				transform: translateY(-6px) scale(0.9);
			}
		}
	}
</style>
