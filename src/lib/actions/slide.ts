import type { Action } from 'svelte/action';

const steps = Array.from({ length: 21 }, (_, i) => i / 20);

/**
 * Marks a full-screen slide `active` while it fills most of the screen, and clears it when it leaves,
 * so its entrance animation replays every time the viewer swipes back to it.
 */
export const slide: Action<HTMLElement> = (node) => {
	const io = new IntersectionObserver(
		([e]) => node.classList.toggle('active', e.intersectionRect.height >= window.innerHeight * 0.45),
		{ threshold: steps }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
};
