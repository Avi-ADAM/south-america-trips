<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/config';
	import { u } from '$lib/paths';

	const tabs = [
		{ href: '/ecuador-2027/', label: 'המצגת', match: (p: string) => p === '/ecuador-2027/' },
		{ href: '/ecuador-2027/day/1/', label: 'יום אחר יום', match: (p: string) => p.includes('/day/') },
		{ href: '/ecuador-2027/included/', label: 'מה כלול', match: (p: string) => p.includes('/included') },
		{ href: '/ecuador-2027/itinerary/', label: 'המסלול המלא', match: (p: string) => p.includes('/itinerary') },
		{ href: '/ecuador-2027/register/', label: 'רישום למסע', match: (p: string) => p.includes('/register') }
	];

	let scrolled = $state(false);
	let progress = $state(0);

	const path = $derived(page.url.pathname.replace(u(''), '') || '/');

	let nav: HTMLElement;
	// Keep the active tab visible when the tab strip scrolls on small screens.
	$effect(() => {
		path;
		const a = nav?.querySelector<HTMLElement>('a.active');
		if (a) nav.scrollTo({ left: a.offsetLeft - (nav.clientWidth - a.clientWidth) / 2, behavior: 'smooth' });
	});

	function onScroll() {
		scrolled = window.scrollY > 30;
		const h = document.documentElement.scrollHeight - window.innerHeight;
		progress = h > 0 ? window.scrollY / h : 0;
	}
</script>

<svelte:window onscroll={onScroll} />

<header class:scrolled={scrolled || path.includes('/itinerary')}>
	<div class="bar wrap">
		<a class="brand" href={u('/')}>{site.brand}</a>
		<nav aria-label="לשוניות הטיול" bind:this={nav}>
			{#each tabs as t}
				<a href={u(t.href)} class:active={t.match(path)} aria-current={t.match(path) ? 'page' : undefined}
					>{t.label}</a
				>
			{/each}
		</nav>
		<a class="btn btn-primary cta" href={u('/ecuador-2027/register/')}>הרשמה מוקדמת</a>
	</div>
	<div class="progress" style="transform: scaleX({progress})"></div>
</header>

<style>
	header {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 50;
		transition:
			background 0.4s,
			backdrop-filter 0.4s,
			border-color 0.4s;
		border-bottom: 1px solid transparent;
	}
	header.scrolled {
		background: rgba(6, 22, 27, 0.72);
		backdrop-filter: blur(16px) saturate(1.4);
		border-color: var(--line);
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 20px;
		height: 72px;
	}
	.brand {
		font-family: var(--display);
		font-weight: 800;
		font-size: 1.15rem;
		text-decoration: none;
		white-space: nowrap;
	}
	nav {
		display: flex;
		gap: 4px;
		margin-inline: auto;
		padding: 5px;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.07);
		border: 1px solid var(--line);
		backdrop-filter: blur(10px);
		overflow-x: auto;
		scrollbar-width: none;
	}
	nav a {
		padding: 8px 16px;
		border-radius: 999px;
		text-decoration: none;
		font-size: 0.95rem;
		color: var(--muted);
		white-space: nowrap;
		transition:
			color 0.25s,
			background 0.25s;
	}
	nav a:hover {
		color: var(--text);
	}
	nav a.active {
		background: var(--text);
		color: var(--bg);
		font-weight: 700;
	}
	.cta {
		padding: 10px 20px;
		font-size: 0.92rem;
		white-space: nowrap;
	}
	.progress {
		position: absolute;
		bottom: -1px;
		inset-inline: 0;
		height: 2px;
		background: var(--grad);
		transform-origin: right;
	}
	@media (max-width: 900px) {
		.bar {
			flex-wrap: wrap;
			height: auto;
			padding: 10px 0;
			gap: 10px;
		}
		nav {
			order: 3;
			width: 100%;
			margin: 0;
		}
		.cta {
			margin-inline-start: auto;
		}
		nav a {
			padding: 7px 12px;
			font-size: 0.88rem;
		}
	}
	@media print {
		header {
			display: none;
		}
	}
</style>
