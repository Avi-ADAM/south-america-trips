<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { destinations } from '$lib/data/gallery';
	import { u } from '$lib/paths';
</script>

<Meta title="גלריה · המיוחדים שלנו" description="תמונות מהמסעות שלנו — אקוודור, האמזונס, איי גלאפגוס, ועוד יעדים בקרוב." image={destinations[0].cover} />

<main class="wrap">
	<header class="head">
		<span class="kicker a" style="--d:.05s">גלריה</span>
		<h1 class="a" style="--d:.15s">המיוחדים שלנו</h1>
		<p class="a" style="--d:.3s">רגעים מהדרך, מהמסעות שכבר יצאנו אליהם — ויעדים שמחכים לנו בהמשך.</p>
	</header>

	<ul class="grid">
		{#each destinations as d, i}
			<li class="reveal-zoom" use:reveal style="--delay:{(i % 4) * 80}ms">
				{#if d.items.length}
					<a class="tile live" href={u(`/gallery/${d.slug}/`)}>
						<img src={u(d.cover ?? d.items[0])} alt="" loading="lazy" />
						<span class="shade"></span>
						<span class="txt">
							<strong>{d.name}</strong>
							{#if d.note}<em>{d.note}</em>{/if}
							<span class="count">{d.items.length} תמונות וסרטונים ←</span>
						</span>
					</a>
				{:else}
					<div class="tile soon" style="--h1:{d.hues[0]};--h2:{d.hues[1]}">
						<span class="glow" aria-hidden="true"></span>
						<span class="txt">
							<strong>{d.name}</strong>
							<span class="badge">בקרוב</span>
						</span>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		padding: 130px 0 90px;
	}
	.head {
		text-align: center;
		margin-bottom: 44px;
	}
	h1 {
		font-size: clamp(2.6rem, 8vw, 5.4rem);
		font-weight: 900;
		margin: 10px 0;
	}
	.head p {
		color: var(--muted);
		max-width: 46ch;
		margin-inline: auto;
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
	.grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-auto-flow: dense;
		gap: 14px;
	}
	/* The three galleries that already have photos get double-width tiles. */
	li:has(.live) {
		grid-column: span 2;
	}
	.tile {
		position: relative;
		display: grid;
		align-items: end;
		height: 100%;
		min-height: 210px;
		border-radius: 22px;
		overflow: hidden;
		isolation: isolate;
		text-decoration: none;
	}
	.live {
		min-height: 300px;
		box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.9);
	}
	.live img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: -2;
		transition: transform 1.4s var(--ease);
	}
	.live:hover img {
		transform: scale(1.08);
	}
	.shade {
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(to top, rgba(6, 22, 27, 0.92), rgba(6, 22, 27, 0.1) 60%);
	}
	.txt {
		display: grid;
		gap: 2px;
		padding: 20px 22px;
	}
	strong {
		font: 900 clamp(1.4rem, 2.6vw, 2.1rem) / 1.15 var(--display);
	}
	em {
		font-style: normal;
		color: #dbe6e4;
	}
	.count {
		margin-top: 6px;
		font-weight: 700;
		color: var(--accent);
		transition: transform 0.4s var(--ease);
	}
	.live:hover .count {
		transform: translateX(-6px);
	}
	.soon {
		background: linear-gradient(145deg, color-mix(in srgb, var(--h1) 32%, #06161b), color-mix(in srgb, var(--h2) 45%, #06161b));
		border: 1px solid color-mix(in srgb, var(--h1) 30%, transparent);
	}
	.soon .glow {
		position: absolute;
		z-index: -1;
		width: 70%;
		aspect-ratio: 1;
		top: -20%;
		left: -15%;
		border-radius: 50%;
		background: var(--h1);
		filter: blur(50px);
		opacity: 0.35;
		animation: wander 9s ease-in-out infinite alternate;
	}
	li:nth-child(odd) .glow {
		animation-delay: -4s;
	}
	@keyframes wander {
		to {
			transform: translate(70%, 60%) scale(1.2);
		}
	}
	.soon strong {
		font-size: clamp(1.25rem, 2.2vw, 1.7rem);
	}
	.badge {
		justify-self: start;
		margin-top: 8px;
		padding: 3px 12px;
		border-radius: 999px;
		font-size: 0.8rem;
		font-weight: 700;
		background: rgba(255, 255, 255, 0.14);
		border: 1px solid rgba(255, 255, 255, 0.25);
	}
	@media (max-width: 900px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 10px;
		}
		.tile {
			min-height: 150px;
		}
		.live {
			min-height: 240px;
		}
		main {
			padding-top: 90px;
		}
	}
</style>
