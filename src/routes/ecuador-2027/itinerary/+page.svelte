<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import { days, included, notIncluded, regions, trip, worlds } from '$lib/data/ecuador';
	import { longDate } from '$lib/format';
	import { site } from '$lib/config';
	import { u } from '$lib/paths';
</script>

<Meta title="המסלול המלא | {trip.title}" description={trip.subtitle} image="/img/client/quilotoa-flowers.jpg" />

<div class="paper-bg">
	<article class="paper">
		<div class="toolbar">
			<button class="print" onclick={() => window.print()}>🖨 הדפסה / שמירה כ-PDF</button>
		</div>

		<header class="doc-head">
			<img class="logo" src={u('/img/brand/logo.jpg')} alt="AH Boutique Tours" width="600" height="586" />
			<p class="brand">{site.brand}</p>
			<h1>{trip.title}</h1>
			<p class="meta">{trip.dateLabel} · {trip.days} ימים / {trip.nights} לילות</p>
		</header>

		<section class="intro">
			<h2>על היעדים</h2>
			{#each worlds as w}
				<h3>{w.title}</h3>
				<p>{w.text}</p>
			{/each}
		</section>

		<section>
			<h2>תכנית הטיול יום אחר יום</h2>
			<table class="summary">
				<thead><tr><th>יום</th><th>תאריך</th><th>היכן</th><th>לינה</th></tr></thead>
				<tbody>
					{#each days as d}
						<tr>
							<td>{d.n}</td>
							<td>{d.weekday}, {longDate(d.date)}</td>
							<td>{d.where}</td>
							<td class="ltr">{d.hotel?.name ?? '—'}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</section>

		{#each days as d}
			<section class="day">
				<div class="day-head">
					<span class="n" style="background:{regions[d.region].color}">{d.n}</span>
					<div>
						<p class="date">יום {d.weekday}, {longDate(d.date)} · {d.where}</p>
						<h3>{d.title}</h3>
					</div>
				</div>
				<div class="day-grid">
					<div>
						<p class="sum">{d.summary}</p>
						<ul class="sched">
							{#each d.schedule as s}
								<li>
									<span class="t">{s.time ?? ''}</span>
									<div>
										<strong>{s.title}{s.kind === 'optional' ? ' (אופציונלי)' : ''}</strong>
										{#if s.text}<p>{s.text}</p>{/if}
									</div>
								</li>
							{/each}
						</ul>
						{#if d.hotel}<p class="hotel"><b>לינה:</b> <span class="ltr">{d.hotel.name}</span>{d.hotel.text ? ` — ${d.hotel.text}` : ''}</p>{/if}
					</div>
					<img src={u(d.image)} alt="" loading="lazy" />
				</div>
			</section>
		{/each}

		<section class="inc">
			<div>
				<h2>כלול</h2>
				<ul>{#each included as i}<li>{i}</li>{/each}</ul>
			</div>
			<div>
				<h2>לא כלול</h2>
				<ul>{#each notIncluded as i}<li>{i}</li>{/each}</ul>
			</div>
		</section>

		<p class="fine">ייתכנו שינויים בסדר הפעילויות ובשעות בהתאם לזמני טיסות, מזג אוויר והנחיות הפארקים הלאומיים.</p>
	</article>
</div>

<style>
	.paper-bg {
		background: #e9eeed;
		padding: 120px 16px 80px;
		color: #1d2a2c;
	}
	.paper {
		max-width: 880px;
		margin: 0 auto;
		background: #fff;
		padding: 56px 64px;
		border-radius: 6px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
		font-size: 16px;
		line-height: 1.7;
	}
	.toolbar {
		display: flex;
		justify-content: flex-end;
	}
	.print {
		font: 600 0.9rem var(--font);
		padding: 8px 18px;
		border-radius: 8px;
		border: 1px solid #c9d3d2;
		background: #f5f8f7;
		cursor: pointer;
		color: inherit;
	}
	.doc-head {
		text-align: center;
		border-bottom: 3px solid #1d2a2c;
		padding-bottom: 20px;
		margin-bottom: 30px;
	}
	.logo {
		display: block;
		width: 120px;
		height: auto;
		margin-bottom: 10px;
		border-radius: 12px;
	}
	.brand {
		letter-spacing: 0.15em;
		color: #6a7a7b;
		margin: 0;
	}
	h1 {
		font-size: 2.4rem;
		margin: 6px 0;
		color: #0b2a31;
	}
	.meta {
		margin: 0;
		color: #49595b;
	}
	h2 {
		font-size: 1.5rem;
		color: #0b2a31;
		border-bottom: 1px solid #d7dfde;
		padding-bottom: 6px;
		margin-top: 36px;
	}
	h3 {
		font-size: 1.2rem;
		color: #0b2a31;
		margin: 16px 0 4px;
	}
	.summary {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.92rem;
	}
	.summary th,
	.summary td {
		text-align: right;
		padding: 7px 10px;
		border-bottom: 1px solid #e2e8e7;
	}
	.summary th {
		background: #f2f6f5;
	}
	.ltr {
		direction: ltr;
		unicode-bidi: isolate;
	}
	.day {
		padding: 26px 0;
		border-bottom: 1px solid #e2e8e7;
		break-inside: avoid;
	}
	.day-head {
		display: flex;
		gap: 16px;
		align-items: center;
	}
	.n {
		flex: none;
		width: 46px;
		height: 46px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		font: 800 1.2rem var(--display);
		color: #0b2a31;
	}
	.date {
		margin: 0;
		color: #5c6d6e;
		font-size: 0.92rem;
	}
	.day-head h3 {
		margin: 0;
		font-size: 1.35rem;
	}
	.day-grid {
		display: grid;
		grid-template-columns: 1fr 220px;
		gap: 24px;
		margin-top: 12px;
	}
	.day-grid img {
		width: 100%;
		aspect-ratio: 4/3;
		object-fit: cover;
		border-radius: 6px;
	}
	.sum {
		font-style: italic;
		color: #3b4b4d;
	}
	.sched {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.sched li {
		display: grid;
		grid-template-columns: 56px 1fr;
		gap: 8px;
		padding: 5px 0;
	}
	.t {
		font-weight: 700;
		color: #b07a12;
	}
	.sched p {
		margin: 2px 0 0;
		color: #3b4b4d;
	}
	.hotel {
		margin-top: 10px;
		font-size: 0.95rem;
		color: #3b4b4d;
	}
	.inc {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 30px;
	}
	.inc ul {
		padding-inline-start: 20px;
	}
	.fine {
		margin-top: 30px;
		font-size: 0.85rem;
		color: #6a7a7b;
	}
	@media (max-width: 700px) {
		.paper {
			padding: 30px 20px;
		}
		.day-grid,
		.inc {
			grid-template-columns: 1fr;
		}
		.day-grid img {
			order: -1;
		}
		.summary td:nth-child(4),
		.summary th:nth-child(4) {
			display: none;
		}
	}
	@media print {
		:global(body) {
			background: #fff;
		}
		.paper-bg {
			padding: 0;
			background: #fff;
		}
		.paper {
			box-shadow: none;
			padding: 0;
			max-width: none;
		}
		.toolbar {
			display: none;
		}
		.day-grid {
			grid-template-columns: 1fr 160px;
		}
	}
</style>
