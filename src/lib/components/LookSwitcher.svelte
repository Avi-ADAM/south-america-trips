<script lang="ts">
	/**
	 * Lets the client compare color looks for the windows: open any page with ?look=a (or b, c).
	 * The choice sticks for the browsing session; ?look=off clears it.
	 */
	const looks = [
		{ id: 'a', label: 'פנינה' },
		{ id: 'b', label: 'טורקיז' },
		{ id: 'c', label: 'שקיעה' }
	];

	let look = $state<string | null>(null);

	function apply(id: string | null) {
		look = id;
		if (id) document.documentElement.dataset.look = id;
		else delete document.documentElement.dataset.look;
		try {
			if (id) sessionStorage.setItem('look', id);
			else sessionStorage.removeItem('look');
		} catch {}
	}

	$effect(() => {
		const q = new URLSearchParams(location.search).get('look');
		let saved: string | null = null;
		try {
			saved = sessionStorage.getItem('look');
		} catch {}
		if (q === 'off') apply(null);
		else if (q && looks.some((l) => l.id === q)) apply(q);
		else if (saved) apply(saved);
	});
</script>

{#if look}
	<div class="looks" role="group" aria-label="השוואת צבעים">
		<span>צבעים:</span>
		{#each looks as l}
			<button class:on={look === l.id} onclick={() => apply(l.id)}>{l.label}</button>
		{/each}
	</div>
{/if}

<style>
	.looks {
		position: fixed;
		z-index: 80;
		inset-inline-start: 12px;
		bottom: calc(var(--nav-bottom) + 12px);
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 5px 6px 5px 12px;
		border-radius: 999px;
		background: rgba(6, 22, 27, 0.9);
		border: 1px solid var(--line);
		backdrop-filter: blur(10px);
		font-size: 0.82rem;
		box-shadow: 0 10px 30px -10px #000;
	}
	span {
		color: var(--muted);
		padding-inline: 4px;
	}
	button {
		font: inherit;
		color: var(--text);
		background: none;
		border: 1px solid transparent;
		border-radius: 999px;
		padding: 4px 12px;
		cursor: pointer;
	}
	button.on {
		background: var(--text);
		color: var(--bg);
		font-weight: 700;
	}
	@media print {
		.looks {
			display: none;
		}
	}
</style>
