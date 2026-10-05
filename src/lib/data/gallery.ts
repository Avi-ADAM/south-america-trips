/** הגלריה — "המיוחדים שלנו". יעד בלי תמונות (items ריק) מוצג כ"בקרוב". */

export interface Destination {
	slug: string;
	name: string;
	note?: string;
	/** שני צבעים לכרטיס "בקרוב" */
	hues: [string, string];
	cover?: string;
	items: string[];
}

const c = (n: string) => `/img/client/${n}.jpg`;
const h = (n: string) => `/img/hero/${n}.jpg`;
const t = (n: string) => `/img/trip/${n}.jpg`;
const a = (n: string) => `/img/amazon/${n}.jpg`;
const v = (p: string) => `/video/${p}.mp4`;

export const destinations: Destination[] = [
	{ slug: 'iceland', name: 'איסלנד', hues: ['#5ec8e8', '#3b4a9e'], items: [] },
	{
		slug: 'ecuador',
		name: 'אקוודור',
		note: 'האנדים, קיטו וגואיאקיל',
		hues: ['#f2b84b', '#c2552e'],
		cover: c('quilotoa-crater'),
		items: [
			c('quilotoa-crater'), h('cotopaxi'), c('textiles'), c('otavalo-llama'), c('cotopaxi-horses'),
			c('quilotoa-flowers'), c('plaza-dance'), c('hacienda-garden'), c('hacienda-door'), c('quilotoa-shore'),
			c('masks-dance'), c('pailon-bridge'), h('pailon'), c('pailon-1'), c('folk-dance'), c('intinan-sign'),
			c('mitad-monument'), c('equator-museum'), h('quito'), t('cablecar'), c('quilotoa-cliff'), c('sangay-spa'),
			c('pailon-flower'), t('cacao'), h('guayaquil'), c('cedros-inn')
		]
	},
	{
		slug: 'amazon',
		name: 'אמזונס',
		note: 'לודג׳ La Selva ויער הגשם',
		hues: ['#4ade80', '#0f5e3a'],
		cover: a('canoe-lagoon'),
		items: [
			a('canoe-lagoon'), v('amazon/garza-cocha'), a('clay-lick'), a('hoatzin'), a('squirrel-monkey'), a('macaws'),
			a('toucan'), v('amazon/lagoon'), a('canoe-binoculars'), a('kapok'), a('frog'), a('python'), a('jungle'),
			v('amazon/ceiba'), a('night-walk'), a('canoe-paddle'), a('boardwalk'), a('creek'), a('jungle-vines'),
			a('lodge'), a('coca')
		]
	},
	{
		slug: 'galapagos',
		name: 'איי גלאפגוס',
		note: 'סן קריסטובל וסנטה קרוז',
		hues: ['#2ec4d6', '#14507a'],
		cover: c('snorkel-turtle'),
		items: [
			c('snorkel-turtle'), c('boobies'), v('galapagos/turtle'), c('frigatebird'), c('crab'), c('shark-cave'),
			c('iguana-beach'), h('tortoise'), v('galapagos/reef'), c('swim-turtle'), h('sealions'), c('crab-lava'),
			c('booby-nest'), c('sunset-pier'), t('galapaguera'), c('sunset-harbor')
		]
	},
	{ slug: 'argentina', name: 'ארגנטינה', hues: ['#74b9ff', '#2d3e8f'], items: [] },
	{ slug: 'chile', name: 'צ׳ילה', hues: ['#ff7675', '#6c2a52'], items: [] },
	{ slug: 'brazil', name: 'ברזיל', hues: ['#55efc4', '#d6a520'], items: [] },
	{ slug: 'montenegro', name: 'מונטנגרו', hues: ['#ffd479', '#1d5f8a'], items: [] },
	{ slug: 'peru', name: 'פרו', hues: ['#fd9b6b', '#8c2f39'], items: [] },
	{ slug: 'norway', name: 'נורווגיה', hues: ['#81ecec', '#2d3561'], items: [] },
	{ slug: 'india', name: 'הודו וההימלאיה', hues: ['#ffbe76', '#b33771'], items: [] },
	{ slug: 'georgia', name: 'גאורגיה', hues: ['#e17055', '#4b2c5e'], items: [] },
	{ slug: 'china', name: 'סין', hues: ['#ff6b6b', '#7d1d1d'], items: [] },
	{ slug: 'japan', name: 'יפן · דובי הפנדה', hues: ['#fab1c8', '#6d3b8c'], items: [] },
	{ slug: 'vietnam', name: 'וייטנאם', hues: ['#a3e635', '#1f6f50'], items: [] }
];

export const available = destinations.filter((d) => d.items.length);
