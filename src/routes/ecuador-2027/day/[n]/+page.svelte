<script lang="ts">
	import { goto } from '$app/navigation';
	import { reveal } from '$lib/actions/reveal';
	import Lightbox from '$lib/components/Lightbox.svelte';
	import Media from '$lib/components/Media.svelte';
	import { days, regions, trip } from '$lib/data/ecuador';
	import { longDate } from '$lib/format';
	import { u } from '$lib/paths';

	let { data } = $props();
	const day = $derived(data.day);
	const region = $derived(regions[data.day.region]);

	let zoomed = $state<number | null>(null);
	let zoomedHotel = $state<number | null>(null);

	const icons = { tour: '✦', flight: '✈', transfer: '⇄', hotel: '⌂', free: '☀', optional: '＋' } as const;

	function onKey(e: KeyboardEvent) {
		if ((e.target as HTMLElement)?.closest('input, textarea')) return;
		// RTL: the left arrow moves forward.
		if (e.key === 'ArrowLeft' && data.next) goto(u(`/ecuador-2027/day/${data.next.n}/`), { noScroll: false });
		if (e.key === 'ArrowRight' && data.prev) goto(u(`/ecuador-2027/day/${data.prev.n}/`), { noScroll: false });
	}
</script>

<svelte:head>
	<title>יום {day.n}: {day.title} | {trip.title}</title>
	<meta name="description" content={day.summary} />
</svelte:head>

<svelte:window onkeydown={onKey} />

{#key day.n}
	<section class="hero" style="--c:{region.color}">
		<div class="bg" style="background-image:url('{u(day.image)}')">
			{#if day.video}<Media src={day.video} poster={day.image} class="bg-video" eager />{/if}
		</div>
		<div class="shade"></div>
		<div class="wrap content">
			<div class="big-n" aria-hidden="true">{String(day.n).padStart(2, '0')}</div>
			<span class="chip a" style="--d:.05s"><span class="dot" style="color:var(--c)"></span>{region.name}</span>
			<p class="date a" style="--d:.15s">יום {day.n} מתוך {days.length} · יום {day.weekday} · {longDate(day.date)}</p>
			<h1 class="a" style="--d:.25s">{day.title}</h1>
			<p class="where a" style="--d:.35s">📍 {day.where}</p>
			<p class="summary a" style="--d:.45s">{day.summary}</p>
		</div>
	</section>

	<nav class="dots wrap" aria-label="ימי הטיול">
		{#each days as d}
			<a
				href={u(`/ecuador-2027/day/${d.n}/`)}
				class:on={d.n === day.n}
				style="--c:{regions[d.region].color}"
				title="יום {d.n}: {d.title}"
				aria-current={d.n === day.n ? 'page' : undefined}>{d.n}</a
			>
		{/each}
	</nav>

	<section class="wrap body">
		<div class="timeline">
			<h2 class="reveal" use:reveal>מסלול היום</h2>
			<ol>
				{#each day.schedule as item, i}
					<li class="reveal kind-{item.kind ?? 'tour'}" use:reveal style="--delay:{i * 80}ms">
						<span class="icon" aria-hidden="true">{icons[item.kind ?? 'tour']}</span>
						<div>
							{#if item.time}<span class="time">{item.time}</span>{/if}
							<h3>{item.title}</h3>
							{#if item.text}<p>{item.text}</p>{/if}
						</div>
					</li>
				{/each}
			</ol>
		</div>

		<aside>
			{#if day.hotel}
				<div class="card panel reveal" class:has-img={day.hotel.image} use:reveal>
					{#if day.hotel.image}
						<button class="hotel-img" onclick={() => (zoomedHotel = 0)} aria-label="הגדלת תמונת המלון">
							<img src={u(day.hotel.image)} alt={day.hotel.name} loading="lazy" />
						</button>
					{/if}
					<span class="kicker">לינה הלילה</span>
					<h3 class="hotel-name">{day.hotel.name}</h3>
					{#if day.hotel.text}<p>{day.hotel.text}</p>{/if}
				</div>
			{/if}
			{#if day.gallery?.length}
				<div class="gallery" style="columns:{Math.min(2, day.gallery.length)}">
					{#each day.gallery as g, i}
						<button class="shot reveal-zoom" use:reveal style="--delay:{i * 120}ms" onclick={() => (zoomed = i)} aria-label="הגדלה">
							<Media src={g} />
						</button>
					{/each}
				</div>
			{/if}
		</aside>
	</section>

	<Lightbox items={day.gallery ?? []} bind:index={zoomed} />
	{#if day.hotel?.image}<Lightbox items={[day.hotel.image]} bind:index={zoomedHotel} />{/if}

	<nav class="wrap pager" aria-label="ניווט בין ימים">
		{#if data.prev}
			<a class="pg panel prev" href={u(`/ecuador-2027/day/${data.prev.n}/`)}>
				<span>→ יום {data.prev.n}</span>
				<strong>{data.prev.title}</strong>
			</a>
		{:else}
			<a class="pg panel prev" href={u('/ecuador-2027/')}><span>→ חזרה</span><strong>למצגת</strong></a>
		{/if}
		{#if data.next}
			<a class="pg panel next" href={u(`/ecuador-2027/day/${data.next.n}/`)}>
				<span>יום {data.next.n} ←</span>
				<strong>{data.next.title}</strong>
			</a>
		{:else}
			<a class="pg panel next" href={u('/ecuador-2027/register/')}><span>סוף המסע ←</span><strong>רישום למסע</strong></a>
		{/if}
	</nav>
{/key}

<style>
	.hero {
		position: relative;
		min-height: 78svh;
		display: grid;
		align-items: end;
		overflow: hidden;
		isolation: isolate;
	}
	.bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		animation: kb 16s ease-out forwards;
	}
	@keyframes kb {
		from {
			transform: scale(1.18) translateY(2%);
		}
		to {
			transform: scale(1.02);
		}
	}
	.bg :global(.bg-video) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.shade {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, var(--bg) 3%, rgba(6, 22, 27, 0.55) 45%, rgba(6, 22, 27, 0.35));
	}
	.content {
		position: relative;
		padding: 150px 0 60px;
	}
	.big-n {
		position: absolute;
		top: 90px;
		inset-inline-end: 0;
		font: 900 clamp(7rem, 22vw, 16rem) / 1 var(--display);
		color: transparent;
		-webkit-text-stroke: 2px color-mix(in srgb, var(--c) 70%, transparent);
		opacity: 0.6;
		animation: nIn 1.2s var(--ease) both;
	}
	@keyframes nIn {
		from {
			opacity: 0;
			transform: translateX(-60px);
		}
	}
	.a {
		opacity: 0;
		animation: up 0.9s var(--ease) forwards;
		animation-delay: var(--d);
	}
	@keyframes up {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
	.date {
		margin: 16px 0 6px;
		color: #dfe9e7;
	}
	h1 {
		font-size: clamp(2.3rem, 6vw, 4.6rem);
		font-weight: 900;
		max-width: 16ch;
	}
	.where {
		color: var(--c);
		font-weight: 700;
		font-size: 1.15rem;
	}
	.summary {
		max-width: 52ch;
		font-size: 1.15rem;
		color: #e3ecea;
	}

	.dots {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
		justify-content: center;
		padding: 14px 0 0;
	}
	.dots a {
		width: 34px;
		height: 34px;
		display: grid;
		place-items: center;
		border-radius: 50%;
		text-decoration: none;
		font-size: 0.82rem;
		color: var(--muted);
		border: 1px solid var(--line);
		transition: all 0.25s;
	}
	.dots a:hover {
		border-color: var(--c);
		color: var(--text);
	}
	.dots a.on {
		background: var(--c);
		border-color: var(--c);
		color: var(--bg);
		font-weight: 800;
		transform: scale(1.12);
	}

	.body {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 50px;
		padding: 60px 0;
	}
	.timeline h2 {
		font-size: 1.9rem;
	}
	ol {
		list-style: none;
		margin: 0;
		padding: 0;
		position: relative;
	}
	ol::before {
		content: '';
		position: absolute;
		top: 10px;
		bottom: 10px;
		inset-inline-start: 21px;
		width: 2px;
		background: linear-gradient(#f8e9bd, #dfba6a);
		opacity: 0.4;
	}
	li {
		display: grid;
		grid-template-columns: 44px 1fr;
		gap: 18px;
		padding: 14px 0;
	}
	.icon {
		position: relative;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		background: var(--bg-2);
		border: 1px solid var(--line);
		font-size: 1.1rem;
		color: var(--accent);
	}
	.kind-flight .icon {
		color: #fff;
	}
	.kind-free .icon {
		color: var(--accent);
		background: rgba(242, 184, 75, 0.12);
	}
	.kind-optional .icon {
		color: var(--accent-2);
	}
	.time {
		font: 700 0.95rem var(--display);
		color: var(--accent);
		letter-spacing: 0.05em;
	}
	li h3 {
		font-size: 1.25rem;
		margin: 2px 0 6px;
	}
	li p {
		color: #cddbd9;
		margin: 0;
	}
	.kind-optional h3::after {
		content: 'אופציונלי';
		font: 500 0.75rem var(--font);
		margin-inline-start: 10px;
		padding: 2px 10px;
		border-radius: 999px;
		border: 1px solid var(--accent-2);
		color: var(--accent-2);
		vertical-align: middle;
	}
	aside {
		display: grid;
		gap: 18px;
		align-content: start;
	}
	.card {
		padding: 26px;
		border-radius: var(--radius);
	}
	.hotel-name {
		font-size: 1.5rem;
		margin-top: 8px;
		direction: ltr;
		text-align: right;
	}
	.card p {
		color: var(--panel-muted);
		margin: 0;
	}
	.card.has-img {
		padding-top: 0;
		overflow: hidden;
	}
	.hotel-img {
		display: block;
		width: calc(100% + 52px);
		margin: 0 -26px 20px;
		padding: 0;
		border: 0;
		background: none;
		overflow: hidden;
		cursor: zoom-in;
	}
	.hotel-img img {
		width: 100%;
		aspect-ratio: 16/9;
		object-fit: cover;
		transition: transform 1.2s var(--ease);
	}
	.hotel-img:hover img {
		transform: scale(1.06);
	}
	/* Masonry: photos keep their own shape, so tall waterfalls stay tall. */
	.gallery {
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

	.pager {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 14px;
		padding-bottom: 90px;
	}
	.pg {
		padding: 22px 26px;
		border-radius: var(--radius);
		text-decoration: none;
		transition:
			filter 0.3s,
			transform 0.3s var(--ease);
	}
	.pg:hover {
		filter: brightness(1.12);
		transform: translateY(-3px);
	}
	.pg span {
		display: block;
		color: var(--panel-accent);
		font-weight: 700;
		font-size: 0.9rem;
	}
	.pg strong {
		font-family: var(--display);
		font-size: 1.15rem;
	}
	.next {
		text-align: left;
	}
	@media (max-width: 860px) {
		.body {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 760px) {
		h1 {
			font-size: 1.6rem;
		}
		.dots {
			gap: 4px;
		}
		.dots a {
			width: 25px;
			height: 25px;
			font-size: 0.7rem;
		}
	}
	@media (max-width: 520px) {
		.pager {
			grid-template-columns: 1fr;
		}
		.next {
			text-align: right;
		}
	}
</style>
