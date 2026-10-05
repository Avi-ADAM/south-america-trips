<script lang="ts">
	import { site } from '$lib/config';
	import { u } from '$lib/paths';
</script>

<a class="brand" href={u('/')}>
	<img src={u('/img/brand/emblem.webp')} alt="" width="88" height="88" />
	<span>{site.brand}</span>
</a>

<style>
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-family: var(--display);
		font-weight: 800;
		color: var(--text);
		text-decoration: none;
		white-space: nowrap;
	}
	img {
		/* Parents size the emblem with --logo-size */
		width: var(--logo-size, 44px);
		height: var(--logo-size, 44px);
		flex: none;
		border-radius: 50%;
		box-shadow:
			0 0 0 1px rgba(240, 217, 153, 0.55),
			0 6px 18px -6px rgba(0, 0, 0, 0.6);
		transition: transform 0.6s var(--ease);
	}
	.brand:hover img {
		transform: rotate(-10deg) scale(1.06);
	}
</style>
