<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { slide } from '$lib/actions/slide';
	import ContactBlock from '$lib/components/ContactBlock.svelte';
	import Counter from '$lib/components/Counter.svelte';
	import HeroSlideshow from '$lib/components/HeroSlideshow.svelte';
	import Media from '$lib/components/Media.svelte';
	import PhotoStrip from '$lib/components/PhotoStrip.svelte';
	import RouteMap from '$lib/components/RouteMap.svelte';
	import RegisterBlock from '$lib/components/RegisterBlock.svelte';
	import TripProgress from '$lib/components/TripProgress.svelte';
	import { previousTripVideoId } from '$lib/config';
	import { days, goodToKnow, regions, stats, stays, trip, worlds, type RegionId } from '$lib/data/ecuador';
	import { stories } from '$lib/data/stories';
	import { shortDate } from '$lib/format';
	import { u } from '$lib/paths';

	const chapterTitles: Record<RegionId, string> = {
		andes: 'הרי האנדים',
		amazon: 'לב האמזונס',
		galapagos: 'איי גלאפגוס',
		coast: 'גוויאקיל והחוף הפסיפי'
	};

	// Full-screen photo behind a chapter's title card, and a vertical clip of it for phones.
	const chapterBg: Partial<Record<RegionId, string>> = {
		andes: '/img/client/quilotoa-flowers.jpg',
		amazon: '/img/amazon/boardwalk-jungle.jpg'
	};
	const chapterClip: Partial<Record<RegionId, string>> = {
		andes: '/video/andes/quilotoa.mp4'
	};
	// On phones, where the wide photo above shows only a sliver.
	const chapterPhone: Partial<Record<RegionId, string>> = {};
	// Where the narrow phone crop of chapterBg centres (object-position).
	const chapterFocus: Partial<Record<RegionId, string>> = {
		amazon: '43% 50%'
	};
	let phone = $state(false);
	$effect(() => {
		const m = matchMedia('(max-width: 760px)');
		phone = m.matches;
		const on = (e: MediaQueryListEvent) => (phone = e.matches);
		m.addEventListener('change', on);
		return () => m.removeEventListener('change', on);
	});

	// Group consecutive days by region into "chapters".
	const chapters = days.reduce<{ region: RegionId; days: typeof days }[]>((acc, d) => {
		const last = acc.at(-1);
		if (last && last.region === d.region) last.days.push(d);
		else acc.push({ region: d.region, days: [d] });
		return acc;
	}, []);

	const titleWords = trip.headline.split(' ');
	const story = stories[0];
	let videoOn = $state(false);

	// YouTube turns captions on by itself when the viewer's language differs from the video's,
	// and cc_load_policy=0 alone doesn't stop that. Unload the captions module through the
	// iframe API a few times while the player finishes loading and starts playing.
	function hideCaptions(e: Event) {
		const player = (e.currentTarget as HTMLIFrameElement).contentWindow;
		const cmd = JSON.stringify({ event: 'command', func: 'unloadModule', args: ['captions'] });
		for (const t of [400, 1200, 2500, 4000]) {
			setTimeout(() => player?.postMessage(cmd, 'https://www.youtube-nocookie.com'), t);
		}
	}

	// La Selva: what each jungle day is about, and the wildlife strip that scrolls under it.
	const selvaDays = [
		{ n: 8, icon: '🛶', text: 'נהר הנאפו, קאנו אל הלודג׳ ושייט לילי לחפש קיימנים' },
		{ n: 9, icon: '🔭', text: 'מגדל תצפית מעל החופה, לוטרות ענק, קופים והואצין' },
		{ n: 10, icon: '🦜', text: 'ליקוק החימר של מאות תוכים וקהילת פילצ׳י הילידית' },
		{ n: 11, icon: '🌅', text: 'שייט בנהר הנאפו, טיסה לקיטו והתארגנות לשבת' }
	];
	const wildlife = [
		{ src: '/img/amazon/clay-lick.jpg', label: 'ליקוק החימר של התוכים' },
		{ src: '/img/amazon/hoatzin.jpg', label: 'ההואצין' },
		{ src: '/img/amazon/squirrel-monkey.jpg', label: 'קופי סנאי' },
		{ src: '/img/amazon/toucan.jpg', label: 'טוקנים' },
		{ src: '/img/amazon/macaws.jpg', label: 'תוכי מקאו' },
		{ src: '/video/amazon/lagoon.mp4', label: 'לגונות שקטות' },
		{ src: '/img/amazon/frog.jpg', label: 'צפרדעי חץ צבעוניות' },
		{ src: '/img/amazon/canoe-paddle.jpg', label: 'שייט בקאנו' },
		{ src: '/img/amazon/python.jpg', label: 'בואה ירוקה' },
		{ src: '/video/amazon/ceiba.mp4', label: 'עצי ענק' },
		{ src: '/img/amazon/night-walk.jpg', label: 'סיורי לילה ובוקר' },
		{ src: '/img/amazon/canoe-binoculars.jpg', label: 'עם משקפת בקאנו' },
		{ src: '/img/amazon/creek.jpg', label: 'נחלי הג׳ונגל' },
		{ src: '/img/amazon/jungle-vines.jpg', label: 'יער הגשם' },
		{ src: '/img/amazon/lodge.jpg', label: 'הלודג׳' }
	];
	// Photo strips that scroll under the Andes and Galápagos chapter headers.
	const andesStrip = [
		{ src: '/img/client/quilotoa-crater.jpg', label: 'לגונה קילוטואה' },
		{ src: '/img/client/textiles.jpg', label: 'שוק אוטבלו' },
		{ src: '/img/client/folk-dance.jpg', label: 'תלבושות צבעוניות' },
		{ src: '/img/client/cotopaxi-horses.jpg', label: 'הר הגעש קוטופקסי' },
		{ src: '/img/client/masks-dance.jpg', label: 'פסטיבלים צבעוניים', pos: '50% 12%' },
		{ src: '/img/client/hacienda-door.jpg', label: 'הסיינדה לה סיינגה' },
		{ src: '/img/client/pailon-bridge.jpg', label: 'מפל פיילון דל דיאבלו (קלחת השטן)' },
		{ src: '/img/client/intinan-sign.jpg', label: 'על קו המשווה' },
		{ src: '/img/client/plaza-dance.jpg', label: 'פסטיבל אינטי ריימי (פסטיבל השמש)' },
		{ src: '/img/client/quilotoa-shore.jpg', label: 'לוע לגונה קילוטואה' },
		{ src: '/img/client/otavalo-llama.jpg', label: 'קהילה מסורתית' }
	];
	const galapagosStrip = [
		{ src: '/img/client/boobies.jpg', label: 'סולה כחולת רגל' },
		{ src: '/video/galapagos/turtle.mp4', label: 'שוחים עם צבי ים' },
		{ src: '/img/client/frigatebird.jpg', label: 'ציפור פריגטה' },
		{ src: '/img/client/crab.jpg', label: 'סרטני סאלי לייטפוט' },
		{ src: '/img/client/shark-cave.jpg', label: 'כרישי שונית' },
		{ src: '/img/client/iguana-beach.jpg', label: 'איגואנה ימית' },
		{ src: '/video/galapagos/reef.mp4', label: 'צלילה באוקיינוס השקט' },
		{ src: '/img/client/snorkel-turtle.jpg', label: 'שנירקול' },
		{ src: '/img/client/sunset-pier.jpg', label: 'שקיעה באיי גלאפגוס' }
	];

	// Fixed (not random) so server and client render the same fireflies.
	const fireflies = Array.from({ length: 16 }, (_, i) => ({
		x: (i * 37) % 100,
		y: 20 + ((i * 53) % 70),
		d: 6 + (i % 5) * 1.6,
		delay: -((i * 1.3) % 9)
	}));
</script>

<svelte:head>
	<title>{trip.title} | {trip.dateLabel}</title>
	<meta name="description" content={trip.subtitle} />
</svelte:head>

<!-- HERO -->
<TripProgress />

<div class="deck">
<section class="hero slide" use:slide>
	<HeroSlideshow images={trip.heroImages} phoneImages={trip.heroPhone} video={trip.heroVideo} />
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
			<a class="btn btn-ghost" href={u('/ecuador-2027/register/')}>מחירים והרשמה</a>
		</div>
	</div>
	<a class="scroll-hint" href="#stats" aria-label="גלילה למטה"><span></span></a>
</section>

<!-- STATS -->
<section id="stats" class="stats-slide slide" use:slide>
	<p class="stats-k reveal" use:reveal>{trip.dateLabel}</p>
	<div class="stats wrap">
		{#each stats as s, i}
			<div class="stat panel reveal" use:reveal style="--delay:{i * 100}ms">
				<strong><Counter value={s.value} /></strong>
				<span>{s.label}</span>
			</div>
		{/each}
		<div class="stat panel reveal" use:reveal style="--delay:400ms">
			<strong>0°</strong>
			<span>קו המשווה</span>
		</div>
	</div>
</section>

<!-- THREE WORLDS -->
<section class="worlds">
	<div class="head-slide slide" use:slide>
		<div class="wrap head reveal" use:reveal>
			<span class="kicker">שלושה עולמות במסע אחד</span>
			<h2>מהרי געש מושלגים, דרך הג׳ונגל — אל האיים של דרווין</h2>
		</div>
	</div>
	{#each worlds as w, i}
		<article class="world wrap slide fx{i % 4}" use:slide class:flip={i % 2 === 1} class:photo-top={w.photoTop} style="--c:{regions[w.id].color};--focus:{w.focus ?? '50% 50%'}">
			<div class="world-img reveal-zoom" use:reveal>
				<img src={u((phone && w.phone) || w.image)} alt={w.title} loading="lazy" />
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
<section class="route wrap slide" use:slide>
	<div class="route-text reveal" use:reveal>
		<span class="kicker">המסלול</span>
		<h2>20 ימים, 8 מקומות לינה, 4 טיסות פנים</h2>
		<p>
			מתחילים בקיטו ובהרי האנדים, טסים ללב האמזונס, חוזרים לשבת בקיטו, ממשיכים לאיי גלאפגוס ומסיימים בגוויאקיל
			שעל החוף הפסיפי.
		</p>
		<ol class="stays">
			{#each stays as s}
				<li class="panel"><span class="n">{s.nights}</span><span>{s.nights === 1 ? 'לילה' : 'לילות'} · {s.where}</span><em>{s.name}</em></li>
			{/each}
		</ol>
	</div>
	<RouteMap />
</section>

<!-- DAYS -->
<section id="days" class="days">
	{#each chapters as ch, ci}
		<div class="chapter-slide slide" class:has-bg={chapterBg[ch.region]} use:slide>
		{#if chapterBg[ch.region]}
			<div class="chapter-bg" aria-hidden="true">
				{#if phone && chapterClip[ch.region]}
					<Media src={chapterClip[ch.region]!} />
				{:else}
					<img
						src={u((phone && chapterPhone[ch.region]) || chapterBg[ch.region]!)}
						style:object-position={chapterFocus[ch.region]}
						alt=""
						loading="lazy"
					/>
				{/if}
			</div>
		{/if}
		<header class="chapter" style="--c:{regions[ch.region].color}">
			<div class="wrap reveal" use:reveal>
				<h2>{chapterTitles[ch.region]}</h2>
				<span class="chapter-dates"
					>ימים {ch.days[0].n}{ch.days.length > 1 ? `–${ch.days.at(-1)!.n}` : ''} · {shortDate(ch.days[0].date)}{ch.days
						.length > 1
						? ` – ${shortDate(ch.days.at(-1)!.date)}`
						: ''}</span
				>
			</div>
		</header>

		{#if ch.region === 'andes' && ci === 0}
			<div class="chapter-strip"><PhotoStrip items={andesStrip} label="תמונות מהאנדים" seconds={42} /></div>
		{:else if ch.region === 'galapagos'}
			<div class="chapter-strip"><PhotoStrip items={galapagosStrip} label="תמונות מגלאפגוס" reverse seconds={36} /></div>
		{/if}
		</div>

		{#if ch.region === 'amazon'}
			<div class="selva">
				<div class="selva-stage slide" use:slide>
					<Media src="/video/amazon/garza-cocha.mp4" poster="/img/amazon/lodge.jpg" class="selva-bg" alt="לגונת גרסה קוצ׳ה ליד הלודג׳" />
					<div class="selva-shade"></div>
					<div class="fireflies" aria-hidden="true">
						{#each fireflies as f}
							<i style="left:{f.x}%;top:{f.y}%;--t:{f.d}s;animation-delay:{f.delay}s"></i>
						{/each}
					</div>
					<div class="wrap selva-body">
						<div class="reveal" use:reveal>
							<span class="chip"><span class="dot" style="color:var(--green)"></span>4 ימים · 3 לילות בלב יער הגשם</span>
							<h3>La Selva Eco Lodge</h3>
							<p>
								לודג׳ אקולוגי על שפת לגונה, שעתיים שייט מהעיר הקרובה. בכל פעילות מלווים אותנו מדריך טבע ומדריך מקומי —
								בקאנו, בשבילי הג׳ונגל, במגדל התצפית ובסיורי הלילה. ובין לבין: קיאקים, עיסוי, או ערסל ונוף.
							</p>
						</div>
						<ol class="selva-days">
							{#each selvaDays as sd, i}
								<li class="reveal" use:reveal style="--delay:{150 + i * 110}ms">
									<a href={u(`/ecuador-2027/day/${sd.n}/`)}>
										<span class="sd-icon" aria-hidden="true">{sd.icon}</span>
										<span class="sd-n">יום {sd.n}</span>
										<span class="sd-t">{sd.text}</span>
									</a>
								</li>
							{/each}
						</ol>
					</div>
				</div>
				<PhotoStrip items={wildlife} label="בעלי חיים ונופים באמזונס" seconds={45} />
			</div>
		{/if}

		{#each ch.days as d}
			<article
				id="day-{d.n}"
				class="day wrap slide fx{d.n % 4}"
				class:photo-top={d.photoTop}
				class:framed={d.framed}
				use:slide
				style="--c:{regions[d.region].color};--focus:{d.focus ?? '50% 50%'}"
			>
				<a class="day-img reveal-zoom" use:reveal href={u(`/ecuador-2027/day/${d.n}/`)}>
					{#if phone && d.phone}
						<Media src={d.phone} alt={d.title} />
					{:else}
						<Media src={d.video ?? d.image} poster={d.video ? d.image : undefined} alt={d.title} />
					{/if}
					{#if d.shabbat}<span class="badge">שבת</span>{/if}
				</a>
				<span class="day-corner" aria-hidden="true">{String(d.n).padStart(2, '0')}</span>
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

<!-- GOOD TO KNOW -->
<section class="know wrap slide" use:slide>
	<div class="reveal" use:reveal>
		<span class="kicker">לפני שאורזים</span>
		<h2>חשוב לדעת</h2>
	</div>
	<ul>
		{#each goodToKnow as g, i}
			<li class="panel reveal" use:reveal style="--delay:{i * 100}ms">
				<span class="k-ic" aria-hidden="true">{g.icon}</span>
				<h3>{g.title}</h3>
				<p>{g.text}</p>
			</li>
		{/each}
	</ul>
</section>

<!-- STORY -->
<section class="story-slide slide" use:slide>
	<a class="story wrap reveal" use:reveal href={u('/stories/')}>
		<div class="story-img"><img src={u(story.image)} alt="" loading="lazy" /></div>
		<div class="story-txt">
			<span class="kicker">סיפורי מטיילות</span>
			<h2>{story.title}</h2>
			<p>{story.excerpt}</p>
			<span class="by">כתבה {story.author} · {story.trip}</span>
			<span class="read">לסיפור המלא ←</span>
		</div>
	</a>
</section>

<!-- VIDEO -->
<section class="video wrap slide" use:slide>
	<div class="reveal" use:reveal>
		<span class="kicker">מהטיול הקודם שלנו</span>
		<h2>ככה זה נראה מבפנים</h2>
	</div>
	<div class="frame reveal-zoom" use:reveal>
		{#if videoOn}
			<iframe
				src="https://www.youtube-nocookie.com/embed/{previousTripVideoId}?autoplay=1&rel=0&cc_load_policy=0&enablejsapi=1"
				title="סרטון מטיול קודם"
				onload={hideCaptions}
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
<section class="wrap final slide" use:slide>
	<RegisterBlock />
	<div class="links reveal" use:reveal>
		<a class="btn btn-ghost" href={u('/ecuador-2027/itinerary/')}>למסלול המלא (להדפסה)</a>
		<a class="btn btn-ghost" href={u('/ecuador-2027/included/')}>מה כלול ומה לא</a>
	</div>
</section>

<!-- CONTACT -->
<section id="contact" class="wrap contact slide" use:slide>
	<ContactBlock />
</section>
</div>

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
		background: linear-gradient(
			to top,
			var(--bg) 0%,
			rgba(6, 22, 27, 0.6) 22%,
			rgba(6, 22, 27, 0) 50%,
			rgba(6, 22, 27, 0) 78%,
			rgba(6, 22, 27, 0.45)
		);
	}
	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.22;
		mix-blend-mode: screen;
		animation: float 14s ease-in-out infinite;
	}
	.orb-1 {
		width: 420px;
		height: 420px;
		background: #f0d999;
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
	/* Solid color, not gradient-clipped text: clipped text combined with the fade-in vanished on some phones. */
	.tagline {
		margin: 22px 0 0;
		font: 800 clamp(1.4rem, 3.4vw, 2.3rem) / 1.2 var(--display);
		color: #f6dc97;
		text-shadow:
			0 2px 18px rgba(0, 0, 0, 0.65),
			0 0 2px rgba(0, 0, 0, 0.4);
	}
	h1 {
		font-size: clamp(2.4rem, 6.6vw, 5.6rem);
		font-weight: 900;
		margin: 8px 0 18px;
		max-width: 16ch;
		text-shadow:
			0 2px 24px rgba(0, 0, 0, 0.55),
			0 0 3px rgba(0, 0, 0, 0.35);
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
		color: #eef4f3;
		text-shadow: 0 1px 12px rgba(0, 0, 0, 0.7);
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
	.stats-k {
		display: none;
	}
	.stat {
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
		color: var(--num);
	}
	.stat span {
		color: var(--panel-muted);
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
		object-position: var(--focus);
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
		font-size: 0.93rem;
	}
	.stays .n {
		font: 800 1.1rem var(--display);
		color: var(--num);
		text-align: center;
	}
	.stays em {
		font-style: normal;
		color: var(--panel-muted);
		font-size: 0.85rem;
		direction: ltr;
	}

	/* DAYS */
	.chapter {
		padding: 110px 0 60px;
		text-align: center;
		background: radial-gradient(60% 80% at 50% 0%, color-mix(in srgb, var(--c) 18%, transparent), transparent 70%);
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
	.chapter-slide.has-bg {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		margin-bottom: 70px;
	}
	.has-bg .chapter {
		padding-top: 38vh;
		background: none;
	}
	.has-bg .chapter h2 {
		filter: drop-shadow(0 2px 14px rgba(0, 0, 0, 0.55));
	}
	.has-bg .chapter-dates {
		color: #e6eeec;
		text-shadow: 0 1px 10px rgba(0, 0, 0, 0.8);
	}
	.has-bg .chapter-strip {
		margin-bottom: 30px;
	}
	.chapter-bg {
		position: absolute;
		inset: 0;
		z-index: -1;
		overflow: hidden;
	}
	.chapter-bg img,
	.chapter-bg :global(video) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transform: scale(1.12);
		transition: transform 9s cubic-bezier(0.2, 0.6, 0.3, 1);
	}
	.chapter-slide:global(.active) .chapter-bg img,
	.chapter-slide:global(.active) .chapter-bg :global(video) {
		transform: scale(1);
	}
	.chapter-bg::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, var(--bg) 0%, rgba(6, 22, 27, 0.55) 30%, rgba(6, 22, 27, 0) 60%, rgba(6, 22, 27, 0.4));
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
	.day-img :global(img),
	.day-img :global(video) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: var(--focus);
		transition: transform 1.4s var(--ease);
	}
	.day-img:hover :global(img),
	.day-img:hover :global(video) {
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
		font: 900 clamp(4rem, 8vw, 6.5rem) / 1 var(--display);
		color: transparent;
		-webkit-text-stroke: 1.5px color-mix(in srgb, var(--c) 60%, transparent);
		opacity: 0.55;
		pointer-events: none;
	}
	.day-corner {
		display: none;
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

	/* SELVA — La Selva lodge, full-bleed video with the four jungle days */
	.selva {
		margin: 0 0 90px;
	}
	.selva-stage {
		position: relative;
		min-height: 640px;
		display: grid;
		align-items: end;
		overflow: hidden;
		isolation: isolate;
	}
	.selva-stage :global(.selva-bg) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: -2;
	}
	.selva-shade {
		position: absolute;
		inset: 0;
		z-index: -1;
		background:
			linear-gradient(to top, var(--bg) 0%, rgba(6, 22, 27, 0.7) 38%, rgba(6, 22, 27, 0.15) 75%, var(--bg) 100%),
			radial-gradient(60% 50% at 15% 60%, rgba(74, 222, 128, 0.22), transparent 70%);
	}
	.fireflies i {
		position: absolute;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #fff4d6;
		box-shadow:
			0 0 10px 3px rgba(248, 233, 189, 0.75),
			0 0 24px 8px rgba(240, 217, 153, 0.35);
		opacity: 0;
		animation: firefly var(--t) ease-in-out infinite;
		pointer-events: none;
	}
	@keyframes firefly {
		0%,
		100% {
			opacity: 0;
			transform: translate(0, 0) scale(0.6);
		}
		30% {
			opacity: 0.95;
		}
		50% {
			transform: translate(28px, -36px) scale(1);
		}
		70% {
			opacity: 0.2;
		}
		85% {
			opacity: 0.8;
			transform: translate(-14px, -60px) scale(0.8);
		}
	}
	.selva-body {
		position: relative;
		padding: 160px 0 40px;
	}
	.selva-body h3 {
		font-size: clamp(1.8rem, 3.6vw, 2.8rem);
		font-weight: 900;
		margin: 16px 0 10px;
		direction: ltr;
		text-align: right;
		color: #f8e9bd;
	}
	.selva-body p {
		max-width: 60ch;
		font-size: 1.12rem;
		color: #e3ecea;
	}
	.selva-days {
		list-style: none;
		margin: 28px 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 14px;
	}
	.selva-days a {
		display: grid;
		gap: 6px;
		height: 100%;
		padding: 18px 18px 20px;
		border-radius: 20px;
		text-decoration: none;
		background: rgba(6, 22, 27, 0.55);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(74, 222, 128, 0.28);
		transition:
			transform 0.4s var(--ease),
			border-color 0.3s,
			background 0.3s;
	}
	.selva-days a:hover {
		transform: translateY(-6px);
		border-color: var(--green);
		background: rgba(74, 222, 128, 0.14);
	}
	.sd-icon {
		font-size: 1.9rem;
		line-height: 1;
		display: inline-block;
		animation: bob 3.2s ease-in-out infinite;
	}
	.selva-days li:nth-child(2) .sd-icon {
		animation-delay: -0.8s;
	}
	.selva-days li:nth-child(3) .sd-icon {
		animation-delay: -1.6s;
	}
	.selva-days li:nth-child(4) .sd-icon {
		animation-delay: -2.4s;
	}
	@keyframes bob {
		0%,
		100% {
			transform: translateY(0) rotate(0);
		}
		50% {
			transform: translateY(-6px) rotate(-6deg);
		}
	}
	.sd-n {
		font: 800 1.05rem var(--display);
		color: var(--green);
	}
	.sd-t {
		color: #dbe7e5;
		font-size: 0.97rem;
		line-height: 1.5;
	}

	.chapter-strip {
		margin: -30px 0 70px;
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
		box-shadow: 0 0 0 0 rgba(240, 217, 153, 0.6);
		animation: ring 2s infinite;
	}
	@keyframes ring {
		70% {
			box-shadow: 0 0 0 26px rgba(240, 217, 153, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(240, 217, 153, 0);
		}
	}
	.final {
		padding: 40px 0 60px;
	}

	/* GOOD TO KNOW */
	.know {
		padding: 60px 0 40px;
	}
	.know h2,
	.story h2 {
		font-size: clamp(1.8rem, 4vw, 3rem);
		margin-top: 12px;
	}
	.know ul {
		list-style: none;
		margin: 26px 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 14px;
	}
	.know li {
		padding: 24px 22px;
		border-radius: var(--radius);
	}
	.k-ic {
		display: inline-block;
		font-size: 2rem;
		animation: bob 3.4s ease-in-out infinite;
	}
	.know li:nth-child(2) .k-ic {
		animation-delay: -1s;
	}
	.know li:nth-child(3) .k-ic {
		animation-delay: -2s;
	}
	.know li:nth-child(4) .k-ic {
		animation-delay: -3s;
	}
	.know h3 {
		font-size: 1.2rem;
		margin: 10px 0 6px;
	}
	.know p {
		margin: 0;
		color: var(--panel-muted);
	}

	/* STORY */
	.story-slide {
		padding: 60px 0 20px;
	}
	.story {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		gap: 40px;
		align-items: center;
		text-decoration: none;
	}
	.story-img {
		border-radius: 26px;
		overflow: hidden;
		aspect-ratio: 4/3;
		box-shadow: 0 30px 70px -30px rgba(0, 0, 0, 0.8);
	}
	.story-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 1.4s var(--ease);
	}
	.story:hover .story-img img {
		transform: scale(1.07);
	}
	.story-txt p {
		font: 600 clamp(1.15rem, 2.2vw, 1.45rem) / 1.6 var(--display);
		color: #e8efee;
	}
	.story-txt .by {
		display: block;
		color: var(--muted);
	}
	.read {
		display: inline-block;
		margin-top: 14px;
		font-weight: 700;
		color: var(--accent);
		border-bottom: 1px solid currentColor;
		transition: transform 0.4s var(--ease);
	}
	.story:hover .read {
		transform: translateX(-6px);
	}
	.contact {
		padding: 40px 0 110px;
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
		.route {
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
		.selva-days {
			grid-template-columns: repeat(2, 1fr);
		}
		.selva-body {
			padding-top: 120px;
		}
		.know ul {
			grid-template-columns: 1fr 1fr;
		}
		.story {
			grid-template-columns: 1fr;
			gap: 22px;
		}
	}
	@media (max-width: 520px) {
		.stats {
			grid-template-columns: repeat(2, 1fr);
		}
		.stats .stat:last-child {
			grid-column: span 2;
		}
		.selva-days {
			grid-template-columns: 1fr;
		}
	}

	/* PHONES — every part of the presentation is a full screen, and swiping snaps from one to the next.
	   Each slide replays its entrance whenever it becomes the active one (see lib/actions/slide.ts). */
	@media (max-width: 760px) {
		:global(html:has(.deck)) {
			scroll-snap-type: y mandatory;
		}
		:global(html:has(.deck) footer) {
			scroll-snap-align: end;
		}
		.slide {
			position: relative;
			min-height: 100svh;
			scroll-snap-align: start;
		}
		.deck .slide :global(.reveal),
		.deck .slide :global(.reveal-zoom) {
			opacity: 0;
			transform: translateY(34px);
		}
		.deck .slide:global(.active) :global(.reveal),
		.deck .slide:global(.active) :global(.reveal-zoom) {
			opacity: 1;
			transform: none;
		}

		.hero-content {
			padding: calc(var(--nav-top) + 40px) 0 calc(var(--nav-bottom) + 56px);
		}
		/* The opening photo at full strength: smaller words, no color haze over it. */
		.orb {
			display: none;
		}
		.tagline {
			font-size: 1.2rem;
		}
		h1 {
			font-size: 1.9rem;
			margin: 6px 0 10px;
		}
		/* The next slide spells out the days and places; here the photo gets the room. */
		.lead {
			display: none;
		}
		.actions {
			margin-top: 16px;
		}
		.scroll-hint {
			bottom: calc(var(--nav-bottom) + 14px);
		}

		/* Stats: one screen of big numbers */
		.stats-slide {
			display: grid;
			align-content: center;
			gap: 18px;
			padding: calc(var(--nav-top) + 20px) 0 calc(var(--nav-bottom) + 20px);
		}
		.stats-k {
			display: block;
			text-align: center;
			margin: 0;
			font: 800 1.2rem var(--display);
			color: var(--num);
		}
		.stats {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			margin-top: 0;
			gap: 8px;
		}
		.stat {
			flex: 0 0 calc((100% - 16px) / 3);
			padding: 10px 6px;
			border-radius: 14px;
		}
		.stat strong {
			font-size: 1.7rem;
		}
		.stat span {
			font-size: 0.78rem;
			line-height: 1.3;
		}

		/* Title cards */
		.head-slide,
		.chapter-slide {
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: calc(var(--nav-top) + 20px) 0 calc(var(--nav-bottom) + 20px);
		}
		.head {
			margin: 0;
		}
		.head h2 {
			font-size: 1.7rem;
		}
		.worlds {
			padding: 0;
		}
		.chapter {
			padding: 0 0 20px;
		}
		.chapter h2 {
			font-size: 2.2rem;
		}
		.chapter-slide.has-bg {
			justify-content: flex-end;
			margin: 0;
		}
		.has-bg .chapter {
			padding: 0 0 10px;
		}
		.has-bg .chapter-strip {
			margin: 0;
		}
		.chapter-strip {
			margin: 10px 0 0;
		}

		/* World and day slides: the photo fills the screen and the text sits over it */
		.world,
		.day {
			display: grid;
			align-items: end;
			width: 100%;
			margin: 0;
			gap: 0;
			padding: calc(var(--nav-top) + 40px) 20px calc(var(--nav-bottom) + 26px);
			overflow: hidden;
			isolation: isolate;
		}
		.world-img,
		.day-img {
			position: absolute;
			inset: 0;
			z-index: -1;
			aspect-ratio: auto;
			border-radius: 0;
			box-shadow: none;
		}
		.world-img::after,
		.day-img::after {
			content: '';
			position: absolute;
			inset: 0;
			background: linear-gradient(
				to top,
				rgba(6, 22, 27, 0.96) 8%,
				rgba(6, 22, 27, 0.55) 45%,
				rgba(6, 22, 27, 0.1) 70%,
				rgba(6, 22, 27, 0.45)
			);
		}
		/* Each photo makes an entrance, taking turns between four:
		   fx0 wipes in from the side, fx1 slides in from the other side, fx2 zooms out of a tilt, fx3 opens as a circle.
		   Once in, it keeps drifting slowly. */
		.deck .slide .world-img,
		.deck .slide .day-img {
			transition:
				clip-path 1.1s var(--ease),
				opacity 0.9s var(--ease),
				transform 1.6s var(--ease);
		}
		.deck .fx0 .world-img,
		.deck .fx0 .day-img {
			clip-path: inset(0 0 0 100%);
			transform: scale(1.3);
		}
		.deck .fx1 .world-img,
		.deck .fx1 .day-img {
			opacity: 0;
			transform: translateX(45%) scale(1.25);
		}
		.deck .fx2 .world-img,
		.deck .fx2 .day-img {
			opacity: 0;
			transform: scale(1.6) rotate(-5deg);
		}
		.deck .fx3 .world-img,
		.deck .fx3 .day-img {
			clip-path: circle(0% at 50% 45%);
			transform: scale(1.2);
		}
		.deck .slide:global(.active) .world-img,
		.deck .slide:global(.active) .day-img {
			clip-path: inset(0 0 0 0);
			opacity: 1;
			transform: none;
		}
		.deck .fx3:global(.active) .world-img,
		.deck .fx3:global(.active) .day-img {
			clip-path: circle(150% at 50% 45%);
		}
		.deck .slide:global(.active) .world-img img,
		.deck .slide:global(.active) .day-img :global(img),
		.deck .slide:global(.active) .day-img :global(video) {
			animation: drift 16s ease-in-out 1.4s infinite alternate;
		}
		@keyframes drift {
			to {
				transform: scale(1.1) translate(-2%, -1.5%);
			}
		}

		/* The photo's subject is low in the frame: keep the photo above the text. */
		.photo-top .world-img,
		.photo-top .day-img {
			inset: 0 0 auto;
			height: 62%;
			-webkit-mask-image: linear-gradient(to top, transparent, #000 32%);
			mask-image: linear-gradient(to top, transparent, #000 32%);
		}
		.photo-top .world-img::after,
		.photo-top .day-img::after {
			background: linear-gradient(to bottom, rgba(6, 22, 27, 0.45), rgba(6, 22, 27, 0) 25%);
		}

		/* A photo too wide or too small to fill a tall screen: shown whole, in a frame above the text. */
		.day.framed {
			align-content: center;
		}
		.framed .day-img {
			position: relative;
			inset: auto;
			z-index: auto;
			aspect-ratio: 4/3;
			margin-bottom: 70px;
			border-radius: 22px;
			box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.9);
		}
		.framed .day-img::after {
			display: none;
		}
		.world-img:hover img,
		.day-img:hover :global(img),
		.day-img:hover :global(video) {
			transform: none;
		}
		.world-num {
			top: calc(var(--nav-top) + 30px);
		}
		.badge {
			top: calc(var(--nav-top) + 34px);
		}
		.world-text h3 {
			font-size: 2rem;
		}
		.world-text p,
		.day-body p {
			color: #e6eeec;
		}
		.world-text p {
			font-size: 1rem;
		}
		/* The day number: small and solid in the top-left corner, level with the day count on the right */
		.day-num {
			display: none;
		}
		.day-corner {
			display: block;
			position: absolute;
			top: calc(var(--nav-top) + 16px);
			left: 10px;
			z-index: 2;
			padding: 1px 9px;
			border-radius: 999px;
			font: 800 0.95rem/1.3 var(--display);
			color: #fff;
			background: rgba(6, 22, 27, 0.7);
			border: 1px solid color-mix(in srgb, var(--c) 55%, transparent);
			backdrop-filter: blur(8px);
		}
		.day:not(.framed) .badge {
			top: calc(var(--nav-top) + 52px);
		}

		/* The text in a day or world slide rises line by line */
		.deck .slide .day-body > :global(*),
		.deck .slide .world-text > :global(*) {
			opacity: 0;
			transform: translateY(26px);
			transition:
				opacity 0.8s var(--ease),
				transform 0.8s var(--ease);
		}
		.deck .slide:global(.active) .day-body > :global(*),
		.deck .slide:global(.active) .world-text > :global(*) {
			opacity: 1;
			transform: none;
		}
		.deck .slide:global(.active) .day-body > :global(*:nth-child(2)),
		.deck .slide:global(.active) .world-text > :global(*:nth-child(2)) {
			transition-delay: 0.12s;
		}
		.deck .slide:global(.active) .day-body > :global(*:nth-child(3)),
		.deck .slide:global(.active) .world-text > :global(*:nth-child(3)) {
			transition-delay: 0.22s;
		}
		.deck .slide:global(.active) .day-body > :global(*:nth-child(4)),
		.deck .slide:global(.active) .world-text > :global(*:nth-child(4)) {
			transition-delay: 0.32s;
		}
		.deck .slide:global(.active) .day-body > :global(*:nth-child(5)),
		.deck .slide:global(.active) .world-text > :global(*:nth-child(5)) {
			transition-delay: 0.42s;
		}
		.deck .slide:global(.active) .day-body > :global(*:nth-child(n + 6)) {
			transition-delay: 0.52s;
		}
		.deck .slide .day-body > .day-num {
			transform: translateX(-60px);
		}
		.deck .slide:global(.active) .day-body > .day-num {
			opacity: 0.55;
			transform: none;
			transition-duration: 1.2s;
		}
		.day-body h3 {
			font-size: 1.35rem;
		}
		.day-body p {
			margin-bottom: 0.6em;
		}

		/* Route: map and the list of stays */
		.route {
			align-content: center;
			padding: calc(var(--nav-top) + 20px) 0 calc(var(--nav-bottom) + 20px);
		}
		.route h2 {
			font-size: min(1.6rem, 4.6vw);
			white-space: nowrap;
		}
		.route-text p {
			display: none;
		}
		.stays {
			grid-template-columns: 1fr 1fr;
			margin-top: 12px;
		}
		.stays li {
			grid-template-columns: 22px 1fr;
			gap: 6px;
			padding: 5px 8px;
			font-size: 0.8rem;
		}
		.stays em {
			display: none;
		}

		/* Amazon */
		.selva {
			margin: 0;
		}
		.selva-stage {
			align-items: center;
		}
		.selva-body {
			padding: calc(var(--nav-top) + 30px) 0 calc(var(--nav-bottom) + 20px);
		}
		.selva-body h3 {
			font-size: 1.6rem;
		}
		.selva-body p {
			font-size: 0.98rem;
		}
		.selva-days {
			grid-template-columns: 1fr 1fr;
			gap: 8px;
			margin-top: 16px;
		}
		.selva-days a {
			padding: 12px;
			gap: 2px;
			border-radius: 16px;
		}
		.sd-icon {
			font-size: 1.4rem;
		}
		.sd-t {
			font-size: 0.82rem;
			line-height: 1.4;
		}

		/* Closing slides */
		.know,
		.story-slide,
		.video,
		.final,
		.contact {
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: calc(var(--nav-top) + 24px) 0 calc(var(--nav-bottom) + 24px);
		}
		.know ul {
			gap: 10px;
		}
		.know li {
			padding: 16px 14px;
		}
		.know h3 {
			font-size: 1.02rem;
		}
		.know p {
			font-size: 0.88rem;
		}
		.story-img {
			aspect-ratio: 16/10;
		}
		.story-txt p {
			font-size: 1.1rem;
		}
	}
	@media (max-width: 760px) and (max-height: 700px) {
		.know p {
			font-size: 0.8rem;
		}
		.sd-t {
			display: none;
		}
	}
</style>
