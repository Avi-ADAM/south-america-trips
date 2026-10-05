<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import Brand from '$lib/components/Brand.svelte';
	import HeroSlideshow from '$lib/components/HeroSlideshow.svelte';
	import { site } from '$lib/config';
	import { trip } from '$lib/data/ecuador';
	import { u } from '$lib/paths';
</script>

<svelte:head>
	<title>{site.brand} | {site.tagline}</title>
	<meta name="description" content="{site.tagline} — הטיול הבא: {trip.title}, {trip.dateLabel}" />
</svelte:head>

<header class="top wrap">
	<div class="brand"><Brand /></div>
	<a class="btn btn-ghost" href={u('/ecuador-2027/')}>הטיול הקרוב</a>
</header>

<section class="hero">
	<HeroSlideshow images={['/img/client/quilotoa-flowers.jpg', '/img/client/snorkel-turtle.jpg', '/img/hero/amazon-river.jpg']} />
	<div class="shade"></div>
	<div class="wrap content">
		<span class="kicker">{site.tagline}</span>
		<h1>דרום אמריקה<br /><span class="grad-text">במלוא עוצמתה</span></h1>
	</div>
</section>

<section class="wrap featured">
	<a class="card reveal" use:reveal href={u('/ecuador-2027/')}>
		<img src={u('/img/client/boobies.jpg')} alt="" />
		<div class="body">
			<span class="chip">הטיול הבא · {trip.dateLabel}</span>
			<h2>{trip.title}</h2>
			<p>{trip.subtitle}</p>
			<span class="go">למצגת הטיול ←</span>
		</div>
	</a>
</section>

<style>
	.top {
		position: absolute;
		inset: 0 0 auto;
		z-index: 5;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80px;
	}
	.brand {
		font-size: 1.3rem;
		--logo-size: 54px;
	}
	@media (max-width: 600px) {
		.brand {
			font-size: 1.05rem;
			--logo-size: 44px;
		}
	}
	.hero {
		position: relative;
		min-height: 88svh;
		display: grid;
		align-items: center;
		overflow: hidden;
		isolation: isolate;
	}
	.shade {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, var(--bg) 3%, rgba(6, 22, 27, 0.45) 50%, rgba(6, 22, 27, 0.6));
	}
	.content {
		position: relative;
	}
	h1 {
		font-size: clamp(2.8rem, 8vw, 6.5rem);
		font-weight: 900;
		margin-top: 16px;
	}
	.featured {
		padding: 0 0 100px;
		margin-top: -80px;
		position: relative;
	}
	.card {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		border-radius: 30px;
		overflow: hidden;
		background: var(--bg-2);
		border: 1px solid var(--line);
		text-decoration: none;
		transition: transform 0.4s var(--ease);
	}
	.card:hover {
		transform: translateY(-6px);
	}
	.card img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		min-height: 300px;
	}
	.body {
		padding: 40px;
		align-self: center;
	}
	.body h2 {
		font-size: clamp(1.8rem, 4vw, 2.8rem);
		margin-top: 16px;
	}
	.body p {
		color: var(--muted);
	}
	.go {
		font-weight: 700;
		color: var(--accent);
	}
	@media (max-width: 760px) {
		.card {
			grid-template-columns: 1fr;
		}
		.body {
			padding: 26px;
		}
	}
</style>
