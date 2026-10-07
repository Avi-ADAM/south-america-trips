<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import { reveal } from '$lib/actions/reveal';
	import RegisterBlock from '$lib/components/RegisterBlock.svelte';
	import { ecuadorPricing } from '$lib/config';
	import { trip } from '$lib/data/ecuador';
	import { u } from '$lib/paths';

	const steps = [
		{ t: 'משריינים מקום', d: 'תשלום דמי רצינות בביט — והמקום שלכם בקבוצה.' },
		{ t: 'מקבלים אישור', d: 'ניצור קשר לאישור ההרשמה ולפרטי המטיילים.' },
		{ t: 'משלימים תשלום', d: 'יתרת התשלום לפי לוח הזמנים שנשלח אליכם.' },
		{ t: 'אורזים!', d: 'לפני היציאה נשלח רשימת ציוד ותדריך מסודר.' }
	];
</script>

<Meta title="רישום למסע | {trip.title}" description="{trip.title}, {trip.dateLabel}" image="/img/hero/sealions.jpg" />

<section class="top" style="background-image:url('{u('/img/hero/sealions.jpg')}')">
	<div class="shade"></div>
	<div class="wrap inner">
		<span class="kicker">{trip.dateLabel}</span>
		<h1>רישום למסע</h1>
	</div>
</section>

<section class="wrap block">
	<RegisterBlock />
</section>

{#if ecuadorPricing.costSummary.length}
	<section class="wrap summary reveal" use:reveal>
		<h2>סיכום עלויות</h2>
		<table class="panel">
			<tbody>
				{#each ecuadorPricing.costSummary as row}
					<tr><td>{row.label}</td><td>{row.value}</td></tr>
				{/each}
			</tbody>
		</table>
	</section>
{/if}

<section class="wrap steps">
	<h2 class="reveal" use:reveal>איך זה עובד</h2>
	<ol>
		{#each steps as s, i}
			<li class="panel reveal" use:reveal style="--delay:{i * 100}ms">
				<span class="n">0{i + 1}</span>
				<h3>{s.t}</h3>
				<p>{s.d}</p>
			</li>
		{/each}
	</ol>
	<p class="links">
		<a href={u('/ecuador-2027/included/')}>מה כלול ומה לא ←</a>
		<a href={u('/ecuador-2027/itinerary/')}>המסלול המלא ←</a>
	</p>
</section>

<style>
	.top {
		position: relative;
		min-height: 46svh;
		display: grid;
		align-items: end;
		background-size: cover;
		background-position: center;
	}
	.shade {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, var(--bg) 4%, rgba(6, 22, 27, 0.5));
	}
	.inner {
		position: relative;
		padding: 140px 0 30px;
	}
	h1 {
		font-size: clamp(2.4rem, 6.5vw, 4.6rem);
		font-weight: 900;
		margin-top: 10px;
	}
	.block {
		padding: 40px 0;
	}
	.summary {
		padding: 10px 0 30px;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		border-radius: 18px;
		overflow: hidden;
	}
	td {
		padding: 14px 20px;
		border-bottom: 1px solid var(--panel-border);
	}
	td:last-child {
		text-align: left;
		font-weight: 700;
	}
	.steps {
		padding: 30px 0 100px;
	}
	.steps h2 {
		font-size: 2rem;
	}
	ol {
		list-style: none;
		padding: 0;
		margin: 24px 0 0;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 14px;
	}
	li {
		padding: 26px;
		border-radius: var(--radius);
	}
	.n {
		font: 900 2.4rem/1 var(--display);
		color: var(--num);
	}
	li h3 {
		margin-top: 12px;
		font-size: 1.25rem;
	}
	li p {
		color: var(--panel-muted);
		margin: 0;
	}
	.links {
		display: flex;
		gap: 24px;
		margin-top: 30px;
	}
	.links a {
		color: var(--accent);
		font-weight: 700;
		text-decoration: none;
	}
	@media (max-width: 860px) {
		ol {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 480px) {
		ol {
			grid-template-columns: 1fr;
		}
	}
</style>
