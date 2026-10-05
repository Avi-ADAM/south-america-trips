<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { stories } from '$lib/data/stories';
	import { u } from '$lib/paths';
</script>

<svelte:head>
	<title>סיפורי מטיילות</title>
	<meta name="description" content={stories[0].excerpt} />
</svelte:head>

<main>
	{#each stories as s}
		<article>
			<header class="top">
				<div class="bg" style="background-image:url('{u(s.image)}')"></div>
				<div class="shade"></div>
				<div class="wrap inner">
					<span class="kicker a" style="--d:.05s">סיפורי מטיילות</span>
					<h1 class="a" style="--d:.15s">{s.title}</h1>
					<p class="by a" style="--d:.3s">כתבה {s.author} · {s.trip}</p>
				</div>
			</header>

			<div class="wrap body">
				{#each s.blocks as b, i}
					{#if 'pull' in b}
						<blockquote class="reveal" use:reveal>{b.pull}</blockquote>
					{:else}
						<p class="reveal" class:lead={i === 0} use:reveal>{b.p}</p>
					{/if}
				{/each}
				<p class="sign reveal" use:reveal>— {s.author}</p>
				<div class="flags" aria-hidden="true">🌍🌿🌍🌿🌍🌿🌍</div>
			</div>
		</article>
	{/each}

	<section class="wrap more panel reveal" use:reveal>
		<h2>יצאתן איתנו למסע?</h2>
		<p>נשמח לפרסם גם את הסיפור שלכן. שלחו לנו כמה מילים ותמונה — והוא יעלה כאן.</p>
		<a class="btn btn-primary" href={u('/contact/')}>שלחו לנו סיפור</a>
	</section>
</main>

<style>
	.top {
		position: relative;
		min-height: 70svh;
		display: grid;
		align-items: end;
		overflow: hidden;
		isolation: isolate;
	}
	.bg {
		position: absolute;
		inset: 0;
		z-index: -2;
		background-size: cover;
		background-position: center;
		animation: kb 18s ease-out forwards;
	}
	@keyframes kb {
		from {
			transform: scale(1.2);
		}
		to {
			transform: scale(1.02);
		}
	}
	.shade {
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(to top, var(--bg) 3%, rgba(6, 22, 27, 0.5) 50%, rgba(6, 22, 27, 0.3));
	}
	.inner {
		padding: 150px 0 40px;
	}
	h1 {
		font-size: clamp(3rem, 9vw, 6.5rem);
		font-weight: 900;
		margin: 10px 0 4px;
	}
	.by {
		color: #e3ecea;
		font-size: 1.1rem;
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
	.body {
		max-width: 720px;
		padding: 40px 0 60px;
		font-size: 1.15rem;
		line-height: 1.9;
	}
	.body p {
		color: #dbe6e4;
	}
	.lead::first-letter {
		float: right;
		font: 900 3.6em/0.9 var(--display);
		margin: 6px 0 0 12px;
		color: var(--accent);
	}
	blockquote {
		margin: 34px 0;
		padding: 6px 26px;
		border-inline-start: 4px solid var(--accent);
		font: 700 clamp(1.3rem, 3vw, 1.7rem) / 1.5 var(--display);
		color: #f8e9bd;
	}
	.sign {
		font: 800 1.3rem var(--display);
		text-align: left;
		color: var(--accent) !important;
	}
	.flags {
		text-align: center;
		letter-spacing: 0.3em;
		font-size: 1.3rem;
		opacity: 0.8;
	}
	.more {
		max-width: 720px;
		margin-bottom: 90px;
		padding: 34px;
		border-radius: 28px;
		text-align: center;
	}
	.more p {
		color: var(--panel-muted);
	}
</style>
