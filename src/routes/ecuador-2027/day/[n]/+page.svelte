<script lang="ts">
	import { goto } from '$app/navigation';
	import { reveal } from '$lib/actions/reveal';
	import { days, regions, trip } from '$lib/data/ecuador';
	import { longDate } from '$lib/format';
	import { u } from '$lib/paths';

	let { data } = $props();
	const day = $derived(data.day);
	const region = $derived(regions[data.day.region]);

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
		<div class="bg" style="background-image:url('{u(day.image)}')"></div>
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
			{#if day.pending}
				<div class="pending reveal" use:reveal>
					<strong>התכנית המפורטת של לודג׳ La Selva בדרך אלינו</strong>
					<p>ברגע שנקבל אותה מהלודג׳ — היא תופיע כאן.</p>
				</div>
			{/if}
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
				<div class="card reveal" use:reveal>
					<span class="kicker">לינה הלילה</span>
					<h3 class="hotel-name">{day.hotel.name}</h3>
					{#if day.hotel.text}<p>{day.hotel.text}</p>{/if}
				</div>
			{/if}
			{#if day.gallery?.length}
				<div class="gallery">
					{#each day.gallery as g, i}
						<img class="reveal-zoom" use:reveal style="--delay:{i * 120}ms" src={u(g)} alt="" loading="lazy" />
					{/each}
				</div>
			{/if}
		</aside>
	</section>

	<nav class="wrap pager" aria-label="ניווט בין ימים">
		{#if data.prev}
			<a class="pg prev" href={u(`/ecuador-2027/day/${data.prev.n}/`)}>
				<span>→ יום {data.prev.n}</span>
				<strong>{data.prev.title}</strong>
			</a>
		{:else}
			<a class="pg prev" href={u('/ecuador-2027/')}><span>→ חזרה</span><strong>למצגת</strong></a>
		{/if}
		{#if data.next}
			<a class="pg next" href={u(`/ecuador-2027/day/${data.next.n}/`)}>
				<span>יום {data.next.n} ←</span>
				<strong>{data.next.title}</strong>
			</a>
		{:else}
			<a class="pg next" href={u('/ecuador-2027/register/')}><span>סוף המסע ←</span><strong>רישום למסע</strong></a>
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
		background: linear-gradient(var(--accent), var(--accent-2));
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
	.pending {
		padding: 20px 22px;
		border-radius: 18px;
		border: 1px dashed rgba(74, 222, 128, 0.6);
		background: rgba(74, 222, 128, 0.08);
		margin-bottom: 14px;
	}
	.pending p {
		margin: 4px 0 0;
		color: var(--muted);
	}
	aside {
		display: grid;
		gap: 18px;
		align-content: start;
	}
	.card {
		padding: 26px;
		border-radius: var(--radius);
		background: var(--surface);
		border: 1px solid var(--line);
	}
	.hotel-name {
		font-size: 1.5rem;
		margin-top: 8px;
		direction: ltr;
		text-align: right;
	}
	.card p {
		color: var(--muted);
		margin: 0;
	}
	.gallery {
		display: grid;
		gap: 12px;
	}
	.gallery img {
		width: 100%;
		border-radius: 18px;
		aspect-ratio: 16/9;
		object-fit: cover;
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
		background: var(--surface);
		border: 1px solid var(--line);
		text-decoration: none;
		transition:
			background 0.3s,
			transform 0.3s var(--ease);
	}
	.pg:hover {
		background: var(--surface-2);
		transform: translateY(-3px);
	}
	.pg span {
		display: block;
		color: var(--accent);
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
	@media (max-width: 520px) {
		.pager {
			grid-template-columns: 1fr;
		}
		.next {
			text-align: right;
		}
	}
</style>
