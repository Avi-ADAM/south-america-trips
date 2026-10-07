<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import credits from '$lib/data/credits.json';
	import { u } from '$lib/paths';
</script>

<Meta title="קרדיט לתמונות" noindex />

<section class="wrap">
	<a href={u('/')}>→ לדף הבית</a>
	<h1>קרדיט לתמונות</h1>
	<p>חלק מהתמונות באתר מתוך Wikimedia Commons, בהתאם לרישיונות המצוינים.</p>
	<ul>
		{#each credits as c}
			<li>
				<a href={c.url} target="_blank" rel="noopener">{c.title}</a> — {c.author || 'לא צוין'} · {c.license}
			</li>
		{/each}
	</ul>
</section>

<style>
	section {
		padding: 60px 0 100px;
	}
	ul {
		direction: ltr;
		text-align: left;
		color: var(--muted);
		font-size: 0.9rem;
	}
	li {
		margin-bottom: 6px;
	}
</style>
