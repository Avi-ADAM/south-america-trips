/** 2027-06-22 → 22.6.2027 */
export function shortDate(iso: string) {
	const [y, m, d] = iso.split('-').map(Number);
	return `${d}.${m}.${y}`;
}

/** 2027-06-22 → 22 ביוני 2027 */
export function longDate(iso: string) {
	return new Date(iso + 'T12:00:00').toLocaleDateString('he-IL', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
}

export function money(n: number, currency = '$') {
	return `${currency}${n.toLocaleString('en-US')}`;
}
