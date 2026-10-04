import { error } from '@sveltejs/kit';
import { days } from '$lib/data/ecuador';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => days.map((d) => ({ n: String(d.n) }));

export const load: PageLoad = ({ params }) => {
	const i = days.findIndex((d) => String(d.n) === params.n);
	if (i < 0) error(404, 'היום לא נמצא');
	return { day: days[i], prev: days[i - 1] ?? null, next: days[i + 1] ?? null };
};
