import type { Action } from 'svelte/action';

/** Adds the `in` class once the element scrolls into view. */
export const reveal: Action<HTMLElement, { once?: boolean } | undefined> = (node, opts) => {
	const once = opts?.once ?? true;
	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					node.classList.add('in');
					if (once) io.disconnect();
				} else if (!once) {
					node.classList.remove('in');
				}
			}
		},
		{ threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
};
