<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { ecuadorPricing as p, site } from '$lib/config';
	import { trip } from '$lib/data/ecuador';
	import { money } from '$lib/format';

	const waText = encodeURIComponent(`היי, אשמח לפרטים על הטיול לאקוודור (${trip.dateLabel})`);
</script>

<div class="reg reveal" use:reveal>
	<div class="glow" aria-hidden="true"></div>
	<div class="price">
		<span class="kicker">עלות הטיול</span>
		{#if p.pricePerPerson}
			<strong class="grad-text">{money(p.pricePerPerson, p.currency)}</strong>
			<span class="note">{p.priceNote}</span>
			{#if p.singleSupplement}<span class="note">תוספת לחדר יחיד: {money(p.singleSupplement, p.currency)}</span>{/if}
		{:else}
			<strong class="soon">המחיר יפורסם בקרוב</strong>
			<span class="note">אפשר כבר עכשיו לשריין מקום בהרשמה מוקדמת</span>
		{/if}
	</div>
	<div class="act">
		<h3>הרשמה מוקדמת</h3>
		<p>
			מספר המקומות מוגבל. שריון המקום נעשה בתשלום דמי רצינות{p.deposit ? ` בסך ${p.deposit.toLocaleString('he-IL')} ₪` : ''}
			בביט, שיקוזזו מתשלום הטיול.
		</p>
		<div class="btns">
			{#if p.bitUrl}
				<a class="btn btn-primary" href={p.bitUrl} target="_blank" rel="noopener">תשלום דמי רצינות בביט</a>
			{:else}
				<span class="btn btn-primary" aria-disabled="true">קישור לביט יתווסף בקרוב</span>
			{/if}
			{#if site.whatsapp}
				<a class="btn btn-ghost" href="https://wa.me/{site.whatsapp}?text={waText}" target="_blank" rel="noopener"
					>שאלות? וואטסאפ</a
				>
			{/if}
		</div>
	</div>
</div>

<style>
	.reg {
		position: relative;
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr 1.3fr;
		gap: 40px;
		align-items: center;
		padding: 46px;
		border-radius: 30px;
		border: 1px solid var(--line);
		background: linear-gradient(135deg, rgba(242, 184, 75, 0.12), rgba(46, 196, 214, 0.1));
	}
	.glow {
		position: absolute;
		width: 360px;
		height: 360px;
		border-radius: 50%;
		background: var(--grad);
		filter: blur(110px);
		opacity: 0.25;
		top: -140px;
		left: -100px;
		animation: drift 10s ease-in-out infinite alternate;
	}
	@keyframes drift {
		to {
			transform: translate(120px, 80px);
		}
	}
	.price,
	.act {
		position: relative;
	}
	.price strong {
		display: block;
		font: 900 clamp(2.6rem, 6vw, 4.2rem) / 1.1 var(--display);
		margin: 10px 0 6px;
	}
	.price .soon {
		font-size: clamp(1.8rem, 4vw, 2.6rem);
	}
	.note {
		display: block;
		color: var(--muted);
	}
	.act h3 {
		font-size: 1.8rem;
	}
	.act p {
		color: #d5e2e0;
	}
	.btns {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}
	@media (max-width: 760px) {
		.reg {
			grid-template-columns: 1fr;
			padding: 30px 22px;
			gap: 20px;
		}
	}
</style>
