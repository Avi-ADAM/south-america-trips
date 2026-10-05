<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { site } from '$lib/config';
	import { trip } from '$lib/data/ecuador';
	import { u } from '$lib/paths';

	const waText = encodeURIComponent(`היי, אשמח לפרטים על הטיול לאקוודור (${trip.dateLabel})`);

	// Empty fields in config show "coming soon" instead of a link.
	const items = [
		{
			label: 'טלפון',
			value: site.phone,
			href: site.phone ? `tel:+${site.whatsapp}` : '',
			ltr: true,
			icon: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>'
		},
		{
			label: 'וואטסאפ',
			value: site.whatsapp ? 'שלחו הודעה' : '',
			href: site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${waText}` : '',
			icon: '<path d="M3 21l1.6-4.8A9 9 0 1 1 8 19.6z"/><path d="M9 8.5c0 3.5 2.5 6.5 6.5 6.5l1-1.8-2.2-1.2-1 1a4 4 0 0 1-2.3-2.3l1-1-1.2-2.2z"/>'
		},
		{
			label: 'מייל',
			value: site.email,
			href: site.email ? `mailto:${site.email}` : '',
			ltr: true,
			icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'
		},
		{
			label: 'אינסטגרם',
			value: site.instagram ? `@${site.instagram}` : '',
			href: site.instagram ? `https://instagram.com/${site.instagram}` : '',
			ltr: true,
			icon: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>'
		}
	];
</script>

<div class="contact">
	<div class="head reveal" use:reveal>
		<span class="kicker">יצירת קשר</span>
		<h2>נשמח לשמוע מכם</h2>
		<p>שאלות על המסע, על ההרשמה או על הטיולים הבאים — דברו איתנו.</p>
	</div>
	<ul>
		{#each items as it, i}
			<li class="reveal" use:reveal style="--delay:{i * 90}ms">
				{#if it.href}
					<a class="card panel" href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined} rel="noopener">
						<span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true">{@html it.icon}</svg></span>
						<span class="label">{it.label}</span>
						<strong dir={it.ltr ? 'ltr' : undefined}>{it.value}</strong>
					</a>
				{:else}
					<div class="card panel soon">
						<span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true">{@html it.icon}</svg></span>
						<span class="label">{it.label}</span>
						<strong>יעודכן בקרוב</strong>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
	{#if site.whatsappGroup}
		<a class="group panel reveal" use:reveal href={site.whatsappGroup} target="_blank" rel="noopener">
			<span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14c2.8.2 5 2 5 5"/></svg></span>
			<span class="g-txt">
				<span class="label">קבוצת הווצאפ שלנו</span>
				<strong>הרפתקאות ומסעות נשים</strong>
				<em>הצטרפו לקבוצה ←</em>
			</span>
			{#if site.whatsappGroupQr}<img class="g-qr" src={u(site.whatsappGroupQr)} alt="ברקוד להצטרפות לקבוצה" loading="lazy" />{/if}
		</a>
	{/if}
</div>

<style>
	.head {
		text-align: center;
		margin-bottom: 30px;
	}
	.head h2 {
		font-size: clamp(1.9rem, 4vw, 3rem);
		margin: 12px 0 8px;
	}
	.head p {
		color: var(--muted);
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 14px;
	}
	.card {
		display: grid;
		justify-items: center;
		gap: 4px;
		height: 100%;
		padding: 26px 16px;
		border-radius: var(--radius);
		text-align: center;
		text-decoration: none;
		transition:
			transform 0.4s var(--ease),
			box-shadow 0.4s var(--ease);
	}
	a.card:hover {
		transform: translateY(-6px);
		box-shadow: 0 24px 50px -24px rgba(236, 208, 138, 0.6);
	}
	.ic {
		width: 54px;
		height: 54px;
		display: grid;
		place-items: center;
		border-radius: 50%;
		margin-bottom: 8px;
		background: var(--grad);
		color: #06161b;
		transition: transform 0.5s var(--ease);
	}
	a.card:hover .ic {
		transform: rotate(-10deg) scale(1.1);
	}
	svg {
		width: 26px;
		height: 26px;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.label {
		color: var(--panel-muted);
		font-size: 0.9rem;
	}
	strong {
		font: 800 1.15rem var(--display);
	}
	.soon strong {
		font-weight: 500;
		font-size: 1rem;
		color: var(--panel-muted);
	}
	.soon .ic {
		opacity: 0.55;
	}
	.group {
		display: flex;
		align-items: center;
		gap: 18px;
		margin-top: 14px;
		padding: 18px 24px;
		border-radius: var(--radius);
		text-decoration: none;
		transition: transform 0.4s var(--ease);
	}
	.group:hover {
		transform: translateY(-4px);
	}
	.group .ic {
		margin: 0;
		flex: none;
	}
	.g-txt {
		display: grid;
		flex: 1;
	}
	.group em {
		font-style: normal;
		font-weight: 700;
		color: var(--panel-accent);
	}
	.g-qr {
		width: 120px;
		border-radius: 12px;
	}
	@media (max-width: 760px) {
		.group {
			padding: 10px 14px;
			gap: 12px;
			margin-top: 10px;
			border-radius: 14px;
		}
		/* A phone taps the link; scanning its own screen isn't possible. */
		.g-qr {
			display: none;
		}
		ul {
			grid-template-columns: 1fr 1fr;
			gap: 10px;
		}
		.card {
			padding: 10px 6px;
			gap: 2px;
			border-radius: 14px;
		}
		.ic {
			width: 34px;
			height: 34px;
			margin-bottom: 4px;
		}
		svg {
			width: 18px;
			height: 18px;
		}
		.label {
			font-size: 0.78rem;
		}
		strong {
			font-size: 0.92rem;
		}
		.soon strong {
			font-size: 0.82rem;
		}
	}
</style>
