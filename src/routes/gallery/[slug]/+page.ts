import { error } from '@sveltejs/kit';
import { available } from '$lib/data/gallery';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => available.map((d) => ({ slug: d.slug }));

export const load: PageLoad = ({ params }) => {
	const i = available.findIndex((d) => d.slug === params.slug);
	if (i < 0) error(404, 'הגלריה לא נמצאה');
	return { dest: available[i], next: available[(i + 1) % available.length] };
};
