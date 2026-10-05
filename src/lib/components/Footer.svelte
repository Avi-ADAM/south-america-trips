<script lang="ts">
	import { site } from '$lib/config';
	import { u } from '$lib/paths';
</script>

<footer>
	<div class="wrap row">
		<div>
			<a class="brand" href={u('/')}>{site.brand}</a>
			<p>{site.tagline}</p>
		</div>
		<nav aria-label="קישורים">
			<a href={u('/ecuador-2027/')}>אקוודור 2027</a>
			<a href={u('/ecuador-2027/itinerary/')}>המסלול המלא</a>
			<a href={u('/ecuador-2027/register/')}>הרשמה</a>
			<a href={u('/gallery/')}>גלריה</a>
			<a href={u('/stories/')}>סיפורי מטיילות</a>
			<a href={u('/contact/')}>צור קשר</a>
		</nav>
		<nav class="reach" aria-label="יצירת קשר">
			{#if site.phone}<a href="tel:+{site.whatsapp}" dir="ltr">{site.phone}</a>{/if}
			{#if site.whatsapp}<a href="https://wa.me/{site.whatsapp}" target="_blank" rel="noopener">וואטסאפ</a>{/if}
			{#if site.email}<a href="mailto:{site.email}">{site.email}</a>{/if}
			{#if site.instagram}<a href="https://instagram.com/{site.instagram}" target="_blank" rel="noopener">אינסטגרם</a>{/if}
		</nav>
	</div>
	<div class="wrap small"><a href={u('/credits/')}>קרדיט לתמונות</a> · © {new Date().getFullYear()} {site.brand}. כל הזכויות שמורות.</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--line);
		padding: 48px 0 calc(28px + var(--nav-bottom));
		background: #041015;
		color: var(--muted);
	}
	.row {
		display: flex;
		justify-content: space-between;
		gap: 24px;
		flex-wrap: wrap;
	}
	.brand {
		font-family: var(--display);
		font-weight: 800;
		font-size: 1.3rem;
		color: var(--text);
		text-decoration: none;
	}
	nav {
		display: flex;
		gap: 22px;
		flex-wrap: wrap;
		align-items: center;
	}
	nav a {
		text-decoration: none;
	}
	.reach a {
		color: var(--text);
	}
	nav a:hover {
		color: var(--text);
	}
	.small {
		margin-top: 28px;
		font-size: 0.85rem;
		opacity: 0.7;
	}
	@media print {
		footer {
			display: none;
		}
	}
</style>
