<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import Counter from '$lib/components/Counter.svelte';
	import HeroSlideshow from '$lib/components/HeroSlideshow.svelte';
	import RouteMap from '$lib/components/RouteMap.svelte';
	import RegisterBlock from '$lib/components/RegisterBlock.svelte';
	import { previousTripVideoId } from '$lib/config';
	import { days, regions, stats, stays, trip, worlds, type RegionId } from '$lib/data/ecuador';
	import { shortDate } from '$lib/format';
	import { u } from '$lib/paths';

	const chapterTitles: Record<RegionId, string> = {
		andes: 'הרי האנדים',
		amazon: 'לב האמזונס',
		galapagos: 'איי גלאפגוס',
		coast: 'גואיאקיל והחוף הפסיפי'
	};

	// Group consecutive days by region into "chapters".
	const chapters = days.reduce<{ region: RegionId; days: typeof days }[]>((acc, d) => {
		const last = acc.at(-1);
		if (last && last.region === d.region) last.days.push(d);
		else acc.push({ region: d.region, days: [d] });
		return acc;
	}, []);

	const hebrewOrdinals = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ז׳', 'ח׳'];
	const titleWords = trip.headline.split(' ');
	let videoOn = $state(false);
</script>

<svelte:head>
	<title>{trip.title} | {trip.dateLabel}</title>
	<meta name="description" content={trip.subtitle} />
</svelte:head>

<!-- HERO -->
<section class="hero">
	<HeroSlideshow images={trip.heroImages} />
	<div class="hero-shade"></div>
	<div class="orb orb-1"></div>
	<div class="orb orb-2"></div>
	<div class="hero-content wrap">
		<span class="chip intro" style="--d:0.1s"><span class="dot" style="color:var(--accent)"></span>{trip.dateLabel} · {trip.days} ימים</span>
		<p class="tagline intro" style="--d:0.2s">{trip.tagline}</p>
		<h1>
			{#each titleWords as w, i}
				<span class="word" style="--d:{0.25 + i * 0.12}s">{w}</span>{' '}
			{/each}
		</h1>
		<p class="lead intro" style="--d:0.9s">{trip.subtitle}</p>
		<div class="actions intro" style="--d:1.1s">
			<a class="btn btn-primary" href="#days">גללו למסע ↓</a>
			<a class="btn btn-ghost" href={u('/ecuador-2027/register/')}>רישום למסע</a>
		</div>
	</div>
	<a class="scroll-hint" href="#stats" aria-label="גלילה למטה"><span></span></a>
</section>

<!-- STATS -->
<section id="stats" class="stats wrap">
	{#each stats as s, i}
		<div class="stat reveal" use:reveal style="--delay:{i * 100}ms">
			<strong class="grad-text"><Counter value={s.value} /></strong>
			<span>{s.label}</span>
		</div>
	{/each}
	<div class="stat reveal" use:reveal style="--delay:400ms">
		<strong class="grad-text">0°</strong>
		<span>קו המשווה</span>
	</div>
</section>

<!-- THREE WORLDS -->
<section class="worlds">
	<div class="wrap head reveal" use:reveal>
		<span class="kicker">שלושה עולמות במסע אחד</span>
		<h2>מהרי געש מושלגים, דרך הג׳ונגל — אל האיים של דרווין</h2>
	</div>
	{#each worlds as w, i}
		<article class="world wrap" class:flip={i % 2 === 1} style="--c:{regions[w.id].color}">
			<div class="world-img reveal-zoom" use:reveal>
				<img src={u(w.image)} alt={w.title} loading="lazy" />
				<span class="world-num">0{i + 1}</span>
			</div>
			<div class="world-text reveal" use:reveal style="--delay:150ms">
				<span class="kicker" style="color:var(--c)">{w.kicker}</span>
				<h3>{w.title}</h3>
				<p>{w.text}</p>
				<ul>
					{#each w.facts as f}<li>{f}</li>{/each}
				</ul>
			</div>
		</article>
	{/each}
</section>

<!-- MAP -->
<section class="route wrap">
	<div class="route-text reveal" use:reveal>
		<span class="kicker">המסלול</span>
		<h2>20 ימים, 8 מקומות לינה, 4 טיסות פנים</h2>
		<p>
			מתחילים בקיטו ובהרי האנדים, טסים ללב האמזונס, חוזרים לשבת בקיטו, ממשיכים לאיי גלאפגוס ומסיימים בגואיאקיל
			שעל החוף הפסיפי.
		</p>
		<ol class="stays">
			{#each stays as s}
				<li><span class="n">{s.nights}</span><span>{s.nights === 1 ? 'לילה' : 'לילות'} · {s.where}</span><em>{s.name}</em></li>
			{/each}
		</ol>
	</div>
	<RouteMap />
</section>

<!-- DAYS -->
<section id="days" class="days">
	{#each chapters as ch, ci}
		<header class="chapter" style="--c:{regions[ch.region].color}">
			<div class="wrap reveal" use:reveal>
				<span class="chapter-k">פרק {hebrewOrdinals[ci]}</span>
				<h2>{chapterTitles[ch.region]}</h2>
				<span class="chapter-dates"
					>ימים {ch.days[0].n}{ch.days.length > 1 ? `–${ch.days.at(-1)!.n}` : ''} · {shortDate(ch.days[0].date)}{ch.days
						.length > 1
						? ` – ${shortDate(ch.days.at(-1)!.date)}`
						: ''}</span
				>
			</div>
		</header>

		{#if ch.region === 'amazon'}
			<div class="wrap">
				<div class="selva reveal" use:reveal>
					<div class="selva-img"><img src={u('/img/trip/laselva.jpg')} alt="לודג׳ La Selva" loading="lazy" /></div>
					<div class="selva-body">
						<span class="chip"><span class="dot" style="color:var(--green)"></span>בקרוב</span>
						<h3>La Selva Eco Lodge</h3>
						<p>
							שלושה לילות בלודג׳ אקולוגי בלב יער הגשם, בסוויטות Superior/Scenic. התכנית המפורטת של הפעילויות
							בלודג׳ עוד בדרך אלינו — ותתעדכן כאן ממש בקרוב.
						</p>
						<div class="shimmer" aria-hidden="true"><i></i><i></i><i></i></div>
					</div>
				</div>
			</div>
		{/if}

		{#each ch.days as d}
			<article class="day wrap" style="--c:{regions[d.region].color}">
				<a class="day-img reveal-zoom" use:reveal href={u(`/ecuador-2027/day/${d.n}/`)}>
					<img src={u(d.image)} alt={d.title} loading="lazy" />
					{#if d.shabbat}<span class="badge">שבת</span>{/if}
					{#if d.pending}<span class="badge">תכנית בקרוב</span>{/if}
				</a>
				<div class="day-body reveal" use:reveal style="--delay:120ms">
					<div class="day-num" aria-hidden="true">{String(d.n).padStart(2, '0')}</div>
					<div class="day-meta">
						<span class="chip"><span class="dot" style="color:var(--c)"></span>יום {d.n} · {d.weekday} · {shortDate(d.date)}</span>
					</div>
					<p class="where">📍 {d.where}</p>
					<h3>{d.title}</h3>
					<p>{d.summary}</p>
					{#if d.hotel}<p class="hotel">🛏 לינה: {d.hotel.name}</p>{/if}
					<a class="more" href={u(`/ecuador-2027/day/${d.n}/`)}>לכל פרטי היום ←</a>
				</div>
			</article>
		{/each}
	{/each}
</section>

<!-- VIDEO -->
<section class="video wrap">
	<div class="reveal" use:reveal>
		<span class="kicker">מהטיול הקודם שלנו</span>
		<h2>ככה זה נראה מבפנים</h2>
	</div>
	<div class="frame reveal-zoom" use:reveal>
		{#if videoOn}
			<iframe
				src="https://www.youtube-nocookie.com/embed/{previousTripVideoId}?autoplay=1&rel=0"
				title="סרטון מטיול קודם"
				allow="autoplay; encrypted-media; picture-in-picture"
				allowfullscreen
			></iframe>
		{:else}
			<button class="play" onclick={() => (videoOn = true)} aria-label="הפעלת הסרטון">
				<img src="https://i.ytimg.com/vi/{previousTripVideoId}/hqdefault.jpg" alt="" loading="lazy" />
				<span class="play-btn">▶</span>
			</button>
		{/if}
	</div>
</section>

<!-- CTA -->
<section class="wrap final">
	<RegisterBlock />
	<div class="links reveal" use:reveal>
		<a class="btn btn-ghost" href={u('/ecuador-2027/itinerary/')}>למסלול המלא (להדפסה)</a>
		<a class="btn btn-ghost" href={u('/ecuador-2027/included/')}>מה כלול ומה לא</a>
	</div>
</section>

<style>
	/* HERO */
	.hero {
		position: relative;
		min-height: 100svh;
		display: grid;
		align-items: end;
		overflow: hidden;
		isolation: isolate;
	}
	.hero-shade {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(to top, var(--bg) 2%, rgba(6, 22, 27, 0.55) 40%, rgba(6, 22, 27, 0.25) 70%, rgba(6, 22, 27, 0.6)),
			radial-gradient(80% 60% at 80% 100%, rgba(6, 22, 27, 0.8), transparent);
	}
	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.45;
		mix-blend-mode: screen;
		animation: float 14s ease-in-out infinite;
	}
	.orb-1 {
		width: 420px;
		height: 420px;
		background: #f2b84b;
		top: 10%;
		right: -120px;
	}
	.orb-2 {
		width: 380px;
		height: 380px;
		background: #2ec4d6;
		bottom: 5%;
		left: -100px;
		animation-delay: -7s;
	}
	@keyframes float {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(40px, -50px);
		}
	}
	.hero-content {
		position: relative;
		padding: 140px 0 110px;
	}
	.tagline {
		margin: 22px 0 0;
		font: 800 clamp(1.3rem, 3vw, 2.1rem) / 1.2 var(--display);
		background: var(--grad);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}
	h1 {
		font-size: clamp(2.4rem, 6.6vw, 5.6rem);
		font-weight: 900;
		margin: 8px 0 18px;
		max-width: 16ch;
		text-shadow: 0 4px 40px rgba(0, 0, 0, 0.35);
	}
	.word {
		display: inline-block;
		opacity: 0;
		transform: translateY(0.5em) rotate(2deg);
		filter: blur(8px);
		animation: wordIn 1s var(--ease) forwards;
		animation-delay: var(--d);
	}
	@keyframes wordIn {
		to {
			opacity: 1;
			transform: none;
			filter: none;
		}
	}
	.intro {
		opacity: 0;
		animation: fadeUp 1s var(--ease) forwards;
		animation-delay: var(--d);
	}
	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
	.lead {
		font-size: clamp(1.1rem, 2vw, 1.4rem);
		max-width: 38ch;
		color: #e2ecea;
	}
	.actions {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
		margin-top: 28px;
	}
	.scroll-hint {
		position: absolute;
		bottom: 28px;
		left: 50%;
		translate: -50% 0;
		width: 26px;
		height: 42px;
		border: 2px solid rgba(255, 255, 255, 0.5);
		border-radius: 20px;
	}
	.scroll-hint span {
		position: absolute;
		top: 8px;
		left: 50%;
		width: 4px;
		height: 8px;
		margin-left: -2px;
		border-radius: 2px;
		background: #fff;
		animation: scrollDot 1.8s infinite;
	}
	@keyframes scrollDot {
		0% {
			transform: translateY(0);
			opacity: 1;
		}
		100% {
			transform: translateY(16px);
			opacity: 0;
		}
	}

	/* STATS */
	.stats {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 14px;
		margin-top: -40px;
		position: relative;
		z-index: 2;
	}
	.stat {
		background: var(--surface);
		border: 1px solid var(--line);
		backdrop-filter: blur(14px);
		border-radius: var(--radius);
		padding: 22px 16px;
		text-align: center;
	}
	.stat strong {
		display: block;
		font-family: var(--display);
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 900;
		line-height: 1.1;
	}
	.stat span {
		color: var(--muted);
	}

	/* WORLDS */
	.worlds {
		padding: 120px 0 40px;
	}
	.head {
		text-align: center;
		margin-bottom: 70px;
	}
	.head h2 {
		font-size: clamp(1.8rem, 4vw, 3rem);
		max-width: 22ch;
		margin: 14px auto 0;
	}
	.world {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: 60px;
		align-items: center;
		margin-bottom: 110px;
	}
	.world.flip .world-img {
		order: 2;
	}
	.world-img {
		position: relative;
		border-radius: 28px;
		overflow: hidden;
		aspect-ratio: 4/3;
		box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.7);
	}
	.world-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 1.6s var(--ease);
	}
	.world-img:hover img {
		transform: scale(1.06);
	}
	.world-num {
		position: absolute;
		top: 16px;
		inset-inline-start: 20px;
		font: 900 4rem/1 var(--display);
		color: transparent;
		-webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.8);
	}
	.world-text h3 {
		font-size: clamp(2.2rem, 5vw, 3.8rem);
		font-weight: 900;
		margin-top: 10px;
	}
	.world-text p {
		color: #d5e2e0;
		font-size: 1.08rem;
	}
	.world-text ul {
		list-style: none;
		padding: 0;
		margin: 22px 0 0;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.world-text li {
		padding: 6px 14px;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--c) 50%, transparent);
		color: var(--c);
		font-size: 0.9rem;
	}

	/* ROUTE */
	.route {
		display: grid;
		grid-template-columns: 1fr 1.25fr;
		gap: 48px;
		align-items: center;
		padding: 40px 0 120px;
	}
	.route h2 {
		font-size: clamp(1.8rem, 3.6vw, 2.7rem);
		margin-top: 12px;
	}
	.route-text p {
		color: var(--muted);
	}
	.stays {
		list-style: none;
		padding: 0;
		margin: 24px 0 0;
		display: grid;
		gap: 6px;
	}
	.stays li {
		display: grid;
		grid-template-columns: 34px 1fr auto;
		align-items: center;
		gap: 10px;
		padding: 8px 12px;
		border-radius: 12px;
		background: var(--surface);
		font-size: 0.93rem;
	}
	.stays .n {
		font: 800 1.1rem var(--display);
		color: var(--accent);
		text-align: center;
	}
	.stays em {
		font-style: normal;
		color: var(--muted);
		font-size: 0.85rem;
		direction: ltr;
	}

	/* DAYS */
	.chapter {
		padding: 110px 0 60px;
		text-align: center;
		background: radial-gradient(60% 80% at 50% 0%, color-mix(in srgb, var(--c) 18%, transparent), transparent 70%);
	}
	.chapter-k {
		display: inline-block;
		font: 700 0.9rem var(--display);
		letter-spacing: 0.2em;
		color: var(--c);
	}
	.chapter h2 {
		font-size: clamp(2.4rem, 7vw, 5.2rem);
		font-weight: 900;
		margin: 8px 0;
		background: linear-gradient(180deg, #fff 30%, var(--c));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}
	.chapter-dates {
		color: var(--muted);
	}
	.day {
		display: grid;
		grid-template-columns: 1.15fr 1fr;
		gap: 50px;
		align-items: center;
		margin-bottom: 90px;
	}
	.day:nth-of-type(even) .day-img {
		order: 2;
	}
	.day-img {
		position: relative;
		display: block;
		border-radius: 26px;
		overflow: hidden;
		aspect-ratio: 16/10;
		box-shadow: 0 30px 70px -30px rgba(0, 0, 0, 0.8);
	}
	.day-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 1.4s var(--ease);
	}
	.day-img:hover img {
		transform: scale(1.07);
	}
	.badge {
		position: absolute;
		top: 14px;
		inset-inline-end: 14px;
		background: rgba(6, 22, 27, 0.75);
		backdrop-filter: blur(8px);
		padding: 4px 14px;
		border-radius: 999px;
		font-size: 0.85rem;
		font-weight: 700;
	}
	.day-body {
		position: relative;
	}
	.day-num {
		position: absolute;
		top: -60px;
		inset-inline-end: 0;
		font: 900 clamp(5rem, 11vw, 9rem) / 1 var(--display);
		color: transparent;
		-webkit-text-stroke: 1.5px color-mix(in srgb, var(--c) 60%, transparent);
		opacity: 0.55;
		pointer-events: none;
	}
	.where {
		margin: 16px 0 4px;
		color: var(--c);
		font-weight: 700;
	}
	.day-body h3 {
		font-size: clamp(1.7rem, 3.4vw, 2.5rem);
		font-weight: 800;
	}
	.day-body p {
		color: #d0dedc;
	}
	.hotel {
		font-size: 0.93rem;
		color: var(--muted) !important;
	}
	.more {
		display: inline-block;
		margin-top: 6px;
		font-weight: 700;
		color: var(--c);
		text-decoration: none;
		border-bottom: 1px solid currentColor;
	}

	/* SELVA window */
	.selva {
		display: grid;
		grid-template-columns: 1fr 1.3fr;
		border-radius: 28px;
		overflow: hidden;
		border: 1px dashed rgba(74, 222, 128, 0.5);
		background: linear-gradient(135deg, rgba(74, 222, 128, 0.12), rgba(6, 22, 27, 0.4));
		margin-bottom: 90px;
	}
	.selva-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		min-height: 260px;
	}
	.selva-body {
		padding: 36px;
	}
	.selva-body h3 {
		font-size: 2rem;
		margin-top: 14px;
		direction: ltr;
		text-align: right;
	}
	.shimmer {
		display: grid;
		gap: 10px;
		margin-top: 20px;
	}
	.shimmer i {
		height: 12px;
		border-radius: 6px;
		background: linear-gradient(90deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06));
		background-size: 200% 100%;
		animation: shimmer 1.8s infinite linear;
	}
	.shimmer i:nth-child(2) {
		width: 80%;
	}
	.shimmer i:nth-child(3) {
		width: 55%;
	}
	@keyframes shimmer {
		to {
			background-position: -200% 0;
		}
	}

	/* VIDEO */
	.video {
		padding: 80px 0;
		text-align: center;
	}
	.video h2 {
		font-size: clamp(1.8rem, 4vw, 3rem);
		margin-top: 12px;
	}
	.frame {
		margin-top: 30px;
		aspect-ratio: 16/9;
		border-radius: 26px;
		overflow: hidden;
		border: 1px solid var(--line);
		box-shadow: 0 40px 90px -30px rgba(46, 196, 214, 0.35);
	}
	.frame iframe,
	.play {
		width: 100%;
		height: 100%;
		border: 0;
	}
	.play {
		position: relative;
		padding: 0;
		cursor: pointer;
		background: #000;
	}
	.play img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0.8;
		transition: opacity 0.3s;
	}
	.play:hover img {
		opacity: 1;
	}
	.play-btn {
		position: absolute;
		inset: 0;
		margin: auto;
		width: 90px;
		height: 90px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		background: var(--grad);
		color: var(--bg);
		font-size: 2rem;
		box-shadow: 0 0 0 0 rgba(242, 184, 75, 0.6);
		animation: ring 2s infinite;
	}
	@keyframes ring {
		70% {
			box-shadow: 0 0 0 26px rgba(242, 184, 75, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(242, 184, 75, 0);
		}
	}
	.final {
		padding: 40px 0 100px;
	}
	.links {
		display: flex;
		gap: 12px;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 28px;
	}

	@media (max-width: 860px) {
		.stats {
			grid-template-columns: repeat(3, 1fr);
		}
		.world,
		.day,
		.route,
		.selva {
			grid-template-columns: 1fr;
			gap: 26px;
		}
		.world.flip .world-img,
		.day:nth-of-type(even) .day-img {
			order: 0;
		}
		.day-num {
			top: -30px;
		}
		.world {
			margin-bottom: 70px;
		}
		.day {
			margin-bottom: 70px;
		}
	}
	@media (max-width: 520px) {
		.stats {
			grid-template-columns: repeat(2, 1fr);
		}
		.stats .stat:last-child {
			grid-column: span 2;
		}
		.selva-body {
			padding: 24px;
		}
	}
</style>
