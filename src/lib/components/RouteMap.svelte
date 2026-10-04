<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { mapPoints } from '$lib/data/ecuador';

	// Simple equirectangular projection; the Galapagos inset shares the latitude scale
	// so the equator runs straight through both.
	const S = 63.6;
	const latY = (lat: number) => 122 + -lat * S;
	const main = (lat: number, lon: number) => ({ x: 200 + (lon + 81.2) * S, y: latY(lat) });
	const inset = (lat: number, lon: number) => ({ x: 30 + (lon + 91) * S, y: latY(lat) });

	const P = Object.fromEntries(mapPoints.map((p) => [p.id, { ...p, ...main(p.lat, p.lon) }]));
	const sanCristobal = { name: 'סן קריסטובל', ...inset(-0.9, -89.6) };
	const santaCruz = { name: 'סנטה קרוז', ...inset(-0.74, -90.31) };

	// Which side of the dot each label sits on, to keep neighbours from colliding.
	const side: Record<string, 'l' | 'r' | 't' | 'b'> = {
		otavalo: 'r',
		cotopaxi: 'r',
		banos: 'r',
		laselva: 'r',
		guayaquil: 'r',
		'סנטה קרוז': 't',
		'סן קריסטובל': 'b'
	};
	const labelPos = (p: { id?: string; name: string; x: number; y: number }) => {
		const s = side[p.id ?? p.name] ?? 'l';
		if (s === 'r') return { x: p.x + 12, y: p.y + 4, anchor: 'start' };
		if (s === 't') return { x: p.x, y: p.y - 13, anchor: 'middle' };
		if (s === 'b') return { x: p.x, y: p.y + 22, anchor: 'middle' };
		return { x: p.x - 12, y: p.y + 4, anchor: 'end' };
	};

	type Pt = { x: number; y: number };
	const line = (a: Pt, b: Pt) => `M${a.x},${a.y} L${b.x},${b.y}`;
	const arc = (a: Pt, b: Pt, lift = 60) => {
		const mx = (a.x + b.x) / 2;
		const my = (a.y + b.y) / 2 - lift;
		return `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`;
	};

	const ground = [
		line(P.quito, P.otavalo),
		line(P.quito, P.cotopaxi),
		line(P.cotopaxi, P.quilotoa),
		line(P.quilotoa, P.quito),
		line(P.quito, P.banos),
		line(P.banos, P.quito)
	];
	const flights = [
		arc(P.quito, P.laselva, 50),
		arc(P.quito, sanCristobal, 90),
		arc(santaCruz, P.guayaquil, -70)
	];
	const ferry = line(sanCristobal, santaCruz);

	const labels = [...Object.values(P), sanCristobal, santaCruz];
</script>

<figure class="map reveal" use:reveal>
	<svg viewBox="0 0 600 470" role="img" aria-label="מפת מסלול הטיול באקוודור">
		<defs>
			<radialGradient id="g-amazon"><stop offset="0" stop-color="#4ade80" stop-opacity=".35" /><stop offset="1" stop-color="#4ade80" stop-opacity="0" /></radialGradient>
			<radialGradient id="g-andes"><stop offset="0" stop-color="#f2b84b" stop-opacity=".3" /><stop offset="1" stop-color="#f2b84b" stop-opacity="0" /></radialGradient>
			<radialGradient id="g-gal"><stop offset="0" stop-color="#2ec4d6" stop-opacity=".35" /><stop offset="1" stop-color="#2ec4d6" stop-opacity="0" /></radialGradient>
			<radialGradient id="g-coast"><stop offset="0" stop-color="#ff8a65" stop-opacity=".3" /><stop offset="1" stop-color="#ff8a65" stop-opacity="0" /></radialGradient>
		</defs>

		<!-- graticule -->
		<g class="grid">
			{#each Array(12) as _, i}<line x1={i * 50} y1="0" x2={i * 50} y2="470" />{/each}
			{#each Array(10) as _, i}<line x1="0" y1={i * 50} x2="600" y2={i * 50} />{/each}
		</g>

		<ellipse cx="490" cy="170" rx="120" ry="150" fill="url(#g-amazon)" />
		<ellipse cx="370" cy="190" rx="70" ry="190" fill="url(#g-andes)" />
		<ellipse cx="270" cy="300" rx="90" ry="110" fill="url(#g-coast)" />
		<ellipse cx="95" cy="170" rx="100" ry="90" fill="url(#g-gal)" />

		<text class="region" x="505" y="300">האמזונס</text>
		<text class="region" x="395" y="420">האנדים</text>
		<text class="region" x="250" y="420">החוף הפסיפי</text>

		<!-- equator -->
		<line class="equator" x1="0" y1={latY(0)} x2="600" y2={latY(0)} />
		<text class="eq-label" x="590" y={latY(0) - 8}>קו המשווה 0°</text>

		<!-- galapagos inset -->
		<rect class="inset" x="12" y="80" width="170" height="164" rx="16" />
		<text class="inset-label" x="170" y="104">איי גלאפגוס</text>
		<text class="inset-sub" x="170" y="234">906 ק״מ מהיבשת</text>

		<g class="routes">
			{#each ground as d, i}<path class="ground" {d} pathLength="1" style="--i:{i}" />{/each}
			{#each flights as d, i}<path class="flight" {d} pathLength="1" style="--i:{i + 6}" />{/each}
			<path class="ferry" d={ferry} pathLength="1" style="--i:9" />
		</g>

		{#each labels as p, i}
			{@const l = labelPos(p)}
			<g class="pt" style="--i:{i}">
				<circle cx={p.x} cy={p.y} r="9" class="halo" />
				<circle cx={p.x} cy={p.y} r="4.5" class="core" />
				<text x={l.x} y={l.y} text-anchor={l.anchor}>{p.name}</text>
			</g>
		{/each}
	</svg>
	<figcaption>
		<span><i class="lg ground"></i>נסיעה יבשתית</span>
		<span><i class="lg flight"></i>טיסת פנים</span>
		<span><i class="lg ferry"></i>מעבורת</span>
	</figcaption>
</figure>

<style>
	.map {
		margin: 0;
		background: radial-gradient(120% 120% at 70% 20%, #0f2f38 0%, #071a1f 70%);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: 16px;
		overflow: hidden;
	}
	svg {
		width: 100%;
		height: auto;
		display: block;
		direction: ltr;
	}
	.grid line {
		stroke: rgba(255, 255, 255, 0.05);
	}
	.region {
		fill: rgba(255, 255, 255, 0.28);
		font: 700 15px var(--display);
		text-anchor: middle;
		letter-spacing: 0.05em;
	}
	.equator {
		stroke: var(--accent);
		stroke-dasharray: 2 6;
		stroke-width: 1.5;
		opacity: 0.7;
	}
	.eq-label {
		fill: var(--accent);
		font: 500 12px var(--font);
		text-anchor: end;
	}
	.inset {
		fill: rgba(46, 196, 214, 0.06);
		stroke: rgba(46, 196, 214, 0.4);
		stroke-dasharray: 4 4;
	}
	.inset-label {
		fill: var(--accent-2);
		font: 700 13px var(--display);
		text-anchor: end;
	}
	.inset-sub {
		fill: var(--muted);
		font: 400 11px var(--font);
		text-anchor: end;
	}
	.routes path {
		fill: none;
		stroke-linecap: round;
		stroke-dasharray: 1;
		stroke-dashoffset: 1;
		transition: stroke-dashoffset 1.4s var(--ease);
		transition-delay: calc(0.3s + var(--i) * 0.22s);
	}
	.ground {
		stroke: var(--accent);
		stroke-width: 2.5;
	}
	.flight {
		stroke: #fff;
		stroke-width: 1.6;
		opacity: 0.85;
	}
	.ferry {
		stroke: var(--accent-2);
		stroke-width: 2.5;
	}
	:global(.map.in) .routes path {
		stroke-dashoffset: 0;
	}
	.pt {
		opacity: 0;
		transition: opacity 0.6s;
		transition-delay: calc(0.2s + var(--i) * 0.12s);
	}
	:global(.map.in) .pt {
		opacity: 1;
	}
	.pt text {
		fill: var(--text);
		font: 500 13px var(--font);
		paint-order: stroke;
		stroke: #071a1f;
		stroke-width: 4px;
	}
	.core {
		fill: #fff;
	}
	.halo {
		fill: rgba(255, 255, 255, 0.15);
		transform-box: fill-box;
		transform-origin: center;
		animation: pulse 2.4s infinite;
	}
	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.6;
		}
		50% {
			transform: scale(1.8);
			opacity: 0;
		}
	}
	figcaption {
		display: flex;
		gap: 20px;
		flex-wrap: wrap;
		justify-content: center;
		color: var(--muted);
		font-size: 0.88rem;
		padding-top: 10px;
	}
	figcaption span {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}
	.lg {
		width: 22px;
		height: 3px;
		border-radius: 3px;
		display: inline-block;
	}
	.lg.ground {
		background: var(--accent);
	}
	.lg.flight {
		background: #fff;
	}
	.lg.ferry {
		background: var(--accent-2);
	}
</style>
