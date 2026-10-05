<script lang="ts">
	import { page } from '$app/state';
	import Brand from '$lib/components/Brand.svelte';
	import { site } from '$lib/config';
	import { u } from '$lib/paths';

	// Icon paths are drawn on a 24×24 grid with a 1.8 stroke.
	const tabs = [
		{
			href: '/ecuador-2027/',
			label: 'מצגת',
			match: (p: string) => p === '/ecuador-2027/',
			icon: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M10 8.5v5l4-2.5z"/><path d="M8 21h8M12 17v4"/>'
		},
		{
			href: '/ecuador-2027/day/1/',
			label: 'יום אחר יום',
			short: 'ימים',
			match: (p: string) => p.includes('/day/'),
			icon: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'
		},
		{
			href: '/ecuador-2027/included/',
			label: 'מה כלול',
			short: 'כלול',
			match: (p: string) => p.includes('/included'),
			icon: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>'
		},
		{
			href: '/ecuador-2027/itinerary/',
			label: 'המסלול',
			short: 'מסלול',
			match: (p: string) => p.includes('/itinerary'),
			icon: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>'
		},
		{
			href: '/gallery/',
			label: 'גלריה',
			match: (p: string) => p.startsWith('/gallery'),
			icon: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>'
		},
		{
			href: '/stories/',
			label: 'סיפורי מטיילות',
			short: 'סיפורים',
			match: (p: string) => p.startsWith('/stories'),
			icon: '<path d="M12 6c-2-1.5-5-2-8-1.5v14c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-14c-3-.5-6 0-8 1.5zM12 6v14"/>'
		},
		{
			href: '/contact/',
			label: 'צור קשר',
			short: 'קשר',
			match: (p: string) => p.startsWith('/contact'),
			icon: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>'
		}
	];

	let scrolled = $state(false);
	let progress = $state(0);
	let pill = $state({ x: 0, w: 0, on: false });
	// No slide on first paint: the highlight appears in place, and only moves between tabs afterwards.
	let ready = $state(false);

	const path = $derived(page.url.pathname.replace(u(''), '') || '/');

	let nav: HTMLElement;

	// Slide the highlight under the active tab, and keep that tab in view when the strip scrolls.
	function place() {
		const a = nav?.querySelector<HTMLElement>('a.active');
		pill = a ? { x: a.offsetLeft, w: a.offsetWidth, on: true } : { ...pill, on: false };
		if (a && nav.scrollWidth > nav.clientWidth)
			nav.scrollTo({ left: a.offsetLeft - (nav.clientWidth - a.clientWidth) / 2, behavior: 'smooth' });
	}
	$effect(() => {
		path;
		place();
		if (!ready) requestAnimationFrame(() => (ready = true));
	});

	function onScroll() {
		scrolled = window.scrollY > 30;
		const h = document.documentElement.scrollHeight - window.innerHeight;
		progress = h > 0 ? window.scrollY / h : 0;
	}
</script>

<svelte:window onscroll={onScroll} onresize={place} />

<header class:scrolled={scrolled || path.includes('/itinerary')}>
	<div class="bar wrap">
		<div class="brand"><Brand /></div>
		<nav aria-label="ניווט באתר" bind:this={nav}>
			<span class="pill" class:on={pill.on} class:ready style="transform:translateX({pill.x}px);width:{pill.w}px" aria-hidden="true"></span>
			{#each tabs as t}
				<a href={u(t.href)} class:active={t.match(path)} aria-current={t.match(path) ? 'page' : undefined}>
					<svg viewBox="0 0 24 24" aria-hidden="true">{@html t.icon}</svg>
					<span class="long">{t.label}</span>
					<span class="short">{t.short ?? t.label}</span>
				</a>
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
	}
	/* The blur sits on a pseudo-element: a filter on the header itself would trap the fixed bottom bar inside it. */
	header::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		border-bottom: 1px solid transparent;
		transition:
			background 0.4s,
			border-color 0.4s;
	}
	header.scrolled::before {
		background: rgba(6, 22, 27, 0.72);
		backdrop-filter: blur(16px) saturate(1.4);
		border-color: var(--line);
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 16px;
		height: 72px;
	}
	.brand {
		font-size: 1.15rem;
		--logo-size: 46px;
	}
	nav {
		position: relative;
		display: flex;
		gap: 2px;
		margin-inline: auto;
		padding: 5px;
		border-radius: 999px;
		background: rgba(6, 22, 27, 0.45);
		border: 1px solid var(--line);
		backdrop-filter: blur(12px);
		overflow-x: auto;
		scrollbar-width: none;
	}
	.pill {
		position: absolute;
		top: 5px;
		bottom: 5px;
		left: 0;
		border-radius: 999px;
		background: var(--grad);
		box-shadow: 0 6px 20px -6px rgba(236, 208, 138, 0.7);
		opacity: 0;
	}
	.pill.ready {
		transition:
			transform 0.55s var(--ease),
			width 0.55s var(--ease),
			opacity 0.3s;
	}
	.pill.on {
		opacity: 1;
	}
	nav a {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 7px 13px;
		border-radius: 999px;
		text-decoration: none;
		font-size: 0.9rem;
		color: var(--muted);
		white-space: nowrap;
		transition: color 0.3s;
	}
	nav a:hover {
		color: var(--text);
	}
	nav a.active {
		color: var(--bg);
		font-weight: 700;
	}
	svg {
		width: 17px;
		height: 17px;
		flex: none;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition: transform 0.45s var(--ease);
	}
	nav a:hover svg {
		transform: translateY(-2px) rotate(-8deg) scale(1.12);
	}
	.short {
		display: none;
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
	@media (max-width: 1120px) {
		.long {
			display: none;
		}
		.short {
			display: inline;
		}
	}
	/* Phones and tablets: slim top bar, and the tabs move to an app-style bar at the bottom. */
	@media (max-width: 900px) {
		header::before {
			background: rgba(6, 22, 27, 0.62);
			backdrop-filter: blur(14px) saturate(1.4);
		}
		.bar {
			height: var(--nav-top);
		}
		.brand {
			font-size: 1.02rem;
			--logo-size: 38px;
		}
		.cta {
			margin-inline-start: auto;
			padding: 8px 16px;
			font-size: 0.85rem;
		}
		nav {
			position: fixed;
			inset: auto 0 0 0;
			margin: 0;
			padding: 6px 4px calc(6px + env(safe-area-inset-bottom));
			height: var(--nav-bottom);
			border-radius: 22px 22px 0 0;
			border: 0;
			border-top: 1px solid var(--line);
			background: rgba(6, 22, 27, 0.86);
			backdrop-filter: blur(18px) saturate(1.5);
			justify-content: space-around;
			gap: 0;
		}
		nav a {
			flex: 1;
			min-width: 0;
			flex-direction: column;
			gap: 3px;
			padding: 6px 2px;
			border-radius: 14px;
			font-size: 0.66rem;
		}
		nav a.active {
			color: var(--bg);
		}
		svg {
			width: 21px;
			height: 21px;
		}
		nav a.active svg {
			transform: translateY(-1px) scale(1.08);
		}
		.pill {
			top: 6px;
			bottom: calc(6px + env(safe-area-inset-bottom));
			border-radius: 14px;
		}
	}
	@media print {
		header {
			display: none;
		}
	}
</style>
