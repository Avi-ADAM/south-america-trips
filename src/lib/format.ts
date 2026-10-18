/** 2027-06-22 → 22.6.27 (שנה בשתי ספרות) */
export function shortDate(iso: string) {
	const [y, m, d] = iso.split('-').map(Number);
	return `${d}.${m}.${String(y).slice(-2)}`;
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

/**
 * האתר כולו RTL, ולכן טווח תאריכים כמו "22.6.27 – 11.7.27" מתהפך ונקרא
 * "11.7.27 – 22.6.27". בעמוד עוטפים את הטווח במחלקה .ltr; בטקסט פשוט
 * (הודעות וואטסאפ) עוטפים אותו בסימני משמאל לימין.
 */
export function ltr(text: string) {
	return `\u200E${text}\u200E`;
}
