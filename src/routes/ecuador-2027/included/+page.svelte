<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { goodToKnow, included, notIncluded, stays, trip } from '$lib/data/ecuador';
	import { u } from '$lib/paths';
</script>

<Meta title="מה כלול ומה לא | {trip.title}" description={trip.subtitle} image="/img/hero/booby.jpg" />

<section class="top" style="background-image:url('{u('/img/hero/booby.jpg')}')">
	<div class="shade"></div>
	<div class="wrap inner">
		<span class="kicker">לפני שנארוז</span>
		<h1>מה כלול ומה לא</h1>
		<p>{trip.title} · {trip.dateLabel}</p>
	</div>
</section>

<section class="wrap cols">
	<div class="col yes reveal" use:reveal>
		<h2><span class="ic">✓</span> כלול במחיר</h2>
		<ul>
			{#each included as item, i}
				<li class="reveal" use:reveal style="--delay:{i * 60}ms">{item}</li>
			{/each}
		</ul>
	</div>
	<div class="col no reveal" use:reveal style="--delay:120ms">
		<h2><span class="ic">✕</span> לא כלול</h2>
		<ul>
			{#each notIncluded as item, i}
				<li class="reveal" use:reveal style="--delay:{i * 60}ms">{item}</li>
			{/each}
		</ul>
	</div>
</section>

<section class="wrap know">
	<h2 class="reveal" use:reveal>חשוב לדעת</h2>
	<div class="grid">
		{#each goodToKnow as g, i}
			<div class="tip panel reveal" use:reveal style="--delay:{i * 70}ms">
				<span class="tip-ic" aria-hidden="true">{g.icon}</span>
				<div>
					<strong>{g.title}</strong>
					<p>{g.text}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<section class="wrap stays reveal" use:reveal>
	<h2>איפה ישנים</h2>
	<div class="grid">
		{#each stays as s, i}
			<div class="stay panel reveal" use:reveal style="--delay:{i * 50}ms">
				<span class="n">{s.nights}</span>
				<div>
					<strong>{s.name}</strong>
					<span>{s.where} · {s.nights === 1 ? 'לילה אחד' : `${s.nights} לילות`}</span>
				</div>
			</div>
		{/each}
	</div>
	<p class="note">כל הלינות בחדרים זוגיים (Twin) כולל ארוחת בוקר.</p>
</section>

<style>
	.top {
		position: relative;
		min-height: 52svh;
		display: grid;
		align-items: end;
		background-size: cover;
		background-position: center 30%;
	}
	.shade {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, var(--bg) 4%, rgba(6, 22, 27, 0.5));
	}
	.inner {
		position: relative;
		padding: 140px 0 40px;
	}
	h1 {
		font-size: clamp(2.6rem, 7vw, 5rem);
		font-weight: 900;
		margin-top: 10px;
	}
	.top p {
		color: var(--muted);
	}
	.cols {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
		padding: 50px 0;
	}
	.col {
		padding: 34px;
		border-radius: 28px;
		border: 1px solid var(--line);
	}
	.yes {
		background: linear-gradient(160deg, rgba(74, 222, 128, 0.12), transparent 60%);
	}
	.no {
		background: linear-gradient(160deg, rgba(243, 165, 181, 0.12), transparent 60%);
	}
	h2 {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 1.7rem;
	}
	.ic {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		font-size: 1.1rem;
	}
	.yes .ic {
		background: var(--green);
		color: var(--bg);
	}
	.no .ic {
		background: var(--coral);
		color: var(--bg);
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	li {
		padding: 12px 0;
		border-bottom: 1px solid var(--line);
		padding-inline-start: 26px;
		position: relative;
	}
	li:last-child {
		border-bottom: 0;
	}
	li::before {
		content: '';
		position: absolute;
		inset-inline-start: 4px;
		top: 22px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}
	.yes li::before {
		background: var(--green);
	}
	.no li::before {
		background: var(--coral);
	}
	.stays {
		padding: 20px 0 100px;
	}
	.know {
		padding: 0 0 50px;
	}
	.tip {
		display: flex;
		gap: 14px;
		align-items: flex-start;
		padding: 18px 20px;
		border-radius: 18px;
	}
	.tip-ic {
		font-size: 1.8rem;
		line-height: 1;
	}
	.tip p {
		margin: 4px 0 0;
		color: var(--panel-muted);
		font-size: 0.95rem;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
		gap: 12px;
	}
	.stay {
		display: flex;
		gap: 14px;
		align-items: center;
		padding: 16px 18px;
		border-radius: 18px;
	}
	.stay .n {
		font: 900 2rem/1 var(--display);
		color: var(--num);
		min-width: 30px;
		text-align: center;
	}
	.stay strong {
		display: block;
	}
	.stay span {
		color: var(--panel-muted);
		font-size: 0.9rem;
	}
	.note {
		color: var(--muted);
		margin-top: 16px;
	}
	@media (max-width: 760px) {
		.cols {
			grid-template-columns: 1fr;
		}
		.col {
			padding: 24px;
		}
	}
</style>
